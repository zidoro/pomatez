import { useAtom, useAtomValue } from "jotai";
import { RESET } from "jotai/utils";
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
import {
  configAtom,
  configPresets,
  timerAtom,
} from "@renderer/@data/atoms";

export default function Config() {
  const [config, setConfig] = useAtom(configAtom);

  const timer = useAtomValue(timerAtom);

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
        setConfig((prev) => ({
          ...prev,
          stayFocused: value,
        }));
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
        setConfig((prev) => ({
          ...prev,
          shortBreak: value,
        }));
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
        setConfig((prev) => ({
          ...prev,
          longBreak: value,
        }));
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
        setConfig((prev) => ({
          ...prev,
          sessionRounds: value,
        }));
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
          appState={timer.sessionType}
          variant="link"
          onClick={() => {
            setConfig(RESET);
          }}
        >
          Restore Defaults
        </Button>
      }
      animation={slideRightAndFadeAnimation}
    >
      <VStack spacing="$3" sx={{ width: "100%" }}>
        {sliderItems.map((item, index) => (
          <Slider key={index} appState={timer.sessionType} {...item} />
        ))}
      </VStack>

      <SectionLayout heading="Presets">
        <ToggleGroup
          appState={timer.sessionType}
          value={JSON.stringify(config)}
          onValueChange={(value) => {
            setConfig(JSON.parse(value));
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
