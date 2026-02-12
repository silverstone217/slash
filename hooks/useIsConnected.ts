// hooks/useIsConnected.ts
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useIsConnected() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    // S'abonne aux changements d'état du réseau
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
}
