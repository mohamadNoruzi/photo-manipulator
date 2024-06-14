import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { useImageStore, useSliderStore } from "@/state/store";
import { SafeAreaView } from "react-native-safe-area-context";
import MySlider from "@/components/MySlider";
import MyButton from "@/components/MyButton";

const manupolate = () => {
  const { addImageUri, addSize, removeImageUri, imageUri, imageSize } =
    useImageStore();
  const { qualityValue, changeValue } = useSliderStore();
  console.log("qualityValue", qualityValue);

  useEffect(() => {
    if (!imageUri) {
      pickImage();
    }
    compressImage();
  }, [qualityValue]);

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
      addSize(fileInfo?.size);
      changeValue(1);
      // console.log("imag", imageUri);
    }
  };

  const compressImage = async () => {
    const manipResult = await manipulateAsync(
      imageUri,
      [], // adjust width as needed
      { compress: qualityValue, format: SaveFormat.JPEG }
    );
    const fileInfo = await FileSystem.getInfoAsync(manipResult.uri);
    addImageUri(manipResult.uri);
    await addSize(fileInfo?.size);
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
          <Text style={styles.qualityText}>Quality: {qualityValue}</Text>
          <MySlider />
        </View>
        <MyButton
          Bstyle={styles.removeButton}
          Tstyle={styles.removeButtonText}
          onPress={() => removeImageUri()}
          title="Remove"
        ></MyButton>
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
  qualityText: {
    textAlign: "center",
    marginTop: 12,
  },
});
export default manupolate;
