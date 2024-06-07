import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const CustomHeader = () => {
  const [status, setStatus] = useState(false);

  const paddingLeft = useSharedValue(0);
  const backgroundColor = useSharedValue("grey");

  const animatedStyle = useAnimatedStyle(() => {
    console.log("backgroundColor", backgroundColor.value);
    return {
      paddingLeft: paddingLeft.value,
    };
  });

  const moveToggle = () => {
    let padding = status ? 0 : 50;
    let color = status ? "grey" : "transparent";
    paddingLeft.value = withDelay(0.1, withTiming(padding, { duration: 500 }));
    backgroundColor.value = withDelay(
      0.1,
      withTiming(color, { duration: 500 })
    );
    setStatus(!status);
  };

  let circleText = status ? "فا" : "En";

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.toggleBox}>
          <TouchableOpacity onPress={moveToggle} activeOpacity={1}>
            {status ? (
              <ImageBackground
                source={require("../assets/images/toggle.jpg")}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
                <Animated.View style={[styles.layer, animatedStyle]}>
                  <View style={styles.circle}>
                    <Animated.Text
                      style={styles.Text}
                      entering={FadeIn.duration(1000).delay(100)}
                    >
                      {circleText}
                    </Animated.Text>
                  </View>
                </Animated.View>
              </ImageBackground>
            ) : (
              <Animated.View style={{ backgroundColor: backgroundColor }}>
                <Animated.View style={[styles.layer, animatedStyle]}>
                  <View style={styles.circle}>
                    <Animated.Text
                      style={styles.Text}
                      entering={FadeIn.duration(1000).delay(100)}
                    >
                      {circleText}
                    </Animated.Text>
                  </View>
                </Animated.View>
              </Animated.View>
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
    borderWidth: 0.2,
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
    backgroundColor: "white",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CustomHeader;
