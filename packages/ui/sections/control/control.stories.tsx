import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useState } from "react";
import { VStack } from "../../components";
import Control from "./control";

export default {
  title: "App/Sections/Control",
  component: Control,
} as Meta<typeof Control>;

type Story = StoryObj<typeof Control>;

export const Playground: StoryFn<typeof Control> = (props) => {
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

export const Default: Story = {
  render: Playground,
};
