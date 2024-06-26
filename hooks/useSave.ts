import { useImageStore } from "@/state/store";
import * as MediaLibrary from "expo-media-library";

export default function useSave() {
  const { imageUri } = useImageStore();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (imageUri) {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      const album = await MediaLibrary.getAlbumAsync("Pictures");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Pictures", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    }
  }
  return { getAlbums };
}
