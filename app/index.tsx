import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import i18n from "@/constants/LocalLang";
import { Link } from "expo-router";
import { useLanguageStore, useSliderStore } from "@/state/store";

const Page = () => {
  const { changeQualityValue } = useSliderStore();
  const { lan } = useLanguageStore();

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.sectionOne}>
        <View style={{ paddingHorizontal: 12, gap: 30 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {i18n.t("greeting1")}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {i18n.t("greeting2")}
          </Text>
        </View>
      </View>
      <View style={styles.sectionTwo}>
        <Link
          href={{ pathname: "/manipulator" }}
          style={styles.buttonContainer}
          asChild
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => changeQualityValue(1)}
          >
            <Text style={styles.buttonText}>{i18n.t("getStarted")}</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.sectionThree}></View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
  sectionOne: {
    flex: 2,
    backgroundColor: "#F1F0E8",
    justifyContent: "center",
    alignContent: "center",
    padding: 12,
  },
  sectionTwo: {
    flex: 2,
    backgroundColor: "#F1F0E8",
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
    backgroundColor: "#F1F0E8",
  },
});

export default Page;
