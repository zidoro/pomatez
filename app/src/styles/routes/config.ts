import styled, { css } from "styled-components/macro";
import { StyledHeaderHeading } from "styles";
import { themes } from "styles/themes";

export const StyledConfig = styled.main`
  padding: 0 2rem;

  animation: 320ms ${themes.enterFromLeft} ease;
`;

export const StyledConfigSliderSection = styled.section`
  width: 100%;
  height: max-content;

  display: grid;
  row-gap: 0.4rem;
`;

export const StyledConfigSpecialBreaks = styled.div`
  margin-top: 1.2rem;

  display: grid;
  row-gap: 1.2rem;
  column-gap: 1.2rem;
  grid-template-columns: repeat(2, 1fr);
`;

export const StyledSpecialBreakHeading = styled(StyledHeaderHeading)<{
  disabled?: boolean;
}>`
  grid-row: 1 / 2;
  grid-column: 1 / -1;

  color: ${(p) => p.disabled && "var(--color-disabled-text)"};
`;

export const StyledSpecialFieldMinute = styled.input<{ error?: boolean }>`
  padding: 0.4rem 0.8rem;

  cursor: default;

  border: none;
  color: ${(p) =>
    (p.disabled && "transparent") || (p.error && "var(--color-pink)")};
  background-color: ${(p) =>
    p.disabled ? "var(--color-bg-tertiary)" : "var(--color-bg-secondary)"};

  &:focus {
    cursor: text;
  }

  &::placeholder {
    color: ${(p) =>
      (p.disabled && "transparent") ||
      (p.error && "var(--color-pink)") ||
      "var(--color-disabled-text)"};
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
`;

export const StyledSpecialClearButton = styled.button<{ success?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  width: 2rem;
  height: 2rem;

  margin-top: -1rem;
  margin-right: -1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-body-text);

  border: none;
  border-radius: 50%;
  background-color: var(--color-bg-popper);
  box-shadow: 0 2px 8px -1px var(--color-shadow-primary);

  opacity: 0;
  visibility: hidden;
  transform: translateY(1rem);
  transition: all 320ms ease;

  &:hover {
    color: ${themes.color.close};
  }

  & > svg {
    width: 1rem;
    height: 1rem;

    fill: currentColor;
  }

  ${(p) =>
    p.success &&
    css`
      opacity: 0 !important;
      visibility: hidden !important;
      transform: translateY(1rem) !important;
    `}
`;

type SpecialBreakProps = {
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
};

export const StyledSpecialField = styled.form<SpecialBreakProps>`
  width: 100%;
  height: 3.2rem;

  display: grid;
  grid-template-columns: 1fr 1px 4.6rem;

  border-radius: 1px;
  border: 1px solid
    ${(p) =>
      p.error
        ? "rgba(var(--color-pink-rgb), 0.5)"
        : "var(--color-border-secondary)"};
  background-color: var(--color-bg-secondary);
  box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

  position: relative;

  &:focus-within {
    border-color: ${(p) =>
      p.error ? "var(--color-pink)" : "var(--color-primary)"};
    box-shadow: 0 0 0 2px
      ${(p) =>
        p.error
          ? "rgba(var(--color-pink-rgb), 0.16)"
          : "rgba(var(--color-primary-rgb), 0.16)"};
  }

  &:hover
    ${StyledSpecialClearButton},
    &:focus-within
    ${StyledSpecialClearButton} {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  & > span {
    width: 1px;
    height: 100%;

    background-color: ${(p) =>
      (p.disabled && "var(--color-bg-tertiary)") ||
      (p.error && "rgba(var(--color-pink-rgb), 0.5)") ||
      "var(--color-border-primary)"};
  }

  & > button[type="submit"] {
    display: none;
  }

  ${(p) =>
    p.success &&
    css`
      animation: success 2s ease;
    `}

  @keyframes success {
    0% {
      border-color: var(--color-green);
      box-shadow: 0 0 0 2px rgba(var(--color-green-rgb), 0.24);
    }
    50% {
      border-color: var(--color-green);
      box-shadow: 0 0 0 6px rgba(var(--color-green-rgb), 0);
    }
    100% {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.16);
    }
  }
`;
