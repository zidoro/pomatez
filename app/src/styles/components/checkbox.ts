import styled from "styled-components/macro";
import { themes } from "styles/themes";

export const StyledCheckboxBox = styled.span`
  width: 1.1em;
  height: 1.1em;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  margin-right: 5px;

  border-radius: 3px;
  border: 2px solid var(--color-border-secondary);
  background-color: var(--color-bg-tertiary);

  box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

  transition: ${themes.transition};

  &::after {
    content: "";

    height: 4px;
    width: 9px;

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

export const StyledCheckbox = styled.label<{ disabled?: boolean }>`
  & > input {
    display: none;
  }

  & > input:checked + ${StyledCheckboxBox} {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }

  & > input:checked + ${StyledCheckboxBox}::after {
    border-color: var(--color-bg-primary);
    transform: rotate(-45deg) scale(1);
  }

  & > input:checked ~ ${StyledCheckboxLabel} {
    color: var(--color-primary);
  }

  &:active ${StyledCheckboxBox} {
    box-shadow: ${p =>
      p.disabled
        ? "0 0 0 0.4rem rgba(var(--color-primary-rgb), 0)"
        : "0 0 0 0.4rem rgba(var(--color-primary-rgb), 0.16)"};
  }

  &:hover ${StyledCheckboxLabel} {
    color: ${p =>
      p.disabled ? "var(--color-disabled-text)" : "var(--color-primary)"};
  }

  ${StyledCheckboxLabel} {
    color: ${p => p.disabled && "var(--color-disabled-text)"};
  }

  display: inline-flex;
  align-items: center;

  text-transform: capitalize;
  cursor: pointer;

  user-select: none;
`;
