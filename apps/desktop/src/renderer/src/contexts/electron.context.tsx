import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { runOnElectron } from "@renderer/utils";
import { useSyncData } from "./sync-data.context";

type ElectronContextProps = {
  onMinimizeWindow?: () => void;
  onCloseWindow?: () => void;
};

const ElectronContext = createContext<ElectronContextProps>({});

const ElectronProvider = ({ children }: { children: ReactNode }) => {
  const { settings, timer } = useSyncData();

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

  useEffect(() => {
    runOnElectron(() => {
      window.api.send("set-always-on-top", {
        alwaysOnTop: settings.alwaysOnTop,
      });
    });
  }, [settings.alwaysOnTop]);

  useEffect(() => {
    runOnElectron(() => {
      window.api.send("set-fullscreen-break", {
        shouldFullScreenBreak: timer.shouldFullScreenBreak,
        alwaysOnTop: settings.alwaysOnTop,
      });
    });
  }, [settings.alwaysOnTop, timer.shouldFullScreenBreak]);

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
