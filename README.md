# 🚀 Slash – Social Commerce Infinite Feed App

**Slash** is a modern mobile social commerce application built with **Expo (SDK 54+)**, **React Native**, and **TypeScript**.

It delivers a TikTok-style infinite scrolling experience where users discover products in a full-screen vertical feed and instantly contact sellers via WhatsApp or external shop links.

---

## 📱 Concept

Slash reimagines mobile commerce through a **direct-to-seller interaction model**.

Instead of traditional cart and checkout systems, users:

- Scroll through immersive full-screen product images
- Discover one product at a time
- Tap **Order** to directly contact the seller
- Get redirected to:
  - WhatsApp (if the seller provided a number)
  - An external store link (if available)

This approach prioritizes simplicity, speed, and social commerce dynamics.

---

## 🧱 Tech Stack

### Core

- Expo SDK 54+
- React Native
- TypeScript

### State & Storage

- Zustand (lightweight global state management)
- AsyncStorage (persistent local storage)

### Architecture Principles

- Functional components with hooks
- Centralized store logic
- Modular folder structure
- Reusable UI components
- Performance-optimized infinite lists

---

## 🔥 Key Features

### 🔄 Infinite Vertical Product Feed

- Full-screen immersive experience
- Smooth virtualization
- Lazy loading strategy
- Optimized re-render control

### 🛒 Direct Purchase Flow

Each product includes an **Order** button.

Redirection logic:

1. If `whatsappNumber` exists → Generate WhatsApp deep link
2. Else if `externalLink` exists → Open vendor website
3. Else → Graceful fallback handling

Demonstrates:

- React Native Linking API usage
- Conditional deep linking
- External app navigation handling

### 💾 Persistent State Management

- Zustand store hydration
- AsyncStorage persistence middleware
- Cached state restoration on app launch

### ⚡ Performance Optimizations

- FlatList optimization strategy
- Memoized components
- Selective Zustand subscriptions
- Reduced unnecessary global re-renders

---

## 🧠 State Management Strategy

Slash uses **Zustand** for predictable and scalable global state management.

Responsibilities handled by the store:

- Fetching paginated products
- Managing loading & pagination state
- Triggering infinite scroll loading
- Persisting required state locally

This avoids Redux boilerplate while maintaining architectural clarity.

---

## 📂 Project Structure

```
src/
 ├── app/
 │    ├── _layout.tsx
 │    ├── index.tsx
 │
 ├── screens/
 │    ├── HomeScreen.tsx
 │
 ├── lib/
 │    ├── store.ts
 │    ├── styles.ts
 │
 │
 ├── utils/
 │    ├── data.ts
 │    ├── functions.ts
 │
 └── types/
      ├── index.ts
```

---

## 🔗 Deep Linking Implementation

When a user presses **Order**:

- A WhatsApp deep link is dynamically generated if a number is provided
- Otherwise, the external store URL is opened
- Linking API handles redirection outside the app

This reflects real-world mobile commerce interaction patterns and external service integration.

---

## 🛠️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/silverstone217/slash.git
cd slash
```

### Install dependencies

```bash
npm install
```

### Start the Expo development server

```bash
npx expo start
```

---

## 📦 Production Build (EAS)

```bash
eas build --platform android
eas build --platform ios
```

---

## 🧪 What Slash Demonstrates

- Clean and modular mobile architecture
- Scalable state management using Zustand
- Type-safe development with TypeScript
- Performance-aware infinite feed implementation
- Social commerce UX patterns
- External deep linking strategy

Slash is designed as a portfolio-grade project intended for technical recruiters and engineering reviewers.

---

## 🌍 Repository

GitHub Repository:

👉 [https://github.com/silverstone217/slash](https://github.com/silverstone217/slash)

---

## 📲 Test the Application

To test the production-ready version of Slash, download it here:

👉 [https://servi-hub.vercel.app/applications/slash](https://servi-hub.vercel.app/applications/slash)

---

## 🚀 Future Improvements

- Authentication system
- Backend-powered pagination
- Favorites / likes system
<!-- * Seller verification badge -->
- Analytics integration
- Push notifications
  <!-- * In-app chat system -->
  <!-- * Monetization layer -->

---

## 👤 Author

Silverstone217
React Native Developer – Expo | TypeScript | Zustand

---

If needed, this README can be adapted to:

- A more architecture-focused senior version
- A startup pitch version
- A technical deep-dive version
- An interview-oriented version with design trade-offs section
