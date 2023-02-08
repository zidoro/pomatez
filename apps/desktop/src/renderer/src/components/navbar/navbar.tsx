import { RouteProps } from "@renderer/utils";
import {
  StyledNavbar,
  StyledNavLink,
  StyledNavList,
} from "./navbar.styled";
import { Icon } from "../icon";

type Props = { links: RouteProps[] };

export function Navbar({ links = [] }: Props) {
  return (
    <StyledNavbar>
      <StyledNavList>
        {links.map((route, index) => (
          <li key={index}>
            <StyledNavLink to={route.path} end>
              <Icon name={route.icon} />
              {route.label}
            </StyledNavLink>
          </li>
        ))}
      </StyledNavList>
    </StyledNavbar>
  );
}
