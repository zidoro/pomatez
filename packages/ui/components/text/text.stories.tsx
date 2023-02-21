import { Meta } from "@storybook/react";
import { VStack } from "../stack";
import Text from "./text";

export default {
  title: "Components/Typography/Text",
  component: Text,
  args: {
    children: "Text Component",
  },
} as Meta<typeof Text>;

export const Sizes = () => (
  <VStack>
    <Text size="$xs">Text (xs = 12px)</Text>
    <Text size="$sm">Text (sm = 14px)</Text>
    <Text size="$md">Text (md = 16px)</Text>
    <Text size="$lg">Text (lg = 18px)</Text>
    <Text size="$xl">Text (xl = 20px)</Text>
    <Text size="$2xl">Text (2xl = 24px)</Text>
    <Text size="$3xl">Text (3xl = 30px)</Text>
    <Text size="$4xl">Text (4xl = 36px)</Text>
    <Text size="$5xl">Text (5xl = 48px)</Text>
    <Text size="$6xl">Text (6xl = 60px)</Text>
    <Text size="$7xl">Text (7xl = 72px)</Text>
    <Text size="$8xl">Text (8xl = 96px)</Text>
    <Text size="$9xl">Text (9xl = 128px)</Text>
  </VStack>
);

export const Elements = () => (
  <VStack>
    <Text as="b">Bold</Text>
    <br />
    <Text as="i">Italic</Text>
    <br />
    <Text as="u">Underline</Text>
    <br />
    <Text as="abbr">I18N</Text>
    <br />
    <Text as="cite">Citation</Text>
    <br />
    <Text as="del">Deleted</Text>
    <br />
    <Text as="em">Emphasis</Text>
    <br />
    <Text as="ins">Inserted</Text>
    <br />
    <Text as="kbd">Ctrl + C</Text>
    <br />
    <Text as="mark">Highlighted</Text>
    <br />
    <Text as="s">Strikethrough</Text>
    <br />
    <Text as="samp">Sample</Text>
    <br />
    <Text as="sub">sub</Text>
    <br />
    <Text as="sup">sup</Text>
  </VStack>
);
