import { memo } from "react";
import { Box, HStack, Text } from "../../components";

type PriorityProps = {};

export function Priority(props: PriorityProps) {
  return (
    <Box sx={{ width: "100%", px: "$4" }}>
      <HStack
        justify="flex-start"
        sx={{
          bg: "$gray2",
          border: "1px solid $gray6",
          borderRadius: "$sm",
          px: "$3",
          py: "$3",
        }}
      >
        <Text
          size="$md"
          weight={500}
          color="$gray12"
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          repellat fugit veniam debitis quibusdam illum distinctio
          suscipit, doloremque maiores ad minus itaque excepturi fugiat
          iusto perspiciatis dolorum in possimus doloribus.
        </Text>
      </HStack>
    </Box>
  );
}

export default memo(Priority);
