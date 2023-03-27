import { SxProps } from "../../theme";
import { withMemo } from "../../utils";
import {
  StyledGroupItem,
  StyledToggleGroup,
  ToggleGroupVariantProps,
} from "./toggle-group.styled";

type ToggleItemProps = {
  label: string;
  value: string;
};

export type ToggleGroupProps = {
  /**
   * Array of items to be rendered
   * @default []
   */
  items?: ToggleItemProps[];
  /**
   * Default value of the toggle group
   */
  defaultValue?: string;
  /**
   * Value of the toggle group
   */
  value?: string;
  /**
   * Event handler for when the value of the toggle group changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Additional styles
   */
  sx?: SxProps;
} & ToggleGroupVariantProps;

function ToggleGroup({
  appState = "stayFocused",
  items = [],
  defaultValue,
  value,
  onValueChange,
  sx,
}: ToggleGroupProps) {
  return (
    <StyledToggleGroup
      appState={appState}
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      css={sx}
    >
      {items.map((item, index) => (
        <StyledGroupItem value={item.value} key={index}>
          {item.label}
        </StyledGroupItem>
      ))}
    </StyledToggleGroup>
  );
}

export default withMemo(ToggleGroup);
