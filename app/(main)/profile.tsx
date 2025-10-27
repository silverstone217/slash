import { ProfileContentOptions } from "@/components/ProfileContentOptions";
import { useUserStore } from "@/lib/store";
import { FONTS, TEXT_SIZE, THEME } from "@/lib/styles";
import {
  capitalizeText,
  returnCurrencySymbol,
  returnFormatedMoney,
} from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const router = useRouter();
  const { username, contentsRegistered } = useUserStore();
  const [isVisible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* 👤 Avatar + Username */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <LinearGradient
            colors={["#ff9a9e", "#fad0c4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCircle}
          />
          <View style={styles.avatarInner}>
            <Ionicons name="person" size={42} color={THEME.text} />
          </View>
        </View>
        <Text style={styles.username}>
          {capitalizeText(username!) || "Utilisateur"}
        </Text>
      </View>

      {/* 📦 Liste des produits */}
      <FlatList
        data={contentsRegistered}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={styles.gridContainer}
        keyExtractor={(item, index) =>
          item.product.id.toString() + index.toString()
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            android_ripple={{ color: "rgba(255,255,255,0.05)" }}
            // onPress={() =>
            //   router.push({
            //     pathname: "/(main)",
            //     params: { scrollToId: item.product.id },
            //   })
            // }
          >
            <Image
              source={{ uri: item.product.images[0] }}
              style={styles.productImage}
              resizeMode="cover"
            />

            <View style={styles.cardInfo}>
              <Text style={styles.productTitle} numberOfLines={1}>
                {capitalizeText(item.product.title)}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>
                  {returnFormatedMoney(item.product.price)}
                </Text>
                <Text style={styles.currency}>
                  {returnCurrencySymbol(item.product.currency)}
                </Text>
              </View>

              <View style={styles.footerRow}>
                <Text style={styles.shopName} numberOfLines={1}>
                  {capitalizeText(item.shop.name)}
                </Text>

                <ProfileContentOptions content={item} />
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 6,
    borderRadius: 50,
  },
  headerTitle: {
    fontFamily: FONTS.heading,
    fontSize: TEXT_SIZE.large,
    color: THEME.text,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientCircle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 55,
  },
  avatarInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  username: {
    marginTop: 12,
    fontSize: TEXT_SIZE.large,
    fontFamily: FONTS.heading,
    color: THEME.text,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 10,
  },
  card: {
    width: "48%",
    backgroundColor: THEME.border,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 160,
  },
  cardInfo: {
    padding: 10,
  },
  productTitle: {
    color: THEME.text,
    fontFamily: FONTS.subheading,
    fontSize: TEXT_SIZE.small,
    marginBottom: 3,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    color: THEME.primary,
    fontFamily: FONTS.subheading,
    fontSize: TEXT_SIZE.small,
  },
  currency: {
    marginLeft: 2,
    color: THEME.primary,
    fontSize: TEXT_SIZE.small - 3,
    fontFamily: FONTS.subheading,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  shopName: {
    color: THEME.secondary,
    fontSize: TEXT_SIZE.small - 3,
    fontFamily: FONTS.body,
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 50,
    padding: 5,
  },
});

export default ProfileScreen;
