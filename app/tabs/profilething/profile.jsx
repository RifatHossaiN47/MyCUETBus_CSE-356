import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { auth } from "../../../firebase.config";
import { deleteUser, onAuthStateChanged, signOut } from "firebase/auth";
import { router } from "expo-router";

const profile = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/signIN"); // Redirect to sign-in page if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const deleteacc = async () => {
    const user = auth.currentUser;

    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              router.replace("/signIN");
              await deleteUser(user);

              await signOut(auth);

              Alert.alert(
                "Account Deleted",
                "Your account has been successfully deleted."
              );
            } catch (error) {
              if (error.code === "auth/requires-recent-login") {
                Alert.alert(
                  "Session Expired",
                  "Please log in again to delete your account."
                );
              } else {
                Alert.alert("Error", error.message);
              }
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View className="flex-1 justify-start items-center text-center mt-16">
      <Entypo
        name="info-with-circle"
        size={120}
        color="black"
        className=" mb-5"
      />
      <Text className="text-black text-2xl font-bold  p-2 px-3 m-3 mb-1">
        Name: {auth.currentUser.displayName}
      </Text>
      <Text className="text-black text-xl font-bold  p-2 px-3 m-2 mt-1 mb-4">
        CUET Mail: {auth.currentUser.email}
      </Text>
      <View className="flex-1 items-center justify-end mb-5 w-4/5">
        <TouchableOpacity
          className="flex-row items-center justify-center bg-red-600 w-4/5 rounded-lg p-2"
          onPress={() => deleteacc()}
        >
          <Text className="text-white font-bold">Delete your Account </Text>
          <AntDesign name="meh" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profile;
