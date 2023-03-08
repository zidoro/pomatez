import { memo, ReactNode } from "react";
import {
  StyledScrollAreaCorner,
  StyledScrollAreaRoot,
  StyledScrollAreaScrollbar,
  StyledScrollAreaThumb,
  StyledScrollAreaViewport,
} from "./scroll-area.styled";

export type ScrollAreaProps = {
  /**
   * Disables the scroll in the specified direction
   */
  disabledScroll?: "vertical" | "horizontal";
  /**
   * The content of the scroll area
   */
  children?: ReactNode;
};

export const ScrollArea = ({
  disabledScroll,
  children,
}: ScrollAreaProps) => {
  return (
    <StyledScrollAreaRoot>
      <StyledScrollAreaViewport>{children}</StyledScrollAreaViewport>

      {disabledScroll !== "vertical" && (
        <StyledScrollAreaScrollbar orientation="vertical">
          <StyledScrollAreaThumb />
        </StyledScrollAreaScrollbar>
      )}

      {disabledScroll !== "horizontal" && (
        <StyledScrollAreaScrollbar orientation="horizontal">
          <StyledScrollAreaThumb />
        </StyledScrollAreaScrollbar>
      )}

      <StyledScrollAreaCorner />
    </StyledScrollAreaRoot>
  );
};

const MemoScrollArea = memo(ScrollArea);

MemoScrollArea.displayName = "ScrollArea";

export default MemoScrollArea;
