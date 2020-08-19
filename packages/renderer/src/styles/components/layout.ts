import styled from "styled-components/macro";

type LayoutProps = { noTransition?: boolean };

export const StyledLayout = styled.div<LayoutProps>`
  width: 100%;
  height: max-content;

  display: flex;
  flex-direction: column;
  justify-items: center;
  background-color: var(--color-bg-primary);

  & > main {
    height: 41.2rem;
    animation: ${(p) => p.noTransition && "none"};
  }
`;
