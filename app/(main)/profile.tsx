import { ProfileContentOptions } from "@/components/ProfileContentOptions";
import { useUserStore } from "@/lib/store";
import { FONTS, THEME } from "@/lib/styles";
import {
  capitalizeText,
  returnCurrencySymbol,
  returnFormatedMoney,
} from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const router = useRouter();
  const { username, contentsRegistered } = useUserStore();

  const renderHeader = () => (
    <View style={styles.profileSection}>
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={[THEME.primary, THEME.accent]}
          style={styles.avatarGradient}
        >
          <View style={styles.avatarInner}>
            <Ionicons name="person" size={50} color="#FFF" />
          </View>
        </LinearGradient>
      </View>

      <Text style={styles.username}>
        {capitalizeText(username!) || "Explorateur"}
      </Text>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{contentsRegistered.length}</Text>
          <Text style={styles.statLabel}>Favoris</Text>
        </View>
        <View style={[styles.statItem, styles.statDivider]}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Boutiques</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Mes enregistrements</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 App Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.roundBtn}>
          <Ionicons name="arrow-back" size={24} color={THEME.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity style={styles.roundBtn}>
          <Ionicons name="settings-outline" size={22} color={THEME.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={contentsRegistered}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image
              source={{ uri: item.product.images[0] }}
              style={styles.cardImage}
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.cardGradient}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardPrice}>
                {returnFormatedMoney(item.product.price)}{" "}
                {returnCurrencySymbol(item.product.currency)}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardShop} numberOfLines={1}>
                  {capitalizeText(item.shop.name)}
                </Text>
                <ProfileContentOptions content={item} />
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={60} color={THEME.border} />
            <Text style={styles.emptyText}>
              Aucun produit enregistré pour le moment.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.background },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 60,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.border, // ou transparent
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.heading,
    color: THEME.text,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 3,
    backgroundColor: THEME.border,
  },
  avatarGradient: {
    flex: 1,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.background,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: THEME.text,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: THEME.border,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statDivider: {
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255,255,255,0.1)",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.text,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.secondary,
  },
  sectionTitle: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.text,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  columnWrapper: {
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginTop: 15,
  },
  card: {
    width: width / 2 - 22,
    height: 240,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: THEME.border,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  cardPrice: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  cardShop: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 40,
  },
  emptyText: {
    color: THEME.secondary,
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
});

export default ProfileScreen;
