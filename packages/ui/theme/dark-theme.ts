import {
  blueDark,
  greenDark,
  purpleDark,
  yellowDark,
  redDark,
  cyanDark,
  pinkDark,
  grayDark,
  orangeDark,
  brownDark,
} from "@radix-ui/colors";
import { addColorAlpha } from "../utils/color";

export default {
  colors: {
    // background
    background: "$black",
    backgroundAlpha: "rgba(0, 0, 0, 0.6)",
    foreground: "$white",
    backgroundContrast: "$accent0",

    //semantic colors
    ...blueDark,
    ...purpleDark,
    ...greenDark,
    ...yellowDark,
    ...redDark,
    ...cyanDark,
    ...pinkDark,
    ...orangeDark,
    ...brownDark,
    ...grayDark,

    // brand colors
    primaryLight: "$blue1",
    primaryLightHover: "$blue2",
    primaryLightActive: "$blue3",
    primaryLightContrast: "$blue7",

    secondaryLight: "$purple6",
    secondaryLightHover: "$purple2",
    secondaryLightActive: "$purple3",
    secondaryLightContrast: "$purple9",
    secondary: "$purple8",
    secondaryBorder: "$purple6",
    secondaryBorderHover: "$purple7",
    secondarySolidHover: "$purple8",
    secondaryShadow: "$purple6",

    successLight: "$green1",
    successLightHover: "$green2",
    successLightActive: "$green3",

    warningLight: "$yellow1",
    warningLightHover: "$yellow2",
    warningLightActive: "$yellow3",

    errorLight: "$red1",
    errorLightHover: "$red2",
    errorLightActive: "$red3",
    errorLightContrast: "$red8",

    neutralLight: "$gray3",
    neutralLightHover: "$gray4",
    neutralLightActive: "$gray5",
    neutralSolidContrast: "$white",

    // misc
    textLight: addColorAlpha(grayDark.gray11, 0.2),
    text: "$gray11",
    linkLight: addColorAlpha(blueDark.blue7, 0.2),
    link: "$blue8",
    codeLight: "$cyan1",
    code: "$cyan7",
    selection: "$pink9",
    border: "rgba(255, 255, 255, 0.15)",
  },
  shadows: {
    xs: "0 2px 8px 1px rgb(0 0 0 / 0.07), 0 1px 1px -1px rgb(0 0 0 / 0.04)",
    sm: "0 2px 8px 2px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.04)",
    md: "0 12px 20px 6px rgb(0 0 0 / 0.08)",
    lg: "0 12px 34px 6px rgb(0 0 0 / 0.18)",
    xl: "0 25px 65px 0px rgb(0 0 0 / 0.35)",
  },
  dropShadows: {
    xs: "drop-shadow(0 2px 4px rgb(0 0 0 / 0.07)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.04))",
    sm: "drop-shadow(0 2px 8px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.04))",
    md: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.08)) drop-shadow(0 20px 8px rgb(0 0 0 / 0.04))",
    lg: "drop-shadow(0 12px 24px rgb(0 0 0 / 0.15)) drop-shadow(0 12px 14px rgb(0 0 0 / 0.1))",
    xl: "drop-shadow(0 25px 34px rgb(0 0 0 / 0.35))",
  },
} as const;
