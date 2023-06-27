import { useAtom, useAtomValue } from "jotai";
import { Box, Button, Switch, SwitchProps, VStack } from "@pomatez/ui";
import { RESET } from "jotai/utils";

import { settingsAtom, timerAtom } from "@renderer/@data/atoms";
import { SectionLayout, TabLayout } from "@renderer/layouts";
import { slideLeftAndFadeAnimation } from "@renderer/utils";

export default function Settings() {
  const [settings, setSettings] = useAtom(settingsAtom);

  const timer = useAtomValue(timerAtom);

  const featureSettings: SwitchProps[] = [
    {
      id: "always-on-top",
      label: "Always On Top",
      checked: settings.alwaysOnTop,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          alwaysOnTop: checked,
        }));
      },
    },
    {
      id: "fullscreen-break",
      label: "Fullscreen Break",
      checked: settings.fullscreenBreak,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          fullscreenBreak: checked,
        }));
      },
    },
    {
      id: "strict-mode",
      label: "Strict Mode",
      checked: settings.strictMode,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          strictMode: checked,
        }));
      },
    },
    {
      id: "dark-mode",
      label: "Dark Mode",
      checked: settings.darkMode,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          darkMode: checked,
        }));
      },
    },
    {
      id: "progress-animation",
      label: "Progress Animation",
      checked: settings.progressAnimation,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          progressAnimation: checked,
        }));
      },
    },
    {
      id: "autostart-break",
      label: "Autostart Break",
      checked: settings.autoStartBreak,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          autoStartBreak: checked,
        }));
      },
    },
    {
      id: "autostart-work",
      label: "Autostart Work",
      checked: settings.autoStartWork,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          autoStartWork: checked,
        }));
      },
    },
    {
      id: "minimize-to-tray",
      label: "Minimize To Tray",
      checked: settings.minimizeToTray,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          minimizeToTray: checked,
        }));
      },
    },
    {
      id: "close-to-tray",
      label: "Close To Tray",
      checked: settings.closeToTray,
      onCheckedChange: (checked) => {
        setSettings((prev) => ({
          ...prev,
          closeToTray: checked,
        }));
      },
    },
  ];

  return (
    <TabLayout
      heading="Settings"
      action={
        <Button
          appState={timer.sessionType}
          variant="link"
          onClick={() => {
            setSettings(RESET);
          }}
        >
          Restore Defaults
        </Button>
      }
      animation={slideLeftAndFadeAnimation}
      sx={{
        px: "$4",
        "& > .tab-header": {
          px: "$1",
        },
      }}
    >
      <SectionLayout
        heading="Features"
        spacing={0}
        sx={{
          px: "$1",
        }}
      >
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
            <Switch
              key={feature.id}
              appState={timer.sessionType}
              {...feature}
            />
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
          px: "$1",

          position: "sticky",
          bottom: 0,
          left: 0,
        }}
      >
        <Button
          appState={timer.sessionType}
          variant="outline"
          size="md"
          fullWidth
        >
          Start it on GitHub
        </Button>
      </Box>
    </TabLayout>
  );
}
