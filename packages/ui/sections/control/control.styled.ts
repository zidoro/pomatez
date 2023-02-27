import { ButtonIcon } from "../../components";
import { styled, VariantProps } from "../../theme";

export const StyledContainer = styled("div", {
  width: "100%",
  height: "max-content",

  variants: {
    appState: {
      "stay-focused": {
        $$hoverColor: "$colors$blue10",
        $$activeColor: "$colors$blue9",
      },
      "short-break": {
        $$hoverColor: "$colors$green10",
        $$activeColor: "$colors$green9",
      },
      "long-break": {
        $$hoverColor: "$colors$brown10",
        $$activeColor: "$colors$brown9",
      },
      "special-break": {
        $$hoverColor: "$colors$violet10",
        $$activeColor: "$colors$violet9",
      },
    },
  },
  defaultVariants: {
    appState: "stay-focused",
  },
});

export const StyledControlButton = styled(ButtonIcon, {
  transition: "$button",

  "&:hover": {
    color: "$$hoverColor",
  },

  "&:active": {
    color: "$$activeColor",
  },

  variants: {
    variant: {
      primary: {
        width: "$14",
        height: "$14",

        border: "2px solid currentColor",
        borderRadius: "$rounded",

        "& > svg": {
          width: "$7",
          height: "$7",
        },
      },
      secondary: {
        "& > svg": {
          width: "$5",
          height: "$5",
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type StyledContainerProps = VariantProps<typeof StyledContainer>;
