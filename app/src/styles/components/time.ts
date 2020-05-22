import styled from "styled-components/macro";

type TimeWrapperProps = { disabled?: boolean };

export const StyledTimeWrapper = styled.div<TimeWrapperProps>`
  width: 100%;
  height: max-content;

  display: grid;
  row-gap: 0.8rem;

  & > input[type="time"] {
    color: ${(p) => p.disabled && "transparent"};
    background-color: ${(p) => p.disabled && "var(--color-bg-tertiary)"};
  }
`;

export const StyledTimeInput = styled.input<{ error?: boolean }>`
  width: 100%;

  padding: 0.4rem 0.8rem;

  border: none;
  border-radius: 1px;
  background-color: var(--color-bg-secondary);

  &::-webkit-datetime-edit-fields-wrapper {
    color: ${(p) => p.error && "var(--color-pink)"};
  }

  &::-webkit-clear-button,
  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &::-webkit-datetime-edit-text {
    margin: 0 0.2rem;
  }
`;
