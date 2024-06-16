import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { useImageStore, useSliderStore, useFormatStore } from "@/state/store";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library";
import MySlider from "@/components/MySlider";
import MyButton from "@/components/MyButton";
import { Ionicons } from "@expo/vector-icons";

const manupolate = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const {
    addImageUri,
    addSize,
    removeImageUri,
    imageUri,
    imageSize,
    orginalUri,
  } = useImageStore();
  const { qualityValue, changeValue, lock, changeLock } = useSliderStore();
  const { format, setFormat } = useFormatStore();
  // const [originUri, setOriginUri] = useState("")
  console.log("uriO", orginalUri);
  console.log("uri", imageUri);

  useEffect(() => {
    // lock ? null : changeLock();
    if (!imageUri) {
      pickImage();
    }
    compressImage();
  }, [qualityValue, format]);

  //save pic
  async function getAlbums() {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    const asset = await MediaLibrary.createAssetAsync(imageUri);
    const album = await MediaLibrary.getAlbumAsync("Download");
    if (album == null) {
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      addImageUri(result?.assets[0]?.uri);
      const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      setFormat(result?.assets[0]?.mimeType?.slice(6));
      addSize(fileInfo?.size);
      changeValue(1);
    }
  };

  const compressImage = async () => {
    console.log("format", format);
    const manipResult = await manipulateAsync(
      imageUri,
      [], // adjust width as needed
      { compress: qualityValue, format: format }
    );
    const fileInfo = await FileSystem.getInfoAsync(manipResult.uri);
    addImageUri(manipResult.uri);
    addSize(fileInfo?.size);
  };

  const handleFormat = (key: any) => {
    setFormat(key);
    addImageUri(orginalUri);
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <View style={styles.sectionOne}>
        <TouchableOpacity onPress={pickImage}>
          <Text>Image</Text>
          {imageUri ? (
            <>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <Text>{imageSize}</Text>
            </>
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={styles.sectionTwo}>
        <View>
          <View style={styles.qualityText}>
            <Ionicons
              name="refresh-outline"
              size={18}
              onPress={() => {
                addImageUri(orginalUri), changeValue(1);
              }}
            />
            <Text>Quality: {qualityValue}</Text>
          </View>
          <MySlider />
        </View>
        <View style={styles.format}>
          <TouchableOpacity onPress={() => handleFormat(SaveFormat.JPEG)}>
            <Text>JPEG</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFormat(SaveFormat.PNG)}>
            <Text>PNG</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFormat(SaveFormat.WEBP)}>
            <Text>WEBP</Text>
          </TouchableOpacity>
        </View>
        <MyButton
          Bstyle={styles.removeButton}
          Tstyle={styles.removeButtonText}
          onPress={() => removeImageUri()}
          title="Remove"
        ></MyButton>
        <MyButton onPress={() => getAlbums()} title="save"></MyButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  sectionOne: {
    flex: 3,
    backgroundColor: "gray",
  },
  sectionTwo: {
    flex: 2,
    backgroundColor: "green",
    justifyContent: "space-between",
  },
  qualityText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  format: {
    flexDirection: "row",
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  removeButton: {
    width: "auto",
    marginHorizontal: 12,
    backgroundColor: "yellow",
    borderRadius: 10,
    height: 40,
  },
  removeButtonText: {
    color: "white",
  },
});
export default manupolate;
