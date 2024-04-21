import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import calls from "@/assets/data/calls.json";
import { format } from "date-fns";
import { SegmentedControl } from "@/components/SegmentedControl";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SwipeableRow from "@/components/SwipeableRow";
import * as Haptics from "expo-haptics";

const transition = CurvedTransition.delay(100);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Calls = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOptions, setSelectedOptions] = useState("All");
  const editing = useSharedValue(-30);

  const onEdit = () => {
    let newEditing = !isEditing;
    editing.value = newEditing ? 0 : -30;
    setIsEditing(newEditing);
  };

  useEffect(() => {
    if (selectedOptions === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((item) => item.missed));
    }
  }, [selectedOptions]);

  const removeCall = (itemId: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems(items.filter((item) => item.id !== itemId));
  };

  const animatiedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: () =>
            Platform.OS === "ios" ? (
              <SegmentedControl
                options={["All", "Missed"]}
                selectedOption={selectedOptions}
                onOptionPress={setSelectedOptions}
              />
            ) : null,
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ fontSize: 18, color: Colors.primary }}>
                {isEditing ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 18,
            fontWeight: "500",
            marginTop: 10,
          }}
        >
          Recents
        </Text>
        <Animated.View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 14,
            marginTop: 10,
          }}
          // layout={transition}
        >
          <Animated.FlatList
            data={items}
            scrollEnabled={false}
            itemLayoutAnimation={transition}
            // skipEnteringExitingAnimations
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item, index }) => (
              <SwipeableRow onDelete={() => removeCall(item.id)}>
                <Animated.View
                  style={{ flexDirection: "row", alignItems: "center" }}
                  entering={FadeInUp.delay(index * 10)}
                  exiting={FadeOutUp}
                >
                  <AnimatedTouchableOpacity
                    onPress={() => removeCall(item.id)}
                    style={[animatiedRowStyles, { paddingLeft: 8 }]}
                  >
                    <Ionicons
                      name="remove-circle"
                      size={24}
                      color={Colors.red}
                    />
                  </AnimatedTouchableOpacity>

                  <Animated.View
                    style={[
                      defaultStyles.item,
                      animatiedRowStyles,
                      { paddingLeft: 10 },
                    ]}
                  >
                    <Image source={{ uri: item.img }} style={styles.avatar} />

                    <View style={{ flex: 1, gap: 2 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: item.missed ? Colors.red : "#000",
                        }}
                      >
                        {item.name}
                      </Text>

                      <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons
                          name={item.video ? "videocam" : "call"}
                          size={16}
                          color={Colors.gray}
                        />
                        <Text style={{ color: Colors.gray, flex: 1 }}>
                          {item.incoming ? "Incoming" : "Outgoing"}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Text style={{ color: Colors.gray }}>
                        {format(item.date, "MM.dd.yy")}
                      </Text>
                      <Ionicons
                        name="information-circle-outline"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                  </Animated.View>
                </Animated.View>
              </SwipeableRow>
            )}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Calls;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
