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
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  item: {
    height: 40,
    padding: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});
