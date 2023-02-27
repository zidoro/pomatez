import { VStack, StackProps } from "@pomatez/ui";

export function WindowDecorator({ children, sx, ...rest }: StackProps) {
  return (
    <VStack
      sx={{
        width: "34rem",
        height: "max-content",
        border: "1px solid $gray6",
        borderRadius: "$sm",
        boxShadow: "$sm",
        bg: "$white",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </VStack>
  );
}
