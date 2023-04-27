import { ipcRenderer } from "electron";

type BuildArgs<TEvent = string, TPayload = never> = Parameters<
  (event: TEvent, payload?: TPayload) => void
>;

export type SendArgs =
  | BuildArgs<"minimize-window">
  | BuildArgs<"close-window">
  | BuildArgs<
      "set-always-on-top",
      {
        alwaysOnTop: boolean;
      }
    >
  | BuildArgs<
      "set-fullscreen-break",
      {
        shouldFullScreenBreak: boolean;
        alwaysOnTop: boolean;
      }
    >;

// Custom APIs for renderer
export const api = {
  send: (...args: SendArgs) => {
    ipcRenderer.send(...(args as BuildArgs));
  },
};
