import { styled, VariantProps } from "../../theme";

export const StyledProgress = styled("svg", {
  width: "22rem",
  height: "22rem",

  strokeWidth: "0.6rem",
  strokeLinecap: "round",
  strokeDasharray: "67.4rem",

  zIndex: 0,

  variants: {
    appState: {
      "stay-focused": {
        stroke: "$blue9",
      },
      "short-break": {
        stroke: "$green9",
      },
      "long-break": {
        stroke: "$brown9",
      },
      "special-break": {
        stroke: "$violet9",
      },
    },
  },
  defaultVariants: {
    appState: "stay-focused",
  },
});

export const StyledTimeRemaining = styled("p", {
  fontSize: "4rem",
  dflex: "center",
  gap: "$2",

  variants: {
    appState: {
      "stay-focused": {
        color: "$blue9",
      },
      "short-break": {
        color: "$green9",
      },
      "long-break": {
        color: "$brown9",
      },
      "special-break": {
        color: "$violet9",
      },
    },
  },
  defaultVariants: {
    appState: "stay-focused",
  },
});

export type CounterVariantProps = VariantProps<
  typeof StyledProgress | typeof StyledTimeRemaining
>;
