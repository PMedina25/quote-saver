import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function QuotesScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Details of quotes {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
