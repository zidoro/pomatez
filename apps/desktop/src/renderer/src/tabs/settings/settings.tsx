import { Box, Button, Switch, SwitchProps, VStack } from "@pomatez/ui";
import { useAppMachine, useSyncData } from "@renderer/contexts";
import { SectionLayout, TabLayout } from "@renderer/layouts";
import { slideLeftAndFadeAnimation } from "@renderer/utils";

export default function Settings() {
  const machineActor = useAppMachine();

  const { settings, timer } = useSyncData();

  const featureSettings: SwitchProps[] = [
    {
      id: "always-on-top",
      label: "Always On Top",
      checked: settings.alwaysOnTop,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            alwaysOnTop: checked,
          },
        });
      },
    },
    {
      id: "fullscreen-break",
      label: "Fullscreen Break",
      checked: settings.fullscreenBreak,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            fullscreenBreak: checked,
          },
        });
      },
    },
    {
      id: "strict-mode",
      label: "Strict Mode",
      checked: settings.strictMode,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            strictMode: checked,
          },
        });
      },
    },
    {
      id: "dark-mode",
      label: "Dark Mode",
      checked: settings.darkMode,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            darkMode: checked,
          },
        });
      },
    },
    {
      id: "progress-animation",
      label: "Progress Animation",
      checked: settings.progressAnimation,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            progressAnimation: checked,
          },
        });
      },
    },
    {
      id: "autostart-break",
      label: "Autostart Break",
      checked: settings.autoStartBreak,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            autoStartBreak: checked,
          },
        });
      },
    },
    {
      id: "autostart-work",
      label: "Autostart Work",
      checked: settings.autoStartWork,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            autoStartWork: checked,
          },
        });
      },
    },
    {
      id: "minimize-to-tray",
      label: "Minimize To Tray",
      checked: settings.minimizeToTray,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            minimizeToTray: checked,
          },
        });
      },
    },
    {
      id: "close-to-tray",
      label: "Close To Tray",
      checked: settings.closeToTray,
      onCheckedChange: (checked) => {
        machineActor.send({
          type: "settings.change",
          values: {
            ...settings,
            closeToTray: checked,
          },
        });
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
            machineActor.send("settings.reset");
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
