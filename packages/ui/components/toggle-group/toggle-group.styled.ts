import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { addColorAlpha, hslToRgb } from "../../utils/color";
import { styled, theme, VariantProps } from "../../theme";

export const StyledToggleGroup = styled(ToggleGroup.Root, {
  display: "flex",
  height: "$10",

  variants: {
    appState: {
      stayFocused: {
        $$color: "$colors$blue9",
        $$colorSelected: "$colors$blue11",
        $$colorFocusActive: "$colors$blue10",
        $$bgHover: "$colors$blue4",
        $$borderColorFocusActive: "$colors$blue8",
        $$shadowColorFocusActive: addColorAlpha(
          hslToRgb(theme.colors.blue9.value),
          0.16
        ),
      },
      shortBreak: {
        $$color: "$colors$green9",
        $$colorSelected: "$colors$green11",
        $$colorFocusActive: "$colors$green10",
        $$bgHover: "$colors$green4",
        $$borderColorFocusActive: "$colors$green8",
        $$shadowColorFocusActive: addColorAlpha(
          hslToRgb(theme.colors.green9.value),
          0.16
        ),
      },
      longBreak: {
        $$color: "$colors$brown9",
        $$colorSelected: "$colors$brown11",
        $$colorFocusActive: "$colors$brown10",
        $$bgHover: "$colors$brown4",
        $$borderColorFocusActive: "$colors$brown8",
        $$shadowColorFocusActive: addColorAlpha(
          hslToRgb(theme.colors.brown9.value),
          0.16
        ),
      },
    },
  },
  defaultVariants: {
    appState: "stayFocused",
  },
});

export const StyledGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  dflex: "center",

  width: "100%",
  px: "$4",
  py: "$2",
  bg: "$gray3",
  border: "1px solid $gray6",

  fontSize: "$sm",
  fontWeight: "$medium",

  transition: "all 160ms ease",

  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: "$sm",
    borderBottomLeftRadius: "$sm",
    borderRightColor: "transparent",
  },

  "&:last-child": {
    borderTopRightRadius: "$sm",
    borderBottomRightRadius: "$sm",
    borderLeftColor: "transparent",
  },

  "&:hover": { bg: "$$bgHover" },

  "&:focus, &:active": {
    position: "relative",
    borderColor: "$$borderColorFocusActive",
    boxShadow: "0 0 0 0.3rem $$shadowColorFocusActive",
    color: "$$colorFocusActive",
  },

  "&[data-state=on]": {
    backgroundColor: "$white",
    color: "$$colorSelected",
  },
});

export type ToggleGroupVariantProps = VariantProps<
  typeof StyledToggleGroup
>;
