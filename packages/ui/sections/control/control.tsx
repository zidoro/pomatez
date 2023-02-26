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
import { StyledControlButton } from "./control.styled";

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
};

export const Control = ({
  isPlaying = false,
  isMuted = false,
  isCompact = false,
  onResetCounter,
  onRestart,
  onPlayPause,
  onNext,
  onToggleSound,
  onToggleCompact,
}: ControlProps) => {
  return (
    <Grid
      templateColumns="1fr max-content 1fr"
      justify="space-between"
      sx={{
        width: "100%",
        height: "max-content",
        padding: "$4",
        userSelect: "none",
      }}
    >
      <Grid.Item justify="left">
        <VStack>
          <Text>1 / 4</Text>
          <Button
            sx={{
              color: "$gray11",
              "&:hover": {
                color: "$blue10",
              },
              "&:active": {
                color: "$blue9",
              },
            }}
            onClick={onResetCounter}
          >
            Reset
          </Button>
        </VStack>
      </Grid.Item>

      <Grid.Item justify="center">
        <HStack spacing="$3">
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
              aria-label="Speaker Off Button"
              variant="secondary"
              icon={<SpeakerOffIcon />}
              onClick={onToggleSound}
            />
          ) : (
            <StyledControlButton
              aria-label="Speaker On Button"
              variant="secondary"
              icon={<SpeakerLoudIcon />}
              onClick={onToggleSound}
            />
          )}

          {isCompact ? (
            <StyledControlButton
              aria-label="Compact Mode Disable Button"
              variant="secondary"
              icon={<DoubleArrowDownIcon />}
              onClick={onToggleCompact}
            />
          ) : (
            <StyledControlButton
              aria-label="Compact Mode Enable Button"
              variant="secondary"
              icon={<DoubleArrowUpIcon />}
              onClick={onToggleCompact}
            />
          )}
        </HStack>
      </Grid.Item>
    </Grid>
  );
};

export default memo(Control);
