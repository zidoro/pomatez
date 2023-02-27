import { memo } from "react";
import {
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  PauseIcon,
  PlayIcon,
  ReloadIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
  TrackNextIcon,
} from "@radix-ui/react-icons";
import { Button, Grid, HStack, Text, VStack } from "../../components";
import {
  StyledContainer,
  StyledControlButton,
  StyledContainerProps,
} from "./control.styled";
import { withDefaults } from "../../utils/with-defaults";

type ControlProps = {
  /**
   * Whether the timer is playing.
   */
  isPlaying?: boolean;
  /**
   * Whether the sound is muted.
   */
  isMuted?: boolean;
  /**
   * Whether the app mode is compact.
   */
  isCompact?: boolean;
  /**
   * Function to reset the number sessions completed.
   */
  onResetCounter?: () => void;
  /**
   * Function to restart the current session.
   */
  onRestart?: () => void;
  /**
   * Function to play or pause the current session.
   */
  onPlayPause?: () => void;
  /**
   * Function to go to the next event.
   */
  onNext?: () => void;
  /**
   * Function to toggle the sound on and off.
   */
  onToggleSound?: () => void;
  /**
   * Function to toggle the compact mode on and off.
   */
  onToggleCompact?: () => void;
} & StyledContainerProps;

const defaultProps: ControlProps = {
  appState: "stay-focused",
  isPlaying: false,
  isMuted: false,
  isCompact: false,
};

export const Control = ({
  appState,
  isPlaying,
  isMuted,
  isCompact,
  onResetCounter,
  onRestart,
  onPlayPause,
  onNext,
  onToggleSound,
  onToggleCompact,
}: ControlProps) => {
  return (
    <StyledContainer appState={appState} data-testid={appState}>
      <Grid
        templateColumns="1fr max-content 1fr"
        justify="space-between"
        sx={{
          width: "100%",
          height: "max-content",
          userSelect: "none",
          color: "$gray11",
          padding: "$4",
        }}
      >
        <Grid.Item justify="left">
          <VStack>
            <Text>1 / 4</Text>
            <Button
              sx={{
                "&:hover": {
                  color: "$$hoverColor",
                },
                "&:active": {
                  color: "$$activeColor",
                },
              }}
              onClick={onResetCounter}
            >
              Reset
            </Button>
          </VStack>
        </Grid.Item>

        <Grid.Item justify="center">
          <HStack spacing="$4">
            <StyledControlButton
              aria-label="Restart Button"
              variant="secondary"
              icon={<ReloadIcon />}
              onClick={onRestart}
            />

            {isPlaying ? (
              <StyledControlButton
                aria-label="Pause Button"
                variant="primary"
                icon={<PauseIcon />}
                onClick={onPlayPause}
              />
            ) : (
              <StyledControlButton
                aria-label="Play Button"
                variant="primary"
                sx={{
                  "& > svg": {
                    marginLeft: "0.38rem",
                  },
                }}
                icon={<PlayIcon />}
                onClick={onPlayPause}
              />
            )}

            <StyledControlButton
              aria-label="Next Button"
              variant="secondary"
              icon={<TrackNextIcon />}
              onClick={onNext}
            />
          </HStack>
        </Grid.Item>

        <Grid.Item justify="right">
          <HStack spacing="$3">
            {isMuted ? (
              <StyledControlButton
                aria-label="Enable Speaker Button"
                variant="secondary"
                icon={<SpeakerOffIcon />}
                onClick={onToggleSound}
              />
            ) : (
              <StyledControlButton
                aria-label="Disable Speaker Button"
                variant="secondary"
                icon={<SpeakerLoudIcon />}
                onClick={onToggleSound}
              />
            )}

            {isCompact ? (
              <StyledControlButton
                aria-label="Disable Compact Mode Button"
                variant="secondary"
                icon={<DoubleArrowDownIcon />}
                onClick={onToggleCompact}
              />
            ) : (
              <StyledControlButton
                aria-label="Enable Compact Mode Button"
                variant="secondary"
                icon={<DoubleArrowUpIcon />}
                onClick={onToggleCompact}
              />
            )}
          </HStack>
        </Grid.Item>
      </Grid>
    </StyledContainer>
  );
};

const MemoControl = memo(Control);

export default withDefaults(MemoControl, defaultProps);
