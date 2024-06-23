import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getLocales } from "expo-localization";
import i18n from "@/constants/LocalLang";
import { Link, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import { useSliderStore } from "@/state/store";

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? "en";
// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

const Page = () => {
  const [language, setLanguage] = useState("");
  const { changeQualityValue } = useSliderStore();

  language ? (i18n.locale = language) : null;

  const handleLan = () => {
    if (language == "en" || language == "") {
      setLanguage("fa");
    } else {
      setLanguage("en");
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.sectionOne}>
        <TouchableOpacity onPress={handleLan}>
          <Text>Simply resize or change format your image</Text>
          {/* <Text>{i18n.t("welcome")}</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.sectionTwo}>
        <Link href={"/manipulator"} style={styles.buttonContainer} asChild>
          <TouchableOpacity
            style={styles.button}
            onPress={() => changeQualityValue(1)}
          >
            <Text style={styles.buttonText}>Import</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.sectionThree}>
        <Text>index</Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
  sectionOne: {
    flex: 2,
    backgroundColor: Colors.plateThree.lgrey,
    justifyContent: "center",
    alignContent: "center",
    padding: 12,
  },
  sectionTwo: {
    flex: 2,
    backgroundColor: Colors.plateThree.lgrey,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {},
  button: {
    height: 100,
    width: Dimensions.get("window").width - 100,
    padding: 24,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  sectionThree: {
    flex: 1,
    backgroundColor: Colors.plateThree.lgrey,
  },
});

export default Page;
