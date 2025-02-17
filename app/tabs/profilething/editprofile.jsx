import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { auth } from "../../../firebase.config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { updateProfile, updatePassword } from "firebase/auth";

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const editprofile = () => {
  const [isDisabledn, setIsDisabledn] = useState(false);
  const [isDisabledp, setIsDisabledp] = useState(false);
  const toggleDisablen = () => {
    setIsDisabledn((prev) => !prev);
  };

  const toggleDisablep = () => {
    setIsDisabledp((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    // context: { isDisabledn, isDisabledp },
  });

  const onSubmit = async (data) => {
    try {
      if (data.name) {
        await updateProfile(auth.currentUser, {
          displayName: data.name,
        });
      }

      if (data.password) {
        await updatePassword(auth.currentUser, data.password);
      }
      if (!data.name && !data.password) {
        Alert.alert("No changes made");
      } else {
        Alert.alert("Profile updated successfully");
      }
      reset();
      router.replace("/tabs/profilething/profile");
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
  };

  return (
    <View className="flex-1 bg-white justify-start p-5">
      <View className="flex-1 justify-center items-center bg-blue-900 max-h-32 mt-14 mb-7 border border-4">
        <Text className="text-5xl font-bold text-center    text-white w-4/5">
          Edit Profile
        </Text>
      </View>

      {/* Name Field */}
      <Text className="text-red-500 m-2">
        NOTE: To change only the password, leave the name unchanged. To change
        only the name, provide your current password.
      </Text>
      <Text className="text-lg mb-2">Name:</Text>
      <Controller
        name="name"
        control={control}
        defaultValue={auth.currentUser.displayName}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative mb-6">
            {/* TextInput */}
            <TextInput
              className={`border p-3 pr-16 rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }  ${isDisabledn ? "bg-gray-200" : "bg-white"}`}
              placeholder="Enter new name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={!isDisabledn}
            />
            {/* Disable Button */}
            <TouchableOpacity
              className="absolute right-2 top-2 px-3 py-1 rounded-md"
              onPress={toggleDisablen}
            >
              {isDisabledn ? (
                <MaterialCommunityIcons
                  name="toggle-switch-off-outline"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="toggle-switch-outline"
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.name && (
        <Text className="text-red-500 mb-2">{errors.name.message}</Text>
      )}

      {/* Password Field */}
      <Text className="text-lg mb-2">New Password:</Text>
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative mb-6">
            {/* TextInput */}
            <TextInput
              className={`border p-3 pr-16 rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }  ${isDisabledp ? "bg-gray-200" : "bg-white"}`}
              placeholder="Enter new password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={!isDisabledp}
            />
            {/* Disable Button */}
            <TouchableOpacity
              className="absolute right-2 top-2 px-3 py-1 rounded-md"
              onPress={toggleDisablep}
            >
              {isDisabledp ? (
                <MaterialCommunityIcons
                  name="toggle-switch-off-outline"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="toggle-switch-outline"
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && (
        <Text className="text-red-500 mb-2">{errors.password.message}</Text>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-500 p-3 rounded-md mt-5"
      >
        <Text className="text-white text-center text-lg">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default editprofile;
