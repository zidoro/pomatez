import { ReactNode } from "react";
import { Box, Navbar, Titlebar, VStack } from "@pomatez/ui";
import { routes } from "@renderer/route.config";

export function WindowDecorator({ children }: { children: ReactNode }) {
  const links = Object.values(routes).map((route) => ({
    ...route,
    to: route.path,
  }));

  return (
    <VStack
      sx={{
        width: "34rem",
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
          height: "max-content",
        }}
      >
        {children}
      </Box>
    </VStack>
  );
}
