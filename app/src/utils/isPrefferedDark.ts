export const isPreferredDark = (): boolean =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;
