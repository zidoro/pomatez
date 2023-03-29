import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import { runOnElectron } from "@renderer/utils";

type ElectronContextProps = {
  onMinimizeWindow?: () => void;
  onCloseWindow?: () => void;
};

const ElectronContext = createContext<ElectronContextProps>({});

const ElectronProvider = ({ children }: { children: ReactNode }) => {
  const onMinimizeWindow = useCallback(() => {
    runOnElectron(() => {
      window.api.send("minimize-window");
    });
  }, []);

  const onCloseWindow = useCallback(() => {
    runOnElectron(() => {
      window.api.send("close-window");
    });
  }, []);

  return (
    <ElectronContext.Provider
      value={{ onMinimizeWindow, onCloseWindow }}
    >
      {children}
    </ElectronContext.Provider>
  );
};

const useElectron = () => useContext(ElectronContext);

export { ElectronProvider, useElectron };
