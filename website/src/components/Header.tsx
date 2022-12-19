import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import {
	StyledHeader,
	StyledHeading,
	StyledSubHeading,
	StyledDescription,
} from "../styles";
import { Edges } from "../types";

type Props = {
	node: Edges["node"];
};

export const Header: React.FC<Props> = ({ node }) => {
	const [ref, inView] = useInView({ triggerOnce: true });

	const control = useAnimation();

	useEffect(() => {
		if (inView) {
			control.start("animate");
		}
	}, [control, inView]);

	const { title, subTitle } = node.frontmatter;

	return (
		<StyledHeader ref={ref} animate={control}>
			<StyledHeading data-after={title}>
				<span>{title}</span>
			</StyledHeading>
			<StyledSubHeading>{subTitle}</StyledSubHeading>
			<StyledDescription
				dangerouslySetInnerHTML={{
					__html: node.html,
				}}
			/>
		</StyledHeader>
	);
};

export default Header;
