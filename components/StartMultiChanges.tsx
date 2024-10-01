import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import useMultiCompress from "@/hooks/useMultiCompress";
import { useImagesDetail } from "@/state/storeMulti";

const StartMultiChanges = ({ call }: any) => {
  const [counter, setCounter] = useState<number>(0);
  const [status, setStatus] = useState("start");
  const parentLayout = useRef(0);

  call(parentLayout);
  console.log("parentLayout: ", parentLayout.current);

  const {
    endQuality,
    format,
    detailsArray,
    compressDetailArray,
    removeCompressArray,
    setQualityNumberParameters,
  } = useImagesDetail();

  const handleError = (error?: string) => {
    setCounter((prev) => prev + 1);
    console.log(counter);
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
      setStatus("successful");
    }
  };

  console.log("compressDetailArray", compressDetailArray);
  console.log("dataRef: ", dataRef.current);
  console.log("endedCounter: ", endedCounter.current);
  console.log("detailsArray.length: ", detailsArray.length);

  return (
    <View style={styles.container}>
      {status === "loading" && (
        // <Modal visible={modalVisiblity} animationType="fade" transparent={true}>
        <TouchableOpacity style={[styles.cover, { bottom: 0 }]}></TouchableOpacity>
        // </Modal>
      )}
      {status === "start" && (
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.stateButton, { backgroundColor: "#858585" }]}
        >
          <Text style={{ color: "white" }}>Start</Text>
        </TouchableOpacity>
      )}

      {status === "loading" && (
        <TouchableOpacity onPress={update} style={[styles.stateButton, { backgroundColor: "red" }]}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      )}
      {status === "error" && (
        <>
          <Text style={{ marginBottom: 26 }}>Please Pick images again</Text>

          <TouchableOpacity
            onPress={update}
            style={[styles.stateButton, { backgroundColor: "yellow" }]}
          >
            <Text>Error</Text>
          </TouchableOpacity>
        </>
      )}
      {(status === "successful" || status === "max") && (
        <>
          <Text style={{ marginBottom: 26 }}>Successful</Text>
          <Text style={{ marginBottom: 26 }}>
            {status === "max" && "Max Compresstion is lower than chosen maximum size"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate("save");
              update();
            }}
            style={[styles.stateButton, { backgroundColor: "green" }]}
          >
            <Text>Save</Text>
          </TouchableOpacity>
          {/* <Text>Please Pick images again</Text> */}
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
    // backgroundColor: "red",
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
    zIndex: 10,
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
