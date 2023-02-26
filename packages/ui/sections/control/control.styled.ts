import { ButtonIcon } from "../../components";
import { styled, VariantProps } from "../../theme";

export const StyledControlButton = styled(ButtonIcon, {
  color: "$gray11",
  transition: "$button",

  "&:hover": {
    color: "$blue10",
  },

  "&:active": {
    color: "$blue9",
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

export type ControlButtonVariantProps = VariantProps<
  typeof StyledControlButton
>;
