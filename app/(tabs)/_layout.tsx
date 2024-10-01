import { Tabs } from "expo-router";
import React from "react";
import CustomHeader from "@/components/CustomHeader";
import ManipulatorHeader from "@/components/ManipulatorHeader";

export const unstable_settings = {
  initialRouteName: "manipulator",
};

export default function RootLayoutNav() {
  return (
    <Tabs>
      <Tabs.Screen
        name="multimanipulator"
        options={{
          title: "Multi",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="manipulator"
        options={{
          headerTitle: "",
          header: () => <ManipulatorHeader />,
        }}
      />
    </Tabs>
  );
}
