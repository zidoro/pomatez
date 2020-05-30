import styled from "styled-components/macro";
import { themes } from "styles/themes";

export const StyledTogglerWrapper = styled.div`
  width: 100%;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  &:focus-within label,
  &:active label {
    color: var(--color-primary);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 0.1rem;

    background-color: var(--color-border-secondary);
  }
`;

export const StyledTogglerLabel = styled.label`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  text-transform: capitalize;
`;

export const StyledTogglerSwitch = styled.input`
  width: 2.6rem;
  height: 3.2rem;

  appearance: none;

  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    top: 50%;
    left: 50%;

    width: 2.4rem;
    height: 1.2rem;

    border-radius: 10rem;
    background-color: var(--color-border-primary);

    transform: translate(-50%, -50%);

    transition: ${themes.transition} 40ms;
  }

  &::after {
    top: 50%;
    left: 0;

    width: 1.4rem;
    height: 1.4rem;

    border-radius: 10rem;
    border: 0.1rem solid var(--color-primary);
    background-color: var(--color-bg-slider-thumb);
    box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

    transform: translateY(-50%);
    cursor: pointer;

    transition: ${themes.transition};
  }

  &:hover::after,
  &:focus::after {
    box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-rgb), 0.16);
  }

  &:active::after {
    box-shadow: 0 0 0 0.6rem rgba(var(--color-primary-rgb), 0.24);
  }

  &:checked::before {
    background-color: var(--color-primary);
  }

  &:checked::after {
    left: calc(100% - 1.4rem);
  }
`;
