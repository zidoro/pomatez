import { useEffect, useState } from "react";

const isBrowser = (): boolean =>
  Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );

export type SSRState = {
  isBrowser: boolean;
  isServer: boolean;
};

export const useSSR = (): SSRState => {
  const [browser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(isBrowser());
  }, []);

  return {
    isBrowser: browser,
    isServer: !browser,
  };
};
