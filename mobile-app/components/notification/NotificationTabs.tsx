import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
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
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.13,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },

  activeTab: {
    backgroundColor: RainbowColors.tangerine,
    borderColor: RainbowColors.tangerine,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  text: {
    fontSize: 13.5,
    color: RainbowColors.stone,
    fontWeight: "600",
  },

  activeText: {
    color: RainbowColors.pureWhite,
    fontWeight: "700",
  },
});