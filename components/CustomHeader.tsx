import {
  ImageBackground,
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

  const paddingLeft = useSharedValue(0);
  const backgroundColor = useSharedValue("white");

  const animatedStyle = useAnimatedStyle(() => {
    console.log("backgroundColor", backgroundColor.value);
    return {
      paddingLeft: paddingLeft.value,
    };
  });

  const moveToggle = () => {
    let padding = status ? 0 : 50;
    let color = status ? "transparent" : "grey";
    paddingLeft.value = withDelay(0.1, withTiming(padding, { duration: 500 }));
    backgroundColor.value = withDelay(
      0.1,
      withTiming(color, { duration: 500 })
    );
    setStatus(!status);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.toggleBox}>
          <TouchableOpacity onPress={moveToggle} activeOpacity={1}>
            {status ? (
              <Animated.View style={{ backgroundColor: backgroundColor }}>
                <Animated.View style={[styles.layer, animatedStyle]}>
                  <View style={styles.circle}></View>
                </Animated.View>
              </Animated.View>
            ) : (
              <ImageBackground
                source={require("../assets/images/toggle.jpg")}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
                <Animated.View style={[styles.layer, animatedStyle]}>
                  <View style={styles.circle}></View>
                </Animated.View>
              </ImageBackground>
            )}
          </TouchableOpacity>
        </View>
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
  toggleBox: {
    width: 90,
    height: 40,
    marginLeft: 30,
    borderRadius: 40,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  layer: {
    paddingLeft: 0,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "green",
  },
});

export default CustomHeader;
