import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import {
	StyledFeatures,
	StyledFeatureList,
	StyledFeatureItem,
	StyledFeatureContent,
	StyledFeatureContainer,
	StyledStickyContainer,
	StyledFeaturedImageWrapper,
	StyledFeaturedImage,
} from "../styles";
import { Header } from "../components";
import { ThemeContext } from "../contexts";
import { LandingQueryProps } from "./Landing";

const Features: React.FC = () => {
	const {
		allMarkdownRemark,
		tasksPreviewLight,
		tasksPreviewDark,
		configPreviewLight,
		configPreviewDark,
	} = useStaticQuery<LandingQueryProps>(graphql`
		{
			allMarkdownRemark: allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/features/" } }
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
			tasksPreviewLight: file(relativePath: { eq: "tasks-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 340, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			tasksPreviewDark: file(relativePath: { eq: "tasks-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 340, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			configPreviewLight: file(relativePath: { eq: "config-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 340, quality: 100) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			configPreviewDark: file(relativePath: { eq: "config-dark.PNG" }) {
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
		<StyledFeatures id="features">
			<StyledFeatureContent>
				<Header node={node} />

				<StyledFeatureContainer>
					<StyledStickyContainer>
						<StyledFeaturedImageWrapper>
							<StyledFeaturedImage>
								<Image
									fluid={
										isDarkMode
											? tasksPreviewDark.childImageSharp.fluid
											: tasksPreviewLight.childImageSharp.fluid
									}
									alt="tasks preview"
								/>
							</StyledFeaturedImage>
							<StyledFeaturedImage>
								<Image
									fluid={
										isDarkMode
											? configPreviewDark.childImageSharp.fluid
											: configPreviewLight.childImageSharp.fluid
									}
									alt="config preview"
								/>
							</StyledFeaturedImage>
						</StyledFeaturedImageWrapper>
					</StyledStickyContainer>

					<StyledFeatureList>
						{node.frontmatter.features?.map((feature, index) => (
							<StyledFeatureItem key={index}>
								<h5>{feature.heading}</h5>
								<p>{feature.description}</p>
							</StyledFeatureItem>
						))}
					</StyledFeatureList>
				</StyledFeatureContainer>
			</StyledFeatureContent>
		</StyledFeatures>
	);
};

export default Features;
