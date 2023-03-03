import { useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
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
  tags: ["autodocs"],
} as Meta<typeof Control>;

type Story = StoryObj<typeof Control>;

const Template: StoryFn<typeof Control> = (props) => {
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
    <WindowDecorator>
      <Control
        {...props}
        isMuted={isMuted}
        isPlaying={isPlaying}
        isCompact={isCompact}
        onPlayPause={onPlayPauseHandler}
        onToggleSound={onToggleSoundHandler}
        onToggleCompact={onToggleCompactHandler}
      />
    </WindowDecorator>
  );
};

export const StayFocused: Story = {
  args: {
    appState: "stay-focused",
  },
  render: Template,
};

export const ShortBreak: Story = {
  args: {
    appState: "short-break",
  },
  render: Template,
};

export const LongBreak: Story = {
  args: {
    appState: "long-break",
  },
  render: Template,
};

export const SpecialBreak: Story = {
  args: {
    appState: "special-break",
  },
  render: Template,
};
