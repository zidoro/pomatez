import React, { useState, useContext, useLayoutEffect } from "react";
import Image from "gatsby-image";
import {
	StyledLanding,
	StyledWaterMarkLeft,
	StyledWaterMarkRight,
	StyledPreviewWrapper,
	StyledLandingContent,
	StyledCTADownloader,
	StyledLandingHeader,
	StyledLandingActionContainer,
	StyledLandingActionWrapper,
	StyledGithubLink,
	StyledPreviewImage,
	StyledLandingHeading,
	StyledLandingDescription,
	StyledWatermarkContainer,
} from "../styles";
import { WINDOWS_INSTALLER, MAC_INSTALLER } from "../config";
import { OSTypes, detectOS } from "../utils";
import { ThemeContext } from "../contexts";
import { LandingQuery } from "../queries";
import { SVG } from "../components";

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
	} = LandingQuery();

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
						to="installers"
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
						to="installers"
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
				<StyledWatermarkContainer>
					<StyledWaterMarkLeft />
					<StyledWaterMarkRight />
				</StyledWatermarkContainer>

				<StyledLandingActionContainer>
					<StyledLandingHeader>
						<StyledLandingHeading>{frontmatter.title}</StyledLandingHeading>
						<StyledLandingDescription>
							{frontmatter.subTitle}
						</StyledLandingDescription>
					</StyledLandingHeader>

					<StyledLandingActionWrapper>
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
					</StyledLandingActionWrapper>
				</StyledLandingActionContainer>

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
