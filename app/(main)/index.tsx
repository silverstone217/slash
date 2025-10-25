import { MoreOptionsButton } from "@/components/MoreOptionsButton";
import SoundToggleButton from "@/components/SoundToggleButton";
import { useUserStore } from "@/lib/store";
import { FONTS, TEXT_SIZE, THEME } from "@/lib/styles";
import { ContentType } from "@/types";
import { BACKEND_URL, SITE_URL } from "@/utils/data";
import {
  capitalizeText,
  returnCurrencySymbol,
  returnFormatedMoney,
} from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  Pressable,
  Share,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

const { height, width } = Dimensions.get("screen");

const playlist = [
  require("../../assets/sounds/sound1.mp3"),
  require("../../assets/sounds/sound2.mp3"),
  require("../../assets/sounds/sound3.mp3"),
  require("../../assets/sounds/sound4.mp3"),
  require("../../assets/sounds/sound5.mp3"),
  require("../../assets/sounds/sound6.mp3"),
  require("../../assets/sounds/sound7.mp3"),
];

export default function FeedScreen() {
  const [CONTENTS, setCONTENTS] = useState<ContentType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const [lastPlayedId, setLastPlayedId] = useState<string | null>(null);

  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const player = useAudioPlayer(currentTrack, {
    keepAudioSessionActive: false,
  });
  const [shouldPlay, setShouldPlay] = useState(false);
  const [muted, setMuted] = useState(false);

  const {
    preferences,
    addViewedProductId,
    toggleRegisterContent,
    isContentRegistered,
  } = useUserStore();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [restarted, setRestarted] = useState(false);

  const navigation = useNavigation();

  // Lecture aléatoire d’une piste audio
  // Quand currentTrack change, joue la musique
  useEffect(() => {
    if (!player) return;

    if (shouldPlay && !muted) {
      player.seekTo(0);
      player.play();
      player.loop = true;
      setShouldPlay(false);
    }
  }, [muted, player, shouldPlay]);

  useEffect(() => {
    if (!player) return;

    const unsubscribeBlur = navigation.addListener("blur", () => {
      // L’écran n’est plus actif → pause
      if (player) {
        player.pause();
      }
    });

    const unsubscribeFocus = navigation.addListener("focus", () => {
      player.seekTo(0);
      // L’écran redevient actif → relance la musique
      if (player && !muted) {
        player.play();
        player.loop = true;
      }
    });

    // Nettoyage
    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, [navigation, player, muted]);

  const playRandomTrack = () => {
    const random = playlist[Math.floor(Math.random() * playlist.length)];
    setCurrentTrack(random);
    setShouldPlay(true);
  };

  // Mute toggle
  const toggleMute = () => {
    setMuted((prev) => !prev);
    Haptics.selectionAsync();
    if (muted) {
      player.play(); // ou resume
    } else {
      player.pause(); // ou stop
    }
  };

  // Enregistrement des items vus
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.forEach((viewToken) => {
        const item = viewToken.item as ContentType;
        addViewedProductId(item.product.id);

        if (item.product.id !== lastPlayedId) {
          setLastPlayedId(item.product.id);
          playRandomTrack();
        }
      });
    }
  ).current;

  // Préparation de la query
  const query = new URLSearchParams({
    categories: preferences.categories.join(","), // "Électronique,Mode"
    gender: preferences.gender,
    // showAds: String(preferences.showAds),
  }).toString();

  const router = useRouter();

  // Récupération des données
  const getResponse = useCallback(
    async (reset = false) => {
      if (reset) {
        setInitialLoad(true); // ✅ active le loader uniquement au redémarrage
      }

      try {
        const currentPage = reset ? 1 : page;
        const res = await fetch(
          `${BACKEND_URL}/products/get?${query}&page=${currentPage}`
        );
        const data: { CONTENTS: ContentType[]; hasMore: boolean } =
          await res.json();

        const allContents = data.CONTENTS || [];
        const { viewedProductIds } = useUserStore.getState();

        const notViewed = allContents.filter(
          (item) => !viewedProductIds.includes(item.product.id)
        );
        const alreadyViewed = allContents.filter((item) =>
          viewedProductIds.includes(item.product.id)
        );

        const sorted = [...notViewed, ...alreadyViewed].filter(
          (item) => !CONTENTS.some((c) => c.product.id === item.product.id)
        );

        if (reset) {
          setCONTENTS(sorted);
          setPage(2);
          setRestarted(true);
        } else {
          setCONTENTS((prev) => [...prev, ...sorted].slice(-100));
          setPage((prev) => prev + 1);
        }

        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false); // ✅ désactive le loader après le premier affichage
      }
    },
    [page, query, CONTENTS]
  );

  // Lancement de la récupération au montage
  useEffect(() => {
    getResponse();
  }, [getResponse, query]);

  // ---ACTIONS---
  // 1. register content
  const handleToggleRegisterContent = (content: ContentType) => {
    Haptics.selectionAsync();
    toggleRegisterContent(content);
  };

  // 2. share content
  const handleShareContent = async (content: ContentType) => {
    try {
      // petit retour haptique comme tu fais déjà
      await Haptics.selectionAsync();

      // 🔗 lien du contenu (tu l’as déjà dans content.url)
      const shareUrl = content?.url ?? "https://www.otekis.com/";

      // 📝 message qui sera partagé
      const message = `Découvre ce produit sur Otekis 💫\n\n${content.product.title}\n${shareUrl}`;

      // 📲 ouverture du menu natif de partage
      const result = await Share.share({
        message,
        url: shareUrl, // utile surtout pour iOS
        title: content.product.title,
      });

      // 📋 Optionnel : gestion du résultat (utile si tu veux analytics)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Partagé via :", result.activityType);
        } else {
          console.log("Partage réussi !");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Partage annulé.");
      }
    } catch (error) {
      console.error("Erreur lors du partage :", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEME.background }}>
      <FlatList
        data={CONTENTS}
        keyExtractor={(item, index) => `${item.product.id}-${index}`}
        pagingEnabled
        onEndReachedThreshold={0.3}
        windowSize={3}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        scrollEventThrottle={16}
        pinchGestureEnabled={true}
        snapToAlignment="start"
        decelerationRate={"normal"}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        onEndReached={() => {
          if (hasMore) {
            getResponse();
          } else if (!restarted) {
            getResponse(true); // 🔁 redémarre le feed
          }
        }}
        // ------- AFFICHAGE SI LISTE VIDE ------
        ListEmptyComponent={
          initialLoad || loading ? (
            <View
              style={{
                flex: 1,
                height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color={THEME.primary} />
              <Text
                style={{
                  color: THEME.text,
                  marginTop: 10,
                  fontFamily: FONTS.subheading,
                  fontSize: TEXT_SIZE.medium,
                }}
              >
                Chargement du contenu...
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                height,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Ionicons
                name="cube-outline"
                size={80}
                color="rgba(255,255,255,0.3)"
                style={{ marginBottom: 20 }}
              />
              <Text
                style={{
                  color: THEME.text,
                  fontFamily: FONTS.subheading,
                  fontSize: TEXT_SIZE.large,
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Aucun produit disponible
              </Text>
              <Text
                style={{
                  color: "#aaa",
                  fontFamily: FONTS.body,
                  fontSize: TEXT_SIZE.small,
                  textAlign: "center",
                  maxWidth: "80%",
                }}
              >
                Reviens plus tard ou ajuste tes préférences pour découvrir de
                nouveaux articles.
              </Text>
            </View>
          )
        }
        // -------- AFFICHAGE DE CHAQUE ITEM ----
        renderItem={({ item }) => (
          // --- ton rendu existant (inchangé) ---
          <Pressable
            style={{ height, width, justifyContent: "flex-end" }}
            onPress={toggleMute}
          >
            <ImageBackground
              source={{ uri: item.product.images[0] }}
              style={{ height, width, justifyContent: "flex-end" }}
              resizeMode="contain"
            >
              {/* Dégradé sombre */}
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.9)"]}
                style={{
                  position: "absolute",
                  bottom: 0,
                  height: "60%",
                  width: "100%",
                }}
              />
              {/* --- Profil --- */}
              <TouchableOpacity
                onPress={() => {
                  router.push("/profile");
                  // toggleMute();
                }}
                activeOpacity={0.8}
                style={{
                  position: "absolute",
                  top: 60,
                  left: 20,
                  width: 55,
                  height: 55,
                  borderRadius: 27.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LinearGradient
                  colors={["#ff7eb3", "#ff758c", "#ffb199"]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 27.5,
                  }}
                />
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: THEME.background,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="person" size={24} color={THEME.text} />
                </View>
              </TouchableOpacity>

              {/* --- Groupe d’actions flottant --- */}
              <View
                style={{
                  position: "absolute",
                  right: 20,
                  bottom: height * 0.4,
                  alignItems: "center",
                  gap: 20,
                  zIndex: 20,
                }}
              >
                {[
                  {
                    icon: "bookmark-outline",
                    second: "bookmark",
                    action: handleToggleRegisterContent,
                  },
                  { icon: "share-social-outline", action: handleShareContent },
                ].map((btn, i) => {
                  const isBookmarked =
                    btn.icon === "bookmark-outline" &&
                    isContentRegistered(item.product.id);

                  return (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.7}
                      onPress={() => btn.action(item)}
                      style={{
                        backgroundColor: isBookmarked
                          ? "rgba(255,255,255,0.12)" // léger fond clair si actif
                          : "rgba(0,0,0,0.45)",
                        borderRadius: 40,
                        padding: 10,
                        borderWidth: isBookmarked ? 0.8 : 0,
                        borderColor: "rgba(255,255,255,0.2)",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name={
                          isBookmarked ? (btn.second as any) : (btn.icon as any)
                        }
                        size={22}
                        color={isBookmarked ? "#F5C542" : "#FFFFFF"} // or #E6E6E6 for softer white
                      />
                    </TouchableOpacity>
                  );
                })}

                {/* --- MORE OPTIONS --- */}
                <MoreOptionsButton content={item} />
              </View>

              {/* Absolute music controlleur */}
              <SoundToggleButton muted={muted} toggleMute={toggleMute} />

              {/* --- Contenu principal --- */}
              <View
                style={{
                  position: "absolute",
                  bottom: 100,
                  paddingHorizontal: 20,
                  width: "100%",
                }}
              >
                {/* Infos Shop */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 22.5, // cercle parfait
                      overflow: "hidden", // important pour que l'image respecte le cercle
                      marginRight: 10,
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item.shop.logo }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                  <Pressable
                    onPress={() => {
                      // toggleMute();
                      Linking.openURL(`${SITE_URL}/${item.shop.slug}`);
                    }}
                  >
                    <Text
                      style={{
                        color: THEME.text,
                        fontFamily: FONTS.subheading,
                        fontSize: TEXT_SIZE.medium,
                      }}
                    >
                      {capitalizeText(item.shop.name)}
                    </Text>
                  </Pressable>
                </View>
                {/* Titre produit */}
                <Text
                  style={{
                    color: THEME.text,
                    fontFamily: FONTS.subheading,
                    fontSize: TEXT_SIZE.large,
                    marginBottom: 6,
                  }}
                >
                  {capitalizeText(item.product.title)}
                </Text>
                {/* Description courte */}
                <Text
                  numberOfLines={2}
                  style={{
                    color: "#aaa",
                    fontFamily: FONTS.body,
                    fontSize: TEXT_SIZE.small,
                    marginBottom: 10,
                  }}
                >
                  {capitalizeText(item.product.description)}
                </Text>
                {/* Tags */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: 18,
                  }}
                >
                  {[
                    "#" + item.product.category,
                    "#" + item.product.type,
                    "#" + item.product.target,
                    item.product.brand && "#" + item.product.brand,
                  ]
                    .filter(Boolean)
                    .map((tag, i) => (
                      <Text
                        key={i}
                        style={{
                          color: THEME.accent,
                          marginRight: 10,
                          fontFamily: FONTS.body,
                          fontSize: TEXT_SIZE.small,
                        }}
                      >
                        {tag}
                      </Text>
                    ))}
                </View>
                {/* Bouton acheter */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => Linking.openURL(item.url)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: THEME.primary,
                    paddingVertical: 14,
                    borderRadius: 14,
                  }}
                >
                  <Ionicons
                    name="cart-outline"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: FONTS.subheading,
                      fontSize: TEXT_SIZE.medium,
                    }}
                  >
                    Acheter • {returnFormatedMoney(item.product.price)}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 2.5,
                      color: "#fff",
                      fontFamily: FONTS.subheading,
                      fontSize: TEXT_SIZE.small,
                    }}
                  >
                    {returnCurrencySymbol(item.product.currency)}
                  </Text>
                  {item.product.discountPercentage && (
                    <View
                      style={{
                        marginLeft: 10,
                        backgroundColor: "#ff4d4d",
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: TEXT_SIZE.small,
                          fontFamily: FONTS.body,
                        }}
                      >
                        -{item.product.discountPercentage}%
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Pressable>
        )}
      />
    </View>
  );
}
