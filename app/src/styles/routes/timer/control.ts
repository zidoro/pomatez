import styled, { css } from "styled-components/macro";
import { SHORT_BREAK, LONG_BREAK, SPECIAL_BREAK, TimerTypes } from "store";
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
`;

type ControlProps = { type?: TimerTypes["timerType"] };

export const StyledControl = styled.div<ControlProps>`
  width: 100%;
  height: 100%;

  padding: 0.8rem 1.6rem;

  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: 72px max-content 1fr;
  column-gap: 1rem;

  color: ${(p) =>
    (p.type === SHORT_BREAK && "var(--color-green)") ||
    (p.type === LONG_BREAK && "var(--color-yellow)") ||
    (p.type === SPECIAL_BREAK && "var(--color-yellow)") ||
    "var(--color-primary)"};

  .ripple-hook {
    background-color: ${(p) =>
      (p.type === SHORT_BREAK && "var(--color-bg-ripple-green)") ||
      (p.type === LONG_BREAK && "var(--color-bg-ripple-yellow)") ||
      (p.type === SPECIAL_BREAK && "var(--color-bg-ripple-yellow)") ||
      "var(--color-bg-ripple-primary)"};
  }
`;

type SessionProps = { timerType?: TimerTypes["timerType"] };

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
      (p.timerType === SHORT_BREAK && "var(--color-green)") ||
      (p.timerType === LONG_BREAK && "var(--color-yellow)") ||
      (p.timerType === SPECIAL_BREAK && "var(--color-yellow)") ||
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

export const StyledControlMain = styled.div`
  display: grid;
  align-items: center;
  align-content: center;
  grid-auto-flow: column;
  column-gap: 1rem;
`;

export const StyledResetButton = styled.button`
  ${ControlButton};
`;

export const StyledMainButton = styled.button`
  ${ControlButton};
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

export const StyledStrictIndicator = styled.div`
  width: 3.2rem;
  height: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 4px;

  color: var(--color-body-text);
  border-radius: 50%;

  & > svg {
    width: 2rem;
    height: 2rem;

    fill: currentColor;
  }
`;

export const StyledLockIndicator = styled.div`
  width: 3.2rem;
  height: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-body-text);
  border-radius: 50%;

  & > svg {
    width: 2rem;
    height: 2rem;

    fill: currentColor;
  }
`;
