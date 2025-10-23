import { FONTS, TEXT_SIZE, THEME } from "@/lib/styles";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function WelcomeScreen({
  setHelloState,
}: {
  setHelloState: (v: boolean) => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animation combinée fade + scale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => setHelloState(false), 5000);
    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, setHelloState]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: THEME.background,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
      }}
    >
      {/* Icon dynamique en haut */}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="rocket-launch" size={40} color={THEME.primary} />
        <Entypo
          name="star"
          size={35}
          color={THEME.accent}
          style={{ marginLeft: 10 }}
        />
      </View>

      <Animated.Text
        style={{
          fontSize: TEXT_SIZE.extraLarge,
          fontFamily: FONTS.subheading,
          color: THEME.primary,
          textAlign: "center",
          marginBottom: 15,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        Bienvenue sur Slash! 👋
      </Animated.Text>

      <Animated.Text
        style={{
          color: "#AAAAAA",
          textAlign: "center",
          fontSize: TEXT_SIZE.large,
          fontFamily: FONTS.body,
          lineHeight: 28,
          opacity: fadeAnim,
          marginBottom: 30,
        }}
      >
        L&apos;application qui révolutionne ta façon de découvrir et partager du
        contenu.
        {"\n"}Prépare-toi à une expérience unique!
      </Animated.Text>

      {/* Motifs décoratifs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: width * 0.8,
        }}
      >
        <Feather
          name="triangle"
          size={20}
          color={THEME.accent}
          style={{ marginHorizontal: 5 }}
        />
        <MaterialIcons
          name="star-border"
          size={20}
          color={THEME.primary}
          style={{ marginHorizontal: 5 }}
        />
        <Feather
          name="circle"
          size={20}
          color={THEME.secondary}
          style={{ marginHorizontal: 5 }}
        />
        <MaterialIcons
          name="favorite-border"
          size={20}
          color={THEME.accent}
          style={{ marginHorizontal: 5 }}
        />
        <Feather
          name="triangle"
          size={20}
          color={THEME.primary}
          style={{ marginHorizontal: 5 }}
        />
      </View>
    </SafeAreaView>
  );
}
