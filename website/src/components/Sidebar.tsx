import React from "react";
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
	const {
		isOnMobile,
		isDarkMode,
		themeToggler,
		isMenuOpen,
	} = useContextProvider();

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
			</StyledSidebarList>

			<StyledScrollToDownload>
				<ScrollLink href="/" to="installers" offset={-24} duration={420} smooth>
					<SVG name="download" />
					See Installers
				</ScrollLink>
			</StyledScrollToDownload>
		</StyledSidebar>
	) : null;
};

export default Sidebar;
