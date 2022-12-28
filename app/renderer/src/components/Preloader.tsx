import React from "react";
import {
  StyledLoaderContainer,
  StyledLoaderWrapper,
  StyledLoaderBox,
} from "styles";

export const Preloader = () => (
  <StyledLoaderContainer>
    <StyledLoaderWrapper>
      <StyledLoaderBox />
      <StyledLoaderBox />
      <StyledLoaderBox />
      <StyledLoaderBox />
      <StyledLoaderBox />
    </StyledLoaderWrapper>
  </StyledLoaderContainer>
);
