import { Box } from "../box";
import { Text, TextProps } from "../text";
import { HStack, StackProps } from "../stack";
import LogoIcon, { LogoIconProps } from "./logo-icon";
import { withMemo } from "../../utils";

export type LogoProps = {
  /**
   * The version of the app
   */
  appVersion?: string;
  /**
   * The logo label font size
   */
  labelFontSize: TextProps["size"];
} & StackProps &
  LogoIconProps;

function Logo({
  iconSize,
  appState,
  appVersion,
  labelFontSize,
  ...rest
}: LogoProps) {
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
}

export default withMemo(Logo);
