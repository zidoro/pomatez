import { Outlet } from "react-router-dom";
import { useActor } from "@xstate/react";
import { Box, Navbar, Titlebar, VStack } from "@pomatez/ui";
import { useAppMachine, useElectron } from "@renderer/contexts";
import { interpretState } from "@renderer/utils";
import { routes } from "@renderer/route.config";

export function RootLayout() {
  const machineActor = useAppMachine();

  const [state] = useActor(machineActor);

  const { onMinimizeWindow, onCloseWindow } = useElectron();

  const links = Object.values(routes).map(
    ({ icon, label, path, as }) => ({
      as,
      icon,
      label,
      to: path,
    })
  );

  const sessionState = interpretState(state.value).session;

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
      <Titlebar
        appState={sessionState}
        onMinimize={onMinimizeWindow}
        onClose={onCloseWindow}
      />

      <Navbar links={links} appState={sessionState} />

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
