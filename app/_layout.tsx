import UsernameInitializer from "@/components/UsernameInitializer";
import { useUserStore } from "@/lib/store";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";

// Set the animation options. This is optional.
// SplashScreen.setOptions({
//   duration: 3000,
//   fade: true,
// });

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  const { isNewUser } = useUserStore();

  // HIDE SPLASH SCREEN WHEN WE ARE READY
  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  // useEffect(() => {
  //   AsyncStorage.clear().then(() => console.log("✅ AsyncStorage vidé !"));
  // }, []);

  // IF FONTS ARE NOT LOADED, WE DO NOT RENDER ANYTHING (SPLASH SCREEN IS STILL VISIBLE)
  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

  return (
    <>
      <StatusBar animated barStyle={"light-content"} />

      {/* Initialisation du username */}
      <UsernameInitializer />

      <Stack screenOptions={{ contentStyle: { backgroundColor: "#0D0D0D" } }}>
        {/* ONBOARDING SCREENS */}
        <Stack.Protected guard={isNewUser === true}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
        </Stack.Protected>

        {/* MAIN SCREENS */}
        <Stack.Protected guard={isNewUser === false}>
          <Stack.Screen
            name="(main)"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}
