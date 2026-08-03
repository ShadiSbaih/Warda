// Glow Design System — constants/Colors.ts
// Source of truth for all Glow design tokens.
// design.md reference: "Magenta pulse on porcelain white."

export const GlowColors = {
  // Core Brand
  voltageMagenta: "#e66767",   // Soft salmon pink for icons, buttons, active states
  emberOrange: "#e66767",      // Mapped to the same soft pink
  signalRed: "#e83b47",        // Red wash for highlight backgrounds, decorative bands

  // Neutrals
  inkBlack: "#1a1a1a",         // Primary text, dark elements
  porcelain: "#f6f6f6",        // Page background, feature card surfaces
  pureWhite: "#ffffff",        // Card surfaces, button fills
  graphite: "#333537",         // Dark filled-button variant
  stone: "#888888",            // Body text, icon strokes, supporting metadata
  mist: "#e0e0e0",             // Light borders, link underlines

  // NEW Badge surface
  peachBadge: "#ffecec",       // Background for active pills and badges

  // Surfaces
  porcelainCanvas: "#fcfcfc",  // Level-0: page floor
  pureWhiteCard: "#ffffff",    // Level-1: card surfaces
  inkSurface: "#1a1a1a",       // Level-2: dark filled buttons
};

export const GlowRadii = {
  cards: 24,       // Product cards and phone-mockup cradles
  pills: 100,      // Full pill — nav links, tags
  small: 8,        // Small UI elements
  badges: 4,       // NEW announcement badge
  buttons: 19,     // All buttons
};

// ── Back-compat aliases ────────────────────────────────────────────────────────
// Allows existing RainbowColors/RainbowRadii imports to keep compiling.
// Gradually migrate call sites to GlowColors/GlowRadii.
export const RainbowColors = {
  // Map old Rainbow tokens to new Glow equivalents
  inkBlack: GlowColors.inkBlack,
  pureWhite: GlowColors.pureWhite,
  cloudGray: GlowColors.porcelain,
  mistGray: GlowColors.mist,
  pebbleGray: GlowColors.mist,
  stone: GlowColors.stone,
  trueBlack: GlowColors.inkBlack,
  tangerine: GlowColors.voltageMagenta,   // Primary accent: soft salmon pink
  hotPink: GlowColors.voltageMagenta,
  skyTint: GlowColors.porcelain,
  coralEdge: GlowColors.emberOrange,
  skyCanvas: GlowColors.pureWhite,
  cloudSurface: GlowColors.porcelain,
  pastelGradientAtmosphere: GlowColors.porcelain,
  featureColorBlock: GlowColors.voltageMagenta,
  peachBadge: GlowColors.peachBadge,
  porcelainCanvas: GlowColors.porcelainCanvas,

  // Gradient arrays (kept as const tuples for LinearGradient compatibility)
  cottonSkyColors: ["#fff0f0", "#ffe5e5", "#ffdbdb"] as const,
  lavenderMistColors: [GlowColors.porcelain, GlowColors.pureWhite, GlowColors.porcelain] as const,
};

export const RainbowRadii = {
  cards: GlowRadii.cards,          // 40px
  icons: GlowRadii.small,          // 8px
  pills: GlowRadii.pills,          // 100px
  buttons: GlowRadii.buttons,      // 19px
  deviceFrames: GlowRadii.cards,   // 40px
};
