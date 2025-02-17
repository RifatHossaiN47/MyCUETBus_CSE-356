import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import "nativewind";
import { db } from "../../firebase.config"; // Firestore configuration
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Zocial } from "@expo/vector-icons";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotices = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "notices"), orderBy("date", "desc"))
      );

      const fetchedNotices = [];
      querySnapshot.forEach((doc) => {
        fetchedNotices.push({ id: doc.id, ...doc.data() });
      });
      setNotices(fetchedNotices);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching notices: ", error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotices();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white items-center">
      <View className="bg-blue-500 p-4 mt-4 w-4/5">
        <Text className="text-white text-2xl text-center font-bold">
          <Zocial name="pinboard" size={24} color="white" /> Notice Board
        </Text>
      </View>
      <ScrollView
        className="p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {notices.map((notice) => (
          <View
            key={notice.id}
            className="bg-orange-400 p-4 mb-4 rounded-lg shadow-md"
          >
            <Text className="text-blue-900 font-bold text-sm mb-1">
              {notice.date}
            </Text>
            <Text className="text-white font-medium text-lg">
              {notice.notice}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notices;
