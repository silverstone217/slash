import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ContentType } from "@/types"; // ✅ importe ton type de contenu

type Preferences = {
  showAds: boolean;
  categories: string[];
  gender: "M" | "F" | "O" | "K";
  id: string;
};

type UserState = {
  username: string | null;
  preferences: Preferences;
  isNewUser: boolean;
  viewedProductIds: string[];
  contentsRegistered: ContentType[];

  // 🔹 actions
  setUsername: (name: string) => void;
  toggleAds: () => void;
  setCategories: (categories: string[]) => void;
  setGender: (gender: "M" | "F" | "O" | "K") => void;
  setId: (id: string) => void;
  setIsNewUser: (isNew: boolean) => void;
  addViewedProductId: (id: string) => void;
  resetViewedProducts: () => void;
  toggleRegisterContent: (content: ContentType) => void;
  isContentRegistered: (id: string) => boolean;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: null,
      preferences: {
        showAds: true,
        categories: [],
        gender: "O",
        id: "",
      },
      isNewUser: true,
      viewedProductIds: [],
      contentsRegistered: [],

      addViewedProductId: (id) =>
        set((state) => {
          if (state.viewedProductIds.includes(id)) return state;
          return {
            viewedProductIds: [...state.viewedProductIds, id],
          };
        }),

      resetViewedProducts: () => set({ viewedProductIds: [] }),

      setUsername: (name) => set({ username: name }),

      toggleAds: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            showAds: !state.preferences.showAds,
          },
        })),

      setCategories: (categories) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            categories,
          },
        })),

      setGender: (gender) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            gender,
          },
        })),

      setId: (id) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            id,
          },
        })),

      setIsNewUser: (isNew) => set({ isNewUser: isNew }),

      // ✅ Ajouter ou retirer un contenu sauvegardé
      toggleRegisterContent: (content) =>
        set((state) => {
          const exists = state.contentsRegistered.some(
            (c) => c.product.id === content.product.id
          );
          if (exists) {
            // Supprimer
            return {
              contentsRegistered: state.contentsRegistered.filter(
                (c) => c.product.id !== content.product.id
              ),
            };
          } else {
            // Ajouter
            return {
              contentsRegistered: [content, ...state.contentsRegistered],
            };
          }
        }),

      // ✅ Vérifier si un contenu est sauvegardé
      isContentRegistered: (id) => {
        return get().contentsRegistered.some((c) => c.product.id === id);
      },

      reset: () =>
        set({
          username: null,
          preferences: { showAds: true, categories: [], gender: "O", id: "" },
          isNewUser: true,
          viewedProductIds: [],
          contentsRegistered: [],
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        username: state.username,
        preferences: state.preferences,
        isNewUser: state.isNewUser,
        viewedProductIds: state.viewedProductIds,
        contentsRegistered: state.contentsRegistered, // ✅ persiste aussi les sauvegardés
      }),
    }
  )
);
