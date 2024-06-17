import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useImageStore, useSliderStore, useFormatStore } from "@/state/store";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library";
import MySlider from "@/components/MySlider";
import MyButton from "@/components/MyButton";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

const manupolate = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [ratio, setRatio] = useState([0, 0]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const {
    addImageUri,
    addSize,
    removeImageUri,
    setImageRatio,
    imageUri,
    imageSize,
    orginalUri,
    imageRatio,
    constRatio,
  } = useImageStore();
  const { qualityValue, changeValue } = useSliderStore();
  const { format, setFormat } = useFormatStore();
  const Width = useSharedValue(0);
  const Height = useSharedValue(0);

  // useLayoutEffect(() => {}, []);

  useLayoutEffect(() => {
    if (imageUri) {
      compressImage();
    }
  }, [qualityValue, format]);

  // useEffect(() => {
  //   if (!imageUri) {
  //     pickImage();
  //   } else {
  //     compressImage();
  //   }
  // }, [qualityValue, format]);

  useEffect(() => {
    if (imageRatio[0] > 0 && imageRatio[1] > 0) {
      console.log("useEffectCall", imageRatio[0]);
      measureRatio(imageRatio[0], imageRatio[1]);
    }
  }, [imageRatio]);

  // useEffect(() => {
  //   measureRatio(imageRatio[0], imageRatio[1]);
  // }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: Width.value,
      height: Height.value,
    };
  });

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
    removeImageUri();
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
      const uri = result?.assets[0]?.uri;
      const width = result?.assets[0]?.width;
      const height = result?.assets[0]?.height;
      addImageUri(uri);
      measureRatio(width, height);
      console.log("pickImage", width);
      const fileInfo = await FileSystem.getInfoAsync(uri);
      setFormat(result?.assets[0]?.mimeType?.slice(6));
      addSize(fileInfo?.size);
      changeValue(1);
    }
  };

  const compressImage = async () => {
    if (!imageUri) return;
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

  const measureRatio = (iW: any, iH: any) => {
    if (imageRatio[0] == 0) {
      console.log("measureRatio00", iH, iW);
      // forceUpdate();
    }
    console.log("imageRatio", imageRatio);

    console.log("measureRatio1", iH, iW);
    if (iW >= iH) {
      Width.value = imageRatio[1];
      Height.value = (iH / iW) * imageRatio[1];
      console.log("measureRatio", Height, Width);
    } else {
      Height.value = constRatio[0];
      Width.value = (iW / iH) * imageRatio[0];
      console.log("measureRatio", Height, Width);
    }
  };

  const onLayout = (event: any) => {
    let h = event.nativeEvent.layout.height;
    let w = event.nativeEvent.layout.width;
    setImageRatio(
      event.nativeEvent.layout.height,
      event.nativeEvent.layout.width
    );

    // handleRatioChange(h, w);
    // setImageRatio(h, w);
    console.log("constRatioOnLay", constRatio);
    console.log("onLayout", event.nativeEvent.layout.height);
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <View style={styles.sectionOne} onLayout={onLayout}>
        <TouchableOpacity onPress={pickImage}>
          <Text>click</Text>
          {imageUri ? (
            <>
              <Animated.Image
                source={{ uri: imageUri }}
                style={[animatedStyle, styles.image]}
              />
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
  sectionOne: {
    flex: 3,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: undefined,
    height: undefined,
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
