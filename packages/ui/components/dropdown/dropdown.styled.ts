import { blackA } from "@radix-ui/colors";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { keyframes, styled } from "../../theme";

export const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

export const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const contentStyles = {
  minWidth: "max-content",
  backgroundColor: "white",
  borderRadius: "$md",
  padding: "0.6rem",
  boxShadow: "$xl",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
};

export const StyledDropdownMenuContent = styled(
  DropdownMenu.Content,
  contentStyles
);
export const StyledDropdownMenuSubContent = styled(
  DropdownMenu.SubContent,
  contentStyles
);

export const StyledDropdownMenuArrow = styled(DropdownMenu.Arrow, {
  fill: "$white",
});

const itemStyles = {
  all: "unset",
  fontSize: "$sm",
  color: "$gray11",

  position: "relative",
  display: "flex",
  alignItems: "center",

  borderRadius: "$sm",

  padding: "$1 $2",
  userSelect: "none",

  "&[data-disabled]": {
    color: "$gray8",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "$blue9",
    color: "$blue1",
  },

  variants: {
    isLeftPadded: {
      true: {
        paddingLeft: "$6",
      },
    },
  },
};

export const StyledDropdownMenuItem = styled(
  DropdownMenu.Item,
  itemStyles
);
export const StyledDropdownMenuCheckboxItem = styled(
  DropdownMenu.CheckboxItem,
  itemStyles
);
export const StyledDropdownMenuRadioItem = styled(
  DropdownMenu.RadioItem,
  itemStyles
);
export const StyledDropdownMenuSubTrigger = styled(
  DropdownMenu.SubTrigger,
  {
    '&[data-state="open"]': {
      backgroundColor: "$blue4",
      color: "$blue11",
    },
    ...itemStyles,
  }
);

export const StyledDropdownMenuLabel = styled(DropdownMenu.Label, {
  paddingLeft: "$2",
  fontSize: "$xs",
  lineHeight: "25px",
  color: "$gray11",

  variants: {
    isLeftPadded: {
      true: {
        paddingLeft: "$6",
      },
    },
  },
});

export const StyledDropdownMenuSeparator = styled(
  DropdownMenu.Separator,
  {
    height: "$px",
    backgroundColor: "$gray6",
    margin: "0.6rem",
  }
);

export const StyledDropdownMenuItemIndicator = styled(
  DropdownMenu.ItemIndicator,
  {
    position: "absolute",
    left: 0,
    width: "$6",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }
);

export const StyledRightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: "$5",
  color: "$gray11",
  "[data-highlighted] > &": { color: "white" },
  "[data-disabled] &": { color: "$gray8" },
});

export const StyledIconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: "$9",
  width: "$9",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$blue11",
  backgroundColor: "white",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  "&:hover": { backgroundColor: "$blue3" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
});
