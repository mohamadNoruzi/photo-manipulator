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
  };
  const compressImages: any = useMultiCompress(handleUpdate);

  // useEffect(() => {
  //   // let hasBiggerThanMax = compressDetailArray.some((item) => item.isLowerThanMax === false);
  //   // console.log("UseEffect", hasBiggerThanMax);
  //   // if (hasBiggerThanMax) {
  //   //   compressImages();
  //   // }
  //   // console.log("Updated compressDetailArray: ", compressDetailArray);
  //   detailsArray.map((item, index) => {
  //     compressImages(item, index);
  //   });
  // }, [compressDetailArray]);
  // console.log("Updated compressDetailArray: ", compressDetailArray);

  const handlePress = () => {
    removeCompressArray();
    detailsArray.map((item, index) => {
      compressImages(item, index);
    });
    // console.log("handlePressssssssssssss");
    handleUpdate();
    compressImages().then(() => console.log("compressDetailArray: ", compressDetailArray));
    // console.log("qualityNumberParameters: ", qualityNumberParameters);
    // console.log("endQuality: ", endQuality);

    // while (true) {
    // let hasBiggerThanMax = compressDetailArray.some((item) => item.isLowerThanMax === false);
    //   console.log("A1", hasBiggerThanMax);
    //   if (hasBiggerThanMax) {
    //     setQualityNumberParameters();
    //     console.log("ooooooooooooooooooooooooooooooook: ", qualityNumberParameters);
    //     compressImages();
    //   } else {
    //     console.log("else: ", hasBiggerThanMax);
    //     break;
    //   }
    // }
  };

  // console.log("compress number: ", qualityNumberParameters);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>StartMultiChanges</Text>
    </TouchableOpacity>
  );
};

export default StartMultiChanges;

const styles = StyleSheet.create({});
