import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";

type myType = {
  children?: React.ReactNode;
  title?: string;
  Bstyle?: StyleProp<TextStyle>;
  Tstyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const MyButton = ({ children, title, Bstyle, Tstyle, onPress }: myType) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, Bstyle]}>
      <Text style={[styles.Text, Tstyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 50,
    backgroundColor: "red",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
