import {
  CookieIcon,
  DesktopIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import { Box, Grid, Text, VStack } from "../../components";
import {
  CounterVariantProps,
  StyledProgress,
  StyledTimeRemaining,
} from "./counter.styled";
import { capitalize, withMemo } from "../../utils";
import { useTimeFormat } from "../../hooks";

export type CounterProps = {
  timeProgress?: number;
  timeRemaining?: number;
} & CounterVariantProps;

function Counter({
  appState,
  timeProgress,
  timeRemaining,
  animationEnabled,
}: CounterProps) {
  const renderAppState = () => {
    return capitalize(appState as string, "camelCase");
  };

  const renderIcon = () => {
    switch (appState) {
      case "stayFocused":
        return <DesktopIcon aria-label={`${renderAppState()} Icon`} />;
      case "shortBreak":
        return (
          <LightningBoltIcon aria-label={`${renderAppState()} Icon`} />
        );
      case "longBreak":
        return <CookieIcon aria-label={`${renderAppState()} Icon`} />;
    }
  };

  const { minutes, seconds } = useTimeFormat(timeRemaining || 0);

  return (
    <Grid
      justify="center"
      align="center"
      sx={{
        width: "100%",
        height: "max-content",
        position: "relative",
        padding: "$5",
        pb: "$4",
      }}
    >
      <Grid.Item
        column="1 / -1"
        row="1 / -1"
        sx={{
          dflex: "center",
          position: "relative",

          "&::before": {
            content: "''",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            width: "100%",
            height: "100%",

            borderRadius: "$rounded",
            border: "0.6rem solid $gray6",
          },
        }}
      >
        <StyledProgress
          data-testid="progress-svg"
          animationEnabled={animationEnabled}
          strokeDashoffset={timeProgress}
          appState={appState}
          width="220"
          height="220"
          viewBox="0 0 220 220"
        >
          <circle cx="110" cy="110" r="107" fill="none" />
        </StyledProgress>
      </Grid.Item>

      <Grid.Item
        column="1 / -1"
        row="1 / -1"
        sx={{
          dflex: "center",
          width: "100%",
          height: "100%",
          mt: "-$3",
        }}
      >
        <VStack spacing="$1">
          <Box
            sx={{
              "& > svg": {
                width: "$8",
                height: "$8",
                color: "$gray10",
              },
            }}
          >
            {renderIcon()}
          </Box>

          <VStack spacing="$1" sx={{ lineHeight: "$shorter" }}>
            <StyledTimeRemaining
              appState={appState}
              data-testid="time-remaining"
            >
              <span>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
            </StyledTimeRemaining>

            <Text size="$lg" casing="capitalize" color="$gray11">
              {renderAppState()}
            </Text>
          </VStack>
        </VStack>
      </Grid.Item>
    </Grid>
  );
}

export default withMemo(Counter);
