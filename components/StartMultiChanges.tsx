import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import useMultiCompress from "@/hooks/useMultiCompress";
import { useImagesDetail } from "@/state/storeMulti";
import i18n from "@/constants/LocalLang";
import LoadingAnimation from "./LoadingAnimation";
import LoadingText from "./LoadingText";

const StartMultiChanges = () => {
  const [counter, setCounter] = useState<number>(0);
  const [status, setStatus] = useState("start");

  const { detailsArray, compressDetailArray, removeCompressArray } = useImagesDetail();

  const handleError = (error?: string) => {
    setCounter((prev) => prev + 1);
    error ? setStatus(error) : validate();
  };

  const { compressImages, dataRef, endedCounter }: any = useMultiCompress(handleError);

  const update = () => {
    setCounter((prev) => prev + 1);
    dataRef.current = [];
    setStatus("start");
  };

  const handlePress = () => {
    if (!detailsArray.length) {
      return;
    }
    endedCounter.current = 0;
    removeCompressArray();
    setStatus("loading");
    detailsArray.map((item, index) => {
      compressImages(item, index);
    });
  };

  const validate = () => {
    if (status !== "error" && endedCounter.current === detailsArray.length) {
      setTimeout(() => {
        setStatus("successful");
      }, 7000);
    }
  };

  return (
    <View style={styles.container}>
      {status === "loading" && (
        <TouchableOpacity style={[styles.cover, { bottom: 0 }]}></TouchableOpacity>
      )}
      {status === "start" && (
        <>
          <LoadingAnimation />

          <TouchableOpacity
            onPress={handlePress}
            style={[styles.stateButton, { backgroundColor: "#858585" }]}
          >
            <Text style={{ color: "white" }}>{i18n.t("start")}</Text>
          </TouchableOpacity>
        </>
      )}

      {status === "loading" && (
        <>
          <LoadingText />
          <TouchableOpacity
            onPress={update}
            style={[styles.stateButton, { backgroundColor: "#FD5D5D" }]}
          >
            <Text>{i18n.t("cancel")}</Text>
          </TouchableOpacity>
        </>
      )}
      {status === "error" && (
        <>
          <Text style={{ marginBottom: 26 }}>{i18n.t("errorText")}</Text>

          <TouchableOpacity
            onPress={update}
            style={[styles.stateButton, { backgroundColor: "#FFEE63" }]}
          >
            <Text>{i18n.t("error")}</Text>
          </TouchableOpacity>
        </>
      )}
      {(status === "successful" || status === "max") && (
        <>
          <Text
            style={{
              marginBottom: 26,
              fontSize: 36,
              fontWeight: "600",
              color: "#9ADE7B",
            }}
          >
            {i18n.t("successful")}
          </Text>
          <Text style={{ marginBottom: 26, paddingHorizontal: 22, textAlign: "center" }}>
            {status === "max" && i18n.t("maxText")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate("save");
              update();
            }}
            style={[styles.stateButton, { backgroundColor: "#9ADE7B" }]}
          >
            <Text>{i18n.t("save")}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default StartMultiChanges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingBottom: 20,
  },
  stateButton: {
    width: "30%",
    backgroundColor: "#eaeaea",
    height: 50,
    borderRadius: 25,
    elevation: 2,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    borderWidth: 1.5,
    borderColor: "#00ADB5",
  },
  cover: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "100%",
    height: 1000,
    bottom: 0,
    zIndex: 100,
  },
});
