import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLargeTitle: Platform.OS === "ios" ? true : false,
          headerShadowVisible: false,
          headerBlurEffect: "regular",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
