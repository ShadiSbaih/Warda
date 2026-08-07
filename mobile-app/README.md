# 🌹 Warda — Mobile Client Application

[![Expo SDK](https://img.shields.io/badge/Expo-v54.0-000000.svg?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.9-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

The mobile client application for **Warda (وردة)**, built with [Expo SDK 54](https://expo.dev), [React Native 0.81](https://reactnative.dev), and TypeScript.

> 📌 **For full stack documentation, backend setup, environment details, and architecture overview, please refer to the [Root README](../README.md).**

---

## 📱 Features

- 🌸 **Floral & Gift Catalogue**: Explore rose bouquets, customized gift hampers, chocolates, and celebration packages.
- 💌 **Personalized Card Engine**: Add custom gift cards with choice of font styles and personal notes.
- 🎨 **Wrapping Options**: Choose ribbon styles, wrapping paper colors, and photo attachments.
- 📅 **Scheduled & Anonymous Delivery**: Choose specific delivery windows or send anonymous gifts.
- 🔔 **Occasion Reminders**: Automated notifications for upcoming birthdays, anniversaries, and graduations.
- 📍 **Real-Time Delivery Tracking**: Live order location updates powered by Socket.io and React Native Maps.
- 💬 **Live In-App Support**: Real-time chat with support agents.

---

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   Set `EXPO_PUBLIC_API_URL` to your backend server URL (e.g. `http://localhost:5000/api`).

3. **Start Development Server**:
   ```bash
   npm run start
   ```

---

## 🛠️ Available Scripts

- `npm run start`: Launch Metro bundler server via Expo.
- `npm run android`: Open application in Android emulator / connected device.
- `npm run ios`: Open application in iOS simulator.
- `npm run web`: Serve web bundle preview.
- `npm run lint`: Run ESLint checks.

---

## 📄 License

Licensed under the [MIT License](../README.md#-license).
