import QuoteItem from "@/components/QuoteItem";
import { QuotesContext } from "@/context/QuotesContext";
import { Quote } from "@/models/Quote";
import { Link, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

export default function QuotesScreen() {
  const db = useSQLiteContext();
  const { id }: { id: string } = useLocalSearchParams();
  const { quotes, addQuotes } = useContext(QuotesContext);

  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync<Quote>(
          "SELECT * FROM quotes where workId = ?",
          [parseInt(id)]
        );
        addQuotes(result);
      } catch (error) {
        console.error(error);
      }
    }
    setup();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={quotes}
        renderItem={({ item }) => <QuoteItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <Link
        href={{ pathname: "/add-quote", params: { id } }}
        style={styles.fab}
      >
        <FAB icon="plus" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 16,
    bottom: 16,
  },
});
