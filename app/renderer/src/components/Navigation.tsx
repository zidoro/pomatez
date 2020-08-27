import React from "react";
import { TimerTypes } from "store";
import {
	StyledNav,
	StyledNavList,
	StyledNavListItem,
	StyledNavLink,
} from "styles";
import { routes } from "config";
import SVG from "./SVG";

type Props = {
	timerType?: TimerTypes["timerType"];
};

const Navigation: React.FC<Props> = ({ timerType }) => {
	return (
		<StyledNav>
			<StyledNavList>
				{routes.map(({ name, icon, exact, path }, index) => (
					<StyledNavListItem key={index}>
						<StyledNavLink exact={exact} to={path} type={timerType} replace>
							<SVG name={icon} />
							{name}
						</StyledNavLink>
					</StyledNavListItem>
				))}
			</StyledNavList>
		</StyledNav>
	);
};

export default React.memo(Navigation);
