import { Outlet } from "react-router-dom";
import { Box, Navbar, Titlebar, VStack } from "@pomatez/ui";
import { routes } from "@renderer/route.config";

export function RootLayout() {
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
      justify="flex-start"
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
          width: "100%",
          height: "40rem",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </VStack>
  );
}
