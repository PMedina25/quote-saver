import WorkItem from "@/components/WorkItem";
import { WorksContext } from "@/context/WorksContext";
import { Work } from "@/models/Work";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

export default function Index() {
  const db = useSQLiteContext();
  const { works, addWorks } = useContext(WorksContext);

  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync<Work>("SELECT * FROM works");
        addWorks(result);
      } catch (error) {
        console.error(error);
      }
    }
    setup();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={works}
        renderItem={({ item }) => <WorkItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <Link href="/add-work" style={styles.fab}>
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
