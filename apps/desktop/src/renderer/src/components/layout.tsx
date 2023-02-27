import { Box, Navbar, Titlebar, VStack } from "@pomatez/ui";
import { Outlet } from "react-router-dom";
import { routes } from "@renderer/route.config";

export function Layout() {
  const links = Object.values(routes).map((route) => ({
    icon: route.icon,
    label: route.label,
    to: route.path,
  }));

  return (
    <VStack>
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
