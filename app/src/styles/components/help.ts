import styled from "styled-components/macro";

export const StyledHelpWrapper = styled.a`
  width: 100%;
  height: 4rem;

  display: grid;
  align-items: center;
  grid-template-columns: 1fr max-content;

  position: relative;

  &:hover {
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

export const StyledHelpLabel = styled.label`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledHelpExternal = styled.span`
  border-radius: 0.3rem;
  background-color: var(--color-bg-secondary);

  padding: 0.4rem 0.8rem;
`;
