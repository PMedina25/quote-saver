import { migrateDbIfNeeded } from "@/lib/database";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Suspense fallback={<ActivityIndicator animating={true} />}>
        <SQLiteProvider
          databaseName="quote_saver.db"
          onInit={migrateDbIfNeeded}
          useSuspense
        >
          <Stack>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="add-work" options={{ title: "Add Work" }} />
            <Stack.Screen name="[quotes]" options={{ title: "Quotes" }} />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </PaperProvider>
  );
}
