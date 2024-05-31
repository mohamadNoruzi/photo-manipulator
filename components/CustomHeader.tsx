import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = () => {
  return (
    <SafeAreaView>
      <View style={{ height: 80 }}>
        <Text>CustomHeader</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CustomHeader;
