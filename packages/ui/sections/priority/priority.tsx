import { memo } from "react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Box,
  ButtonIcon,
  Dropdown,
  Grid,
  Text,
} from "../../components";

type PriorityProps = {
  title?: string;
};

export function Priority({ title }: PriorityProps) {
  return (
    <Box sx={{ width: "100%", height: "$12", px: "$5" }}>
      <Grid
        gap="$1"
        templateColumns="1fr max-content"
        sx={{
          width: "100%",
          height: "100%",
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
          {title}
        </Text>

        <Dropdown
          trigger={
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
          }
          menuItems={[
            { type: "text", label: "Skip this task", shortcut: "⌘+S" },
            { type: "text", label: "Mark as done", shortcut: "⌘+D" },
          ]}
          contentProps={{
            side: "left",
          }}
        />
      </Grid>
    </Box>
  );
}

export default memo(Priority);
