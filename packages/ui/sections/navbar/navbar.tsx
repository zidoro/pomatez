import { memo, ReactNode } from "react";
import { Box, HStack } from "../../components";
import { withDefaults } from "../../utils/with-defaults";
import { NavLinkVariantProps, StyledNavLink } from "./navbar.styled";

export type NavLinkProps<
  TProps = {
    /**
     * The link to be navigated to.
     */
    to: string;
    /**
     * The class name to be applied to the selected link.
     */
    activeClassName?: string;
  }
> = {
  /**
   * The icon to be displayed.
   */
  icon: ReactNode;
  /**
   * The label to be displayed.
   */
  label: string;
  /**
   * The element to be rendered.
   */
  as?: keyof JSX.IntrinsicElements;
} & TProps;

type NavbarProps = {
  links?: NavLinkProps[];
} & NavLinkVariantProps;

const defaultProps: NavbarProps = {
  appState: "stay-focused",
  links: [],
};

export const Navbar = ({ appState, links }: NavbarProps) => {
  return (
    <Box
      as="nav"
      sx={{
        position: "relative",
        width: "100%",
        height: "$12",

        "&::after": {
          content: "''",
          position: "absolute",

          left: 0,
          bottom: 0,

          width: "100%",
          height: "$px",

          bg: "$gray6",
        },
      }}
    >
      <HStack
        as="ul"
        justify="space-around"
        sx={{
          width: "100%",
          height: "100%",

          listStyle: "none",

          fontFamily: "$round",
          fontWeight: "$normal",
          fontSize: "$xs",

          "& > li": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        {links?.map(
          ({ icon, label, activeClassName, as, ...rest }, index) => (
            <Box as="li" key={index}>
              <StyledNavLink
                as={as}
                className={activeClassName}
                appState={appState}
                role="link"
                {...rest}
              >
                <Box as="span">{icon}</Box>
                {label}
              </StyledNavLink>
            </Box>
          )
        )}
      </HStack>
    </Box>
  );
};

const MemoNavbar = memo(Navbar);

export default withDefaults(MemoNavbar, defaultProps);
