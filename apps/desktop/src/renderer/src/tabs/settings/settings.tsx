import { useState } from "react";
import { Box, Button, Switch, SwitchProps, VStack } from "@pomatez/ui";
import { SectionLayout, TabLayout } from "@renderer/layouts";
import { slideLeftAndFadeAnimation } from "@renderer/utils";

export default function Settings() {
  const [state, setState] = useState({
    alwaysOnTop: false,
    fullscreenBreak: false,
    strictMode: false,
    darkMode: false,
    progressAnimation: true,
    autostartWork: false,
    minimizeToTray: false,
    closeToTray: false,
  });

  const featureSettings: SwitchProps[] = [
    {
      id: "always-on-top",
      label: "Always On Top",
      checked: state.alwaysOnTop,
      onCheckedChange: (checked) => {
        setState((state) => ({
          ...state,
          alwaysOnTop: checked,
        }));
      },
    },
    {
      id: "fullscreen-break",
      label: "Fullscreen Break",
      checked: state.fullscreenBreak,
      onCheckedChange: (checked) => {
        setState((state) => ({
          ...state,
          fullscreenBreak: checked,
        }));
      },
    },
    {
      id: "strict-mode",
      label: "Strict Mode",
      checked: state.strictMode,
      onCheckedChange: (checked) => {
        setState((state) => ({
          ...state,
          strictMode: checked,
        }));
      },
    },
    {
      id: "dark-mode",
      label: "Dark Mode",
      checked: state.darkMode,
      onCheckedChange: (checked) => {
        setState((state) => ({
          ...state,
          darkMode: checked,
        }));
      },
    },
    {
      id: "progress-animation",
      label: "Progress Animation",
      checked: state.progressAnimation,
      onCheckedChange: (checked) => {
        setState((state) => ({
          ...state,
          progressAnimation: checked,
        }));
      },
    },
    {
      id: "autostart-work",
      label: "Autostart Work",
      checked: state.autostartWork,
      onCheckedChange: (checked) => {
        setState((state) => ({
          ...state,
          autostartWork: checked,
        }));
      },
    },
    {
      id: "minimize-to-tray",
      label: "Minimize To Tray",
      checked: state.minimizeToTray,
      onCheckedChange: (checked) => {
        setState((state) => ({
          ...state,
          minimizeToTray: checked,
        }));
      },
    },
    {
      id: "close-to-tray",
      label: "Close To Tray",
      checked: state.closeToTray,
      onCheckedChange: (checked) => {
        setState((state) => ({
          ...state,
          closeToTray: checked,
        }));
      },
    },
  ];

  return (
    <TabLayout
      heading="Settings"
      action={<Button variant="link">Restore Defaults</Button>}
      animation={slideLeftAndFadeAnimation}
    >
      <SectionLayout heading="Features" spacing={0}>
        <VStack
          sx={{
            width: "100%",

            "& > .pomatez-stack": {
              position: "relative",
              height: "4.4rem",

              "&::after": {
                content: "''",
                position: "absolute",
                bottom: 0,
                left: 0,

                width: "100%",
                height: "1px",
                backgroundColor: "$gray6",
              },
            },
          }}
        >
          {featureSettings.map((feature) => (
            <Switch key={feature.id} {...feature} />
          ))}
        </VStack>
      </SectionLayout>

      <Box
        sx={{
          width: "100%",
          height: "$20",

          dflex: "flex-start",
          bg: "$white",
          pt: "$4",

          position: "sticky",
          bottom: 0,
          left: 0,
        }}
      >
        <Button variant="outline" size="md" fullWidth>
          Start it on GitHub
        </Button>
      </Box>
    </TabLayout>
  );
}
