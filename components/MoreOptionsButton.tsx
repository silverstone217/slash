import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const MoreOptionsButton = ({ content }: { content: any }) => {
  const [visible, setVisible] = useState(false);

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(content.url);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (Platform.OS === "android") {
      ToastAndroid.show("Lien copié !", ToastAndroid.SHORT);
    }
    setVisible(false);
  };

  const handleOpenSite = async () => {
    await Linking.openURL(content.url);
    setVisible(false);
  };

  const handleHide = () => {
    Haptics.selectionAsync();
    console.log("Masquer :", content.id);
    setVisible(false);
  };

  const handleReport = () => {
    Haptics.selectionAsync();
    console.log("Signaler :", content.id);
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
        <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
      </TouchableOpacity>

      {/* MODAL visible sur Android + iOS */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}
      >
        {/* Overlay sombre cliquable */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />

        {/* Contenu de la bottom sheet */}
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.handle} />
            <Text style={styles.title}>Plus d’options</Text>

            <Option
              icon="link-outline"
              label="Copier le lien"
              onPress={handleCopyLink}
            />
            <Option
              icon="open-outline"
              label="Ouvrir sur le site"
              onPress={handleOpenSite}
            />
            <Option
              icon="eye-off-outline"
              label="Masquer ce contenu"
              onPress={handleHide}
            />
            <Option
              icon="flag-outline"
              label="Signaler"
              onPress={handleReport}
            />

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
    padding: 10,
    borderRadius: 50,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modal: {
    backgroundColor: "#111",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#444",
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
    textAlign: "center",
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#222",
    borderRadius: 12,
    paddingVertical: 12,
  },
  cancelText: {
    textAlign: "center",
    color: "#ff5555",
    fontWeight: "600",
    fontSize: 16,
  },
});
