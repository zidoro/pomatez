import React from "react";
import {
	StyledSidebar,
	StyledSidebarList,
	StyledNavButtonWrapper,
	StyledNavThemeToggler,
	StyledNavDownloadButton,
} from "../styles";
import { NavLinks } from "./Navigation";
import { useContextProvider } from "../hooks";

import SVG from "./SVG";

type Props = {};

const Sidebar: React.FC<Props> = () => {
	const {
		isOnDesktop,
		isDarkMode,
		themeToggler,
		isMenuOpen,
	} = useContextProvider();

	return !isOnDesktop && isMenuOpen ? (
		<StyledSidebar>
			<StyledNavButtonWrapper>
				<StyledNavThemeToggler onClick={themeToggler}>
					Mode
					<SVG name={isDarkMode ? "moon" : "sunny"} />
				</StyledNavThemeToggler>
			</StyledNavButtonWrapper>

			<StyledSidebarList>
				<NavLinks />
			</StyledSidebarList>

			<StyledNavDownloadButton
				href="/"
				to="installers"
				offset={-24}
				duration={420}
				smooth
			>
				<SVG name="download" />
				See Installers
			</StyledNavDownloadButton>
		</StyledSidebar>
	) : null;
};

export default Sidebar;
