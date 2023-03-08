import { memo } from "react";
import { HStack } from "../stack";
import {
  StyledSwitchLabel,
  StyledSwitchRoot,
  StyledSwitchThumb,
} from "./switch.styled";

export type SwitchProps = {
  /**
   * ID of the switch
   */
  id: string;
  /**
   * Label of the switch
   */
  label: string;
  /**
   * Default checked state of the switch
   */
  defaultChecked?: boolean;
  /**
   * Checked state of the switch
   * @default false
   */
  checked?: boolean;
  /**
   * Event handler for when the checked state of the switch changes
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Whether the switch is required
   */
  required?: boolean;
  /**
   * Name of the switch
   */
  name?: string;
  /**
   * Value of the switch
   */
  value?: string;
};

export const Switch = ({ id, label, ...rest }: SwitchProps) => {
  return (
    <HStack justify="space-between" sx={{ width: "100%" }}>
      <StyledSwitchLabel htmlFor={id}>{label}</StyledSwitchLabel>

      <StyledSwitchRoot id={id} {...rest}>
        <StyledSwitchThumb />
      </StyledSwitchRoot>
    </HStack>
  );
};

const MemoSwitch = memo(Switch);

MemoSwitch.displayName = "Switch";

export default MemoSwitch;
