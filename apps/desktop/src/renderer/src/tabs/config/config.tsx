import { useActor } from "@xstate/react";
import {
  Button,
  Slider,
  VStack,
  ToggleGroup,
  oneOrMany,
  SliderProps,
  capitalize,
} from "@pomatez/ui";
import {
  interpretState,
  slideRightAndFadeAnimation,
} from "@renderer/utils";
import { SectionLayout, TabLayout } from "@renderer/layouts";
import { configPresets } from "@renderer/@data/machine";
import { useAppMachine } from "@renderer/contexts";

export default function Config() {
  const machineActor = useAppMachine();

  const [state, send] = useActor(machineActor);

  const sessionState = interpretState(state.value).session;

  const config = state.context.config;

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

  const presets = Object.entries(configPresets).map(([key, value]) => ({
    label: capitalize(key),
    value: JSON.stringify(value),
  }));

  return (
    <TabLayout
      heading="Rules"
      action={
        <Button
          appState={sessionState}
          variant="link"
          onClick={() => {
            send("config.reset");
          }}
        >
          Restore Defaults
        </Button>
      }
      animation={slideRightAndFadeAnimation}
    >
      <VStack spacing="$3" sx={{ width: "100%" }}>
        {sliderItems.map((item, index) => (
          <Slider key={index} appState={sessionState} {...item} />
        ))}
      </VStack>

      <SectionLayout heading="Presets">
        <ToggleGroup
          appState={sessionState}
          value={JSON.stringify(config)}
          onValueChange={(value) => {
            send({
              type: "config.change",
              values: JSON.parse(value),
            });
          }}
          items={presets}
          sx={{
            width: "100%",
          }}
        />
      </SectionLayout>
    </TabLayout>
  );
}
