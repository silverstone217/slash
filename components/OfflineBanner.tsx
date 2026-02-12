import { FONTS, TEXT_SIZE, THEME } from "@/lib/styles";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function OfflineScreen() {
  return (
    <View style={styles.container}>
      {/* Fond dégradé identique à ton WelcomeScreen */}
      <LinearGradient
        colors={[THEME.background, "#1A1A1A", THEME.background]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.content}>
        {/* Effet de Halo en arrière-plan */}
        <View style={styles.glowCircle} />

        <View style={styles.mainSection}>
          {/* Icône d'alerte stylisée */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Feather name="wifi-off" size={50} color={THEME.primary} />
            </View>
            <View style={styles.alertBadge}>
              <MaterialCommunityIcons
                name="alert-octagon"
                size={24}
                color="white"
              />
            </View>
          </View>

          {/* Textes */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              HORS LIGNE<Text style={{ color: THEME.accent }}>.</Text>
            </Text>
            <Text style={styles.description}>
              Il semble que votre connexion se soit perdue dans le flux.
              Vérifiez votre réseau pour continuer l&apos;expérience{" "}
              <Text style={styles.highlight}>SLASH</Text>.
            </Text>
          </View>
        </View>

        {/* Section Statut / Aide */}
        <View style={styles.footer}>
          <View style={styles.statusBadge}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>En attente de signal...</Text>
          </View>

          <Text style={styles.retryHint}>
            L&apos;application se reconnectera automatiquement dès que possible.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  glowCircle: {
    position: "absolute",
    top: height * 0.25,
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: THEME.primary,
    opacity: 0.04,
    borderRadius: 1000,
  },
  mainSection: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  alertBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF3B30", // Rouge alerte
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: THEME.background,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 2,
    fontFamily: FONTS.heading, // Si défini
    marginBottom: 15,
  },
  description: {
    fontSize: TEXT_SIZE.medium,
    color: "#888",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: FONTS.body,
  },
  highlight: {
    color: "#FFF",
    fontWeight: "bold",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.primary,
    marginRight: 10,
    opacity: 0.6,
  },
  statusText: {
    color: "#AAA",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  retryHint: {
    color: "#555",
    fontSize: 12,
    textAlign: "center",
  },
});
