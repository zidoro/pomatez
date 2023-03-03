import { Outlet } from "react-router-dom";
import { Box, Navbar, Titlebar, VStack } from "@pomatez/ui";
import { routes } from "@renderer/route.config";

export function Layout() {
  const links = Object.values(routes).map(
    ({ icon, label, path, as }) => ({
      as,
      icon,
      label,
      to: path,
    })
  );

  return (
    <VStack
      sx={{
        width: "34rem",
        height: "48rem",
        boxSizing: "content-box",
        border: "1px solid $gray6",
        borderRadius: "$sm",
        boxShadow: "$md",
        bg: "$white",
      }}
    >
      <Titlebar />
      <Navbar links={links} />
      <Box
        as="main"
        sx={{
          height: "42rem",
        }}
      >
        <Outlet />
      </Box>
    </VStack>
  );
}
