import { useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import Control from "./control";

export default {
  title: "App/Sections/Control",
  component: Control,
  argTypes: {
    appState: {
      options: ["stayFocused", "shortBreak", "longBreak"],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Control>;

type Story = StoryObj<typeof Control>;

const Template: StoryFn<typeof Control> = (props) => {
  const [isPlaying, setIsPlaying] = useState(props.isRunning);

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
        isRunning={isPlaying}
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
    appState: "stayFocused",
  },
  render: Template,
};

export const ShortBreak: Story = {
  args: {
    appState: "shortBreak",
  },
  render: Template,
};

export const LongBreak: Story = {
  args: {
    appState: "longBreak",
  },
  render: Template,
};
