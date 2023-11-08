import React from "react";
import { useSelector } from "react-redux";
import { AppStateTypes, TimerTypes } from "store";
import {
  StyledNav,
  StyledNavList,
  StyledNavListItem,
  StyledNavLink,
  StyledNavIconWrapper,
} from "styles";
import { NavNotify } from "components";
import { routes } from "config";
import SVG from "./SVG";

type Props = {
  timerType?: TimerTypes["timerType"];
};

const Navigation: React.FC<Props> = ({ timerType }) => {
  const settings = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const state = useSelector((state: AppStateTypes) => state);

  return (
    <StyledNav useNativeTitlebar={settings.useNativeTitlebar}>
      <StyledNavList>
        {routes(state).map(
          ({ name, icon, exact, path, notify }, index) => {
            return (
              <StyledNavListItem key={index}>
                <StyledNavLink
                  exact={exact}
                  to={path}
                  type={timerType}
                  draggable="false"
                  replace
                >
                  <StyledNavIconWrapper>
                    <SVG name={icon} />
                    {notify && <NavNotify />}
                  </StyledNavIconWrapper>
                  {name}
                </StyledNavLink>
              </StyledNavListItem>
            );
          }
        )}
      </StyledNavList>
    </StyledNav>
  );
};

export default React.memo(Navigation);
