import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImagesDetail } from "@/state/storeMulti";
import GmailStyleSwipeableRow from "@/components/Swipeable";
import useSave from "@/hooks/useSave";
import i18n from "@/constants/LocalLang";

const save = () => {
  const { compressDetailArray, removeItemCompressArray } = useImagesDetail();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const { getMultiAlbums } = useSave();

  const handleSave = () => {
    getMultiAlbums().then(() => {
      setModalShow(true);
      setTimeout(() => {
        setModalShow(false);
        router.navigate("(tabs)/multimanipulator");
      }, 7000);
    });
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View>
        <GmailStyleSwipeableRow onDelete={() => removeItemCompressArray(item.index)}>
          <View style={styles.row}>
            <Text style={{ width: 30 }}>{index + 1}.</Text>
            <Image style={{ width: 80, height: 80 }} source={{ uri: item.uri }} />
            <Text style={{ color: "gery", paddingLeft: 100 }}>{item.size / 1000} KB</Text>
          </View>
        </GmailStyleSwipeableRow>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {modalShow && (
        <TouchableOpacity
          style={styles.modal}
          onPress={() => router.navigate("(tabs)/multimanipulator")}
          activeOpacity={0}
        >
          <Text style={{ fontSize: 20, color: "white" }}>{i18n.t("save1")} 🎉</Text>
          <Text> </Text>
          <Text style={{ fontSize: 16, color: "white" }}>{i18n.t("save2")}</Text>
          <Text> </Text>
          <Text style={{ fontSize: 18, color: "white" }}>/Storage/Pictures/FormatResizer</Text>
        </TouchableOpacity>
      )}
      <View style={styles.show}>
        <FlatList
          data={compressDetailArray}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          ItemSeparatorComponent={() => (
            <View style={{ height: 0.5, backgroundColor: "#c5c5c5" }}></View>
          )}
          ListHeaderComponent={<Text style={styles.section}>{i18n.t("images")}</Text>}
        />
      </View>
      <View style={styles.settings}>
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={{ fontSize: 16 }}>{i18n.t("save")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.navigate("(tabs)/multimanipulator")}
          style={styles.button}
        >
          <Text style={{ fontSize: 16 }}>{i18n.t("cancel")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default save;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  show: {
    flex: 2,
    // backgroundColor: "green",
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "condensed",
    margin: 16,
  },
  settings: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 35,
  },
  button: {
    width: "50%",
    backgroundColor: "white",
    height: 50,
    borderRadius: 25,
    elevation: 2,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#00ADB5",
  },
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    height: Dimensions.get("screen").height,
    zIndex: 1000,
  },
});
