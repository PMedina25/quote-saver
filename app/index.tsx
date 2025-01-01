import WorkItem from "@/components/WorkItem";
import { Data } from "@/constants/Data";
import { Link } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Data.works}
        renderItem={({ item }) => <WorkItem item={item} />}
        keyExtractor={(item) => item.id}
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
    backgroundColor: "#25292e",
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
