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

	const [listRef, listInView] = useInView({ triggerOnce: true });

	const [companyRef, companyInView] = useInView({ triggerOnce: true });

	const listControl = useAnimation();

	const companyControl = useAnimation();

	useEffect(() => {
		if (listInView) listControl.start("animate");
		if (companyInView) companyControl.start("animate");
	}, [listControl, listInView, companyControl, companyInView]);

	const { node } = allMarkdownRemark.edges[0];

	return (
		<StyledBoosters id="boosters">
			<StyledFeatureContent>
				<Header node={node} />

				<StyledBoosterList ref={listRef} animate={listControl}>
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

				<StyledCompanyWrapper ref={companyRef} animate={companyControl}>
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
