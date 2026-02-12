import { ContactSellerOnWhatsapp } from "@/components/contactSellerOnWhatsapp";
import { MoreOptionsButton } from "@/components/MoreOptionsButton";
import { useUserStore } from "@/lib/store";
import { FONTS, THEME } from "@/lib/styles";
import { ContentType } from "@/types";
import { BACKEND_URL, SITE_URL } from "@/utils/data";
import {
  capitalizeText,
  returnCurrencySymbol,
  returnFormatedMoney,
} from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

const { height, width } = Dimensions.get("screen");

// --- COMPOSANT ITEM (Mémoïsé et Nommé pour ESLint) ---
const FeedItem = memo(function FeedItem({
  item,
  isContentRegistered,
  onToggleRegister,
  onShare,
}: {
  item: ContentType;
  isContentRegistered: (id: string) => boolean;
  onToggleRegister: (item: ContentType) => void;
  onShare: (item: ContentType) => void;
}) {
  const router = useRouter();
  const isBookmarked = isContentRegistered(item.product.id);
  const [lastTap, setLastTap] = useState(0);

  // Détection du Double Tap pour Liker
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      onToggleRegister(item);
    } else {
      setLastTap(now);
    }
  };

  return (
    <View style={styles.itemContainer}>
      {/* Zone de clic pour le Double Tap sur toute l'image */}
      <Pressable onPress={handleDoubleTap} style={StyleSheet.absoluteFill}>
        <Image
          source={{ uri: item.product.images[0] }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      </Pressable>

      {/* Overlays Dégradés pour la lisibilité */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.6)",
          "transparent",
          "transparent",
          "rgba(0,0,0,0.95)",
        ]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* --- Header : Shop Info --- */}
      <View style={styles.headerOverlay}>
        <TouchableOpacity
          onPress={() =>
            item.product.origin === "otekis" &&
            router.navigate(`${SITE_URL}/${item.shop.slug}`)
          }
          style={styles.profileContainer}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[THEME.primary, THEME.accent]}
            style={styles.profileBorder}
          >
            <Image
              source={{ uri: item.shop.logo }}
              style={styles.shopLogoMini}
            />
          </LinearGradient>
          <View>
            <Text style={styles.shopName}>
              {capitalizeText(item.shop.name)}
            </Text>
            {item.product.origin === "otekis" && (
              <Text style={styles.followText}>Voir la boutique</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Profil and Bookmark */}
      {/* Profil and Bookmark Button */}
      <TouchableOpacity
        onPress={() => router.push("/(main)/profile")}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          right: 20,
          top: 60,
          zIndex: 30, // Pour être sûr qu'il soit au-dessus des overlays
        }}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.05)"]}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.3)",
          }}
        >
          <Ionicons
            name="person-circle-outline"
            size={20}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              color: "#FFF",
              fontFamily: FONTS.subheading,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            Profil
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* --- Actions Latérales (TikTok Style) --- */}
      <View style={styles.rightActions}>
        <ActionButton
          icon={isBookmarked ? "bookmark" : "bookmark-outline"}
          color={isBookmarked ? THEME.primary : "#FFF"}
          onPress={() => onToggleRegister(item)}
        />
        <ActionButton
          icon="share-social-outline"
          onShare={() => onShare(item)}
          isShare
        />
        <MoreOptionsButton content={item} />
      </View>

      {/* --- Infos Produit & Bouton d'achat --- */}
      <View style={styles.bottomContent}>
        <Text style={styles.productTitle}>
          {capitalizeText(item.product.title)}
        </Text>
        <Text numberOfLines={2} style={styles.productDescription}>
          {item.product.description}
        </Text>

        <View style={styles.tagContainer}>
          <Text style={styles.tag}>
            #{item.product.category.replace(/\s/g, "")}
          </Text>
          <Text style={styles.tag}>
            #{item.product.type.replace(/\s/g, "")}
          </Text>
        </View>

        {item.product.origin === "otekis" ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => Linking.openURL(item.url)}
            style={styles.buyButton}
          >
            <View style={styles.buyButtonTextContainer}>
              <Ionicons name="cart" size={22} color="#000" />
              <Text style={styles.buyButtonText}>
                Acheter • {returnFormatedMoney(item.product.price)}{" "}
                {returnCurrencySymbol(item.product.currency)}
              </Text>
            </View>
            {item.product.discountPercentage && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  -{item.product.discountPercentage}%
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <ContactSellerOnWhatsapp
            currency={item.product.currency}
            image={item.product.images[0]}
            name={item.product.title}
            price={item.product.price}
            whatsapp={item.shop.contact ?? ""}
          />
        )}
      </View>
    </View>
  );
});
FeedItem.displayName = "FeedItem";

