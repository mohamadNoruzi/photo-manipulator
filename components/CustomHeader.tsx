import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const CustomHeader = () => {
  const alItems = useSharedValue<"flex-start" | "flex-end" | "center">(
    "flex-start"
  );
  const animatedStyle = useAnimatedStyle(() => {
    return { alignItems: alItems.value };
  });

  const moveToggle = () => {
    alItems.value = withDelay(1, withTiming("flex-end", { duration: 2000 }));
    // alItems.value = "flex-end";
    console.log("alItems", alItems.value);
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
    // paddingLeft: 50,
    alignItems: "flex-start",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "green",
  },
});

export default CustomHeader;
