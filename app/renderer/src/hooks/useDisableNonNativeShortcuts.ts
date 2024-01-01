import { useEffect } from "react";

export const useDisableNonNativeShortcuts = () => {
  // Disable context menu on all elements except textareas and inputs
  useEffect(() => {
    const contextEvent = (event: MouseEvent) => {
      if (event.target) {
        let target = event.target as HTMLElement;
        if (
          target.tagName === "TEXTAREA" ||
          (target.tagName === "INPUT" &&
            (target as HTMLInputElement).type === "text")
        ) {
          return true;
        }
      }
      event.preventDefault();
      return false;
    };
    document.addEventListener("contextmenu", contextEvent);
    return () =>
      document.removeEventListener("contextmenu", contextEvent);
  }, []);

  // Disable middle mouse button
  useEffect(() => {
    const middleMouseEvent = (event: MouseEvent) => {
      if (event.button === 1) event.preventDefault();
    };
    window.addEventListener("auxclick", middleMouseEvent);

    return () =>
      window.removeEventListener("auxclick", middleMouseEvent);
  }, []);
};
