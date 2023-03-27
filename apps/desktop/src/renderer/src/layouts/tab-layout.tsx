import { ScrollArea, StackProps, SxProps, VStack } from "@pomatez/ui";
import { Header, HeaderProps } from "@renderer/components";

type TabLayoutProps = {
  animation?: SxProps;
} & HeaderProps &
  StackProps;

export function TabLayout({
  heading,
  action,
  children,
  animation,
  sx,
  ...rest
}: TabLayoutProps) {
  return (
    <ScrollArea disabledScroll="horizontal">
      <VStack
        align="flex-start"
        spacing="$4"
        sx={{
          position: "relative",
          padding: "$5",
          ...animation,
          ...sx,
        }}
        {...rest}
      >
        <Header
          className="tab-header"
          heading={heading}
          action={action}
        />

        {children}
      </VStack>
    </ScrollArea>
  );
}
