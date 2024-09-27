import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import MyButton from "@/components/MyButton";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { useImagesDetail, imageDetail } from "@/state/storeMulti";
import StartMultiChanges from "@/components/StartMultiChanges";
import { SaveFormat } from "expo-image-manipulator";

const multimanipulator = () => {
  const [maxQuality, setMaxQuality] = useState<string>();
  const [selectedFormat, setSelectedFormat] = useState<string>();
  const {
    detailsArray,
    MaxQualitySize,
    format,
    compressDetailArray,
    setImagesDetail,
    removeImagesDetail,
    setMaxQualitySize,
    setFormat,
  } = useImagesDetail();

  const formatData = [
    { value: SaveFormat.JPEG },
    { value: SaveFormat.PNG },
    { value: SaveFormat.WEBP },
  ];

  const handleRemoveMaxQuality = () => {
    setMaxQualitySize(0);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      result?.assets.map(async (asset) => {
        let imagesDetail: imageDetail = {
          name: asset.fileName,
          format: asset.mimeType?.slice(6),
          height: asset.height,
          width: asset.width,
          uri: asset.uri,
        };
        setImagesDetail(imagesDetail);
      });
    }
  };

  const handlePickImage = () => {
    removeImagesDetail();
    pickImage();
  };

  return (
    <View style={styles.container}>
      {/* import  */}
      <View style={styles.import}>
        <MyButton
          title="Import Images"
          Bstyle={styles.importImage}
          Tstyle={styles.importImageText}
          onPress={handlePickImage}
        />
      </View>
      {/* quality */}
      <View style={styles.quality}>
        <View style={styles.methodOne}>
          <View style={styles.qualityText}>
            <Text style={{ fontSize: 16 }}>Determain Maximum Size For All Images</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TextInput
              value={MaxQualitySize === 0 ? "" : String(MaxQualitySize)}
              onChangeText={(val) => setMaxQualitySize(Number(val))}
              style={styles.MaxQualityInput}
              placeholder="Like 250"
              keyboardType="numeric"
            />
            <View style={styles.KB}>
              <Text>KB</Text>
            </View>
            <TouchableOpacity style={styles.removeQuality} onPress={handleRemoveMaxQuality}>
              <Ionicons name="close-outline" size={16} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.qualityAlarm}></View>
      </View>
      {/* Format */}
      <View style={styles.format}>
        <SelectList
          setSelected={(val: string) => setFormat(val)}
          data={formatData}
          save="value"
          placeholder="Select Format"
          boxStyles={styles.boxStyles}
          dropdownStyles={{ backgroundColor: "#c5c5c5", height: 130 }}
          searchPlaceholder=""
        />
      </View>
      {/* save */}
      <View style={styles.save}>
        <StartMultiChanges />
      </View>
    </View>
  );
};

export default multimanipulator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  import: {
    flex: 1,
    justifyContent: "center",
  },
  importImage: {
    width: "auto",
    marginHorizontal: 42,
    marginTop: 0,
    backgroundColor: "#00ADB5",
    borderRadius: 10,
    height: 50,
    elevation: 2,
  },
  importImageText: {
    color: "white",
  },
  quality: {
    flex: 1,
    // backgroundColor: "yellow",
  },
  qualityText: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 42,
    marginVertical: 12,
    marginBottom: 24,
  },
  MaxQualityInput: {
    width: "40%",
    height: 50,
    backgroundColor: "#eaeaea",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    paddingLeft: 20,
    elevation: 2,
  },
  KB: {
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    height: 50,
    backgroundColor: "#c5c5c5",
    elevation: 2,
  },
  removeQuality: {
    width: "10%",
    height: 50,
    backgroundColor: "#858585",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  methodOne: {},
  methodTwo: {},
  qualityAlarm: {},
  format: {
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
  },
  boxStyles: {
    width: "60%",
    backgroundColor: "#eaeaea",
    height: 50,
    borderRadius: 25,
    elevation: 2,
    borderWidth: 0,
    alignItems: "center",
  },
  save: {
    flex: 1,
    // backgroundColor: "blue",
  },
});
