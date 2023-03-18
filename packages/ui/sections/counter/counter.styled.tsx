import { styled, VariantProps } from "../../theme";
import { TIMER_PROGRESS_CIRCUMFERENCE } from "../../utils";

export const StyledProgress = styled("svg", {
  width: "22rem",
  height: "22rem",

  strokeWidth: "0.6rem",
  strokeLinecap: "round",
  strokeDasharray: TIMER_PROGRESS_CIRCUMFERENCE,
  transform: "rotateY(-180deg) rotateZ(-90deg)",
  transition: "stroke-dashoffset 1s linear",

  zIndex: 0,

  variants: {
    appState: {
      stayFocused: {
        stroke: "$blue9",
      },
      shortBreak: {
        stroke: "$green9",
      },
      longBreak: {
        stroke: "$brown9",
      },
    },
  },
  defaultVariants: {
    appState: "stayFocused",
  },
});

export const StyledTimeRemaining = styled("p", {
  fontSize: "4rem",
  dflex: "center",
  gap: "$2",

  variants: {
    appState: {
      stayFocused: {
        color: "$blue9",
      },
      shortBreak: {
        color: "$green9",
      },
      longBreak: {
        color: "$brown9",
      },
    },
  },
  defaultVariants: {
    appState: "stayFocused",
  },
});

export type CounterVariantProps = VariantProps<
  typeof StyledProgress | typeof StyledTimeRemaining
>;
