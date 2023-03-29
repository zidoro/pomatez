import isElectron from "is-electron";

export function runOnElectron(fn: () => void) {
  if (isElectron()) {
    fn();
  }
}
