import React from "react";
import { TimerTypes } from "store";

type Props = {
  dashOffset?: number;
  timerType?: TimerTypes["timerType"];
};

export const TraySVG: React.FC<Props> = ({ timerType, dashOffset }) => {
  const getProgressColor = (opacity = 1) => {
    switch (timerType) {
      case "STAY_FOCUS":
        return `rgba(0, 152, 247, ${opacity})`;
      case "SHORT_BREAK":
        return `rgba(7, 181, 131, ${opacity})`;
      default:
        return `rgba(212, 141, 10, ${opacity})`;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{
        transform: "rotateY(-180deg) rotateZ(-90deg)",
      }}
    >
      <g transform="translate(-353 -961)">
        <g
          transform="translate(353 961)"
          fill="#111d25"
          stroke={getProgressColor(0.75)}
          strokeWidth="1"
        >
          <rect width="16" height="16" rx="4" stroke="none" />
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="3.5"
            fill="none"
          />
        </g>
        <circle
          cx="4"
          cy="4"
          r="4"
          transform="translate(357 965)"
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="2"
        />
        <circle
          cx="4"
          cy="4"
          r="4"
          transform="translate(357 965)"
          fill="transparent"
          strokeWidth="2"
          strokeDasharray="24"
          strokeLinecap="round"
          strokeDashoffset={`${dashOffset}`}
          stroke={getProgressColor()}
        />
      </g>
    </svg>
  );
};

TraySVG.defaultProps = {
  dashOffset: 0,
  timerType: "STAY_FOCUS",
};
