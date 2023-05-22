import React from "react";
import { useSelector } from "react-redux";
import { AppStateTypes, TimerTypes } from "store";
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
  const settings = useSelector(
    (state: AppStateTypes) => state.settings
  );

  return (
    <StyledNav useNativeTitlebar={settings.useNativeTitlebar}>
      <StyledNavList>
        {routes.map(({ name, icon, exact, path }, index) => (
          <StyledNavListItem key={index}>
            <StyledNavLink
              exact={exact}
              to={path}
              type={timerType}
              draggable="false"
              replace
            >
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
