import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  muted: boolean;
  toggleMute: () => void;
};

export default function SoundToggleButton({ muted, toggleMute }: Props) {
  return (
    <TouchableOpacity
      onPress={toggleMute}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.circle}>
        <Ionicons
          name={muted ? "volume-mute" : "volume-high"}
          size={24}
          color="#fff"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30, // juste en dessous des boutons d’action
    right: 20,
    zIndex: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
