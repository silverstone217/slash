import { FONTS, THEME } from "@/lib/styles";
import { ContentType } from "@/types";
import { SITE_URL } from "@/utils/data";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Linking,
  Modal,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProfileContentOptions = ({
  content,
}: {
  content: ContentType;
}) => {
  const [visible, setVisible] = useState(false);

  const url = `${content.url}`;

  // 🔗 Copier le lien
  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(url || content?.url || "");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (Platform.OS === "android") {
      ToastAndroid.show("Lien copié !", ToastAndroid.SHORT);
    }

    setVisible(false);
  };

  // 🌐 Ouvrir le produit
  const handleOpenProduct = async () => {
    if (url) {
      await Linking.openURL(url);
      console.log("inside");
    }
    console.log("outside");
    setVisible(false);
  };

  // 🏬 Ouvrir la boutique
  const handleOpenShop = async () => {
    const shopUrl = `${SITE_URL}/${content.shop.slug}`;
    if (shopUrl) {
      await Linking.openURL(shopUrl);
    }
    setVisible(false);
  };

  // 📤 Partager
  const handleShare = async () => {
    try {
      await Share.share({
        message:
          `Découvre ce produit : ${content?.product?.title}\n` + (url || ""),
      });
    } catch (error) {
      console.error("Erreur de partage :", error);
    }
    setVisible(false);
  };

  // 🚩 Signaler
  const handleReport = () => {
    Haptics.selectionAsync();
    console.log("Signaler :", content?.product.id);
    setVisible(false);
  };

  return (
    <>
      {/* Bouton principal */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Haptics.selectionAsync();
          setVisible(true);
        }}
        style={styles.iconButton}
      >
        <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
      </TouchableOpacity>

      {/* MODAL bottom sheet */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}
      >
        {/* Overlay sombre cliquable */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />

        {/* Contenu principal */}
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.handle} />
            <Text style={styles.title}>Options</Text>

            <Option
              icon="open-outline"
              label="Voir le produit"
              onPress={handleOpenProduct}
            />
            <Option
              icon="storefront-outline"
              label="Voir la boutique"
              onPress={handleOpenShop}
            />
            <Option
              icon="link-outline"
              label="Copier le lien"
              onPress={handleCopyLink}
            />
            <Option
              icon="share-social-outline"
              label="Partager"
              onPress={handleShare}
            />
            <Option
              icon="flag-outline"
              label="Signaler"
              onPress={handleReport}
            />

            {/* Bouton Annuler */}
            <Pressable
              style={styles.cancelButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

// Petite ligne d’option réutilisable
const Option = ({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) => (
  <Pressable style={styles.option} onPress={onPress}>
    <Ionicons name={icon as any} size={22} color="#fff" />
    <Text style={styles.optionText}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 50,
    padding: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modal: {
    backgroundColor: THEME.border,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.subheading,
    color: THEME.secondary,
    textAlign: "center",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "rgba(255,255,255,0.08)",
    borderBottomWidth: 1,
  },
  optionText: {
    color: THEME.text,
    fontSize: 16,
    fontFamily: FONTS.body,
    marginLeft: 12,
  },
  cancelButton: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingVertical: 12,
  },
  cancelText: {
    textAlign: "center",
    color: "#ff6666",
    fontFamily: FONTS.subheading,
    fontSize: 16,
  },
});
