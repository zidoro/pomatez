import styled from "styled-components/macro";
import { themes } from "styles/themes";

export const StyledTimer = styled.main`
  width: 100%;
  height: 100%;

  flex: 1 1;

  padding-top: 1.2rem;

  display: flex;
  flex-direction: column;
  align-items: end;

  &.compact {
    padding-top: 0;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-content: start;
    align-items: center;
  }

  animation: enterFromBottom 160ms ease;

  @keyframes enterFromBottom {
    0% {
      opacity: 0;
      transform: translateY(1.2rem);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledPriorityCardContainer = styled.div`
  width: 100%;
  height: 5.6rem;
  padding: 0 1.6rem;
`;

export const StyledPriorityCardOption = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.4rem 0rem;
  margin: 0.4rem 0.6rem;

  color: var(--color-body-text);

  border: none;
  background-color: transparent;

  transition: ${themes.transition};

  &:hover,
  &:focus {
    color: var(--color-primary);
  }

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
    fill: currentColor;
  }
`;

export const StyledPriorityCardWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  padding: 0.5rem 1rem;
  padding-bottom: 0.6rem;

  border-radius: 3px;
  border: 1px solid var(--color-border-secondary);
  background-color: var(--color-bg-secondary);
`;

export const StyledPriorityCardHeader = styled.header`
  width: 100%;
`;

export const StyledPriorityCardHeading = styled.h4`
  padding-right: 1.6rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-heading-text);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const StyledPriorityCardDescription = styled.p`
  color: var(--color-body-text);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
