import * as Slider from "@radix-ui/react-slider";
import { addColorAlpha, hslToRgb } from "../../utils/color";
import { styled, theme, VariantProps } from "../../theme";

export const StyledSliderRoot = styled(Slider.Root, {
  position: "relative",
  width: "100%",
  height: "$5",

  display: "flex",
  alignItems: "center",

  userSelect: "none",
  touchAction: "none",

  variants: {
    appState: {
      stayFocused: {
        $$color: "$colors$blue9",
        $$hoverColor: "$colors$blue10",
        $$shadowColor: addColorAlpha(
          hslToRgb(theme.colors.blue9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.blue9.value),
          0.24
        ),
      },
      shortBreak: {
        $$color: "$colors$green9",
        $$hoverColor: "$colors$green10",
        $$shadowColor: addColorAlpha(
          hslToRgb(theme.colors.green9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.green9.value),
          0.24
        ),
      },
      longBreak: {
        $$color: "$colors$brown9",
        $$hoverColor: "$colors$brown10",
        $$shadowColor: addColorAlpha(
          hslToRgb(theme.colors.brown9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.brown9.value),
          0.24
        ),
      },
    },
  },
  defaultVariants: {
    appState: "stayFocused",
  },
});

export const StyledSliderTrack = styled(Slider.Track, {
  position: "relative",
  bg: "$gray6",
  flexGrow: 1,
  borderRadius: "$pill",
  height: "0.6rem",
});

export const StyledSliderRange = styled(Slider.Range, {
  position: "absolute",
  borderRadius: "$xl",
  height: "100%",
  bg: "$$color",
});

export const StyledSliderThumb = styled(Slider.Thumb, {
  display: "block",
  width: "$5",
  height: "$3",

  bg: "$white",
  boxShadow: "none",
  borderRadius: "$pill",
  border: "1px solid $$color",

  transition: "all 160ms ease",

  "&:hover, &:focus": {
    outline: "none",
    borderColor: "$$hoverColor",
    boxShadow: "0 0 0 0.3rem $$shadowColor",
  },

  "&:active": {
    borderColor: "$$hoverColor",
    boxShadow: "0 0 0 0.4rem $$shadowColorActive",
  },
});

export type SliderVariantProps = VariantProps<typeof StyledSliderRoot>;
