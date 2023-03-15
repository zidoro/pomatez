import { padNumber } from "../utils";

export const useTimeFormat = (n: number) => {
  const minutes = Math.floor(n / 60);
  const seconds = n % 60;

  return {
    minutes: padNumber(minutes),
    seconds: padNumber(seconds),
  };
};
