import React, { useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import {
	StyledSidebar,
	StyledSidebarList,
	StyledNavButtonWrapper,
	StyledNavThemeToggler,
	StyledScrollToDownload,
} from "../styles";
import { NavLinks } from "./Navigation";
import { useContextProvider } from "../hooks";

import SVG from "./SVG";

type Props = {};

const Sidebar: React.FC<Props> = () => {
	const { isOnMobile, isDarkMode, themeToggler, isMenuOpen, toggleMenu } =
		useContextProvider();

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isMenuOpen]);

	return isOnMobile && isMenuOpen ? (
		<StyledSidebar>
			<StyledNavButtonWrapper>
				<StyledNavThemeToggler onClick={themeToggler}>
					Mode
					{isDarkMode ? <SVG name="moon" /> : <SVG name="sunny" />}
				</StyledNavThemeToggler>
			</StyledNavButtonWrapper>

			<StyledSidebarList>
				<NavLinks />

				<StyledScrollToDownload>
					<ScrollLink
						href="/"
						onClick={toggleMenu}
						to="installers"
						offset={-24}
						duration={420}
						smooth
					>
						<SVG name="download" />
						See Installers
					</ScrollLink>
				</StyledScrollToDownload>
			</StyledSidebarList>
		</StyledSidebar>
	) : null;
};

export default Sidebar;
