import React, { useContext } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
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
import { LandingQueryProps } from "./Landing";
import { ThemeContext } from "../contexts";

const Roadmap: React.FC = () => {
	const {
		allMarkdownRemark,
		shortBreakPreviewLight,
		shortBreakPreviewDark,
		longBreakPreviewLight,
		longBreakPreviewDark,
	} = useStaticQuery<LandingQueryProps>(graphql`
		{
			allMarkdownRemark: allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/roadmap/" } }
			) {
				edges {
					node {
						frontmatter {
							title
							subTitle
							features {
								heading
								description
							}
						}
						html
					}
				}
			}
			shortBreakPreviewLight: file(
				relativePath: { eq: "short-break-light.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 340, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			shortBreakPreviewDark: file(
				relativePath: { eq: "short-break-dark.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 340, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			longBreakPreviewLight: file(
				relativePath: { eq: "long-break-light.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 340, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			longBreakPreviewDark: file(relativePath: { eq: "long-break-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 340, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
		}
	`);

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
