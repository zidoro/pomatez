import { useState } from "react";
import {
  Button,
  HStack,
  Slider,
  Text,
  VStack,
  ToggleGroup,
} from "@pomatez/ui";
import { oneOrMany } from "@pomatez/ui/utils/string";
import { slideRightAndFadeAnimation } from "@renderer/utils";

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

  return (
    <VStack
      spacing="$4"
      align="flex-start"
      sx={{
        ...slideRightAndFadeAnimation,
        padding: "$5",
      }}
    >
      <HStack justify="space-between" sx={{ width: "100%" }}>
        <Text
          as="h1"
          size="$md"
          color="$gray12"
          casing="uppercase"
          weight="$medium"
        >
          Rules
        </Text>

        <Button
          variant="link"
          onClick={() => {
            setState(presets.standard);
          }}
        >
          Restore Defaults
        </Button>
      </HStack>

      <VStack spacing="$3" sx={{ width: "100%" }}>
        <Slider
          header={{
            label: "Stay focused",
            valueInterpreter: oneOrMany(state.stayFocused, "min"),
          }}
          min={1}
          max={90}
          value={state.stayFocused}
          onValueChange={(value) => {
            setState({ ...state, stayFocused: value });
          }}
        />

        <Slider
          header={{
            label: "Short break",
            valueInterpreter: oneOrMany(state.shortBreak, "min"),
          }}
          min={1}
          max={60}
          value={state.shortBreak}
          onValueChange={(value) => {
            setState({ ...state, shortBreak: value });
          }}
        />

        <Slider
          header={{
            label: "Long break",
            valueInterpreter: oneOrMany(state.longBreak, "min"),
          }}
          min={1}
          max={60}
          value={state.longBreak}
          onValueChange={(value) => {
            setState({ ...state, longBreak: value });
          }}
        />

        <Slider
          header={{
            label: "Session rounds",
            valueInterpreter: oneOrMany(state.sessionRounds, "round"),
          }}
          min={1}
          max={8}
          value={state.sessionRounds}
          onValueChange={(value) => {
            setState({ ...state, sessionRounds: value });
          }}
        />
      </VStack>

      <VStack
        align="flex-start"
        spacing="$4"
        sx={{
          width: "100%",
        }}
      >
        <Text
          size="$xs"
          casing="uppercase"
          weight="$medium"
          color="$gray9"
        >
          Presets
        </Text>

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
      </VStack>
    </VStack>
  );
}