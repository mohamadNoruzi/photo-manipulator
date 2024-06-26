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
import i18n from "@/constants/LocalLang";

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
        <MyButton
          title={i18n.t("save")}
          onPress={handleSave}
          Bstyle={styles.saveButton}
        >
          <Ionicons name="save-outline" size={24} />
        </MyButton>
        {/* modal */}
        <Modal visible={modalVisiblity} animationType="fade" transparent={true}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModalVisiblity(false)}
            activeOpacity={0}
          >
            <View style={{ zIndex: 10, width: "100%", height: "100%" }}>
              <ConfettiCannon
                count={120}
                origin={{ x: -10, y: 0 }}
                fallSpeed={2500}
                fadeOut={true}
                autoStart={true}
              />
            </View>
            <View style={styles.Modal}>
              <TouchableOpacity
                style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}
                onPress={() => setModalVisiblity(false)}
              >
                <Text
                  style={{
                    fontSize: 80,
                    alignSelf: "center",
                    marginBottom: 80,
                  }}
                >
                  🎉
                </Text>
                <Text style={{ fontSize: 22 }}>{i18n.t("modal1")}</Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 60 }}
                >
                  {i18n.t("modal2")}
                </Text>
              </TouchableOpacity>
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
    elevation: 3,
  },
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
  },
  Modal: {
    width: "80%",
    height: 450,
    justifyContent: "space-between",
    alignContent: "space-between",
    backgroundColor: "white",
    position: "absolute",
    top: 100,
    alignSelf: "center",
    borderRadius: 30,
  },
});
