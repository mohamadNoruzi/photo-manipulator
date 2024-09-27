import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import i18n from "@/constants/LocalLang";
import { useLanguageStore } from "@/state/storeSingle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem("stored-language", value);
  } catch (e) {}
};

const getData = async () => {
  const storedLan = await AsyncStorage.getItem("stored-language");
  if (storedLan !== null) {
    return storedLan;
  }
};

const CustomHeader = () => {
  const [status, setStatus] = useState(false);

  useLayoutEffect(() => {
    const fetchStoredLan = async () => {
      const storeLan = await getData();
      if (storeLan == "fa") {
        setStatus(true);
        moveToggle();
      }
    };
    fetchStoredLan();
  }, []);

  const [language, setLanguage] = useState("");
  const { setLan } = useLanguageStore();

  const paddingLeft = useSharedValue(0);
  const backgroundColor = useSharedValue("rgba(0, 0, 0, 1)");
  const TextBackgroundColor = useSharedValue("rgba(0, 0, 0, 1)");

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingLeft: paddingLeft.value,
    };
  });

  const moveToggle = () => {
    let padding = status ? 0 : 50;
    let Bcolor = status ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)";
    TextBackgroundColor.value = "rgba(0, 0, 0, 0)";
    paddingLeft.value = withDelay(0.1, withTiming(padding, { duration: 500 }));
    backgroundColor.value = withDelay(0.1, withTiming(Bcolor, { duration: 500 }));
    TextBackgroundColor.value = withDelay(400, withTiming("rgba(0, 0, 0, 1)", { duration: 400 }));
    setStatus(!status);

    // change language
    if (language == "en" || language == "") {
      setLanguage("fa");
      i18n.locale = "fa";
      setLan("fa");
      storeData("fa");
    } else {
      setLanguage("en");
      i18n.locale = "en";
      setLan("en");
      storeData("en");
    }
  };

  let circleText = status ? "فا" : "En";

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.toggleBox}>
          <TouchableOpacity onPress={moveToggle} activeOpacity={1}>
            <ImageBackground
              source={require("../assets/images/toggle.jpg")}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <Animated.View
                style={[styles.layer, animatedStyle, { backgroundColor: backgroundColor }]}
              >
                <View style={styles.circle}>
                  <Animated.Text style={[styles.Text, { color: TextBackgroundColor }]}>
                    {circleText}
                  </Animated.Text>
                </View>
              </Animated.View>
            </ImageBackground>
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
