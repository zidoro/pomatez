import { ReactNode } from "react";
import { HStack, Text } from "@pomatez/ui";

export type HeaderProps = {
  heading: string;
  action: ReactNode;
};

export function Header({ heading, action }: HeaderProps) {
  return (
    <HStack justify="space-between" sx={{ width: "100%" }}>
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
