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
  StyledHeroBetaDescription,
} from "../styles";
import { PROJECT_GITHUB_URL, INSTALLERS } from "../config";
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

  const renderDownloadButton = (beta: boolean, isArm: boolean) => {
    switch (operatingSystem) {
      case "Windows":
        return (
          <StyledCTADownloader>
            <a
              href={
                INSTALLERS[beta ? "TAURI" : "ELECTRON"].WINDOWS[
                  isArm ? "arm" : "x64"
                ]
              }
            >
              <SVG name="windows" />
              for Windows {isArm ? "ARM" : "x64"}
            </a>
          </StyledCTADownloader>
        );
      case "MacOS":
        if (beta) {
          if (isArm) {
            // We only want to show one universal button
            return <></>;
          } else {
            return (
              <StyledCTADownloader>
                <a href={INSTALLERS.TAURI.MAC.universal}>
                  <SVG name="apple" />
                  for macOS Intel & Apple Silicon
                </a>
              </StyledCTADownloader>
            );
          }
        }
        return (
          <StyledCTADownloader>
            <a href={INSTALLERS.ELECTRON.MAC[isArm ? "arm" : "x64"]}>
              <SVG name="apple" />
              for macOS {isArm ? "Apple Silicon" : "Intel"}
            </a>
          </StyledCTADownloader>
        );
      case "Linux":
        if (beta) {
          // Weird way of doing it, but arm  versions are not currently being build for these.
          if (isArm) {
            return (
              <StyledCTADownloader>
                <a href={INSTALLERS.TAURI.LINUX.deb}>
                  <SVG name="tux" />
                  for Linux Deb
                </a>
              </StyledCTADownloader>
            );
          } else {
            return (
              <StyledCTADownloader>
                <a href={INSTALLERS.TAURI.LINUX.appImage.x64}>
                  <SVG name="tux" />
                  for Linux AppImage
                </a>
              </StyledCTADownloader>
            );
          }
        }
        if (!isArm) return <></>;
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
        if (!beta && !isArm) {
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
        return <></>;
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
            {renderDownloadButton(false, false)}
            {renderDownloadButton(false, true)}
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
          <StyledHeroBetaDescription>
            {operatingSystem === "Mobile"
              ? frontmatter.mobileText
              : frontmatter.betaText}
          </StyledHeroBetaDescription>
          <StyledHeroActionWrapper>
            {renderDownloadButton(true, false)}
            {renderDownloadButton(true, true)}
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
