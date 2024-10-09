import { Stack } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { I18nManager } from "react-native";

I18nManager.forceRTL(false); // Force LTR layout
I18nManager.allowRTL(false);

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
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="save"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
