import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Calls",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerBlurEffect: "regular",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="call-outline" size={30} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
