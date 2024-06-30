import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";
import CustomHeader from "@/components/CustomHeader";
import ManipulatorHeader from "@/components/ManipulatorHeader";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="manipulator"
        options={{
          presentation: "modal",
          headerTitle: "",
          header: () => <ManipulatorHeader />,
        }}
      />
    </Stack>
  );
}
