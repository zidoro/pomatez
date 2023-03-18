import { ReactNode } from "react";
import { withMemo } from "../../utils";
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

function ScrollArea({ disabledScroll, children }: ScrollAreaProps) {
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
}

export default withMemo(ScrollArea);
