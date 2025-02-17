import { Image, Text, View } from "react-native";
import React from "react";
const Profilecard = ({ image, name, id }) => {
  const images = {
    rifathossain: require("../assets/images/developers/rifathossain.jpg"),
    sahel: require("../assets/images/developers/sahel.jpg"),
    dipto: require("../assets/images/developers/dipto.jpg"),
  };

  return (
    <View className=" bg-blue-500 flex-1 justify-center items-center rounded-lg p-4 m-3">
      <View className="flex-1 justify-center items-center w-2/3 h-52">
        <Image
          source={images[image]}
          resizeMode="contain"
          progressiveRenderingEnabled={true}
          className=" w-full h-full rounded-lg"
        />
      </View>
      <View className="flex-1 justify-center items-center w-full mt-5">
        <Text className="text-3xl font-bold text-white">{name}</Text>
        <Text className="text-gray-100 mt-2">Dept of CSE, CUET</Text>
        <Text className="text-gray-100 mt-2">
          Contact for any queries and help:
        </Text>
        <View className=" bg-indigo-800 p-3 rounded-full m-2">
          <Text className="text-gray-100">rifat8851@gmail.com</Text>
        </View>
        <View className=" bg-indigo-800 p-3 rounded-full m-2">
          <Text className="text-gray-100">u{id}@student.cuet.ac.bd</Text>
        </View>
      </View>
    </View>
  );
};

export default Profilecard;
