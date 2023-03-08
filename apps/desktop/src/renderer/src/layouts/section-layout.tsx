import { ReactNode } from "react";
import { StackProps, Text, VStack } from "@pomatez/ui";

type SectionLayoutProps = {
  heading: string;
  children?: ReactNode;
} & StackProps;

export function SectionLayout({
  heading,
  children,
  sx,
  ...rest
}: SectionLayoutProps) {
  return (
    <VStack
      align="flex-start"
      spacing="$4"
      sx={{
        width: "100%",
        ...sx,
      }}
      {...rest}
    >
      <Text
        size="$xs"
        casing="uppercase"
        weight="$medium"
        color="$gray9"
      >
        {heading}
      </Text>

      {children}
    </VStack>
  );
}
