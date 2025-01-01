import { WorkType } from "@/enums/WorkType";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AddWorkScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [type, setType] = useState<WorkType>(WorkType.Book);

  const handleSubmit = () => {
    if (!title || !work || !type) {
      return;
    }

    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          mode="outlined"
          label="Title"
          value={title}
          onChangeText={setTitle}
        />

        <SegmentedButtons
          value={type}
          onValueChange={(value: string) => setType(value as WorkType)}
          buttons={[
            { value: WorkType.Book, label: "Book", icon: "book" },
            { value: WorkType.Movie, label: "Movie", icon: "movie" },
            { value: WorkType.Person, label: "Person", icon: "account" },
          ]}
        />

        <TextInput
          mode="outlined"
          label="Work"
          value={work}
          onChangeText={setWork}
        />

        <Button style={styles.button} mode="contained" onPress={handleSubmit}>
          Save
        </Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  button: {
    marginTop: "auto",
  },
});
