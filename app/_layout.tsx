import { TransactionsProvider } from "@/contexts/TransactionsContext";
import { Stack } from "expo-router";
// import { useFonts } from "expo-font";
// import * as SplashScreen from 'expo-splash-screen';
// import React, { useEffect } from "react";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   'NunitoSansRegular': require("@/assets/fonts/NunitoSans-Regular.ttf"),
  //   'SpaceMono-Regular': require("@/assets/fonts/SpaceMono-Regular.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) return null;

  return (
    <TransactionsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TransactionsProvider>
  )
}