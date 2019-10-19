export const WORK = "WORK";
export const SHORT_BREAK = "SHORT BREAK";
export const LONG_BREAK = "LONG BREAk";

export const addClass = condition => {
  switch (condition) {
    case SHORT_BREAK:
      return "short-break";
    case LONG_BREAK:
      return "long-break";
    default:
      return "";
  }
};
