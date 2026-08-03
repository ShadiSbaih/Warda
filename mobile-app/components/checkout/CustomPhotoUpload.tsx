import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

interface Props {
  onPhotoSelected?: (uri: string) => void;
}

export default function CustomPhotoUpload({ onPhotoSelected }: Props) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      onPhotoSelected?.(uri);
    }
  };

  const handleRemove = () => {
    setPhotoUri(null);
    onPhotoSelected?.("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Feather name="image" size={18} color={RainbowColors.tangerine} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Custom Photo for the Gift</Text>
          <Text style={styles.subtitle}>Add a personal touch</Text>
        </View>
      </View>

      {/* Upload Area */}
      {photoUri ? (
        <View style={styles.previewWrapper}>
          <Image source={{ uri: photoUri }} style={styles.preview} />

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={handleRemove}
            activeOpacity={0.8}
          >
            <Feather name="x" size={14} color={RainbowColors.pureWhite} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.changeBtn}
            onPress={handlePickImage}
            activeOpacity={0.8}
          >
            <Feather name="edit-2" size={14} color={RainbowColors.tangerine} />
            <Text style={styles.changeBtnText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadArea}
          onPress={handlePickImage}
          activeOpacity={0.8}
        >
          <View style={styles.uploadIcon}>
            <Feather name="upload-cloud" size={28} color={RainbowColors.tangerine} />
          </View>
          <Text style={styles.uploadText}>Tap to pick a photo</Text>
          <Text style={styles.uploadHint}>JPG, PNG — up to 5MB</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 18,
    padding: 16,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FCE4EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A2E",
  },

  subtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },

  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: RainbowColors.cloudSurface,
    borderRadius: 14,
    paddingVertical: 28,
    alignItems: "center",
    backgroundColor: RainbowColors.cloudSurface,
  },

  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FCE4EC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  uploadText: {
    fontSize: 15,
    fontWeight: "600",
    color: RainbowColors.tangerine,
  },

  uploadHint: {
    fontSize: 12,
    color: "#C5A8B8",
    marginTop: 4,
  },

  previewWrapper: {
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "center",
  },

  preview: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    resizeMode: "cover",
  },

  removeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: RainbowColors.tangerine,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  changeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },

  changeBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: RainbowColors.tangerine,
  },
});
