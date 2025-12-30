import styled, { css } from "styled-components/macro";
import { themes } from "styles/themes";

export const StyledCheckboxBox = styled.span<{ hidden?: boolean }>`
  width: 1.1em;
  height: 1.1em;

  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  margin-right: 5px;

  border-radius: 2px;
  border: 2px solid var(--color-border-secondary);
  background-color: var(--color-bg-tertiary);

  box-shadow: 0 0 0 0 rgba(var(--color-green-rgb), 0.16);

  transition: ${themes.transition};

  &::after {
    content: "";

    height: 4px;
    width: 10px;

    margin-top: -2px;

    border-left: 2px solid;
    border-bottom: 2px solid;

    border-color: transparent;

    transform: rotate(-45deg) scale(0);
    transition: ${themes.transition};
  }
`;

export const StyledCheckboxLabel = styled.span`
  transition: ${themes.transition};
`;

export const StyledCheckbox = styled.label<{
  asPrimary?: boolean;
}>`
  position: relative;

  & > input {
    position: absolute;
    width: 0;
    height: 0;

    margin: 0;
    opacity: 0;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  & > input + ${StyledCheckboxBox} {
    ${(p) =>
      p.asPrimary &&
      css`
        box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);
      `}
  }

  & > input:checked + ${StyledCheckboxBox} {
    border-color: ${(p) =>
      p.asPrimary ? "var(--color-primary)" : "var(--color-green)"};
    background-color: ${(p) =>
      p.asPrimary ? "var(--color-primary)" : "var(--color-green)"};
  }

  & > input:checked + ${StyledCheckboxBox}::after {
    border-color: var(--color-bg-primary);
    transform: rotate(-45deg) scale(1);
  }

  & > input:checked ~ ${StyledCheckboxLabel} {
    color: ${(p) =>
      p.asPrimary ? "var(--color-primary)" : "var(--color-green)"};
  }

  &:hover ${StyledCheckboxBox} {
    box-shadow: ${(p) =>
      `0 0 0 0.2rem rgba(var(--${
        p.asPrimary ? "color-primary" : "color-green"
      }-rgb), 0.16)`};
  }

  &:active ${StyledCheckboxBox} {
    box-shadow: ${(p) =>
      `0 0 0 0.4rem rgba(var(--${
        p.asPrimary ? "color-primary" : "color-green"
      }-rgb), 0.16)`};
  }

  &:hover ${StyledCheckboxLabel}, &:focus ${StyledCheckboxLabel} {
    color: ${(p) =>
      `var(--${p.asPrimary ? "color-primary" : "color-green"})`};
  }

  display: inline-flex;
  align-items: center;

  text-transform: capitalize;
  cursor: pointer;

  user-select: none;
`;
