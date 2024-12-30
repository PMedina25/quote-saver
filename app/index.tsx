import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

export default function Index() {
  return (
    <View style={styles.container}>
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
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
