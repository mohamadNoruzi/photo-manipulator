import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import useImageStore from "@/state/image";

const manupolate = () => {
  const { addImageUri, addSize, removeImageUri, imageUri, imageSize } =
    useImageStore();

  useEffect(() => {
    if (!imageUri) {
      pickImage();
    }
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // quality: 1,
    });

    if (!result.canceled) {
      addImageUri(result?.assets[0]?.uri);
      const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      addSize(fileInfo?.size);
      console.log("fileInfo.size", fileInfo.size);
      // console.log("imag", imageUri);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Text>Image</Text>
        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Text>{imageSize}</Text>
          </>
        ) : null}
      </TouchableOpacity>
      <Button onPress={() => removeImageUri()} title="Remove" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
export default manupolate;
