import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import useImageStore from "@/state/image";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import MyButton from "@/components/MyButton";

const manupolate = () => {
  const { addImageUri, addSize, removeImageUri, imageUri, imageSize } =
    useImageStore();

  useLayoutEffect(() => {}, []);

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
      // console.log("imag", imageUri);
    }
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
