import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "nativewind";
import { useRouter } from "expo-router";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

// Validation Schema using Yup
const addNoticeSchema = yup.object().shape({
  date: yup
    .string()
    .required("Date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),
  notice: yup.string().required("Notice is required"),
});

const AddNotice = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addNoticeSchema),
  });

  // Handle Form Submission
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "notices"), {
        date: data.date,
        notice: data.notice,
      });
      Alert.alert("Success!", `Notice added with ID: ${docRef.id}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center p-5">
      <View className="flex-1 justify-center items-center bg-blue-900 max-h-32 mb-10 border border-4">
        <Text className="text-5xl font-bold text-center text-white w-4/5">
          ADD NOTICE
        </Text>
      </View>

      {/* Date Field */}
      <Text className="text-lg mb-2">Date (YYYY-MM-DD):</Text>
      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`border p-3 rounded-md mb-2 ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="2025-01-13"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.date && (
        <Text className="text-red-500 mb-2">{errors.date.message}</Text>
      )}

      {/* Notice Field */}
      <Text className="text-lg mb-2">Notice:</Text>
      <Controller
        name="notice"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`border p-3 rounded-md mb-2 ${
              errors.notice ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your notice"
            multiline
            numberOfLines={4}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.notice && (
        <Text className="text-red-500 mb-2">{errors.notice.message}</Text>
      )}

      {/* Add Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-500 p-3 rounded-md mt-3"
      >
        <Text className="text-white text-center text-lg">Add Notice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNotice;
