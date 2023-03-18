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
import { withMemo } from "../../utils";

export type ControlProps = {
  /**
   * The session indicator
   */
  session?: {
    /**
     * The total number of sessions.
     */
    maxRounds: number;
    /**
     * The current session round.
     */
    currentRound: number;
  };
  /**
   * Whether the timer is playing.
   */
  isRunning?: boolean;
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
  onResetElapsed?: () => void;
  /**
   * Function to restart the current session.
   */
  onResetTimer?: () => void;
  /**
   * Function to play or pause the current session.
   */
  onPlayPause?: () => void;
  /**
   * Function to go to the next event.
   */
  onNextEvent?: () => void;
  /**
   * Function to toggle the sound on and off.
   */
  onToggleSound?: () => void;
  /**
   * Function to toggle the compact mode on and off.
   */
  onToggleCompact?: () => void;
} & StyledContainerProps;

function Control({
  session = { maxRounds: 4, currentRound: 1 },
  appState = "stayFocused",
  isRunning = false,
  isMuted = false,
  isCompact = false,
  onResetElapsed,
  onResetTimer,
  onPlayPause,
  onNextEvent,
  onToggleSound,
  onToggleCompact,
}: ControlProps) {
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
          px: "$5",
          py: "$4",
        }}
      >
        <Grid.Item justify="left">
          <VStack>
            <Text>
              {session.currentRound}&nbsp;/&nbsp;{session.maxRounds}
            </Text>
            <Button variant="link" onClick={onResetElapsed}>
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
              onClick={onResetTimer}
            />

            {isRunning ? (
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
              aria-label="Next Event Button"
              variant="secondary"
              icon={<TrackNextIcon />}
              onClick={onNextEvent}
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
}

export default withMemo(Control);
