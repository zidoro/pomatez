type StateProps = {
  session?: "stayFocused" | "shortBreak" | "longBreak";
};

export const interpretState = <T>(state: T) => state as StateProps;
