import React, { useEffect, useState } from "react";
import { Image, ImageProps } from "react-native";

type CatalogItem = {
  name?: string;
  title?: string;
  category?: string;
  image?: any;
};

interface Props extends Omit<ImageProps, "source"> {
  item: CatalogItem;
  type?: "product" | "category";
}

const productFallbacks = {
  chocolate: require("../../assets/gifts/chocolate-box.png"),
  roses: require("../../assets/gifts/red-roses.png"),
  whiteRoses: require("../../assets/gifts/white-roses-v2.png"),
  mixed: require("../../assets/gifts/mixed-bouquet.png"),
  graduation: require("../../assets/gifts/graduation-box-v2.png"),
  birthday: require("../../assets/gifts/birthday-bouquet-v2.png"),
  custom: require("../../assets/gifts/custom-hamper-v2.png"),
};

const categoryFallbacks = {
  roses: require("../../assets/categories/roses.png"),
  chocolate: require("../../assets/categories/chocolate.png"),
  graduation: require("../../assets/categories/graduation.png"),
  birthday: require("../../assets/categories/birthday.png"),
  custom: require("../../assets/categories/custom-box.png"),
  cake: require("../../assets/categories/cake-icon.png"),
};

function getKey(item: CatalogItem) {
  return (item.name || item.title || "") + " " + (item.category || "");
}

export function getCatalogFallback(item: CatalogItem, type: "product" | "category" = "product") {
  const key = getKey(item).toLowerCase();
  const assets = type === "category" ? categoryFallbacks : productFallbacks;

  if (key.includes("chocolate")) return assets.chocolate;
  if (key.includes("graduation")) return assets.graduation;
  if (key.includes("birthday") || key.includes("birthdays")) return assets.birthday;
  if (key.includes("cake")) return type === "category" ? categoryFallbacks.cake : productFallbacks.birthday;
  if (key.includes("custom") || key.includes("anniversary")) return assets.custom;
  if (key.includes("white rose")) {
    return type === "category" ? categoryFallbacks.roses : productFallbacks.whiteRoses;
  }
  if (key.includes("mixed") || key.includes("joyful")) {
    return type === "category" ? categoryFallbacks.roses : productFallbacks.mixed;
  }
  return assets.roses;
}

function resolveSource(image: any) {
  return typeof image === "string" && image ? { uri: image } : image;
}

export default function CatalogImage({ item, type = "product", ...props }: Props) {
  const fallback = getCatalogFallback(item, type);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [item.image]);

  return (
    <Image
      {...props}
      source={failed || type === "category" ? fallback : resolveSource(item.image) || fallback}
      onError={() => setFailed(true)}
    />
  );
}
