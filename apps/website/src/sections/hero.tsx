import React, { useState, useContext, useLayoutEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Image from "gatsby-image";
import {
  StyledHero,
  StyledWaterMarkLeft,
  StyledWaterMarkRight,
  StyledPreviewWrapper,
  StyledHeroContent,
  StyledCTADownloader,
  StyledHeroHeader,
  StyledHeroActionContainer,
  StyledHeroActionWrapper,
  StyledGithubLink,
  StyledPreviewImage,
  StyledHeroHeading,
  StyledHeroDescription,
  StyledWatermarkContainer,
} from "../styles";
import {
  WINDOWS_INSTALLER,
  MAC_INSTALLER,
  PROJECT_GITHUB_URL,
} from "../config";
import { OSTypes, detectOS } from "../utils";
import { ThemeContext } from "../context";
import { useLandingQuery } from "../queries";
import { SVG } from "../components";

export function Hero() {
  const {
    allMarkdownRemark,
    workTimePreviewLight,
    workTimePreviewDark,
    shortBreakPreviewLight,
    shortBreakPreviewDark,
    longBreakPreviewLight,
    longBreakPreviewDark,
    configPreviewLight,
    configPreviewDark,
    settingsPreviewLight,
    settingsPreviewDark,
    tasksPreviewLight,
    tasksPreviewDark,
  } = useLandingQuery();

  const { frontmatter } = allMarkdownRemark.edges[0].node;

  const [operatingSystem, setOperatingSystem] =
    useState<OSTypes>("Mobile");

  const { isDarkMode } = useContext(ThemeContext);

  useLayoutEffect(() => {
    setOperatingSystem(detectOS());
  }, []);

  const renderDownloadButton = () => {
    switch (operatingSystem) {
      case "Windows":
        return (
          <StyledCTADownloader>
            <a href={WINDOWS_INSTALLER}>
              <SVG name="windows" />
              for Windows
            </a>
          </StyledCTADownloader>
        );
      case "MacOS":
        return (
          <StyledCTADownloader>
            <a href={MAC_INSTALLER}>
              <SVG name="apple" />
              for Mac OS
            </a>
          </StyledCTADownloader>
        );
      case "Linux":
        return (
          <StyledCTADownloader>
            <ScrollLink
              href="/"
              to="installers"
              offset={-24}
              duration={420}
              smooth
            >
              <SVG name="tux" />
              for Linux OS
            </ScrollLink>
          </StyledCTADownloader>
        );
      default:
        return (
          <StyledCTADownloader>
            <ScrollLink
              href="/"
              to="installers"
              offset={-24}
              duration={420}
              smooth
            >
              <SVG name="download" />
              See Installers
            </ScrollLink>
          </StyledCTADownloader>
        );
    }
  };

  return (
    <StyledHero id="hero">
      <StyledHeroContent>
        <StyledWatermarkContainer>
          <StyledWaterMarkLeft />
          <StyledWaterMarkRight />
        </StyledWatermarkContainer>

        <StyledHeroActionContainer>
          <StyledHeroHeader>
            <StyledHeroHeading>{frontmatter.title}</StyledHeroHeading>
            <StyledHeroDescription>
              {frontmatter.subTitle}
            </StyledHeroDescription>
          </StyledHeroHeader>

          <StyledHeroActionWrapper>
            {renderDownloadButton()}
            <StyledGithubLink
              as={"a"}
              href={PROJECT_GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SVG name="github" />
              GitHub Repo
            </StyledGithubLink>
          </StyledHeroActionWrapper>
        </StyledHeroActionContainer>

        <StyledPreviewWrapper>
          <StyledPreviewImage>
            <Image
              fluid={
                isDarkMode
                  ? tasksPreviewDark.childImageSharp.fluid
                  : tasksPreviewLight.childImageSharp.fluid
              }
              alt="tasks preview"
            />
          </StyledPreviewImage>

          <StyledPreviewImage>
            <Image
              fluid={
                isDarkMode
                  ? settingsPreviewDark.childImageSharp.fluid
                  : settingsPreviewLight.childImageSharp.fluid
              }
              alt="settings preview"
            />
          </StyledPreviewImage>

          <StyledPreviewImage>
            <Image
              fluid={
                isDarkMode
                  ? configPreviewDark.childImageSharp.fluid
                  : configPreviewLight.childImageSharp.fluid
              }
              alt="config preview"
            />
          </StyledPreviewImage>

          <StyledPreviewImage>
            <Image
              fluid={
                isDarkMode
                  ? workTimePreviewDark.childImageSharp.fluid
                  : workTimePreviewLight.childImageSharp.fluid
              }
              alt="work time preview"
            />
          </StyledPreviewImage>

          <StyledPreviewImage>
            <Image
              fluid={
                isDarkMode
                  ? shortBreakPreviewDark.childImageSharp.fluid
                  : shortBreakPreviewLight.childImageSharp.fluid
              }
              alt="short break preview"
            />
          </StyledPreviewImage>

          <StyledPreviewImage>
            <Image
              fluid={
                isDarkMode
                  ? longBreakPreviewDark.childImageSharp.fluid
                  : longBreakPreviewLight.childImageSharp.fluid
              }
              alt="long break preview"
            />
          </StyledPreviewImage>
        </StyledPreviewWrapper>
      </StyledHeroContent>
    </StyledHero>
  );
}
