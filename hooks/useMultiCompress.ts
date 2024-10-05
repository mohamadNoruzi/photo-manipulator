import { manipulateAsync } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { useImagesDetail } from "@/state/storeMulti";
import { useRef } from "react";

const useMultiCompress = (callback: any) => {
  const { detailsArray, format, MaxQualitySize, setCompressDetailArray } = useImagesDetail();

  type dataRef = {
    name: string;
    size: number;
    quality: number;
    index: number;
  };
  const dataRef = useRef<dataRef[]>([]);
  const endedCounter: any = useRef(0);

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

    try {
      if (dataRef.current[index].quality === 0) {
        endedCounter.current += 1;
        setTimeout(() => {
          callback("max");
        }, 7000);
        return;
      } else {
        manipulateAsync(
          item.uri,
          [], // adjust width as needed
          { compress: dataRef.current[index].quality / 10, format: format || "jpeg" }
        )
          .then((response) => FileSystem.getInfoAsync(response.uri))
          .catch((err) => {
            // console.log("File Error: ", err);
            err && callback("error");
          })
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
            if (dataRef.current[index].quality !== 0) {
              dataRef.current[index].quality = dataRef.current[index].quality - 1;
            }

            if (size > MaxQualitySize * 1000) {
              if (format === "png") {
                endedCounter.current += 1;
                callback();
                return;
              } else {
                compressImages(item, index);
              }
            } else {
              endedCounter.current += 1;

              callback();
              return;
            }
          });
      }
    } catch (err) {
      // console.log("!!Error: ", err);
    }
  };

  return { compressImages, dataRef, endedCounter };
};
export default useMultiCompress;
