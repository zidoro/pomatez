import { ReactNode } from "react";
import { HStack, StackProps, Text } from "@pomatez/ui";

export type HeaderProps = {
  heading: string;
  action: ReactNode;
} & StackProps;

export function Header({ heading, action, ...rest }: HeaderProps) {
  return (
    <HStack
      justify="space-between"
      sx={{
        width: "100%",
      }}
      {...rest}
    >
      <Text
        as="h1"
        size="$md"
        color="$gray12"
        casing="uppercase"
        weight="$medium"
      >
        {heading}
      </Text>

      {action}
    </HStack>
  );
}
