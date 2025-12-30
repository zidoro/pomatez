import styled from "styled-components/macro";

export const StyledSelect = styled.select`
  width: 100%;
  height: 3.6rem;

  padding: 0.5rem 2.6rem 0.5rem 1rem;

  color: var(--color-heading-text);

  border-radius: 3px;
  border: 1px solid var(--color-border-primary);
  background-color: var(--color-bg-input);
  box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 0.2rem rgba(var(--color-primary-rgb), 0.16);
  }
`;

export const StyledSelectWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    right: 1rem;
    top: 50%;

    width: 0.6rem;
    height: 0.6rem;

    border-right: 2px solid var(--color-disabled-text);
    border-bottom: 2px solid var(--color-disabled-text);

    transform: translateY(-60%) rotate(45deg);
    pointer-events: none;
  }
`;
