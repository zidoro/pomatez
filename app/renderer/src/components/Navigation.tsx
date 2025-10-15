import React from "react";
import { useAppSelector } from "hooks/storeHooks";
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
import { TimerStatus } from "store/timer/types";

type Props = {
  timerType?: TimerStatus;
};

const Navigation: React.FC<Props> = ({ timerType }) => {
  const settings = useAppSelector((state) => state.settings);

  const state = useAppSelector((state) => state);

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
