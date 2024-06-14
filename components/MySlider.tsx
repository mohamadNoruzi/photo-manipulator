import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { useSliderStore } from "@/state/store";

type slider = {
  style?: StyleProp<TextStyle>;
  onChange?: () => void;
};

const MySlider = ({ style, onChange }: slider) => {
  const { qualityValue, changeValue } = useSliderStore();

  return (
    <Slider
      style={[styles.slider, style]}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      step={0.1}
      onValueChange={(value) => {
        changeValue(value);
      }}
      value={qualityValue}
    />
  );
};

export default MySlider;

const styles = StyleSheet.create({
  slider: {
    width: "auto",
    height: 80,
    marginHorizontal: 60,
  },
});
