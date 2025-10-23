import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

  setUsername: (name: string) => void;
  toggleAds: () => void;
  setCategories: (categories: string[]) => void;
  setGender: (gender: "M" | "F" | "O" | "K") => void;
  setId: (id: string) => void;
  setIsNewUser: (isNew: boolean) => void;
  addViewedProductId: (id: string) => void;
  resetViewedProducts: () => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      preferences: {
        showAds: true,
        categories: [],
        gender: "O",
        id: "",
      },
      isNewUser: true,
      viewedProductIds: [],

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

      reset: () =>
        set({
          username: null,
          preferences: { showAds: true, categories: [], gender: "O", id: "" },
          isNewUser: true,
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
      }),
    }
  )
);
