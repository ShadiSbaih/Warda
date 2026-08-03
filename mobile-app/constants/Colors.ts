// Glow Design System — constants/Colors.ts
// Source of truth for all Glow design tokens.
// design.md reference: "Magenta pulse on porcelain white."

export const GlowColors = {
  // Core Brand
  voltageMagenta: "#cc62d5",   // Filled buttons, link borders, brand accents — the single saturated accent
  emberOrange: "#ec660d",      // NEW badges, lightning-bolt icons, warm accent punctuation
  signalRed: "#e83b47",        // Red wash for highlight backgrounds, decorative bands

  // Neutrals
  inkBlack: "#131517",         // Primary text, all borders, dark button surface, icon strokes
  porcelain: "#f4f5f6",        // Page background, feature card surfaces, phone-mockup panels
  pureWhite: "#ffffff",        // Card surfaces, button fills, the lifted top layer
  graphite: "#333537",         // Dark filled-button variant, high-contrast surfaces
  stone: "#737577",            // Body text, icon strokes, supporting metadata
  mist: "#b3b5b7",             // Light borders, link underlines, disabled dividers

  // NEW Badge surface
  peachBadge: "#fef0e8",       // Background for NEW announcement badges

  // Surfaces
  porcelainCanvas: "#f4f5f6",  // Level-0: page floor, the off-white floor beneath all content
  pureWhiteCard: "#ffffff",    // Level-1: card surfaces, lifted top layer
  inkSurface: "#131517",       // Level-2: dark filled buttons, inverted moments
};

export const GlowRadii = {
  cards: 40,       // Product cards and phone-mockup cradles — gallery-like enclosure
  pills: 100,      // Full pill — nav links, tags
  small: 8,        // Small UI elements
  badges: 4,       // NEW announcement badge — sharp 4px deliberately contrasts pill buttons
  buttons: 19,     // All buttons — the signature half-pill shape language
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
  tangerine: GlowColors.voltageMagenta,   // Primary accent: was orange, now magenta
  hotPink: GlowColors.voltageMagenta,
  skyTint: GlowColors.porcelain,
  coralEdge: GlowColors.emberOrange,
  skyCanvas: GlowColors.pureWhite,
  cloudSurface: GlowColors.porcelain,
  pastelGradientAtmosphere: GlowColors.porcelain,
  featureColorBlock: GlowColors.voltageMagenta,

  // Gradient arrays (kept as const tuples for LinearGradient compatibility)
  cottonSkyColors: [GlowColors.porcelain, GlowColors.pureWhite, GlowColors.porcelain] as const,
  lavenderMistColors: [GlowColors.porcelain, GlowColors.pureWhite, GlowColors.porcelain] as const,
};

export const RainbowRadii = {
  cards: GlowRadii.cards,          // 40px
  icons: GlowRadii.small,          // 8px
  pills: GlowRadii.pills,          // 100px
  buttons: GlowRadii.buttons,      // 19px
  deviceFrames: GlowRadii.cards,   // 40px
};
