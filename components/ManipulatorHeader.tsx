import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "./MyButton";
import { useImageStore } from "@/state/store";

const ManipulatorHeader = () => {
  const navigation = useNavigation();
  const { removeImageUri } = useImageStore();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <MyButton title="Export"></MyButton>
      </View>
    </SafeAreaView>
  );
};

export default ManipulatorHeader;

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  arrow: {
    backgroundColor: "green",
    width: 48,
    height: 48,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    elevation: 5,
  },
});
