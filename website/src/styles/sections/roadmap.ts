import styled from "styled-components";
import { motion } from "framer-motion";
import { SectionStyle, SectionContentStyle } from "../mixins";
import {
  StyledFeatureList,
  StyledFeatureItem,
  StyledFeatureContainer,
  StyledFeaturedImageWrapper,
  StyledFeaturedImage,
} from "./features";
import { stagger } from "../animate";

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
