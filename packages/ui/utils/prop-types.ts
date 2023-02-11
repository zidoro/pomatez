export const tuple = <T extends string[]>(...args: T) => args;

const alignItems = tuple(
  "flex-start",
  "flex-end",
  "center",
  "stretch",
  "baseline"
);

const justifyContent = tuple(
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly"
);

const flexWrap = tuple("nowrap", "wrap", "wrap-reverse");

export type AlignItems = (typeof alignItems)[number];
export type JustifyContent = (typeof justifyContent)[number];
export type FlexWrap = (typeof flexWrap)[number];
