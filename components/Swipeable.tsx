import { Ionicons } from "@expo/vector-icons";
import React, { Component, PropsWithChildren } from "react";
import { Animated, StyleSheet, I18nManager, View } from "react-native";
import { RectButton, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default class GmailStyleSwipeableRow extends Component<
  PropsWithChildren<unknown & { onDelete: () => void }>
> {
  private renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        {/* Change it to some icons */}
        <Ionicons name="trash-outline" size={36} color="white" style={{ marginRight: 18 }} />
      </RectButton>
    );
  };

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
    this.props.onDelete();
  };
  render() {
    const { children } = this.props;
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Swipeable
          ref={this.updateRef}
          friction={2}
          leftThreshold={80}
          enableTrackpadTwoFingerGesture
          rightThreshold={40}
          renderRightActions={this.renderRightActions}
        >
          {children}
        </Swipeable>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end",
  },
});
