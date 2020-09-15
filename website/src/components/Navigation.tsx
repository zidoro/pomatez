import React from "react";
import { Link as ScrollLink } from "react-scroll";
import {
	StyledNav,
	StyledNavLinks,
	StyledNavThemeToggler,
	StyledNavButtonWrapper,
	StyledNavLinkAnchor,
	StyledScrollToDownload,
	StyledNavHeader,
	StyledNavContent,
	StyledNavMenu,
	StyledNavLinkItem,
} from "../styles";
import { navLinks, APP_NAME } from "../config";
import { useContextProvider } from "../hooks";

import Logo from "./Logo";
import SVG from "./SVG";

export const NavLinks: React.FC = () => {
	const { toggleMenu } = useContextProvider();

	return (
		<>
			{navLinks.map((nav, index) =>
				nav.offset ? (
					<StyledNavLinkItem key={index}>
						<StyledNavLinkAnchor
							href="/"
							onClick={toggleMenu}
							to={nav.link}
							offset={nav.offset}
							duration={420}
							smooth
						>
							{nav.label}
						</StyledNavLinkAnchor>
					</StyledNavLinkItem>
				) : (
					<StyledNavLinkItem key={index}>
						<a href={nav.link} target="_blank" rel="noopener noreferrer">
							{nav.label}
						</a>
					</StyledNavLinkItem>
				)
			)}
		</>
	);
};

export const Navigation: React.FC = () => {
	const {
		isDarkMode,
		themeToggler,
		isMenuOpen,
		toggleMenu,
	} = useContextProvider();

	return (
		<StyledNav isMenuOpen={isMenuOpen}>
			<StyledNavHeader>
				<Logo name={APP_NAME} />

				<StyledNavContent>
					<StyledNavLinks>
						<NavLinks />
					</StyledNavLinks>

					<StyledNavButtonWrapper>
						<StyledNavThemeToggler onClick={themeToggler}>
							Mode
							<SVG name={isDarkMode ? "moon" : "sunny"} />
						</StyledNavThemeToggler>
						<StyledScrollToDownload>
							<ScrollLink
								href="/"
								to="installers"
								offset={-24}
								duration={420}
								smooth
							>
								<SVG name="download" />
								See Installers
							</ScrollLink>
						</StyledScrollToDownload>
					</StyledNavButtonWrapper>
				</StyledNavContent>

				<StyledNavMenu isMenuOpen={isMenuOpen} onClick={toggleMenu}>
					<span>&nbsp;</span>
					<span>&nbsp;</span>
					<span>&nbsp;</span>
				</StyledNavMenu>
			</StyledNavHeader>
		</StyledNav>
	);
};

export default React.memo(Navigation);
