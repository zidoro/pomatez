import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import {
  Button,
  Slider,
  VStack,
  ToggleGroup,
  oneOrMany,
  SliderProps,
  capitalize,
} from "@pomatez/ui";
import { slideRightAndFadeAnimation } from "@renderer/utils";
import { SectionLayout, TabLayout } from "@renderer/layouts";

type ConfigStateProps = {
  stayFocused: number;
  shortBreak: number;
  longBreak: number;
  sessionRounds: number;
};

const presets: Record<
  "standard" | "extended" | "ultradian",
  ConfigStateProps
> = {
  standard: {
    stayFocused: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionRounds: 4,
  },
  extended: {
    stayFocused: 50,
    shortBreak: 10,
    longBreak: 30,
    sessionRounds: 3,
  },
  ultradian: {
    stayFocused: 90,
    shortBreak: 30,
    longBreak: 60,
    sessionRounds: 2,
  },
};

const defaultConfig: ConfigStateProps = presets.standard;

const configMachine = createMachine(
  {
    id: "config",
    schema: {
      context: {} as ConfigStateProps,
      events: {} as
        | {
            type: "config.change";
            values: ConfigStateProps;
          }
        | {
            type: "config.reset";
          },
    },
    tsTypes: {} as import("./config.typegen").Typegen0,
    context: defaultConfig,
    on: {
      "config.change": {
        actions: "updateConfig",
      },
      "config.reset": {
        actions: "resetConfig",
      },
    },
  },
  {
    actions: {
      updateConfig: assign((_, event) => {
        return event.values;
      }),
      resetConfig: assign(() => {
        return defaultConfig;
      }),
    },
  }
);

export default function Config() {
  const [{ context: config }, send] = useMachine(configMachine);

  const sliderItems: SliderProps[] = [
    {
      header: {
        label: "Stay focused",
        valueInterpreter: oneOrMany(config.stayFocused, "min"),
      },
      min: 1,
      max: 90,
      value: config.stayFocused,
      onValueChange: (value) => {
        send({
          type: "config.change",
          values: { ...config, stayFocused: value },
        });
      },
    },
    {
      header: {
        label: "Short break",
        valueInterpreter: oneOrMany(config.shortBreak, "min"),
      },
      min: 1,
      max: 60,
      value: config.shortBreak,
      onValueChange: (value) => {
        send({
          type: "config.change",
          values: { ...config, shortBreak: value },
        });
      },
    },
    {
      header: {
        label: "Long break",
        valueInterpreter: oneOrMany(config.longBreak, "min"),
      },
      min: 1,
      max: 60,
      value: config.longBreak,
      onValueChange: (value) => {
        send({
          type: "config.change",
          values: { ...config, longBreak: value },
        });
      },
    },
    {
      header: {
        label: "Session rounds",
        valueInterpreter: oneOrMany(config.sessionRounds, "round"),
      },
      min: 1,
      max: 8,
      value: config.sessionRounds,
      onValueChange: (value) => {
        send({
          type: "config.change",
          values: { ...config, sessionRounds: value },
        });
      },
    },
  ];

  const configPresets = Object.entries(presets).map(([key, value]) => ({
    label: capitalize(key),
    value: JSON.stringify(value),
  }));

  return (
    <TabLayout
      heading="Rules"
      action={
        <Button
          variant="link"
          onClick={() => {
            send({ type: "config.reset" });
          }}
        >
          Restore Defaults
        </Button>
      }
      animation={slideRightAndFadeAnimation}
    >
      <VStack spacing="$3" sx={{ width: "100%" }}>
        {sliderItems.map((item, index) => (
          <Slider {...item} key={index} />
        ))}
      </VStack>

      <SectionLayout heading="Presets">
        <ToggleGroup
          items={configPresets}
          value={JSON.stringify(config)}
          onValueChange={(value) => {
            send({
              type: "config.change",
              values: JSON.parse(value),
            });
          }}
          sx={{
            width: "100%",
          }}
        />
      </SectionLayout>
    </TabLayout>
  );
}
