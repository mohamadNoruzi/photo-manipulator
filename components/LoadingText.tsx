import { memo } from "react";
import { StyleSheet, View, Text } from "react-native";

const LoadingAnimation = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.title}>Processing </Text>
        <View style={styles.ball} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: 100,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  ball: {
    width: 40,
    zIndex: 10,
    height: 40,
    backgroundColor: "#ff5582",
    borderRadius: 20,
  },
  titleText: {
    flexDirection: "row",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",

    color: "#ff5582",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default memo(LoadingAnimation);
