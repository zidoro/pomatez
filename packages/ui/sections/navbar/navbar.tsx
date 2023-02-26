import { memo, ReactNode } from "react";
import { Box, HStack, VStack } from "../../components";
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

export const Navbar = ({
  appState = "stay-focused",
  links = [],
}: NavbarProps) => {
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
        {links.map(
          ({ icon, label, activeClassName, as, ...rest }, index) => (
            <VStack as="li" key={index}>
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
            </VStack>
          )
        )}
      </HStack>
    </Box>
  );
};

export default memo(Navbar);
