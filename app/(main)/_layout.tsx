import { THEME } from "@/lib/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const MainLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: THEME.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
};

export default MainLayout;
