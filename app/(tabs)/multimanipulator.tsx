import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MyButton from "@/components/MyButton";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";

const multimanipulator = () => {
  const [maxQuality, setMaxQuality] = useState<string>();
  const [selected, setSelected] = useState<string>();

  const formatData = [{ value: "jpeg" }, { value: "png" }, { value: "webp" }];

  const handleRemoveMaxQuality = () => {
    setMaxQuality("");
  };

  const pickImage = async () => {
    // removeImageUri();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    });
    // console.log(result?.assets[1]);
    if (!result.canceled) {
      result?.assets.map(async (asset, index) => {
        const uri = asset.uri;
        const fileInfo: any = await FileSystem.getInfoAsync(uri);
      });
      const uri = result?.assets[0]?.uri;
      // console.log(result?.assets.length);
      // addImageUri(uri);
      const fileInfo: any = await FileSystem.getInfoAsync(uri);
      // setFormat(result?.assets[0]?.mimeType?.slice(6));
      // addSize(fileInfo?.size);
      // changeQualityValue(1);
    }
  };

  const handlePickImage = () => {
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
              value={maxQuality}
              onChangeText={(val) => setMaxQuality(val)}
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
          setSelected={(val: string) => setSelected(val)}
          data={formatData}
          save="value"
          placeholder="Select Format"
          boxStyles={styles.boxStyles}
          dropdownStyles={{ backgroundColor: "#c5c5c5" }}
          searchPlaceholder=""
        />
      </View>
      {/* save */}
      <View style={styles.save}></View>
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
