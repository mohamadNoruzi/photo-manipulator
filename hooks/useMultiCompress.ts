import { manipulateAsync } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { useImagesDetail } from "@/state/storeMulti";
import { useRef, useState } from "react";

const useMultiCompress = (callback: any) => {
  const {
    detailsArray,
    format,
    qualityNumberParameters,
    MaxQualitySize,
    compressDetailArray,
    setCompressDetailArray,
  } = useImagesDetail();
  // const RefSize = useRef(100000000);
  // const QualityRef = useRef(10);

  type dataRef = {
    name: string;
    size: number;
    quality: number;
    index: number;
  };
  const dataRef = useRef<dataRef[]>([]);

  const initData = (name: string, index: number) => {
    const isExist = dataRef.current
      .map((entry) => {
        if (entry.name === name) {
          return true;
        }
      })
      .some((each) => each === true);
    isExist ? null : dataRef.current.push({ name: name, size: 1000000000, quality: 10, index });
  };

  const removeData = () => {};

  const compressImages = async (item: any, index: any) => {
    if (detailsArray.length === 0) return;
    initData(item.name, index);
    console.log("name: ", dataRef.current);

    if (
      dataRef.current[index].size <= MaxQualitySize * 1000 &&
      dataRef.current[index].quality === 9
    ) {
      return;
    } else {
      manipulateAsync(
        item.uri,
        [], // adjust width as needed
        { compress: dataRef.current[index].quality / 10, format: format }
      )
        .then((response) => FileSystem.getInfoAsync(response.uri))
        .then((response) => {
          setCompressDetailArray({
            index: index,
            uri: response.uri,
            size: response.size,
            isLowerThanMax: false,
          });
          return response.size;
        })
        .then((size) => {
          dataRef.current[index].size = size;
          if (dataRef.current[index].quality !== 1) {
            dataRef.current[index].quality = dataRef.current[index].quality - 1;
          }
          // console.log("QualityRef.current: ", QualityRef.current / 10);
          if (size > MaxQualitySize * 1000) {
            // console.log("size", size);
            compressImages(item, index);
          }
        });
    }
    if (dataRef.current[index].size <= MaxQualitySize * 1000) {
      dataRef.current[index].size = 10000000;
      dataRef.current[index].quality = 10;
      // console.log("Updated compressDetailArray innerCompress: ", compressDetailArray);
      callback();
      return;
    }
  };

  return compressImages;
};

export default useMultiCompress;
