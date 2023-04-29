import { ReactNode } from "react";
import { Box, Navbar, Titlebar, VStack } from "@pomatez/ui";
import { AppProvider, SyncDataProvider } from "@renderer/contexts";
import { routes } from "@renderer/route.config";

type Props = {
  activeTab: string;
  children: ReactNode;
};

export function WindowDecorator({
  activeTab = "timer",
  children,
}: Props) {
  const links = Object.values(routes).map(({ icon, label, path }) => ({
    icon,
    label,
    to: path,
    activeClassName: path.includes(activeTab) ? "active" : "",
  }));

  return (
    <AppProvider>
      <SyncDataProvider>
        <VStack
          justify="flex-start"
          sx={{
            width: "34rem",
            height: "48rem",
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
            {children}
          </Box>
        </VStack>
      </SyncDataProvider>
    </AppProvider>
  );
}
