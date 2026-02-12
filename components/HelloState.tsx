import { FONTS, TEXT_SIZE, THEME } from "@/lib/styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Pense à l'installer : npx expo install expo-linear-gradient
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({
  setHelloState,
}: {
  setHelloState: (v: boolean) => void;
}) {
  // Valeurs d'animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Séquence d'animation style "App de luxe"
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideUp, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.spring(scaleLogo, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      // Barre de progression
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: 4500, // Un peu moins que le timeout total
        useNativeDriver: false, // width ne supporte pas nativeDriver
      }),
    ]).start();

    const timer = setTimeout(() => setHelloState(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Fond avec dégradé sombre/moderne */}
      <LinearGradient
        colors={[THEME.background, "#1A1A1A", THEME.background]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.content}>
        {/* Cercles décoratifs en arrière-plan (Effet de profondeur) */}
        <View style={styles.glowCircle} />

        {/* Logo / Icône Principal */}
        <Animated.View
          style={[
            styles.logoContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleLogo }] },
          ]}
        >
          <View style={styles.iconCircle}>
            <MaterialIcons
              name="shopping-bag"
              size={50}
              color={THEME.primary}
            />
            <View style={styles.slashBadge}>
              <Text style={styles.slashText}>/</Text>
            </View>
          </View>
        </Animated.View>

        {/* Texte de Bienvenue */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUp }],
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>
            SLASH<Text style={{ color: THEME.accent }}>.</Text>
          </Text>
          <Text style={styles.tagline}>
            Le shopping devient <Text style={styles.highlight}>viral</Text>.
          </Text>
        </Animated.View>

        {/* Section Features (Badges flottants) */}
        <View style={styles.featuresContainer}>
          <FeatureBadge icon="zap" text="Flash Deals" delay={500} />
          <FeatureBadge icon="trending-up" text="Tendances" delay={700} />
          <FeatureBadge icon="link" text="Direct Link" delay={900} />
        </View>

        {/* Footer & Progress Bar */}
        <View style={styles.footer}>
          <Text style={styles.loadingText}>Préparation de ton flux...</Text>
          <View style={styles.progressBarBg}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Composant pour les petits badges dynamiques
const FeatureBadge = ({
  icon,
  text,
  delay,
}: {
  icon: any;
  text: string;
  delay: number;
}) => {
  return (
    <View style={styles.badge}>
      <Feather name={icon} size={14} color={THEME.primary} />
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  glowCircle: {
    position: "absolute",
    top: height * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: THEME.primary,
    opacity: 0.05,
    borderRadius: 1000,
  },
  logoContainer: {
    marginTop: 50,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  slashBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: THEME.accent,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  slashText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 4,
  },
  tagline: {
    fontSize: TEXT_SIZE.large,
    color: "#888",
    marginTop: 10,
    fontFamily: FONTS.body,
  },
  highlight: {
    color: "#FFF",
    fontWeight: "bold",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  badgeText: {
    color: "#EEE",
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    width: "80%",
    alignItems: "center",
  },
  loadingText: {
    color: "#666",
    fontSize: 12,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  progressBarBg: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: THEME.primary,
  },
});
