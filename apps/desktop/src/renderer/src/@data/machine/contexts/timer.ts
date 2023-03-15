export type TimerProps = {
  elapsed: number;
  duration: number;
  interval: number;
};

export const defaultTimer: TimerProps = {
  elapsed: 0,
  duration: 10,
  interval: 1,
};
