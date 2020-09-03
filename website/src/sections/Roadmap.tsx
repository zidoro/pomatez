import React, { useContext } from "react";
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
import { ThemeContext } from "../contexts";
import { RoadmapQuery } from "../queries";

const Roadmap: React.FC = () => {
	const {
		allMarkdownRemark,
		shortBreakPreviewLight,
		shortBreakPreviewDark,
		longBreakPreviewLight,
		longBreakPreviewDark,
	} = RoadmapQuery();

	const { isDarkMode } = useContext(ThemeContext);

	const { node } = allMarkdownRemark.edges[0];

	return (
		<StyledRoadmap id="roadmap">
			<StyledRoadmapContent>
				<Header node={node} />

				<StyledRoadmapContainer>
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
};

export default Roadmap;
