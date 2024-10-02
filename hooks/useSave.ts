import { useImageStore } from "@/state/storeSingle";
import { useImagesDetail } from "@/state/storeMulti";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

export default function useSave() {
  const { imageUri } = useImageStore();
  const { compressDetailArray } = useImagesDetail();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (imageUri) {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      const album = await MediaLibrary.getAlbumAsync("FormatResizer");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("FormatResizer", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    }
  }

  async function getMultiAlbums() {
    if (compressDetailArray) {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      const assets = await Promise.all(
        compressDetailArray.map(async (item) => {
          return await MediaLibrary.createAssetAsync(item.uri);
        })
      );

      let album = await MediaLibrary.getAlbumAsync("FormatResizer");
      if (!album) {
        album = await MediaLibrary.createAlbumAsync("FormatResizer", assets[0], false);
        if (assets.length > 1) {
          await MediaLibrary.addAssetsToAlbumAsync(assets.slice(1), album, false);
        }
      } else {
        await MediaLibrary.addAssetsToAlbumAsync(assets, album, false);
      }
    }
  }

  async function share() {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    await Sharing.shareAsync(imageUri);
  }

  return { getAlbums, getMultiAlbums, share };
}
