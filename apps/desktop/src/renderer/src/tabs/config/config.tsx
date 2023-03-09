import { useState } from "react";
import {
  Button,
  Slider,
  VStack,
  ToggleGroup,
  oneOrMany,
  SliderProps,
} from "@pomatez/ui";
import { slideRightAndFadeAnimation } from "@renderer/utils";
import { SectionLayout, TabLayout } from "@renderer/layouts";

type StateProps = {
  stayFocused: number;
  shortBreak: number;
  longBreak: number;
  sessionRounds: number;
};

const presets: Record<
  "standard" | "extended" | "ultradian",
  StateProps
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

export default function Config() {
  const [state, setState] = useState(presets.standard);

  const sliderItems: SliderProps[] = [
    {
      header: {
        label: "Stay focused",
        valueInterpreter: oneOrMany(state.stayFocused, "min"),
      },
      min: 1,
      max: 90,
      value: state.stayFocused,
      onValueChange: (value) => {
        setState({ ...state, stayFocused: value });
      },
    },
    {
      header: {
        label: "Short break",
        valueInterpreter: oneOrMany(state.shortBreak, "min"),
      },
      min: 1,
      max: 60,
      value: state.shortBreak,
      onValueChange: (value) => {
        setState({ ...state, shortBreak: value });
      },
    },
    {
      header: {
        label: "Long break",
        valueInterpreter: oneOrMany(state.longBreak, "min"),
      },
      min: 1,
      max: 60,
      value: state.longBreak,
      onValueChange: (value) => {
        setState({ ...state, longBreak: value });
      },
    },
    {
      header: {
        label: "Session rounds",
        valueInterpreter: oneOrMany(state.sessionRounds, "round"),
      },
      min: 1,
      max: 8,
      value: state.sessionRounds,
      onValueChange: (value) => {
        setState({ ...state, sessionRounds: value });
      },
    },
  ];

  return (
    <TabLayout
      heading="Rules"
      action={
        <Button
          variant="link"
          onClick={() => {
            setState(presets.standard);
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
          items={[
            {
              label: "Standard",
              value: JSON.stringify(presets.standard),
            },
            {
              label: "Extended",
              value: JSON.stringify(presets.extended),
            },
            {
              label: "Ultradian",
              value: JSON.stringify(presets.ultradian),
            },
          ]}
          value={JSON.stringify(state)}
          onValueChange={(value) => {
            setState(JSON.parse(value));
          }}
          sx={{
            width: "100%",
          }}
        />
      </SectionLayout>
    </TabLayout>
  );
}
