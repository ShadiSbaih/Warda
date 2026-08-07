/**
 * Warda Design System — Global tokens
 *
 * Single source of truth for colors, typography, spacing, radii, shadows, etc.
 * Components and screens should consume these through the ThemeProvider/useTheme.
 */

export const palette = {
  brand: {
    50: "#FFF0F3",
    100: "#FFD6E0",
    200: "#FFADC2",
    300: "#FF7A9A",
    400: "#F04E77",
    500: "#E66767", // primary brand
    600: "#D14A5A",
    700: "#B52D46",
    800: "#97253D",
    900: "#7B1F37",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#F6F6F6",
    100: "#EEEEEE",
    200: "#E0E0E0",
    300: "#CACACA",
    400: "#A0A0A0",
    500: "#888888",
    600: "#6B6B6B",
    700: "#333537",
    800: "#1A1A1A",
    900: "#111111",
  },
  semantic: {
    success: "#10B981",
    successLight: "#ECFDF5",
    warning: "#F59E0B",
    warningLight: "#FFFBEB",
    error: "#EF4444",
    errorLight: "#FEF2F2",
    info: "#3B82F6",
    infoLight: "#EFF6FF",
  },
};

export const colors = {
  // Backgrounds
  background: palette.neutral[50],
  surface: palette.neutral[0],
  surfaceElevated: palette.neutral[0],
  overlay: "rgba(0, 0, 0, 0.45)",

  // Text
  text: palette.neutral[800],
  textMuted: palette.neutral[500],
  textInverse: palette.neutral[0],
  textPlaceholder: palette.neutral[400],

  // Brand
  brand: palette.brand[500],
  brandLight: palette.brand[50],
  brandDark: palette.brand[700],

  // Emotional accent (rose/hot pink)
  love: palette.brand[500],

  // Utility
  border: palette.neutral[200],
  borderSubtle: palette.neutral[100],
  divider: palette.neutral[100],

  // Status
  success: palette.semantic.success,
  successSurface: palette.semantic.successLight,
  warning: palette.semantic.warning,
  warningSurface: palette.semantic.warningLight,
  error: palette.semantic.error,
  errorSurface: palette.semantic.errorLight,
  info: palette.semantic.info,
  infoSurface: palette.semantic.infoLight,

  // Gradients
  gradientBrand: [palette.brand[50], palette.brand[100], palette.brand[50]] as const,
  gradientDark: [palette.neutral[800], palette.neutral[900]] as const,
};

export const typography = {
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 22,
    "2xl": 28,
  },
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },
  lineHeights: {
    tight: 20,
    normal: 24,
    relaxed: 28,
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  16: 64,
};

export const radii = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 28,
  full: 999,
};

export const shadows = {
  none: {},
  sm: {
    shadowColor: palette.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  md: {
    shadowColor: palette.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  lg: {
    shadowColor: palette.neutral[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 6,
  },
  xl: {
    shadowColor: palette.neutral[900],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 10,
  },
  brand: {
    shadowColor: palette.brand[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const transition = {
  duration: 200,
};

export type Theme = typeof theme;

export const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  transition,
  isDark: false,
};
