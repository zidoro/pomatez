import { css, keyframes } from "styled-components/macro";

export const lightTheme = css`
  --color-primary: #0098f7;
  --color-primary-rgb: 44, 167, 248;

  --color-yellow: #d18305;
  --color-yellow-rgb: 209, 131, 5;
  --color-green: #00a678;
  --color-green-rgb: 0, 166, 120;
  --color-pink: #de4561;
  --color-pink-rgb: 222, 69, 97;

  --color-heading-text: #212121;
  --color-body-text: #666666;
  --color-disabled-text: #9e9e9e;

  --color-bg-primary: #fff;
  --color-bg-primary-rgb: 255, 255, 255;
  --color-bg-secondary: #fafafa;
  --color-bg-tertiary: #f3f3f3;

  --color-bg-popper: var(--color-bg-primary);

  --color-bg-code: var(--color-bg-tertiary);

  --color-bg-ripple-primary: rgba(var(--color-primary-rgb), 0.24);
  --color-bg-ripple-green: rgba(var(--color-green-rgb), 0.24);
  --color-bg-ripple-yellow: rgba(var(--color-yellow-rgb), 0.24);

  --color-bg-input: var(--color-bg-primary);
  --color-bg-input-focus: var(--color-bg-primary);

  --color-primary-button: var(--color-bg-primary);
  --color-bg-button-normal: var(--color-bg-primary);

  --color-bg-task-list: var(--color-bg-tertiary);
  --color-bg-task-card: var(--color-bg-primary);
  --color-bg-task-card-hover: var(--color-bg-secondary);
  --color-bg-task-card-focus: var(--color-bg-primary);

  --color-titlebar-hover: rgba(0, 0, 0, 0.04);

  --color-bg-slider-thumb: var(--color-bg-primary);

  --color-border-primary: #e6e6e6;
  --color-border-secondary: #f2f2f2;
  --color-border-progress: var(--color-border-primary);
  --color-border-window: var(--color-bg-primary);

  --color-border-input-primary: var(--color-border-secondary);
  --color-border-input-secondary: var(--color-border-primary);

  --color-shadow-primary: rgba(0, 0, 0, 0.16);
`;

export const darkTheme = css`
  --color-primary: #2ca7f8;
  --color-primary-rgb: 44, 167, 248;

  --color-yellow: #d48d0a;
  --color-yellow-rgb: 212, 141, 10;
  --color-green: #07b583;
  --color-green-rgb: 7, 181, 131;
  --color-pink: #e35676;
  --color-pink-rgb: 227, 86, 118;

  --color-heading-text: #e3e4e5;
  --color-body-text: #a7abae;
  --color-disabled-text: #7b8185;

  --color-bg-primary: #141e25;
  --color-bg-primary-rgb: 20, 30, 37;
  --color-bg-secondary: #1f2930;
  --color-bg-tertiary: #232d34;

  --color-bg-popper: #2d373e;

  --color-bg-code: var(--color-bg-primary);

  --color-bg-ripple-primary: rgba(var(--color-primary-rgb), 0.24);
  --color-bg-ripple-green: rgba(var(--color-green-rgb), 0.24);
  --color-bg-ripple-yellow: rgba(var(--color-yellow-rgb), 0.24);

  --color-bg-input: #2c363d;
  --color-bg-input-focus: #2c363d;

  --color-primary-button: var(--color-heading-text);
  --color-bg-button-normal: var(--color-bg-tertiary);

  --color-bg-task-list: var(--color-bg-secondary);
  --color-bg-task-card: transparent;
  --color-bg-task-card-hover: #2c363d;
  --color-bg-task-card-focus: #2c363d;

  --color-titlebar-hover: rgba(255, 255, 255, 0.08);

  --color-bg-slider-thumb: var(--color-bg-tertiary);

  --color-border-primary: rgba(255, 255, 255, 0.12);
  --color-border-secondary: rgba(255, 255, 255, 0.04);
  --color-border-progress: rgba(var(--color-primary-rgb), 0.16);
  --color-border-window: #283138;

  --color-border-input-primary: var(--color-border-primary);
  --color-border-input-secondary: var(--color-border-primary);

  --color-shadow-primary: rgba(0, 0, 0, 0.24);
`;

const enterFromLeft = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-2rem);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
`;

const enterFromRight = keyframes`
    0% {
      opacity: 0;
      transform: translateX(2rem);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
`;

export const themes = {
  color: {
    close: "#f17e00",
  },
  easing: "ease",
  transition: "all 140ms ease",
  enterFromLeft,
  enterFromRight,
};
