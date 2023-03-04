import * as Slider from "@radix-ui/react-slider";
import { styled, theme } from "../../theme";
import { addColorAlpha, hslToRgb } from "../../utils/color";

export const StyledSliderRoot = styled(Slider.Root, {
  position: "relative",
  width: "100%",
  height: "$5",

  display: "flex",
  alignItems: "center",

  userSelect: "none",
  touchAction: "none",
});

export const StyledSliderTrack = styled(Slider.Track, {
  position: "relative",
  bg: "$gray6",
  flexGrow: 1,
  borderRadius: "$xl",
  height: "0.6rem",
});

export const StyledSliderRange = styled(Slider.Range, {
  position: "absolute",
  bg: "$blue9",
  borderRadius: "$xl",
  height: "100%",
});

export const StyledSliderThumb = styled(Slider.Thumb, {
  display: "block",
  width: "$5",
  height: "$3",

  bg: "$white",
  boxShadow: "none",
  borderRadius: "$xl",
  border: "1px solid $blue9",

  transition: "all 160ms ease",

  "&:hover, &:focus": {
    outline: "none",
    borderColor: "$blue10",
    boxShadow: `0 0 0 0.4rem ${addColorAlpha(
      hslToRgb(theme.colors.blue10.value),
      0.16
    )}`,
  },
});
