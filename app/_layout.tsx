import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { useFonts } from 'expo-font';
// import { useEffect } from 'react';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
