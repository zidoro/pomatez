import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
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
import { FeatureQuery } from "../queries";

const Features: React.FC = () => {
	const {
		allMarkdownRemark,
		tasksPreviewLight,
		tasksPreviewDark,
		configPreviewLight,
		configPreviewDark,
	} = FeatureQuery();

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
		<StyledFeatures id="features">
			<StyledFeatureContent>
				<Header node={node} />

				<StyledFeatureContainer ref={ref} animate={control}>
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
