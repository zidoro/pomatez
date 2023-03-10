import { useMachine } from "@xstate/react";
import { assign, createMachine } from "xstate";
import { Box, Button, Switch, SwitchProps, VStack } from "@pomatez/ui";
import { SectionLayout, TabLayout } from "@renderer/layouts";
import { slideLeftAndFadeAnimation } from "@renderer/utils";

type SettingsStateProps = {
  alwaysOnTop: boolean;
  fullscreenBreak: boolean;
  strictMode: boolean;
  darkMode: boolean;
  progressAnimation: boolean;
  autostartWork: boolean;
  minimizeToTray: boolean;
  closeToTray: boolean;
};

const defaultSettings: SettingsStateProps = {
  alwaysOnTop: false,
  fullscreenBreak: false,
  strictMode: false,
  darkMode: false,
  progressAnimation: true,
  autostartWork: false,
  minimizeToTray: false,
  closeToTray: false,
};

const settingMachine = createMachine(
  {
    id: "settings",
    schema: {
      context: {} as SettingsStateProps,
      events: {} as
        | {
            type: "settings.change";
            values: SettingsStateProps;
          }
        | {
            type: "settings.reset";
          },
    },
    tsTypes: {} as import("./settings.typegen").Typegen0,
    context: defaultSettings,
    states: {
      toggledOn: {},
      toggledOff: {},
    },
    on: {
      "settings.change": {
        actions: "updateSettings",
      },
      "settings.reset": {
        actions: "resetSettings",
      },
    },
  },
  {
    actions: {
      updateSettings: assign((_, event) => {
        return event.values;
      }),
      resetSettings: assign(() => {
        return defaultSettings;
      }),
    },
  }
);

export default function Settings() {
  const [{ context: settings }, send] = useMachine(settingMachine);

  const featureSettings: SwitchProps[] = [
    {
      id: "always-on-top",
      label: "Always On Top",
      checked: settings.alwaysOnTop,
      onCheckedChange: (checked) => {
        send({
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
        send({
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
        send({
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
        send({
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
        send({
          type: "settings.change",
          values: {
            ...settings,
            progressAnimation: checked,
          },
        });
      },
    },
    {
      id: "autostart-work",
      label: "Autostart Work",
      checked: settings.autostartWork,
      onCheckedChange: (checked) => {
        send({
          type: "settings.change",
          values: {
            ...settings,
            autostartWork: checked,
          },
        });
      },
    },
    {
      id: "minimize-to-tray",
      label: "Minimize To Tray",
      checked: settings.minimizeToTray,
      onCheckedChange: (checked) => {
        send({
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
        send({
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
          variant="link"
          onClick={() => {
            send({ type: "settings.reset" });
          }}
        >
          Restore Defaults
        </Button>
      }
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
