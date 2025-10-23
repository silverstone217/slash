import WelcomeScreen from "@/components/HelloState";
import { useUserStore } from "@/lib/store";
import { FONTS, TEXT_SIZE, THEME } from "@/lib/styles";
import { CATEGORIES } from "@/utils/data";
// import { generateUsername } from "@/utils/functions";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { setIsNewUser, preferences, setCategories } = useUserStore();

  const [helloState, setHelloState] = useState(true);

  const selected = preferences.categories;

  // swap to categories after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHelloState(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    const newSelection = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];

    setCategories(newSelection);
  };

  // Handle continue button press
  const handleContinue = () => {
    if (selected.length >= 3) {
      setIsNewUser(false);

      router.replace("/"); // Redirige vers ton feed principal
    }
  };

  return !helloState ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: THEME.background,
        paddingHorizontal: 20,
        paddingTop: 80,
      }}
    >
      <Text
        style={{
          fontSize: TEXT_SIZE.xlarge,
          fontFamily: FONTS.subheading,
          color: THEME.text,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Choisis tes centres d’intérêt ✨
      </Text>

      <Text
        style={{
          color: "#888",
          textAlign: "center",
          marginBottom: 30,
          fontFamily: FONTS.body,
        }}
      >
        Sélectionne au moins 3 catégories pour personnaliser ton expérience
      </Text>

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((item) => {
          const isSelected = selected.includes(item.value);
          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => toggleCategory(item.value)}
              activeOpacity={0.8}
              style={{
                width: "48%", // 2 colonnes avec un petit espace
                marginBottom: 15,
                paddingVertical: 18,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: isSelected ? THEME.primary : THEME.border,
                backgroundColor: isSelected ? THEME.primary + "22" : "#1A1A1A",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: isSelected ? THEME.primary : THEME.text,
                  fontFamily: FONTS.body,
                  fontSize: TEXT_SIZE.medium,
                  textAlign: "center",
                  paddingHorizontal: 10,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={selected.length >= 3 ? 0.8 : 1}
        onPress={handleContinue}
        style={{
          backgroundColor: selected.length >= 3 ? THEME.primary : "#333333",
          paddingVertical: 18,
          borderRadius: 16,
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: TEXT_SIZE.large,
            fontFamily: FONTS.subheading,
          }}
        >
          Continuer
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: "center",
          color: "#666",
          marginTop: 15,
          fontSize: TEXT_SIZE.small,
          fontFamily: FONTS.body,
        }}
      >
        {selected.length}/3 minimum
      </Text>
    </SafeAreaView>
  ) : (
    <WelcomeScreen setHelloState={setHelloState} />
  );
}
