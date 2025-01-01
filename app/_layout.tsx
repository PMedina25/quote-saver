import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="add-work" options={{ title: "Add Work" }} />
        <Stack.Screen name="[quotes]" options={{ title: "Quotes" }} />
      </Stack>
    </PaperProvider>
  );
}
