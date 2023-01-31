import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import Image from "gatsby-image";
import {
  StyledRoadmap,
  StyledRoadmapList,
  StyledRoadmapItem,
  StyledRoadmapContent,
  StyledRoadmapContainer,
  StyledRoadmapImageWrapper,
  StyledStickyContainer,
  StyledRoadmapImage,
} from "../styles";
import { Header } from "../components";
import { ThemeContext } from "../context";
import { useRoadMapQuery } from "../queries";

export function RoadMap() {
  const {
    allMarkdownRemark,
    shortBreakPreviewLight,
    shortBreakPreviewDark,
    longBreakPreviewLight,
    longBreakPreviewDark,
  } = useRoadMapQuery();

  const { isDarkMode } = useContext(ThemeContext);

  const [ref, inView] = useInView({ triggerOnce: true });

  const control = useAnimation();

  useEffect(() => {
    if (inView) {
      control.start("animate");
    }
  }, [control, inView]);

  const { node } = allMarkdownRemark.edges[0];

  return (
    <StyledRoadmap id="roadmap">
      <StyledRoadmapContent>
        <Header node={node} />

        <StyledRoadmapContainer ref={ref} animate={control}>
          <StyledStickyContainer>
            <StyledRoadmapImageWrapper>
              <StyledRoadmapImage>
                <Image
                  fluid={
                    isDarkMode
                      ? shortBreakPreviewDark.childImageSharp.fluid
                      : shortBreakPreviewLight.childImageSharp.fluid
                  }
                  alt="short break preview"
                />
              </StyledRoadmapImage>
              <StyledRoadmapImage>
                <Image
                  fluid={
                    isDarkMode
                      ? longBreakPreviewDark.childImageSharp.fluid
                      : longBreakPreviewLight.childImageSharp.fluid
                  }
                  alt="long break preview"
                />
              </StyledRoadmapImage>
            </StyledRoadmapImageWrapper>
          </StyledStickyContainer>

          <StyledRoadmapList>
            {node.frontmatter.features?.map((feature, index) => (
              <StyledRoadmapItem key={index}>
                <h5>{feature.heading}</h5>
                <p>{feature.description}</p>
              </StyledRoadmapItem>
            ))}
          </StyledRoadmapList>
        </StyledRoadmapContainer>
      </StyledRoadmapContent>
    </StyledRoadmap>
  );
}
