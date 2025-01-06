import { QuotesContext } from "@/context/QuotesContext";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AddQuoteScreen() {
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();
  const { addQuote } = useContext(QuotesContext);

  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const handleSubmit = async () => {
    if (!quote || !author) {
      return;
    }

    try {
      await db
        .runAsync(
          "INSERT INTO quotes (quote, author, workId) VALUES (?, ?, ?)",
          [quote, author, parseInt(id)]
        )
        .then((result) => {
          addQuote({
            id: result.lastInsertRowId,
            quote,
            author,
            workId: parseInt(id),
          });
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
          label="Quote"
          value={quote}
          onChangeText={setQuote}
        />

        <TextInput
          mode="outlined"
          label="Author"
          value={author}
          onChangeText={setAuthor}
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
