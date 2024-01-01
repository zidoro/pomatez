import { invoke } from "@tauri-apps/api/primitives";
import isElectron from "is-electron";

/**
 * An invoker is a module that can be used to trigger events in the main process.
 *
 * - On Electron, this is a function that sends an `IPC message`.
 * - On Tauri, this is a function that invokes a `Tauri command`. **⚠️ A command is not the same as an event in Tauri.**
 */
export type InvokeConnector = {
  send: (event: string, ...payload: any) => void;
};

export const ElectronInvoker: InvokeConnector = {
  send: (event: string, ...payload: any) => {
    const { electron } = window;

    electron.send(event, ...payload);
  },
};

export const TauriInvoker: InvokeConnector = {
  /**
   * Rust uses lowercase snake_case for function names, so we'll convert the event name to lower case for the calls.
   * @param event
   * @param payload
   */
  send: (event: string, ...payload: any) => {
    invoke(event.toLowerCase(), ...payload).catch((err) =>
      console.error(err)
    );
  },
};

/**
 * This is a dummy invoker that does nothing.
 */
export const DefaultInvoker: InvokeConnector = {
  send: () => {
    console.log("This system does not support backend invokers.");
  },
};

export function getInvokeConnector(): InvokeConnector {
  if (isElectron()) {
    return ElectronInvoker;
  } else if (window.__TAURI__) {
    return TauriInvoker;
  }

  // Default invoke connector (does nothing)
  return DefaultInvoker;
}
