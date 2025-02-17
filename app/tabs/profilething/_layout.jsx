import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Button } from "react-native-web";

const _layout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "green",
        },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
        headerTileAlign: "center",
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen name="editprofile" options={{ title: "Edit Profile" }} />
    </Stack>
  );
};

export default _layout;
