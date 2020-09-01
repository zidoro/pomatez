import React from "react";
import { Link } from "gatsby";
import { Link as ScrollLink } from "react-scroll";
import { StyledNavLogo } from "../styles";
import SVG from "./SVG";

type Props = {
	name: string;
	isHome: boolean;
};

export const Logo: React.FC<Props> = ({ name, isHome }) => {
	return (
		<StyledNavLogo>
			{isHome ? (
				<ScrollLink href="/" to="landing" offset={-64} duration={420} smooth>
					<SVG name="pomatez" />
					<label>{name}</label>
				</ScrollLink>
			) : (
				<Link to="/">
					<SVG name="pomatez" />
					<label>{name}</label>
				</Link>
			)}
		</StyledNavLogo>
	);
};

export default Logo;
