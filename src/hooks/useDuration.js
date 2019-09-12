import { useState } from "react";
import useStore from "./useStore";

function useDuration(minutes) {
  const { playing } = useStore().states;

  let [counter, setCounter] = useState(minutes * 60);

  let secs = counter;
  let mins = Math.floor(secs / 60);
  secs -= mins * 60;

  if (playing) {
    let interval = setInterval(() => {
      if (counter <= 0) {
        clearInterval(interval);
        setCounter(0);
      } else {
        counter--;
        setCounter(counter);
      }
    }, 1000);
  }

  return { mins, secs };
}

export default useDuration;
