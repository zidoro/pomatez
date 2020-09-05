import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import Image from "gatsby-image";
import {
	StyledBoosters,
	StyledFeatureContent,
	StyledBoosterList,
	StyledBoosterItem,
	StyledBoosterImage,
	StyledBoosterDescription,
	StyledCompanyWrapper,
	StyledCompanyImage,
	StyledCompanyDescription,
} from "../styles";
import { Header } from "../components";
import { BoosterQuery } from "../queries";

type Props = {};

const Boosters: React.FC<Props> = () => {
	const { allMarkdownRemark } = BoosterQuery();

	const [ref, inView] = useInView();

	const control = useAnimation();

	useEffect(() => {
		if (inView) {
			control.start("animate");
		}
	}, [control, inView]);

	const { node } = allMarkdownRemark.edges[0];

	return (
		<StyledBoosters id="boosters" ref={ref} animate={control}>
			<StyledFeatureContent>
				<Header node={node} />

				<StyledBoosterList>
					{node.frontmatter.boosters?.map((booster, index) => (
						<StyledBoosterItem key={index}>
							<StyledBoosterImage>
								<Image
									fixed={booster.image.childImageSharp.fixed}
									alt={booster.heading}
								/>
							</StyledBoosterImage>
							<StyledBoosterDescription>
								<h5>{booster.heading}</h5>
								<p>{booster.description}</p>
								<a
									href={booster.link}
									rel="noopener noreferrer"
									target="_blank"
								>
									See Details
								</a>
							</StyledBoosterDescription>
						</StyledBoosterItem>
					))}
				</StyledBoosterList>

				<StyledCompanyWrapper>
					<StyledCompanyDescription>
						{node.frontmatter.headline}
					</StyledCompanyDescription>

					<div>
						{node.frontmatter.companies?.map((company, index) => (
							<StyledCompanyImage key={index}>
								<Image
									fluid={company.logo.childImageSharp.fluid}
									alt={company.name}
								/>
							</StyledCompanyImage>
						))}
					</div>
				</StyledCompanyWrapper>
			</StyledFeatureContent>
		</StyledBoosters>
	);
};

export default Boosters;
