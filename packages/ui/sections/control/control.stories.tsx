import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useState } from "react";
import { VStack } from "../../components";
import Control from "./control";

export default {
  title: "App/Sections/Control",
  component: Control,
  argTypes: {
    appState: {
      options: [
        "stay-focused",
        "short-break",
        "long-break",
        "special-break",
      ],
      control: { type: "select" },
    },
  },
} as Meta<typeof Control>;

type Story = StoryObj<typeof Control>;

const Wrapper: StoryFn<typeof Control> = (props) => {
  const [isPlaying, setIsPlaying] = useState(props.isPlaying);

  const [isCompact, setIsCompact] = useState(props.isCompact);

  const [isMuted, setIsMuted] = useState(props.isMuted);

  const onPlayPauseHandler = () => {
    setIsPlaying((prev) => !prev);
  };

  const onToggleSoundHandler = () => {
    setIsMuted((prev) => !prev);
  };

  const onToggleCompactHandler = () => {
    setIsCompact((prev) => !prev);
  };

  return (
    <VStack
      sx={{
        width: "34rem",
        height: "max-content",
        border: "1px solid $gray6",
        borderRadius: "$sm",
        boxShadow: "$sm",
        bg: "$white",
      }}
    >
      <Control
        {...props}
        isMuted={isMuted}
        isPlaying={isPlaying}
        isCompact={isCompact}
        onPlayPause={onPlayPauseHandler}
        onToggleSound={onToggleSoundHandler}
        onToggleCompact={onToggleCompactHandler}
      />
    </VStack>
  );
};

export const StayFocused: Story = {
  args: {
    appState: "stay-focused",
  },
  render: Wrapper,
};

export const ShortBreak: Story = {
  args: {
    appState: "short-break",
  },
  render: Wrapper,
};

export const LongBreak: Story = {
  args: {
    appState: "long-break",
  },
  render: Wrapper,
};

export const SpecialBreak: Story = {
  args: {
    appState: "special-break",
  },
  render: Wrapper,
};
