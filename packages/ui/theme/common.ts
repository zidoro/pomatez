import type * as Stitches from "@stitches/react";
import { defaultThemeMap as defaultStitchesThemeMap } from "@stitches/react";

export const defaultTokens = {
  fonts: {
    sans: "Noto-Sans, sans-serif;",
    round: "Typo-Round, sans-serif",
  },
  fontSizes: {
    xs: "1.2rem",
    sm: "1.4rem",
    md: "1.6rem",
    lg: "1.8rem",
    xl: "2rem",
    "2xl": "2.4rem",
    "3xl": "3rem",
    "4xl": "3.6rem",
    "5xl": "4.8rem",
    "6xl": "3.75rem",
    "7xl": "6rem",
    "8xl": "7.2rem",
    "9xl": "12.8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    xs: 1,
    sm: 1.25,
    md: 1.5,
    lg: 1.75,
    xl: 1.75,
    "2xl": 2,
    "3xl": 2.25,
    "4xl": 2.5,
    "5xl": 1,
    "6xl": 1,
    "7xl": 1,
    "8xl": 1,
    "9xl": 1,
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  space: {
    0: "0rem",
    xs: "0.8rem",
    sm: "1.2rem",
    md: "1.6rem",
    lg: "2rem",
    xl: "3.6rem",
    "2xl": "4.8rem",
    "3xl": "8rem",
    "4xl": "16rem",
    "5xl": "22.4rem",
    "6xl": "28.8rem",
    "7xl": "38.4rem",
    "8xl": "51.2rem",
    "9xl": "64rem",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    screen: "100vw",
    full: "100%",
    px: "1px",
    1: "0.2rem",
    2: "0.4rem",
    3: "0.6rem",
    4: "0.8rem",
    5: "1rem",
    6: "1.2rem",
    7: "1.4rem",
    8: "1.6rem",
    9: "2rem",
    10: "2.4rem",
    11: "2.8rem",
    12: "3.2rem",
    13: "3.6rem",
    14: "4rem",
    15: "4.4rem",
    16: "4.8rem",
    17: "6rem",
    18: "6.4rem",
    20: "8rem",
    24: "9.6rem",
    28: "11.2rem",
    32: "12.8rem",
    36: "14.4rem",
    40: "16rem",
    44: "17.6rem",
    48: "19.2rem",
    52: "20.8rem",
    56: "22.4rem",
    60: "24rem",
    64: "25.6rem",
    72: "28.8rem",
    80: "32rem",
    96: "38.4rem",
  },
  radii: {
    xs: "0.2rem",
    sm: "0.4rem",
    md: "0.6rem",
    lg: "0.8rem",
    xl: "1.2rem",
    "2xl": "1.6rem",
    "3xl": "2.4rem",
    squared: "33%",
    rounded: "50%",
    pill: "9999px",
  },
  zIndices: {
    1: "100",
    2: "200",
    3: "300",
    4: "400",
    5: "500",
    10: "1000",
    max: "9999",
  },
  borderWeights: {
    light: "1px",
    normal: "2px",
    bold: "3px",
    extrabold: "4px",
    black: "5px",
  },
  transitions: {
    default: "all 250ms ease",
    button:
      "background 0.25s ease 0s, color 0.25s ease 0s, border-color 0.25s ease 0s, box-shadow 0.25s ease 0s, transform 0.25s ease 0s, opacity 0.25s ease 0s",
    avatar: "box-shadow 0.25s ease 0s, opacity 0.25s ease 0s",
    card: "transform 0.25s ease 0s, filter 0.25s ease 0s, box-shadow 0.25s ease 0s",
    dropdownItem:
      "background 0.12s ease, transform 0.12s ease, color 0.12s ease, box-shadow 0.12s ease 0s",
  },
  breakpoints: {
    xs: "650px",
    sm: "960px",
    md: "1280px",
    lg: "1400px",
    xl: "1920px",
  },
};

export const defaultColors = {
  // generic colors
  white: "#ffffff",
  black: "#000000",

  // brand colors
  primaryLight: "$blue200",
  primaryLightHover: "$blue300",
  primaryLightActive: "$blue400",
  primaryLightContrast: "$blue600",
  primary: "$blue600",
  primaryBorder: "$blue500",
  primaryBorderHover: "$blue600",
  primarySolidHover: "$blue700",
  primarySolidContrast: "$white",
  primaryShadow: "$blue500",

  secondaryLight: "$purple200",
  secondaryLightHover: "$purple300",
  secondaryLightActive: "$purple400",
  secondaryLightContrast: "$purple600",
  secondary: "$purple600",
  secondaryBorder: "$purple500",
  secondaryBorderHover: "$purple600",
  secondarySolidHover: "$purple700",
  secondarySolidContrast: "$white",
  secondaryShadow: "$purple500",

  successLight: "$green200",
  successLightHover: "$green300",
  successLightActive: "$green400",
  successLightContrast: "$green700",
  success: "$green600",
  successBorder: "$green500",
  successBorderHover: "$green600",
  successSolidHover: "$green700",
  successSolidContrast: "$white",
  successShadow: "$green500",

  warningLight: "$yellow200",
  warningLightHover: "$yellow300",
  warningLightActive: "$yellow400",
  warningLightContrast: "$yellow700",
  warning: "$yellow600",
  warningBorder: "$yellow500",
  warningBorderHover: "$yellow600",
  warningSolidHover: "$yellow700",
  warningSolidContrast: "$white",
  warningShadow: "$yellow500",

  errorLight: "$red200",
  errorLightHover: "$red300",
  errorLightActive: "$red400",
  errorLightContrast: "$red600",
  error: "$red600",
  errorBorder: "$red500",
  errorBorderHover: "$red600",
  errorSolidHover: "$red700",
  errorSolidContrast: "$white",
  errorShadow: "$red500",

  neutralLight: "$gray100",
  neutralLightHover: "$gray200",
  neutralLightActive: "$gray300",
  neutralLightContrast: "$gray800",
  neutral: "$gray600",
  neutralBorder: "$gray400",
  neutralBorderHover: "$gray500",
  neutralSolidHover: "$gray600",
  neutralSolidContrast: "$white",
  neutralShadow: "$gray400",

  gradient:
    "linear-gradient(112deg, $cyan600 -63.59%, $pink600 -20.3%, $blue600 70.46%)",

  // accents
  accents0: "$gray50",
  accents1: "$gray100",
  accents2: "$gray200",
  accents3: "$gray300",
  accents4: "$gray400",
  accents5: "$gray500",
  accents6: "$gray600",
  accents7: "$gray700",
  accents8: "$gray800",
  accents9: "$gray900",
};

export const defaultMedia = {
  xs: `(min-width: ${defaultTokens.breakpoints.xs})`,
  sm: `(min-width: ${defaultTokens.breakpoints.sm})`,
  md: `(min-width: ${defaultTokens.breakpoints.md})`,
  lg: `(min-width: ${defaultTokens.breakpoints.lg})`,
  xl: `(min-width: ${defaultTokens.breakpoints.xl})`,
  xsMin: `(min-width: ${defaultTokens.breakpoints.xs})`,
  smMin: `(min-width: ${defaultTokens.breakpoints.sm})`,
  mdMin: `(min-width: ${defaultTokens.breakpoints.md})`,
  lgMin: `(min-width: ${defaultTokens.breakpoints.lg})`,
  xlMin: `(min-width: ${defaultTokens.breakpoints.xl})`,
  xsMax: `(max-width: ${defaultTokens.breakpoints.xs})`,
  smMax: `(max-width: ${defaultTokens.breakpoints.sm})`,
  mdMax: `(max-width: ${defaultTokens.breakpoints.md})`,
  lgMax: `(max-width: ${defaultTokens.breakpoints.lg})`,
  xlMax: `(max-width: ${defaultTokens.breakpoints.xl})`,
  motion: "(prefers-reduced-motion: reduce)",
  safari: "not all and (min-resolution:.001dpcm)",
  hover: "(any-hover: hover)",
  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
};

export const defaultUtils = {
  p: (value: Stitches.PropertyValue<"padding">) => ({
    padding: value,
  }),
  pt: (value: Stitches.PropertyValue<"paddingTop">) => ({
    paddingTop: value,
  }),
  pr: (value: Stitches.PropertyValue<"paddingRight">) => ({
    paddingRight: value,
  }),
  pb: (value: Stitches.PropertyValue<"paddingBottom">) => ({
    paddingBottom: value,
  }),
  pl: (value: Stitches.PropertyValue<"paddingLeft">) => ({
    paddingLeft: value,
  }),
  px: (value: Stitches.PropertyValue<"paddingLeft">) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: Stitches.PropertyValue<"paddingTop">) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  m: (value: Stitches.PropertyValue<"margin">) => ({
    margin: value,
  }),
  mt: (value: Stitches.PropertyValue<"marginTop">) => ({
    marginTop: value,
  }),
  mr: (value: Stitches.PropertyValue<"marginRight">) => ({
    marginRight: value,
  }),
  mb: (value: Stitches.PropertyValue<"marginBottom">) => ({
    marginBottom: value,
  }),
  ml: (value: Stitches.PropertyValue<"marginLeft">) => ({
    marginLeft: value,
  }),
  mx: (value: Stitches.PropertyValue<"marginLeft">) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: Stitches.PropertyValue<"marginTop">) => ({
    marginTop: value,
    marginBottom: value,
  }),
  ta: (value: Stitches.PropertyValue<"textAlign">) => ({
    textAlign: value,
  }),
  tt: (value: Stitches.PropertyValue<"textTransform">) => ({
    textTransform: value,
  }),
  to: (value: Stitches.PropertyValue<"textOverflow">) => ({
    textOverflow: value,
  }),
  d: (value: Stitches.PropertyValue<"display">) => ({ display: value }),
  dflex: (value: Stitches.PropertyValue<"alignItems">) => ({
    display: "flex",
    alignItems: value,
    justifyContent: value,
  }),
  fd: (value: Stitches.PropertyValue<"flexDirection">) => ({
    flexDirection: value,
  }),
  fw: (value: Stitches.PropertyValue<"flexWrap">) => ({
    flexWrap: value,
  }),
  ai: (value: Stitches.PropertyValue<"alignItems">) => ({
    alignItems: value,
  }),
  ac: (value: Stitches.PropertyValue<"alignContent">) => ({
    alignContent: value,
  }),
  jc: (value: Stitches.PropertyValue<"justifyContent">) => ({
    justifyContent: value,
  }),
  as: (value: Stitches.PropertyValue<"alignSelf">) => ({
    alignSelf: value,
  }),
  fg: (value: Stitches.PropertyValue<"flexGrow">) => ({
    flexGrow: value,
  }),
  fs: (value: Stitches.PropertyValue<"fontSize">) => ({
    fontSize: value,
  }),
  fb: (value: Stitches.PropertyValue<"flexBasis">) => ({
    flexBasis: value,
  }),
  bc: (value: Stitches.PropertyValue<"backgroundColor">) => ({
    backgroundColor: value,
  }),
  bf: (value: Stitches.PropertyValue<"backdropFilter">) => ({
    backdropFilter: value,
  }),
  bg: (value: Stitches.PropertyValue<"backgroundColor">) => ({
    background: value,
  }),
  bgBlur: (value: Stitches.PropertyValue<"backgroundColor">) => ({
    bf: "saturate(180%) blur(10px)",
    bg: value,
  }),
  bgColor: (value: Stitches.PropertyValue<"backgroundColor">) => ({
    backgroundColor: value,
  }),
  backgroundClip: (
    value: Stitches.PropertyValue<"backgroundClip">
  ) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value,
  }),
  bgClip: (value: Stitches.PropertyValue<"backgroundClip">) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value,
  }),
  br: (value: Stitches.PropertyValue<"borderRadius">) => ({
    borderRadius: value,
  }),
  bw: (value: Stitches.PropertyValue<"borderWidth">) => ({
    borderWidth: value,
  }),
  btrr: (value: Stitches.PropertyValue<"borderTopRightRadius">) => ({
    borderTopRightRadius: value,
  }),
  bbrr: (value: Stitches.PropertyValue<"borderBottomRightRadius">) => ({
    borderBottomRightRadius: value,
  }),
  bblr: (value: Stitches.PropertyValue<"borderBottomLeftRadius">) => ({
    borderBottomLeftRadius: value,
  }),
  btlr: (value: Stitches.PropertyValue<"borderTopLeftRadius">) => ({
    borderTopLeftRadius: value,
  }),
  bs: (value: Stitches.PropertyValue<"boxShadow">) => ({
    boxShadow: value,
  }),
  ds: (value: Stitches.PropertyValue<"boxShadow">) => ({
    dropShadow: value,
  }),
  shadow: (value: Stitches.PropertyValue<"boxShadow">) => ({
    boxShadow: value,
  }),
  dshadow: (value: Stitches.PropertyValue<"boxShadow">) => ({
    dropShadow: value,
  }),
  dropShadow: (value: Stitches.PropertyValue<"boxShadow">) => ({
    filter: `$dropShadows${value}`,
  }),
  normalShadow: (value: Stitches.PropertyValue<"backgroundColor">) => ({
    boxShadow: `0 4px 14px 0 $colors${value}`,
  }),
  normalShadowVar: (
    value: Stitches.PropertyValue<"backgroundColor">
  ) => ({
    boxShadow: `0 4px 14px 0 ${value}`,
  }),
  lh: (value: Stitches.PropertyValue<"lineHeight">) => ({
    lineHeight: value,
  }),
  ov: (value: Stitches.PropertyValue<"overflow">) => ({
    overflow: value,
  }),
  ox: (value: Stitches.PropertyValue<"overflowX">) => ({
    overflowX: value,
  }),
  oy: (value: Stitches.PropertyValue<"overflowY">) => ({
    overflowY: value,
  }),
  pe: (value: Stitches.PropertyValue<"pointerEvents">) => ({
    pointerEvents: value,
  }),
  events: (value: Stitches.PropertyValue<"pointerEvents">) => ({
    pointerEvents: value,
  }),
  us: (value: Stitches.PropertyValue<"userSelect">) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),
  userSelect: (value: Stitches.PropertyValue<"userSelect">) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),
  w: (value: Stitches.PropertyValue<"width">) => ({ width: value }),
  h: (value: Stitches.PropertyValue<"height">) => ({ height: value }),
  mw: (value: Stitches.PropertyValue<"maxWidth">) => ({
    maxWidth: value,
  }),
  maxW: (value: Stitches.PropertyValue<"maxWidth">) => ({
    maxWidth: value,
  }),
  mh: (value: Stitches.PropertyValue<"maxHeight">) => ({
    maxHeight: value,
  }),
  maxH: (value: Stitches.PropertyValue<"maxHeight">) => ({
    maxHeight: value,
  }),
  size: (value: Stitches.PropertyValue<"width">) => ({
    width: value,
    height: value,
  }),
  minSize: (value: Stitches.PropertyValue<"width">) => ({
    minWidth: value,
    minHeight: value,
    width: value,
    height: value,
  }),
  sizeMin: (value: Stitches.PropertyValue<"width">) => ({
    minWidth: value,
    minHeight: value,
    width: value,
    height: value,
  }),
  maxSize: (value: Stitches.PropertyValue<"width">) => ({
    maxWidth: value,
    maxHeight: value,
  }),
  sizeMax: (value: Stitches.PropertyValue<"width">) => ({
    maxWidth: value,
    maxHeight: value,
  }),
  appearance: (value: Stitches.PropertyValue<"appearance">) => ({
    WebkitAppearance: value,
    appearance: value,
  }),
  scale: (value: Stitches.PropertyValue<"scale">) => ({
    transform: `scale(${value})`,
  }),
  linearGradient: (
    value: Stitches.PropertyValue<"backgroundImage">
  ) => ({
    backgroundImage: `linear-gradient(${value})`,
  }),
  tdl: (value: Stitches.PropertyValue<"textDecorationLine">) => ({
    textDecorationLine: value,
  }),
  truncateText: (value: Stitches.PropertyValue<"width">) => ({
    maxWidth: value,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  textGradient: (value: Stitches.PropertyValue<"backgroundImage">) => ({
    backgroundImage: `linear-gradient(${value})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    "&::selection": {
      WebkitTextFillColor: "$colors$text",
    },
  }),
};

export const defaultThemeMap = {
  ...defaultStitchesThemeMap,
  width: "space",
  height: "space",
  minWidth: "space",
  maxWidth: "space",
  minHeight: "space",
  maxHeight: "space",
  flexBasis: "space",
  gridTemplateColumns: "space",
  gridTemplateRows: "space",
  blockSize: "space",
  minBlockSize: "space",
  maxBlockSize: "space",
  inlineSize: "space",
  minInlineSize: "space",
  maxInlineSize: "space",
  borderWidth: "borderWeights",
};

export default {
  prefix: "pz",
  theme: {
    ...defaultTokens,
    colors: defaultColors,
    shadows: {},
    dropShadows: {},
  },
  media: defaultMedia,
  utils: defaultUtils,
  themeMap: defaultThemeMap,
} as const;
