import React from "react";
import { StyledHeader } from "../styles";
import { Edges } from "../types";

type Props = {
	node: Edges["node"];
};

export const Header: React.FC<Props> = ({ node }) => {
	const { title, subTitle } = node.frontmatter;

	return (
		<StyledHeader>
			<h3 data-after={title}>
				<span>{title}</span>
			</h3>
			<h4>{subTitle}</h4>
			<div
				dangerouslySetInnerHTML={{
					__html: node.html,
				}}
			/>
		</StyledHeader>
	);
};

export default Header;
