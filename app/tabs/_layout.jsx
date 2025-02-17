import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import {
  Entypo,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { DrawerItemList } from "@react-navigation/drawer";
import { auth } from "../../firebase.config";
import { router, usePathname } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";

const TabLayout = () => {
  const path = usePathname();

  const click = path === "/tabs/profilething/editprofile";

  const handlelogout = async () => {
    try {
      router.replace("/signIN");

      await signOut(auth);

      Alert.alert("Logout", "You have been successfully logged out");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/signIN"); // Redirect to sign-in page if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "green",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        overlayColor: "transparent",
        gestureEnabled: true,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerInactiveBackgroundColor: "white",
        drawerActiveBackgroundColor: "blue",
        drawerInactiveTintColor: "gray",
        drawerActiveTintColor: "white",
        drawerLabelStyle: { fontWeight: "bold" },
        drawerContentStyle: { padding: 10 },
        drawerStyle: { backgroundColor: "white" },
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          {/* Header Section */}
          <View className="flex-1 items-center justify-center">
            <MaterialIcons
              name="security"
              size={94}
              color="black"
              className="m-4"
            />
            <Text className="text-3xl font-bold text-center text-black mb-5">
              {auth.currentUser.displayName}
            </Text>
          </View>
          {/* Default Drawer Items */}
          <DrawerItemList {...props} />

          <View className="flex-1 items-center justify-end">
            <TouchableOpacity
              className=" flex-row justify-center items-center bg-orange-600 p-2 rounded-lg w-3/5 text-center "
              onPress={handlelogout}
            >
              <Text className="text-white mr-1">Logout </Text>
              <MaterialIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
            <Text className="italic text-slate-700">
              Powered by CUET CSE-2004129
            </Text>
          </View>
        </View>
      )}
    >
      <Drawer.Screen
        name="homes"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="notices"
        options={{
          title: "Notices",
          drawerIcon: ({ color, size }) => (
            <Fontisto name="bell-alt" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="addnotice"
        options={{
          title: auth.currentUser.photoURL === "admin" ? "Add Notice" : "", // Title only for admin
          drawerItemStyle:
            auth.currentUser.photoURL === "admin" ? {} : { display: "none" }, // Hide if not admin
          drawerIcon: ({ color, size }) =>
            auth.currentUser.photoURL === "admin" ? (
              <Ionicons name="add-circle" size={size} color={color} />
            ) : null,
        }}
      />

      <Drawer.Screen
        name="schedule"
        options={{
          title: "Schedule",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="schedule" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="trackBus"
        options={{
          title: "Track Bus Location",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6
              name="location-crosshairs"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="shareLocation"
        options={{
          title: "Share Bus Location",
          drawerIcon: ({ color, size }) => (
            <Entypo name="share" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="contactus"
        options={{
          title: "Contact Us",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="contact-support" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="profilething"
        options={{
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity
              className="bg-indigo-700 p-2 mr-4 rounded-lg w-20 text-center"
              onPress={() => {
                router.push("/tabs/profilething/editprofile");
              }}
            >
              <Text className="text-white text-center">Edit</Text>
            </TouchableOpacity>
          ),
          headerShown: !click,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
};

export default TabLayout;
