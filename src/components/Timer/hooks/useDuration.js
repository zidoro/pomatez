import { useState, useEffect } from "react";

function useCounter(minutes) {
  let [counter, setCounter] = useState(minutes * 60);

  let secs = counter;
  let mins = Math.floor(secs / 60);
  secs -= mins * 60;

  useEffect(() => {
    let interval = setInterval(() => {
      if (counter <= 0) {
        clearInterval(interval);
        setCounter(0);
      } else {
        counter--;
        setCounter(counter);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return { mins, secs };
}

export default useCounter;
