import { padNum } from "utils";

export const useTime = (n: number) => {
  const minutes = Math.floor(n / 60);
  const seconds = n % 60;

  return {
    minutes: padNum(minutes),
    seconds: padNum(seconds),
  };
};
