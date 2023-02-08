import { Box } from "@pomatez/ui";
import { Outlet } from "react-router-dom";
import { routes } from "@renderer/route.config";
import { Titlebar } from "./titlebar";
import { Navbar } from "./navbar";

export function Layout() {
  const links = Object.values(routes);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        backgroundColor: "$bgPrimary",
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
    </Box>
  );
}
