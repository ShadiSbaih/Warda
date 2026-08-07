import { useTheme } from "@/context/ThemeContext";
import React, { useMemo, useState } from "react";

import {
    ScrollView,
    StatusBar,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationCard from "../components/notification/NotificationCard";
import NotificationHeader from "../components/notification/NotificationHeader";
import NotificationTabs from "../components/notification/NotificationTabs";

import { notifications } from "../data/notifications";

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [activeTab, setActiveTab] =
    useState("All");

  const filteredNotifications =
    useMemo(() => {
      if (activeTab === "All") {
        return notifications;
      }

      return notifications.filter(
        (item) =>
          item.category === activeTab
      );
    }, [activeTab]);

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        <NotificationHeader />

        <NotificationTabs
          active={activeTab}
          onChange={setActiveTab}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.content
          }
        >
          {filteredNotifications.map(
            (item) => (
              <NotificationCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                message={item.message}
                time={item.time}
              />
            )
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    paddingBottom: 40,
  },
});