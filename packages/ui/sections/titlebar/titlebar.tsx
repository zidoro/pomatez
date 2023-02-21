import { memo } from "react";
import { Box, Button, HStack, Text } from "../../components";
import Logo from "../../static/logo/tray.png";

type TitlebarProps = {
  onMinimize?: () => void;
  onClose?: () => void;
};

function Titlebar({ onMinimize, onClose }: TitlebarProps) {
  return (
    <HStack
      justify="space-between"
      sx={{
        width: "100%",
        height: "4rem",
        "-webkit-app-region": "drag",
        cursor: "pointer",
        userSelect: "none",
        pl: "$3",
      }}
    >
      <HStack gap="$2">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            "& > img": {
              width: "1.6rem",
              height: "1.6rem",
            },
          }}
        >
          <img src={Logo} alt="Pomatez Logo" />
        </Box>

        <Text size="$sm" weight="$bold" color="$blue12">
          Pomatez
        </Text>

        <Text
          as="sup"
          color="$blue12"
          size="1rem"
          weight="$bold"
          casing="lowercase"
          sx={{ mt: "-$2" }}
        >
          v2
        </Text>
      </HStack>

      <HStack
        sx={{
          height: "100%",
          "-webkit-app-region": "no-drag",
        }}
      >
        <Button
          aria-label="Minimize Button"
          sx={{
            width: "4rem",
            height: "100%",
            bg: "transparent",
            color: "$gray11",
            transition: "all ease 160ms",

            "&:hover": {
              bg: "$gray4",
            },

            "&::before": {
              content: "''",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              width: "1.2rem",
              height: "0.2rem",

              borderRadius: "$xl",
              bg: "currentColor",
            },
          }}
          onClick={onMinimize}
        />

        <Button
          aria-label="Close Button"
          sx={{
            width: "4rem",
            height: "100%",
            bg: "transparent",
            color: "$gray11",
            transition: "all ease 160ms",

            "&:hover": {
              bg: "$gray4",
              color: "$red9",
            },

            "&::before, &::after": {
              content: "''",
              position: "absolute",
              top: "50%",
              left: "50%",

              marginLeft: "-0.7rem",
              marginTop: "-0.1rem",

              width: "1.4rem",
              height: "0.2rem",

              borderRadius: "$xl",
              bg: "currentColor",
            },

            "&::before": {
              transform: "rotate(45deg)",
            },

            "&::after": {
              transform: "rotate(-45deg)",
            },
          }}
          onClick={onClose}
        />
      </HStack>
    </HStack>
  );
}

const MemoTitlebar = memo(Titlebar);

export default MemoTitlebar;
