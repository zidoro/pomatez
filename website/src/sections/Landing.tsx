import React, { useState, useContext, useLayoutEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import {
	StyledLanding,
	StyledWaterMarkLeft,
	StyledWaterMarkRight,
	StyledLandingCTAWrapper,
	StyledPreviewWrapper,
	StyledLandingContent,
	StyledCTADownloader,
	StyledLandingHeader,
	StyledLandingCtaWrapper,
	StyledGithubLink,
	StyledPreviewImage,
} from "../styles";
import { FluidImageProps, MarkDownProps } from "../types";
import { WINDOWS_INSTALLER, MAC_INSTALLER } from "../config";
import { OSTypes, detectOS } from "../utils";
import { ThemeContext } from "../contexts";
import { SVG } from "../components";

export type LandingQueryProps = {
	workTimePreviewLight: FluidImageProps;
	workTimePreviewDark: FluidImageProps;
	shortBreakPreviewLight: FluidImageProps;
	shortBreakPreviewDark: FluidImageProps;
	longBreakPreviewLight: FluidImageProps;
	longBreakPreviewDark: FluidImageProps;
	configPreviewLight: FluidImageProps;
	configPreviewDark: FluidImageProps;
	settingsPreviewLight: FluidImageProps;
	settingsPreviewDark: FluidImageProps;
	tasksPreviewLight: FluidImageProps;
	tasksPreviewDark: FluidImageProps;
} & MarkDownProps;

const Landing: React.FC = () => {
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
	} = useStaticQuery<LandingQueryProps>(graphql`
		{
			allMarkdownRemark: allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/landing/" } }
			) {
				edges {
					node {
						frontmatter {
							title
							subTitle
						}
					}
				}
			}
			workTimePreviewLight: file(relativePath: { eq: "work-time-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 250, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			workTimePreviewDark: file(relativePath: { eq: "work-time-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 250, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			shortBreakPreviewLight: file(
				relativePath: { eq: "short-break-light.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 220, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			shortBreakPreviewDark: file(
				relativePath: { eq: "short-break-dark.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 220, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			longBreakPreviewLight: file(
				relativePath: { eq: "long-break-light.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 200, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			longBreakPreviewDark: file(relativePath: { eq: "long-break-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 200, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			configPreviewLight: file(relativePath: { eq: "config-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 250, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			configPreviewDark: file(relativePath: { eq: "config-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 250, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			settingsPreviewLight: file(relativePath: { eq: "settings-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 220, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			settingsPreviewDark: file(relativePath: { eq: "settings-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 220, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			tasksPreviewLight: file(relativePath: { eq: "tasks-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 200, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			tasksPreviewDark: file(relativePath: { eq: "tasks-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 200, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
		}
	`);

	const { frontmatter } = allMarkdownRemark.edges[0].node;

	const [operatingSystem, setOperatingSystem] = useState<OSTypes>("Mobile");

	const { isDarkMode } = useContext(ThemeContext);

	useLayoutEffect(() => {
		setOperatingSystem(detectOS());
	}, []);

	const renderDownloadButton = () => {
		switch (operatingSystem) {
			case "Windows":
				return (
					<StyledCTADownloader as={"a"} href={WINDOWS_INSTALLER}>
						<SVG name="windows" />
						for Windows
					</StyledCTADownloader>
				);
			case "MacOS":
				return (
					<StyledCTADownloader as={"a"} href={MAC_INSTALLER}>
						<SVG name="apple" />
						for Mac OS
					</StyledCTADownloader>
				);
			case "Linux":
				return (
					<StyledCTADownloader
						href="/"
						to="download-now"
						offset={-24}
						duration={420}
						smooth
					>
						<SVG name="tux" />
						for Linux OS
					</StyledCTADownloader>
				);
			default:
				return (
					<StyledCTADownloader
						href="/"
						to="download-now"
						offset={-24}
						duration={420}
						smooth
					>
						<SVG name="download" />
						See Installers
					</StyledCTADownloader>
				);
		}
	};

	return (
		<StyledLanding id="landing">
			<StyledLandingContent>
				<StyledWaterMarkLeft />
				<StyledWaterMarkRight />

				<StyledLandingCTAWrapper>
					<StyledLandingHeader>
						<h1>{frontmatter.title}</h1>
						<h2>{frontmatter.subTitle}</h2>
					</StyledLandingHeader>

					<StyledLandingCtaWrapper>
						{renderDownloadButton()}
						<StyledGithubLink
							as={"a"}
							href="https://github.com/roldanjr/pomatez"
							target="_blank"
							rel="noopener noreferrer"
						>
							<SVG name="github" />
							GitHub Repo
						</StyledGithubLink>
					</StyledLandingCtaWrapper>
				</StyledLandingCTAWrapper>

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
			</StyledLandingContent>
		</StyledLanding>
	);
};

export default Landing;
