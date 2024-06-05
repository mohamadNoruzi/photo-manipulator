import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const CustomHeader = () => {
  const [status, setStatus] = useState(false);
  const backgroundColor = useSharedValue("red");
  const paddingLeft = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    console.log("paddingLeft", paddingLeft.value);
    return {
      paddingLeft: paddingLeft.value,
      backgroundColor: backgroundColor.value,
    };
  });

  const moveToggle = () => {
    let padding = status ? 0 : 50;
    paddingLeft.value = withDelay(0.1, withTiming(padding, { duration: 500 }));
    backgroundColor.value = withDelay(
      1,
      withTiming("yellow", { duration: 2000 })
    );
    setStatus(!status);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Animated.View style={[styles.lanTogle, animatedStyle]}>
          <TouchableOpacity onPress={moveToggle}>
            <View style={styles.circle}></View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 80,
    justifyContent: "center",
  },
  lanTogle: {
    width: 90,
    height: 40,
    marginLeft: 30,
    backgroundColor: "red",
    borderRadius: 40,
    paddingLeft: 0,
    // alignItems: "flex-start",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "green",
  },
});

export default CustomHeader;
