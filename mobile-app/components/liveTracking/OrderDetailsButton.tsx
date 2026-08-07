import React from "react";

import { WardaButton } from "../ui";

export default function OrderDetailsButton({ onPress }: { onPress?: () => void }) {
  return <WardaButton title="Order Details" size="lg" onPress={onPress} />;
}
