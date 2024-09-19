import { useFormatStore, useImageStore, useSliderStore } from "@/state/store";
import { manipulateAsync } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export default function useCompress() {
  const { addImageUri, addSize, imageUri, orginalUri } = useImageStore();
  const { qualityValue } = useSliderStore();
  const { format, setFormat } = useFormatStore();

  const compressImage = async () => {
    if (!imageUri) return;
    const manipResult = await manipulateAsync(
      imageUri,
      [], // adjust width as needed
      { compress: qualityValue, format: format }
    );
    const fileInfo: any = await FileSystem.getInfoAsync(manipResult.uri);
    addImageUri(manipResult.uri);
    addSize(fileInfo?.size);
  };

  return { compressImage };
}
