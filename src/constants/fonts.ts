export const fonts = {
  // Font Families
  families: {
    playfair: 'PlayfairDisplay_400Regular',
    playfairBold: 'PlayfairDisplay_700Bold',
    inter: 'Inter_400Regular',
    interSemiBold: 'Inter_600SemiBold',
    interBold: 'Inter_700Bold',
  },
  
  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  // Font Weights
  weights: {
    regular: '400' as '400',
    semiBold: '600' as '600',
    bold: '700' as '700',
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Typography Presets
export const typography = {
  // Headings (Playfair Display)
  h1: {
    fontFamily: fonts.families.playfairBold,
    fontSize: fonts.sizes['5xl'],
    lineHeight: fonts.sizes['5xl'] * fonts.lineHeights.tight,
    fontWeight: fonts.weights.bold,
  },
  h2: {
    fontFamily: fonts.families.playfairBold,
    fontSize: fonts.sizes['4xl'],
    lineHeight: fonts.sizes['4xl'] * fonts.lineHeights.tight,
    fontWeight: fonts.weights.bold,
  },
  h3: {
    fontFamily: fonts.families.playfairBold,
    fontSize: fonts.sizes['3xl'],
    lineHeight: fonts.sizes['3xl'] * fonts.lineHeights.tight,
    fontWeight: fonts.weights.bold,
  },
  h4: {
    fontFamily: fonts.families.playfairBold,
    fontSize: fonts.sizes['2xl'],
    lineHeight: fonts.sizes['2xl'] * fonts.lineHeights.normal,
    fontWeight: fonts.weights.bold,
  },
  h5: {
    fontFamily: fonts.families.playfairBold,
    fontSize: fonts.sizes.xl,
    lineHeight: fonts.sizes.xl * fonts.lineHeights.normal,
    fontWeight: fonts.weights.bold,
  },
  h6: {
    fontFamily: fonts.families.playfairBold,
    fontSize: fonts.sizes.lg,
    lineHeight: fonts.sizes.lg * fonts.lineHeights.normal,
    fontWeight: fonts.weights.bold,
  },
  
  // Body Text (Inter)
  bodyLarge: {
    fontFamily: fonts.families.inter,
    fontSize: fonts.sizes.lg,
    lineHeight: fonts.sizes.lg * fonts.lineHeights.relaxed,
    fontWeight: fonts.weights.regular,
  },
  body: {
    fontFamily: fonts.families.inter,
    fontSize: fonts.sizes.base,
    lineHeight: fonts.sizes.base * fonts.lineHeights.relaxed,
    fontWeight: fonts.weights.regular,
  },
  bodySmall: {
    fontFamily: fonts.families.inter,
    fontSize: fonts.sizes.sm,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.relaxed,
    fontWeight: fonts.weights.regular,
  },
  
  // Labels & Buttons
  buttonLarge: {
    fontFamily: fonts.families.interBold,
    fontSize: fonts.sizes.lg,
    lineHeight: fonts.sizes.lg * fonts.lineHeights.tight,
    fontWeight: fonts.weights.bold,
  },
  button: {
    fontFamily: fonts.families.interBold,
    fontSize: fonts.sizes.base,
    lineHeight: fonts.sizes.base * fonts.lineHeights.tight,
    fontWeight: fonts.weights.bold,
  },
  buttonSmall: {
    fontFamily: fonts.families.interSemiBold,
    fontSize: fonts.sizes.sm,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.tight,
    fontWeight: fonts.weights.semiBold,
  },
  
  // Captions & Labels
  caption: {
    fontFamily: fonts.families.inter,
    fontSize: fonts.sizes.xs,
    lineHeight: fonts.sizes.xs * fonts.lineHeights.normal,
    fontWeight: fonts.weights.regular,
  },
  label: {
    fontFamily: fonts.families.interSemiBold,
    fontSize: fonts.sizes.sm,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.normal,
    fontWeight: fonts.weights.semiBold,
  },
  
  // Special
  display: {
    fontFamily: fonts.families.playfairBold,
    fontSize: fonts.sizes['6xl'],
    lineHeight: fonts.sizes['6xl'] * fonts.lineHeights.tight,
    fontWeight: fonts.weights.bold,
  },
};

export type Typography = typeof typography;
export type Fonts = typeof fonts;