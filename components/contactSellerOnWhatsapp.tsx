import { THEME } from "@/lib/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
  name: string;
  price: number;
  currency: string;
  image: string;
  whatsapp: string; // numéro vendeur
};

// FONCTION UTILITAIRE
export const contactSellerOnWhatsapp = async (product: Product) => {
  try {
    const phone = product.whatsapp.replace(/^0/, "+243"); // Congo

    const message = `
Bonjour 👋

Je suis intéressé par ce produit :

🛍️ ${product.name}
💰 ${product.price} ${product.currency}

📸 Image :
${product.image}

Pouvez-vous me donner plus d'informations ?
`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    await Linking.openURL(url);
  } catch (error) {
    console.log(error);
    Alert.alert("Erreur", "Impossible d'ouvrir WhatsApp");
  }
};

type Props = {
  currency: string;
  image: string;
  name: string;
  price: number;
  whatsapp: string;
};

// COMPOSANT DEFAULT
export const ContactSellerOnWhatsapp = (props: Props) => {
  const handlePress = () => {
    contactSellerOnWhatsapp({
      name: props.name,
      price: props.price,
      currency: props.currency,
      image: props.image,
      whatsapp: props.whatsapp,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={styles.buyButton} // Utilise ton style existant
    >
      <View style={styles.buyButtonTextContainer}>
        {/* Icône WhatsApp pour remplacer le panier */}
        <Ionicons name="logo-whatsapp" size={24} color="#000" />

        <Text style={styles.buyButtonText}>
          {/* Formatage similaire à ton bouton d'achat */}
          Contacter • {props.price} {props.currency}
        </Text>
      </View>

      {/* Optionnel : Un petit badge pour rappeler que c'est WhatsApp ou une promo */}
      {/* <View style={styles.discountBadge}>
        <Text style={styles.discountText}>LIVE</Text>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
