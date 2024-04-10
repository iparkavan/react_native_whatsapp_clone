import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import calls from "@/assets/data/calls.json";
import { format } from "date-fns";

const Calls = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);

  const onEdit = () => {
    // let newEditing = !isEditing
    setIsEditing(!isEditing);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
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
        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <View style={[defaultStyles.item]}>
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
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
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
              </View>
            )}
          />
        </View>
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
