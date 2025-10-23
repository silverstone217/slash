import { useUserStore } from "@/lib/store";
import { generateUsername } from "@/utils/functions";
import { useEffect } from "react";
// import { BACKEND_URL } from "@/utils/data";

export default function UsernameInitializer() {
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);

  // const tokenId = useUserStore((state) => state.preferences.id);
  // const setTokenId = useUserStore((state) => state.setId);

  /**
   * Étape 1 : Génère un username si inexistant
   */
  useEffect(() => {
    if (!username) {
      const newUsername = generateUsername();
      setUsername(newUsername);
      console.log("👤 Nouveau username généré :", newUsername);
    }
  }, [setUsername, username]); // exécuté une seule fois au montage

  /**
   * Étape 2 : Envoie le username au backend pour obtenir un token
   */

  return null; // pas d’affichage
}
