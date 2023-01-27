import React from "react";
import { PageLayout, SVG } from "../components";
import {
  StyledPageNotFound,
  Styled404Header,
  StyledWaterMarkLeft,
  StyledWaterMarkRight,
  Styled404ActionWrapper,
  Styled404HomeLink,
  Styled404Content,
  StyledHeroHeading,
  StyledHeroDescription,
} from "../styles";

function NotFoundPage() {
  return (
    <PageLayout>
      <StyledPageNotFound>
        <Styled404Content>
          <StyledWaterMarkLeft />
          <StyledWaterMarkRight />

          <Styled404Header>
            <StyledHeroHeading>Not Found</StyledHeroHeading>
            <StyledHeroDescription>
              Sorry, we haven't found the page you are looking for.
            </StyledHeroDescription>
          </Styled404Header>

          <Styled404ActionWrapper>
            <Styled404HomeLink to="/">
              <SVG name="arrow-back" />
              Go back to Landing Page
            </Styled404HomeLink>
          </Styled404ActionWrapper>
        </Styled404Content>
      </StyledPageNotFound>
    </PageLayout>
  );
}

export const Head = () => (
  <>
    <title>404 - Page Not Found</title>
  </>
);

export default NotFoundPage;
