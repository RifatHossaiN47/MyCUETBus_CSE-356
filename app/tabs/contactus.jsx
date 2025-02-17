import { View, Text, ScrollView } from "react-native";
import React from "react";
import Profilecard from "../../components/profilecard";
import { Image } from "react-native";

const contactus = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20 }}
    >
      <Profilecard
        image="rifathossain"
        name="MD. Rifat Hossain"
        id="2004129"
      ></Profilecard>
      <View className="flex-1 justify-center items-center bg-indigo-800 rounded-xl p-2 text-center">
        <Text className="text-xl font-extrabold text-white p-3 bg-green-600 rounded-3xl text-center ">
          Help Us Make MyCUETBus Even Better!!
        </Text>

        <Text className="text-white text-center ">
          As the developer of MyCUETBus, I’m constantly striving to improve your
          experience with the app. However, being human, I might make a few
          errors or overlook some things along the way. Your feedback and
          suggestions are invaluable in helping me create a better app for
          everyone. If you have any ideas, feature requests, or spot anything
          that could be improved, I’d love to hear from you! Feel free to share
          your thoughts with me via email at [rifat8851@gmail.com]. Thank you
          for being a part of this journey and for helping make MyCUETBus the
          best it can be! 🙌
        </Text>
        <Text className="text-emerald-400 text-center text-xl m-1 mt-3 font-extrabold">
          Special Thanks:
        </Text>
        <Text className="text-white text-center font-bold">
          A big thanks to MD. Sayel(2004116) and Abid Sarker Dipto(2004121) for
          their invaluable help in collecting data for this app! 🤝🚍
        </Text>
        <Text className="text-white text-center mt-4 ">
          <Text className="font-extrabold text-amber-500">
            Important Note About Map Usage:{" "}
          </Text>
          To provide the map feature for tracking buses, I’m using the MapBox
          API. Currently, the free version of this API allows up to 50,000 map
          views per month. While this limit works for now, it may occasionally
          impact access during high usage periods. I’m actively working toward
          upgrading to a subscription plan that will enable unlimited map views
          in the future. Thank you for your understanding and support🚍🗺️
        </Text>
      </View>
    </ScrollView>
  );
};

export default contactus;
