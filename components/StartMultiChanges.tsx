import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useMultiCompress from "@/hooks/useMultiCompress";
import { useImagesDetail } from "@/state/storeMulti";

const StartMultiChanges = ({}: any) => {
  const [counter, setCounter] = useState<number>(0);
  const {
    endQuality,
    detailsArray,
    removeCompressArray,
    setQualityNumberParameters,
    compressDetailArray,
  } = useImagesDetail();

  const handleUpdate = () => {
    setCounter((prev) => prev + 1);
    console.log(counter);
    // dataRef.current = [];
    // console.log("dataRef.current counter", dataRef.current);
  };

  const update = () => {
    setCounter((prev) => prev + 1);
    console.log(counter);
    dataRef.current = [];
    console.log("dataRef.current counter", dataRef.current);
  };

  const { compressImages, dataRef }: any = useMultiCompress(handleUpdate);

  const handlePress = () => {
    removeCompressArray();
    detailsArray.map((item, index) => {
      compressImages(item, index);
    });
    handleUpdate();
  };

  console.log("compressDetailArray", compressDetailArray);
  console.log("dataRef: ", dataRef.current);

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Text>StartMultiChanges</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={update}>
        <Text>refresh</Text>
      </TouchableOpacity>
    </>
  );
};

export default StartMultiChanges;

const styles = StyleSheet.create({});
