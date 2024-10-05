import { Tabs } from "expo-router";
import ManipulatorHeader from "@/components/ManipulatorHeader";
import { Ionicons } from "@expo/vector-icons";
import i18n from "@/constants/LocalLang";

export const unstable_settings = {
  initialRouteName: "manipulator",
};

export default function RootLayoutNav() {
  return (
    <Tabs>
      <Tabs.Screen
        name="multimanipulator"
        options={{
          title: i18n.t("tabTwo"),
          headerShown: false,
          tabBarIcon: () => <Ionicons name="layers-outline" size={24} />,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveBackgroundColor: "#F5F7F8",
          tabBarActiveTintColor: "black",
        }}
      />
      <Tabs.Screen
        name="manipulator"
        options={{
          title: i18n.t("tabOne"),
          header: () => <ManipulatorHeader />,
          tabBarIcon: () => <Ionicons name="square-outline" size={20} />,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveBackgroundColor: "#F5F7F8",
          tabBarActiveTintColor: "black",
        }}
      />
    </Tabs>
  );
}
