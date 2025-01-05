import { WorksContext } from "@/context/WorksContext";
import { WorkType } from "@/enums/WorkType";
import { useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AddWorkScreen() {
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const { addWork } = useContext(WorksContext);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [type, setType] = useState<WorkType>(WorkType.Book);

  const handleSubmit = async () => {
    if (!title || !author || !type) {
      return;
    }

    try {
      await db
        .runAsync("INSERT INTO works (title, author, type) VALUES (?, ?, ?)", [
          title,
          author,
          type,
        ])
        .then((result) => {
          addWork({ id: result.lastInsertRowId, title, author, type });
        });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
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

        <TextInput
          mode="outlined"
          label="Author"
          value={author}
          onChangeText={setAuthor}
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
