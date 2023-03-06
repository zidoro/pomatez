import { keyframes, SxProps } from "@pomatez/ui";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(1.2rem)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-1.2rem)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(1.2rem)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const animationCommonConfig: SxProps = {
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
};

export const slideUpAndFadeAnimation: SxProps = {
  ...animationCommonConfig,
  animationName: `${slideUpAndFade}`,
};

export const slideRightAndFadeAnimation: SxProps = {
  ...animationCommonConfig,
  animationName: `${slideRightAndFade}`,
};

export const slideLeftAndFadeAnimation: SxProps = {
  ...animationCommonConfig,
  animationName: `${slideLeftAndFade}`,
};
