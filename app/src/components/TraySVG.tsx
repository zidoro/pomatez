import React from "react";
import { TimerTypes } from "store";

type Props = {
  dashOffset: number;
  timerType?: TimerTypes["timerType"];
};

export const TraySVG: React.FC<Props> = ({ timerType, dashOffset }) => {
  const getProgressColor = (opacity = 1) => {
    switch (timerType) {
      case "STAY_FOCUS":
        return `rgba(44, 167, 248, ${opacity})`;
      case "SHORT_BREAK":
        return `rgba(7, 181, 131, ${opacity})`;
      default:
        return `rgba(212, 141, 10, ${opacity})`;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      style={{
        transform: "rotateY(-180deg) rotateZ(-90deg)",
      }}
    >
      <g transform="translate(-345 -920)">
        <g
          transform="translate(345 920)"
          fill="#141e25"
          stroke={getProgressColor(0.75)}
          strokeWidth="3.2"
        >
          <rect width="32" height="32" rx="10" stroke="none" />
          <rect x="1" y="1" width="30" height="30" rx="9" fill="none" />
        </g>
        <circle
          cx="9"
          cy="9"
          r="9"
          transform="translate(352 927)"
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="4"
        />
        <circle
          cx="9"
          cy="9"
          r="9"
          transform="translate(352 927)"
          fill="transparent"
          strokeWidth="4"
          strokeDasharray="64"
          strokeLinecap="round"
          strokeDashoffset={`${dashOffset}`}
          stroke={getProgressColor()}
        />
      </g>
    </svg>
  );
};
