import React, { useState, useEffect, useRef } from "react";
import {
  StyledPopper,
  StyledPopperContent,
  StyledPopperHeader,
} from "styles";
import Portal from "./Portal";
import SVG from "./SVG";
import { useTargetOutside } from "hooks";

type Props = {
  showPopper?: boolean;
  content?: React.ReactNode;
  children: ({
    targetRef,
  }: {
    targetRef: React.RefObject<any>;
  }) => React.ReactNode;
};

export const Popper: React.FC<Props> = ({
  showPopper,
  content,
  children,
}) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement>(null);

  const [showContent, setShowContent] = useTargetOutside({
    ref: popperRef,
  });

  const [contentStyles, setContentStyles] = useState<DOMRect>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => null,
  });

  const [popperStyles, setPopperStyles] = useState<DOMRect>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => null,
  });

  useEffect(() => {
    if (showPopper) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }

    if (showContent) {
      if (targetRef.current)
        setPopperStyles(targetRef.current.getBoundingClientRect());
      if (contentRef.current)
        setContentStyles(contentRef.current.getBoundingClientRect());
    }
  }, [targetRef, showContent, setShowContent, showPopper]);

  return (
    <StyledPopper ref={popperRef}>
      {children({ targetRef })}
      {showContent && (
        <Portal id="option-portal">
          <StyledPopperContent
            ref={contentRef}
            style={{
              top: popperStyles.bottom + 4 + window.scrollY,
              left: popperStyles.right - contentStyles.width,
            }}
          >
            <StyledPopperHeader>
              <h4>Actions</h4>
              <button onClick={() => setShowContent(false)}>
                <SVG name="close" />
              </button>
            </StyledPopperHeader>
            {content}
          </StyledPopperContent>
        </Portal>
      )}
    </StyledPopper>
  );
};

export default Popper;
