import WelcomeScreen from "@/components/HelloState";
import { useUserStore } from "@/lib/store";
import { THEME } from "@/lib/styles";
import { CATEGORIES } from "@/utils/data";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const { setIsNewUser, preferences, setCategories } = useUserStore();
  const [helloState, setHelloState] = useState(true);

  const selected = preferences.categories;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!helloState) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [helloState]);

  const toggleCategory = (category: string) => {
    const newSelection = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];
    setCategories(newSelection);
  };

  const handleContinue = () => {
    if (selected.length >= 3) {
      setIsNewUser(false);
      router.replace("/");
    }
  };

  if (helloState) {
    return <WelcomeScreen setHelloState={setHelloState} />;
  }

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={[THEME.background, "#121212"]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.title}>
            Crée ton profil <Text style={{ color: THEME.primary }}>Slash</Text>
          </Text>
          <Text style={styles.subtitle}>
            Sélectionne tes univers préférés pour personnaliser ton shopping.
          </Text>

          {/* Indicateur de progression discret */}
          <View style={styles.counterContainer}>
            <Text
              style={[
                styles.counterText,
                { color: selected.length >= 3 ? THEME.primary : "#666" },
              ]}
            >
              {selected.length} / 3 sélectionnés
            </Text>
            <View style={styles.miniProgressContainer}>
              {[1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.miniDot,
                    {
                      backgroundColor:
                        selected.length >= i ? THEME.primary : "#333",
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        </Animated.View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {CATEGORIES.map((item, index) => {
            const isSelected = selected.includes(item.value);
            return (
              <CategoryCard
                key={item.value}
                item={item}
                isSelected={isSelected}
                onPress={() => toggleCategory(item.value)}
                index={index}
              />
            );
          })}
        </ScrollView>

        {/* Bouton de validation flottant / fixé en bas */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleContinue}
            disabled={selected.length < 3}
            style={[
              styles.continueButton,
              {
                backgroundColor:
                  selected.length >= 3
                    ? THEME.primary
                    : "rgba(255,255,255,0.05)",
                borderColor: selected.length >= 3 ? "transparent" : "#333",
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={[
                styles.continueText,
                { color: selected.length >= 3 ? "#000" : "#666" },
              ]}
            >
              {selected.length >= 3
                ? "C'est parti !"
                : "Choisis encore " + (3 - selected.length)}
            </Text>
            {selected.length >= 3 && (
              <Feather name="arrow-right" size={20} color="#000" />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Sous-composant pour la carte catégorie avec animation
const CategoryCard = ({ item, isSelected, onPress, index }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={{ width: "48%", marginBottom: 15 }}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            borderColor: isSelected ? THEME.primary : "rgba(255,255,255,0.1)",
            backgroundColor: isSelected
              ? "rgba(255,255,255,0.1)"
              : "rgba(255,255,255,0.03)",
          },
        ]}
      >
        <Text style={styles.cardEmoji}>{item.emoji || "🛍️"}</Text>
        <Text
          style={[styles.cardText, { color: isSelected ? "#FFF" : "#AAA" }]}
        >
          {item.label}
        </Text>
        {isSelected && (
          <View style={styles.checkBadge}>
            <Feather name="check" size={10} color="#000" />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
    textAlign: "left",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginTop: 8,
    lineHeight: 22,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 12,
    borderRadius: 12,
  },
  counterText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  miniProgressContainer: {
    flexDirection: "row",
    gap: 4,
  },
  miniDot: {
    width: 20,
    height: 4,
    borderRadius: 2,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  card: {
    height: 110,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  checkBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: THEME.primary,
    borderRadius: 10,
    padding: 2,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: width,
    paddingHorizontal: 25,
    paddingBottom: 40,
    paddingTop: 20,
  },
  continueButton: {
    height: 65,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  continueText: {
    fontSize: 18,
    fontWeight: "800",
  },
});
