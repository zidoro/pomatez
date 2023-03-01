import { memo } from "react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Box, ButtonIcon, Grid, Text } from "../../components";

type PriorityProps = {};

export function Priority(props: PriorityProps) {
  return (
    <Box sx={{ width: "100%", height: "$12", px: "$4" }}>
      <Grid
        gap="$1"
        sx={{
          bg: "$gray2",
          border: "1px solid $gray4",
          borderRadius: "$sm",
          padding: "$3",
          pr: "0.6rem",
        }}
      >
        <Text
          size="$sm"
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

        <ButtonIcon
          aria-label="Task Option Button"
          icon={<DotsVerticalIcon />}
          sx={{
            width: "$4",
            color: "$gray11",
            mt: "-$1",

            "&:hover": {
              color: "$blue10",
            },

            "& > svg": {
              width: "100%",
              height: "100%",
            },
          }}
        />
      </Grid>
    </Box>
  );
}

export default memo(Priority);
