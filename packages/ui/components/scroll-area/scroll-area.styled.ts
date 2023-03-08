import * as ScrollArea from "@radix-ui/react-scroll-area";
import { styled } from "../../theme";

const SCROLLBAR_SIZE = 10;

export const StyledScrollAreaRoot = styled(ScrollArea.Root, {
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

export const StyledScrollAreaViewport = styled(ScrollArea.Viewport, {
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

export const StyledScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: "0.2rem",
  background: "$blackA6",
  transition: "background 160ms ease-out",

  "&:hover": { background: "$blackA7" },

  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },

  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: SCROLLBAR_SIZE,
  },
});

export const StyledScrollAreaThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: "$gray10",
  borderRadius: SCROLLBAR_SIZE,

  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: "4.4rem",
    minHeight: "4.4rem",
  },
});

export const StyledScrollAreaCorner = styled(ScrollArea.Corner, {
  background: "$blackA8",
});