// --- PETIT COMPOSANT BOUTON ACTION ---
const ActionButton = ({
  icon,
  onPress,
  onShare,
  color = "#FFF",
  isShare = false,
}: any) => (
  <TouchableOpacity
    onPress={isShare ? onShare : onPress}
    style={styles.iconBtn}
    activeOpacity={0.7}
  >
    <Ionicons name={icon} size={26} color={color} />
  </TouchableOpacity>
);

// --- ECRAN PRINCIPAL ---
export default function FeedScreen() {
  const [CONTENTS, setCONTENTS] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {
    preferences,
    addViewedProductId,
    isContentRegistered,
    toggleRegisterContent,
  } = useUserStore();

  const query = new URLSearchParams({
    categories: preferences.categories.join(","),
    gender: preferences.gender,
  }).toString();

  // --- CONFIG DE VISIBILITÉ FIXE ---
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80, // L'item doit être quasi entier
    minimumViewTime: 200, // Doit rester 200ms pour être compté comme "vu"
  }).current;

  // --- DÉTECTION ROBUSTE ---
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const fullyVisible = viewableItems.find((v) => v.isViewable && v.item);

      if (!fullyVisible) return;

      const item = fullyVisible.item as ContentType;
      addViewedProductId(item.product.id);
    },
  ).current;

  const getResponse = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const pageToFetch = reset ? 1 : page;
        const res = await fetch(
          `${BACKEND_URL}/products/get?${query}&page=${pageToFetch}`,
        );
        const data = await res.json();
        const newBatch: ContentType[] = data.CONTENTS || [];

        // ON RÉCUPÈRE LES IDS DEPUIS LE STORE À CET INSTANT PRÉCIS
        const viewedIds = useUserStore.getState().viewedProductIds;

        console.log({ viewedProductIds: viewedIds.length });

        // SÉPARATION
        const notViewed = newBatch.filter(
          (item) => !viewedIds.includes(item.product.id),
        );
        const alreadyViewed = newBatch.filter((item) =>
          viewedIds.includes(item.product.id),
        );

        // MÉLANGE DES NOUVEAUX (Pour éviter la répétition monotone)
        const shuffledNotViewed = notViewed.sort(() => Math.random() - 0.5);
        const finalBatch = [...shuffledNotViewed, ...alreadyViewed];

        if (reset) {
          setCONTENTS(finalBatch);
          setPage(2);
        } else {
          setCONTENTS((prev) => [...prev, ...finalBatch]);
          setPage((prev) => prev + 1);
        }
        setHasMore(newBatch.length > 0);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    },
    [page, query, loading],
  );

  // --- EFFET DE CHARGEMENT INITIAL ---
  useEffect(() => {
    // Petit hack : on attend 100ms que Zustand charge le cache avant le premier fetch
    const timeout = setTimeout(() => {
      getResponse(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleShare = async (content: ContentType) => {
    try {
      await Haptics.selectionAsync();
      await Share.share({
        message: `Regarde ce que j'ai trouvé sur Slash ! 🚀\n${content.product.title}\n${content.url}`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleBookmark = (item: ContentType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleRegisterContent(item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CONTENTS}
        keyExtractor={(item, index) => `${item.product.id}`}
        renderItem={({ item }) => (
          <FeedItem
            item={item}
            isContentRegistered={isContentRegistered}
            onToggleRegister={handleToggleBookmark}
            onShare={handleShare}
          />
        )}
        // snapToInterval={height} de Dimensions.get("screen")
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum={true}
        showsVerticalScrollIndicator={false}
        // DÉTECTION
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={() => {
          if (!loading && hasMore) getResponse();
          if (!loading && !hasMore) getResponse(true); // Loop
        }}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  itemContainer: { height: height, width: width },
  headerOverlay: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileBorder: {
    width: 46,
    height: 46,
    borderRadius: 23,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  shopLogoMini: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
  },
  shopName: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  followText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },
  rightActions: {
    position: "absolute",
    right: 15,
    bottom: height * 0.35,
    gap: 18,
    alignItems: "center",
    zIndex: 50,
  },
  iconBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  bottomContent: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  productTitle: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  productDescription: {
    color: "#CCC",
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    color: THEME.primary,
    fontWeight: "700",
    fontSize: 13,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  buyButton: {
    backgroundColor: THEME.primary,
    height: 64,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buyButtonTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  buyButtonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 17,
  },
  discountBadge: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  discountText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 13,
  },
});
