import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "./MyButton";
import { useImageStore } from "@/state/store";
import useSave from "@/hooks/useSave";

const ManipulatorHeader = () => {
  const navigation = useNavigation();
  const { removeImageUri } = useImageStore();
  const { getAlbums } = useSave();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            navigation.goBack(), removeImageUri();
          }}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <MyButton title="Save" onPress={getAlbums} Bstyle={styles.saveButton}>
          <Ionicons name="save-outline" size={24} />
        </MyButton>
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
    backgroundColor: "#00ADB5",
    width: 48,
    height: 48,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    elevation: 5,
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
