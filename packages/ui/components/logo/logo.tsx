import { memo } from "react";
import { Box } from "../box";
import { Text } from "../text";
import { HStack } from "../stack";
import LogoIcon, { LogoIconProps } from "./logo-icon";

export type LogoProps = {
  appVersion?: string;
} & LogoIconProps;

export const Logo = ({
  size,
  appState,
  appVersion,
  ...rest
}: LogoProps) => {
  // TODO: Calculate the spacing and the font size based on the size prop

  return (
    <HStack spacing="$2" {...rest}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <LogoIcon appState={appState} size={size} />
      </Box>

      <Text size="$sm" weight="$bold" color="$blue12">
        Pomatez
      </Text>

      {Boolean(appVersion) && (
        <Text
          as="sup"
          color="$blue12"
          size="1rem"
          weight="$bold"
          casing="lowercase"
          sx={{ mt: "-$2" }}
        >
          v{appVersion}
        </Text>
      )}
    </HStack>
  );
};

export default memo(Logo);
