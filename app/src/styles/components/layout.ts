import styled from "styled-components/macro";

type LayoutProps = { noTransition?: boolean };

export const StyledLayout = styled.div<LayoutProps>`
  width: 100%;
  height: 500px;

  display: grid;
  align-content: start;
  grid-template-rows: repeat(2, max-content) 1fr;

  background-color: var(--color-bg-primary);

  & > main {
    animation: ${(p) => p.noTransition && "none"};
  }
`;
