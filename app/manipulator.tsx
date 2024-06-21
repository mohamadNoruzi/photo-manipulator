import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { SaveFormat } from "expo-image-manipulator";
import { useImageStore, useSliderStore, useFormatStore } from "@/state/store";
import { SafeAreaView } from "react-native-safe-area-context";
import MySlider from "@/components/MySlider";
import MyButton from "@/components/MyButton";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SharedValue,
  FlipInEasyX,
  FadeInDown,
  SlideInDown,
} from "react-native-reanimated";
import useCompress from "@/hooks/useCompress";

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
    constRatio,
  } = useImageStore();
  const { qualityValue, changeValue } = useSliderStore();
  const { format, setFormat } = useFormatStore();
  const { compressImage } = useCompress();
  const Width = useSharedValue(0);
  const Height = useSharedValue(0);
  const jpegtBackgroundColor = useSharedValue("#393E46");
  const pngBackgroundColor = useSharedValue("#393E46");
  const webpBackgroundColor = useSharedValue("#393E46");

  const stylesArray = {
    jpeg: jpegtBackgroundColor,
    png: pngBackgroundColor,
    webp: webpBackgroundColor,
  };

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

  const handleFormatStyle = (format: string) => {
    if (`${stylesArray}.${format} = "#00ADB5"`) {
      `${stylesArray}.${format} = "#393E46"`;
    } else {
      `${stylesArray}.${format} = "#00ADB5"`;
    }
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

  const handleFormat = (key: any) => {
    setFormat(key);
    addImageUri(orginalUri);
  };

  const measureRatio = (iW: any, iH: any) => {
    if (imageRatio[0] == 0) {
      console.log("measureRatio00", iH, iW);
    }
    console.log("imageRatio", imageRatio);

    console.log("measureRatio1", iH, iW);
    if (iW >= iH) {
      Width.value = imageRatio[1];
      Height.value = (iH / iW) * imageRatio[1];
      console.log("measureRatio", Height, Width);
    } else {
      Height.value = imageRatio[0];
      Width.value = (iW / iH) * imageRatio[0];
      console.log("measureRatio", Height, Width);
    }
  };

  const onLayout = (event: any) => {
    setImageRatio(
      event.nativeEvent.layout.height,
      event.nativeEvent.layout.width
    );
    console.log("constRatioOnLay", constRatio);
    console.log("onLayout", event.nativeEvent.layout.height);
  };

  let importRemoveButton = imageUri ? "Remove Image" : "Import Image";
  console.log("imageuri", imageUri);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View style={styles.sectionOne} onLayout={onLayout}>
        <TouchableOpacity>
          {imageUri ? (
            <>
              <Animated.Image
                source={{ uri: imageUri }}
                style={[animatedStyle, styles.image]}
              />
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
              addImageUri(orginalUri), changeValue(1);
            }}
          >
            <Ionicons name="refresh-outline" size={22} />
            <Text style={{ fontSize: 18 }}>Quality: {qualityValue}</Text>
          </TouchableOpacity>
          {/* Slider  */}
          <MySlider />
        </View>
        {/* Format section */}
        <View style={styles.format}>
          <MyButton
            Bstyle={[
              styles.formatButton,
              { backgroundColor: jpegtBackgroundColor.value },
            ]}
            Tstyle={styles.formatText}
            title="JPEG"
            onPress={() => {
              handleFormat("jpeg"), handleFormatStyle("jpeg");
            }}
          />
          <MyButton
            Bstyle={[
              styles.formatButton,
              { backgroundColor: pngBackgroundColor.value },
            ]}
            Tstyle={styles.formatText}
            title="PNG"
            onPress={() => {
              handleFormat("png"), handleFormatStyle("png");
            }}
          />
          <MyButton
            Bstyle={[
              styles.formatButton,
              { backgroundColor: webpBackgroundColor.value },
            ]}
            Tstyle={styles.formatText}
            title="WEBP"
            onPress={() => {
              handleFormat("webp"), handleFormatStyle("webp");
            }}
          />
        </View>
        <View style={styles.imageSize}>
          <Text style={{ fontSize: 16 }}>
            {(imageSize / 1000).toFixed(1)} KB
          </Text>
        </View>
        {/* Remove button */}

        <MyButton
          Bstyle={[
            styles.removeButton,
            { backgroundColor: imageUri ? "red" : "#00ADB5" },
          ]}
          Tstyle={styles.removeButtonText}
          onPress={() => {
            imageUri ? removeImageUri() : pickImage();
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
    marginHorizontal: 12,
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: "#00ADB5",
    borderRadius: 10,
    height: 50,
  },
  removeButtonText: {
    color: "white",
  },
});
export default manupolate;
