import { Link, Redirect, SplashScreen, useRouter } from "expo-router";
import {
  Alert,
  Button,
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      const response = await fetch("https://mycuetbus.web.app/version.json");
      const { version, updateUrl } = await response.json();

      const currentVersion = "1.0.0";

      if (version !== currentVersion) {
        Alert.alert(
          "Update Available",
          "A new version is available. Click OK to update.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => Linking.openURL(updateUrl) },
          ]
        );
      }
    } catch (error) {
      console.error("Failed to check for updates:", error);
    }
  };

  const goingchecker = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/tabs/homes");
      } else {
        router.push("/signIN");
      }
    });
    // if (auth.currentUser) {
    //   router.push("/tabs/home");
    // } else {
    //   router.push("/signIN");
    // }
  };
  return (
    <ImageBackground
      source={require("../assets/images/projectimages/Splash Screen.png")}
      className="flex-1 w-full h-full "
      resizeMode="stretch"
    >
      <View className="flex-1 justify-end items-center">
        <TouchableOpacity
          className="bg-indigo-600 py-3 mb-4 mt-5 px-6 rounded-lg w-4/5 items-center"
          onPress={goingchecker}
        >
          <Text className="text-white font-bold text-xl">
            Let's get started
          </Text>
        </TouchableOpacity>
        <Text className="text-lg text-green-800 px-2 mb-1 rounded-xl">
          Version 1.0.0
        </Text>
      </View>
    </ImageBackground>
  );
}
