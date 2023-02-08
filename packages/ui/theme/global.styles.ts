import { globalCss, keyframes } from "./stitches.config";

import NotoSans400Woff from "../static/fonts/noto-sans/NotoSans400.woff";
import NotoSans500Woff from "../static/fonts/noto-sans/NotoSans500.woff";
import TypoRound400Woff from "../static/fonts/typo-round/TypoRound400.woff";

export const globalStyles = globalCss({
  "@font-face": [
    // Noto-Sans Font
    {
      fontFamily: "Noto-Sans",
      fontStyle: "normal",
      fontWeight: 400,
      fontDisplay: "fallback",
      src: `url('${NotoSans400Woff}') format('woff')`,
    },
    {
      fontFamily: "Noto-Sans",
      fontStyle: "normal",
      fontWeight: 500,
      fontDisplay: "fallback",
      src: `url('${NotoSans500Woff}') format('woff')`,
    },
    // Typo-Round Font
    {
      fontFamily: "Typo-Round",
      fontStyle: "normal",
      fontWeight: 400,
      fontDisplay: "fallback",
      src: `url('${TypoRound400Woff}') format('woff')`,
    },
  ],

  // Global Style Reset
  "*": {
    "&, &::before, &::after": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      outline: "none",
      userSelect: "none",
      fontFamily: "inherit",
      fontSize: "inherit",
      color: "currentColor",
    },
  },

  html: {
    width: "100%",
    height: "100%",

    fontSize: "62.5%",
    fontFamily: "Noto-Sans, san-serif",
    fontWeight: "normal",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "html, body": {
    overflow: "hidden",
    boxSizing: "inherit",

    backgroundColor: "$bgPrimary",
  },

  "#app": {
    height: "100%",
  },

  body: {
    fontSize: "1.3rem",
    fontWeight: 400,
    color: "$bodyText",

    width: "100%",
    height: "100%",
    border: "1px solid $borderWindow",
    boxShadow: "0 1px 16px -4px rgba(0, 0, 0, 0.5)",
    boxSizing: "border-box",
  },

  a: {
    textDecoration: "none",
    color: "inherit",
  },

  "h1, h2, h3, h4, h5, h6": {
    fontWeight: 500,
    color: "$headingText",
  },

  ".ripple-hook": {
    position: "absolute",

    width: ".5rem",
    height: ".5rem",

    opacity: 0,

    borderRadius: "50%",
    backgroundColor: "$bgRipplePrimary",

    animation: `${keyframes({
      "0%": {
        transform: "scale(1)",
        opacity: 0.4,
      },
      "100%": {
        transform: "scale(100)",
        opacity: 0,
      },
    })} 1s`,
  },
});
