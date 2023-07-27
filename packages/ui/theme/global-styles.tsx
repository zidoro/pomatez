import React from "react";

import { getCssText, globalCss } from "./stitches.config";

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
      fontFamily: "inherit",
      fontSize: "inherit",
      color: "currentColor",
    },
  },

  html: {
    fontSize: "10px",
    fontFamily: "$sans",
    fontWeight: "$normal",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "html, body": {
    width: "100%",
    height: "100%",
    boxSizing: "inherit",
    backgroundColor: "$white",
    overflow: "hidden",
    dflex: "center",
  },

  body: {
    color: "$gray11",
    fontSize: "$sm",
  },
});

const flushCSS = () => (
  <style
    dangerouslySetInnerHTML={{ __html: getCssText() }}
    id="stitches"
  />
);

const GlobalStyles: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  globalStyles();

  return <React.Fragment>{children}</React.Fragment>;
};

type MemoGlobalStylesComponent<P = {}> =
  React.NamedExoticComponent<P> & {
    flush: typeof flushCSS;
  };

const MemoGlobalStyles = React.memo(
  GlobalStyles
) as MemoGlobalStylesComponent<{
  children?: React.ReactNode;
}>;

MemoGlobalStyles.flush = flushCSS;

export default MemoGlobalStyles;
