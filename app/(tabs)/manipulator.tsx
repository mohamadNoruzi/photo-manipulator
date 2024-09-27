import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import {
  useImageStore,
  useSliderStore,
  useFormatStore,
  useLanguageStore,
} from "@/state/storeSingle";
import { SafeAreaView } from "react-native-safe-area-context";
import MySlider from "@/components/MySlider";
import MyButton from "@/components/MyButton";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, SlideInDown } from "react-native-reanimated";
import useCompress from "@/hooks/useCompress";
import i18n from "@/constants/LocalLang";

const manupolate = () => {
  const {
    addImageUri,
    addSize,
    removeImageUri,
    setImageRatio,
    imageUri,
    imageSize,
    orginalUri,
    imageRatio,
  } = useImageStore();
  const { qualityValue, changeQualityValue } = useSliderStore();
  const { format, setFormat } = useFormatStore();
  const [animatedIndex, setAnimatedIndex] = useState("");
  const { compressImage } = useCompress();
  const Width = useSharedValue(0);
  const Height = useSharedValue(0);
  const { lan } = useLanguageStore();

  useLayoutEffect(() => {
    if (imageUri) {
      compressImage();
    }
  }, [qualityValue, format]);

  useEffect(() => {
    if (imageRatio[0] > 0 && imageRatio[1] > 0) {
      measureRatio(imageRatio[0], imageRatio[1]);
    }
  }, [imageRatio, orginalUri]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: Width.value,
      height: Height.value,
    };
  });

  const handleFormatStyle = (format: "jpeg" | "png" | "webp") => {
    setAnimatedIndex((prev) => {
      if (prev === format) {
        return "";
      }
      if (prev !== format) {
        return format;
      } else {
        return format;
      }
    });
  };

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
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const uri = result?.assets[0]?.uri;
      const width = result?.assets[0]?.width;
      const height = result?.assets[0]?.height;
      addImageUri(uri);
      measureRatio(width, height);

      const fileInfo: any = await FileSystem.getInfoAsync(uri);
      setFormat(result?.assets[0]?.mimeType?.slice(6));
      addSize(fileInfo?.size);
      changeQualityValue(1);
    }
  };

  const handleFormat = (key: any) => {
    setFormat(key);
    addImageUri(orginalUri);
    compressImage();
  };

  const measureRatio = (iW: any, iH: any) => {
    if (imageRatio[0] == 0) {
    }

    if (iW >= iH) {
      Width.value = imageRatio[1];
      Height.value = (iH / iW) * imageRatio[1];
    } else {
      Height.value = imageRatio[0];
      Width.value = (iW / iH) * imageRatio[0];
    }
  };

  const onLayout = (event: any) => {
    setImageRatio(event.nativeEvent.layout.height, event.nativeEvent.layout.width);
  };

  let importRemoveButton = imageUri ? i18n.t("removeImage") : i18n.t("importImage");

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View style={styles.sectionOne} onLayout={onLayout}>
        <TouchableOpacity>
          {imageUri ? (
            <>
              <Animated.Image source={{ uri: imageUri }} style={[animatedStyle, styles.image]} />
            </>
          ) : null}
        </TouchableOpacity>
      </View>
      <Animated.View entering={SlideInDown.delay(20)} style={styles.sectionTwo}>
        {/* Quality  */}
        <View>
          <TouchableOpacity
            activeOpacity={0.1}
            style={styles.qualityText}
            onPress={() => {
              addImageUri(orginalUri), changeQualityValue(1);
            }}
          >
            <Ionicons name="refresh-outline" size={22} />
            <Text style={{ fontSize: 18 }}>
              {i18n.t("quality")}: {qualityValue}
            </Text>
          </TouchableOpacity>
          {/* Slider  */}
          <MySlider />
        </View>
        {/* Format section */}
        <View style={styles.format}>
          <MyButton
            Bstyle={
              animatedIndex === "jpeg"
                ? [styles.formatButton, { backgroundColor: "#00ADB5" }]
                : [styles.formatButton]
            }
            Tstyle={styles.formatText}
            title="JPEG"
            onPress={() => {
              handleFormat("jpeg"), handleFormatStyle("jpeg");
            }}
          />
          <MyButton
            Bstyle={
              animatedIndex === "png"
                ? [styles.formatButton, { backgroundColor: "#00ADB5" }]
                : [styles.formatButton]
            }
            Tstyle={styles.formatText}
            title="PNG"
            onPress={() => {
              handleFormat("png"), handleFormatStyle("png");
            }}
          />
          <MyButton
            Bstyle={
              animatedIndex === "webp"
                ? [styles.formatButton, { backgroundColor: "#00ADB5" }]
                : [styles.formatButton]
            }
            Tstyle={styles.formatText}
            title="WEBP"
            onPress={() => {
              handleFormat("webp"), handleFormatStyle("webp");
            }}
          />
        </View>
        <View style={styles.imageSize}>
          <Text style={{ fontSize: 16 }}>{(imageSize / 1000).toFixed(1)} KB</Text>
        </View>
        {/* Remove button */}

        <MyButton
          Bstyle={[styles.removeButton, { backgroundColor: imageUri ? "red" : "#00ADB5" }]}
          Tstyle={styles.removeButtonText}
          onPress={() => {
            imageUri
              ? (removeImageUri(), setAnimatedIndex(""), changeQualityValue(1), setFormat(""))
              : (pickImage(), setFormat(""), setAnimatedIndex(""));
          }}
          title={importRemoveButton}
        ></MyButton>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    elevation: 5,
  },
  sectionOne: {
    flex: 3,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: undefined,
    height: undefined,
  },
  sectionTwo: {
    flex: 2,
    backgroundColor: "#EEEEEE",
    justifyContent: "space-between",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 4,
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
    marginBottom: 10,
    paddingHorizontal: 60,
  },
  formatButton: {
    backgroundColor: "#393E46",
    borderRadius: 30,
    padding: 1,
    width: 60,
    height: 60,
    elevation: 2,
  },
  formatText: {
    color: "#EEEEEE",
  },
  imageSize: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  removeButton: {
    width: "auto",
    marginHorizontal: 42,
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: "#00ADB5",
    borderRadius: 10,
    height: 50,
    elevation: 2,
  },
  removeButtonText: {
    color: "white",
  },
});
export default manupolate;
