import styled from "styled-components";
import { SectionStyle, SectionContentStyle } from "../mixins";
import {
  StyledFeatureList,
  StyledFeatureItem,
  StyledFeatureContainer,
  StyledFeaturedImageWrapper,
  StyledFeaturedImage,
} from "./features";

export const StyledRoadmap = styled.section`
  ${SectionStyle}
`;

export const StyledRoadmapContent = styled.div`
  ${SectionContentStyle};
`;

export const StyledRoadmapImageWrapper = styled(
  StyledFeaturedImageWrapper
)``;

export const StyledRoadmapImage = styled(StyledFeaturedImage)``;

export const StyledRoadmapContainer = styled(StyledFeatureContainer)``;

export const StyledRoadmapList = styled(StyledFeatureList)``;

export const StyledRoadmapItem = styled(StyledFeatureItem)``;
