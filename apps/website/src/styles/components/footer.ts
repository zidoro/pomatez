import styled from "styled-components";
import media from "../media";

const StyledGithubLink = styled.a`
  &:hover {
    color: var(--cl-primary-variant);
  }

  & > svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: currentColor;
  }
`;

export const StyledCopyrightText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: capitalize;
  margin-bottom: 0.8rem;
  display: block;
`;

export const StyledFooterNote = styled.p`
  display: grid;
  row-gap: 0.8rem;

  & > a {
    color: var(--cl-link);
    font-size: 2rem;
    font-weight: 700 !important;

    &:hover {
      color: var(--cl-link-hover);
    }
  }
`;

export const StyledFooterContent = styled.div`
  display: grid;
  row-gap: 0.8rem;
  height: max-content;
  width: max-content;

  margin: 0 auto;

  & > a {
    &:hover {
      color: var(--cl-link-hover);
    }

    svg {
      width: 2.2rem;
      height: 2.2rem;
      fill: currentColor;
      margin-bottom: 0.8rem;
    }
  }
`;

export const StyledFooter = styled.footer`
  width: 100%;
  min-height: 6.4rem;

  padding: 3.2rem;
  text-align: center;

  background: var(--bg-secondary);
  box-shadow: 0 1px 4px -1px var(--cl-shadow-secondary);

  position: relative;

  ${media.mobileLg} {
    padding: 3.2rem 2rem;
  }
`;
