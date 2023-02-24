import { memo } from "react";
import { Box } from "../box";
import { Text, TextProps } from "../text";
import { HStack, StackProps } from "../stack";
import LogoIcon, { LogoIconProps } from "./logo-icon";

export type LogoProps = {
  appVersion?: string;
  labelFontSize: TextProps["size"];
} & StackProps &
  LogoIconProps;

export const Logo = ({
  iconSize,
  appState,
  appVersion,
  labelFontSize,
  ...rest
}: LogoProps) => {
  return (
    <HStack spacing="$2" {...rest}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <LogoIcon appState={appState} iconSize={iconSize} />
      </Box>

      <Text size={labelFontSize} weight="$bold" color="$blue12">
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
