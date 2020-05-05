import styled from "styled-components/macro";
import { StyledScrollbar } from "styles/mixins";

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 1rem;

  resize: none;

  color: var(--color-heading-text);

  border-radius: 3px;
  border: 1px solid var(--color-border-primary);
  background-color: var(--color-bg-input);
  box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

  ${StyledScrollbar};

  &::placeholder {
    color: var(--color-disabled-text);
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 0.2rem rgba(var(--color-primary-rgb), 0.16);
  }
`;
