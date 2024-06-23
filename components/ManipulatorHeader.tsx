import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "./MyButton";
import { useImageStore } from "@/state/store";
import useSave from "@/hooks/useSave";
import ConfettiCannon from "react-native-confetti-cannon";

const ManipulatorHeader = () => {
  const navigation = useNavigation();
  const { removeImageUri } = useImageStore();
  const { getAlbums } = useSave();
  const { imageUri } = useImageStore();
  const [modalVisiblity, setModalVisiblity] = useState(false);

  const handleSave = () => {
    getAlbums().then(() => {
      imageUri ? setModalVisiblity(true) : null;
    });
  };

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
        <MyButton title="Save" onPress={handleSave} Bstyle={styles.saveButton}>
          <Ionicons name="save-outline" size={24} />
        </MyButton>
        <Modal visible={modalVisiblity} animationType="fade" transparent={true}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModalVisiblity(false)}
            activeOpacity={0}
          >
            <ConfettiCannon
              count={120}
              origin={{ x: -10, y: 0 }}
              fallSpeed={2000}
              fadeOut={true}
              autoStart={true}
            />
            <View style={styles.Modal}>
              <Text>MOdaalll</Text>
              <Button onPress={() => setModalVisiblity(false)} title="desmis" />
            </View>
          </TouchableOpacity>
        </Modal>
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
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
  },
  Modal: {
    width: "80%",
    height: 500,
    justifyContent: "space-between",
    alignContent: "space-between",
    backgroundColor: "white",
    position: "absolute",
    top: 100,
    alignSelf: "center",
    borderRadius: 30,
  },
});
