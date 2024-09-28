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

  type dataRef = {
    name: string;
    size: number;
    quality: number;
    index: number;
  };
  const dataRef = useRef<dataRef[]>([]);

  const initData = async (name: string, index: number) => {
    const isExist = dataRef.current
      .map((entry) => {
        if (entry.name === name) {
          return true;
        }
      })
      .some((each) => each === true);
    isExist ? null : dataRef.current.push({ name: name, size: 1000000000, quality: 10, index });
  };

  const compressImages = async (item: any, index: any) => {
    if (detailsArray.length === 0) return;

    await initData(item?.name, index);

    console.log("name: ", dataRef.current);

    try {
      if (
        (dataRef.current[index].size <= MaxQualitySize * 1000 &&
          dataRef.current[index].quality === 9) ||
        dataRef.current[index].quality === 1
      ) {
        return;
      } else {
        manipulateAsync(
          item.uri,
          [], // adjust width as needed
          { compress: dataRef.current[index].quality / 10, format: format }
        )
          .then((response) => FileSystem.getInfoAsync(response.uri))
          .catch((err) => console.log("File Error: ", err))
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

            if (size > MaxQualitySize * 1000) {
              console.log("size", size);
              if (format === "png") {
                return;
              } else {
                compressImages(item, index);
              }
            }
          });
      }
      if (dataRef.current[index].size <= MaxQualitySize * 1000) {
        // callback();
        return;
      }
    } catch (err) {
      console.log("!!Error: ", err);
    }
  };

  return { compressImages, dataRef };
};
export default useMultiCompress;
