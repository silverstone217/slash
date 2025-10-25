import { useUserStore } from "@/lib/store";
import { FONTS, TEXT_SIZE, THEME } from "@/lib/styles";
import { capitalizeText } from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { username, contentsRegistered } = useUserStore();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 🔙 Bouton retour */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={THEME.text} />
      </TouchableOpacity>

      {/* 👤 Profil */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <LinearGradient
            colors={["#ff7eb3", "#ff758c", "#ffb199"]}
            style={styles.gradientCircle}
          />
          <View style={styles.avatarInner}>
            <Ionicons name="person" size={40} color={THEME.text} />
          </View>
        </View>
        <Text style={styles.username}>
          {capitalizeText(username!) || "Utilisateur"}
        </Text>
      </View>

      {/* 🧾 Liste des contenus */}
      <FlatList
        data={contentsRegistered}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: insets.bottom + 20,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <ImageBackground
              source={{ uri: item.product.images[0] }}
              style={styles.postImage}
              imageStyle={{ borderRadius: 16 }}
              resizeMode="cover"
            >
              {item.product.discountPercentage && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    -{item.product.discountPercentage}%
                  </Text>
                </View>
              )}
            </ImageBackground>
            <View style={styles.postInfo}>
              <Text style={styles.postTitle}>
                {capitalizeText(item.product.title)}
              </Text>
              <Text style={styles.postPrice}>
                {item.product.price} {item.product.currency}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  backButton: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  gradientCircle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  avatarInner: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: THEME.background,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    color: THEME.text,
    fontFamily: FONTS.heading,
    fontSize: TEXT_SIZE.xlarge,
  },
  postCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    // backgroundColor: THEME.card,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  postImage: {
    width: width - 24,
    height: 200,
    justifyContent: "flex-end",
  },
  discountBadge: {
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    top: 10,
    left: 10,
  },
  discountText: {
    color: "#fff",
    fontFamily: FONTS.body,
    fontSize: TEXT_SIZE.small,
  },
  postInfo: {
    padding: 12,
  },
  postTitle: {
    color: THEME.text,
    fontFamily: FONTS.subheading,
    fontSize: TEXT_SIZE.medium,
    marginBottom: 4,
  },
  postPrice: {
    color: THEME.accent,
    fontFamily: FONTS.medium,
    fontSize: TEXT_SIZE.medium,
  },
});

export default ProfileScreen;
