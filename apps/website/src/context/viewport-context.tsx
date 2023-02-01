import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isSSR } from "../utils";

type Props = {
  width: number;
  height: number;
};

const ViewportContext = createContext<Props>({ width: 0, height: 0 });

const ViewportProvider = ({ children }: { children?: ReactNode }) => {
  const [width, setWidth] = useState(!isSSR ? window.innerWidth : 0);

  const [height, setHeight] = useState(!isSSR ? window.innerHeight : 0);

  useEffect(() => {
    const handleWindowSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, [width]);

  return (
    <ViewportContext.Provider
      value={{
        width,
        height,
      }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

export { ViewportContext, ViewportProvider };
