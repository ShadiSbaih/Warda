import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  "All",
  "Orders",
  "Promotions",
];

export default function NotificationTabs({
  active,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            active === tab &&
              styles.activeTab,
          ]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={[
              styles.text,
              active === tab &&
                styles.activeText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 16,
  },

  tab: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3E5ED",
  },

  activeTab: {
    backgroundColor: "#D4588A",
    borderColor: "#D4588A",
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  text: {
    fontSize: 13.5,
    color: "#8E8292",
    fontWeight: "600",
  },

  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});