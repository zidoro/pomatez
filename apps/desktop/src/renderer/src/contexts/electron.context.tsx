import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useAtomValue } from "jotai";
import { runOnElectron } from "@renderer/utils";
import { settingsAtom, timerAtom } from "@renderer/@data/atoms";

type ElectronContextProps = {
  onMinimizeWindow?: () => void;
  onCloseWindow?: () => void;
};

const ElectronContext = createContext<ElectronContextProps>({});

const ElectronProvider = ({ children }: { children: ReactNode }) => {
  const settings = useAtomValue(settingsAtom);

  const timer = useAtomValue(timerAtom);

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
      });
    });
  }, [timer.shouldFullScreenBreak]);

  return (
    <ElectronContext.Provider
      value={{ onMinimizeWindow, onCloseWindow }}
    >
      {children}
    </ElectronContext.Provider>
  );
};

export { ElectronProvider, ElectronContext };
