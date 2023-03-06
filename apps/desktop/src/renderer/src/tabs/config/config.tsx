import { useState } from "react";
import {
  Button,
  HStack,
  Slider,
  styled,
  Text,
  VStack,
} from "@pomatez/ui";
import { oneOrMany } from "@pomatez/ui/utils/string";
import { slideRightAndFadeAnimation } from "@renderer/utils";

const StyledContainer = styled(VStack, slideRightAndFadeAnimation);

const defaultState = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionRounds: 4,
};

export default function Config() {
  const [state, setState] = useState(defaultState);

  return (
    <StyledContainer
      spacing="$4"
      align="flex-start"
      sx={{ px: "$5", py: "$5" }}
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
            setState(defaultState);
          }}
        >
          Restore Defaults
        </Button>
      </HStack>

      <VStack spacing="$3" sx={{ width: "100%" }}>
        <Slider
          header={{
            label: "Stay focused",
            valueInterpreter: oneOrMany(state.focus, "min"),
          }}
          min={1}
          max={90}
          value={state.focus}
          onValueChange={(value) => {
            setState({ ...state, focus: value });
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
    </StyledContainer>
  );
}
