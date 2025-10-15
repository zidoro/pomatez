import styled, { css } from "styled-components/macro";
import { TimerStatus } from "store/timer/types";
import { themes } from "../../themes";

const ControlButton = css`
  min-width: 3.2rem;
  min-height: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-body-text);

  border: none;
  border-radius: 50%;
  background-color: transparent;

  cursor: pointer;

  transition: ${themes.transition};

  &:hover {
    color: currentColor;
  }

  &.compact {
    min-width: 1.6rem;
    min-height: 1.6rem;
  }
`;

type ControlProps = { type?: TimerStatus };

export const StyledControlSpacer = styled.div<ControlProps>`
  flex: 1 0;
`;

export const StyledControl = styled.div<ControlProps>`
  width: 100%;
  height: 9.2rem;

  padding: 0.8rem 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-template-columns: 72px max-content 1fr;
  column-gap: 1rem;

  color: ${(p) =>
    (p.type === TimerStatus.SHORT_BREAK && "var(--color-green)") ||
    (p.type === TimerStatus.LONG_BREAK && "var(--color-yellow)") ||
    (p.type === TimerStatus.SPECIAL_BREAK && "var(--color-yellow)") ||
    "var(--color-primary)"};

  .ripple-hook {
    background-color: ${(p) =>
      (p.type === TimerStatus.SHORT_BREAK &&
        "var(--color-bg-ripple-green)") ||
      (p.type === TimerStatus.LONG_BREAK &&
        "var(--color-bg-ripple-yellow)") ||
      (p.type === TimerStatus.SPECIAL_BREAK &&
        "var(--color-bg-ripple-yellow)") ||
      "var(--color-bg-ripple-primary)"};
  }

  &.compact {
    height: 100%;
    padding: 0;
  }
`;

type SessionProps = { timerType?: TimerStatus };

export const StyledSessionReset = styled.button<SessionProps>`
  position: absolute;
  top: 0;
  right: 0;

  width: 2.4rem;
  height: 2.4rem;

  margin-top: -0.5rem;
  margin-right: -2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;
  background-color: var(--color-bg-tertiary);

  opacity: 0;
  visibility: hidden;
  transform: translateY(1rem);
  transition: all 320ms ease;

  &:hover {
    color: ${(p) =>
      (p.timerType === TimerStatus.SHORT_BREAK &&
        "var(--color-green)") ||
      (p.timerType === TimerStatus.LONG_BREAK &&
        "var(--color-yellow)") ||
      (p.timerType === TimerStatus.SPECIAL_BREAK &&
        "var(--color-yellow)") ||
      "var(--color-primary)"};
  }

  & > svg {
    width: 1.6rem;
    height: 1.6rem;

    fill: currentColor;
  }
`;

export const StyledSessions = styled.p`
  width: max-content;
  height: max-content;

  font-size: 1.4rem;
  font-weight: 500;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: var(--color-body-text);

  position: relative;

  &:hover ${StyledSessionReset} {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

export const StyledControlMain = styled.div<{ compact?: boolean }>`
  display: grid;
  align-items: center;
  align-content: center;
  grid-auto-flow: column;
  column-gap: 1rem;
  margin-right: ${(p) => (p.compact ? 0 : "-1rem")};
`;

export const StyledResetButton = styled.button`
  ${ControlButton};
`;

export const StyledMainButton = styled.button`
  ${ControlButton};
`;

export const StyledCompactButton = styled.button<{ compact?: boolean }>`
  ${ControlButton}
  padding-right: ${(p) => (p.compact ? "1.6rem" : 0)};

  & > svg {
    width: ${(p) => (p.compact ? "1.6rem" : "inherit")};
  }
`;

export const StyledSkipButton = styled.button`
  ${ControlButton};

  & > svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

export const StyledVolumeButton = styled.button`
  ${ControlButton};
`;

export const StyledStrictIndicator = styled.div<{ warn?: boolean }>`
  width: 2.8rem;
  height: 2.8rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-body-text);
  background-color: var(--color-bg-secondary);

  border-radius: 50%;
  border: 1px solid var(--color-border-primary);
  box-shadow: 0 0 0 0 rgba(var(--color-yellow-rgb), 0.16);

  position: relative;

  ${(p) =>
    p.warn &&
    css`
      animation: warning 1s ease;
    `}

  & > svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  @keyframes warning {
    0% {
      color: var(--color-yellow);
      border-color: var(--color-yellow);
      box-shadow: 0 0 0 0 rgba(var(--color-yellow-rgb), 0.24);
    }
    50% {
      color: var(--color-yellow);
      border-color: var(--color-yellow);
      box-shadow: 0 0 0 12px rgba(var(--color-yellow-rgb), 0);
    }
    100% {
      color: var(--color-body-text);
      border-color: var(--color-border-primary);
      box-shadow: 0 0 0 0 rgba(var(--color-yellow-rgb), 0);
    }
  }
`;

export const StyledStrictSnackbar = styled.div<{ warn?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  margin-top: -57%;
  margin-right: 6.8rem;

  width: 16rem;
  height: 5.6rem;

  padding: 0.7rem 1.2rem;

  text-align: center;

  color: var(--color-body-text);

  border-radius: 10rem;
  border: 1px solid var(--color-border-primary);
  background-color: var(--color-bg-primary);
  transition: ${themes.transition};

  opacity: 0;
  visibility: hidden;
  transform: translateY(6rem);

  ${(p) =>
    p.warn &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}

  & > span {
    font-weight: 500;
    color: var(--color-yellow);
  }
`;
