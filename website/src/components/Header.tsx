import React from "react";
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
	const { title, subTitle } = node.frontmatter;

	return (
		<StyledHeader>
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
