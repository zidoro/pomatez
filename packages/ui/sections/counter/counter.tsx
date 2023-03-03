import { memo } from "react";
import {
  CookieIcon,
  DesktopIcon,
  LightningBoltIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Box, Grid, Text, VStack } from "../../components";
import {
  CounterVariantProps,
  StyledProgress,
  StyledTimeRemaining,
} from "./counter.styled";
import { capitalize } from "../../utils/string";
import { withDefaults } from "../../utils/with-defaults";

type CounterProps = {} & CounterVariantProps;

const defaultProps: CounterProps = {
  appState: "stay-focused",
};

export const Counter = ({ appState }: CounterProps) => {
  const renderAppState = () => {
    return capitalize(appState as string, { splitter: "-" });
  };

  const renderIcon = () => {
    switch (appState) {
      case "stay-focused":
        return <DesktopIcon aria-label={`${renderAppState()} Icon`} />;
      case "short-break":
        return (
          <LightningBoltIcon aria-label={`${renderAppState()} Icon`} />
        );
      case "long-break":
        return <CookieIcon aria-label={`${renderAppState()} Icon`} />;
      case "special-break":
        return <StarIcon aria-label={`${renderAppState()} Icon`} />;
    }
  };

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
              <span>25</span>
              <span>:</span>
              <span>00</span>
            </StyledTimeRemaining>

            <Text size="$lg" casing="capitalize" color="$gray11">
              {renderAppState()}
            </Text>
          </VStack>
        </VStack>
      </Grid.Item>
    </Grid>
  );
};

const MemoCounter = memo(Counter);

export default withDefaults(MemoCounter, defaultProps);
