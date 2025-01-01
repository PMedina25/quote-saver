import { Link, RelativePathString } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ItemData = {
  id: string;
  title: string;
};

type ItemProps = {
  item: ItemData;
};

export default function WorkItem({ item }: ItemProps) {
  console.log(item);
  return (
    <Link
      href={{
        pathname: `/${item.id}` as RelativePathString,
        params: { id: item.id },
      }}
      style={styles.item}
    >
      <TouchableOpacity>
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  item: {
    height: 40,
    padding: 10,
    marginVertical: 4,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});
