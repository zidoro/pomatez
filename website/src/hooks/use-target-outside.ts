import { useState, useLayoutEffect } from "react";

interface TargetOutside {
  ref: React.RefObject<HTMLElement>;
  eventType?: string;
}

export const useTargetOutside = ({
  ref,
  eventType = "click",
}: TargetOutside) => {
  const [state, setState] = useState<any>();

  useLayoutEffect(() => {
    function outsideTarget(e: Event) {
      const { current } = ref;
      const target = e.target as HTMLElement;

      if (current) {
        if (current.contains(target)) {
          return;
        }
        setState(false);
      }
    }

    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setState(false);
      }
    }

    if (state) {
      document.addEventListener(eventType, outsideTarget);
      document.addEventListener("keydown", closeOnEscape);
    }
    return () => {
      document.removeEventListener(eventType, outsideTarget);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [state, ref, eventType]);

  return [state, setState];
};
