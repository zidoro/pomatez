import { memo, ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import {
  StyledDropdownMenuArrow,
  StyledDropdownMenuCheckboxItem,
  StyledDropdownMenuContent,
  StyledDropdownMenuItem,
  StyledDropdownMenuItemIndicator,
  StyledDropdownMenuLabel,
  StyledDropdownMenuRadioItem,
  StyledDropdownMenuSeparator,
  StyledDropdownMenuSubContent,
  StyledDropdownMenuSubTrigger,
  StyledRightSlot,
} from "./dropdown.styled";

export type DropdownMenuItemProps =
  | {
      type: "label";
      value: string;
      label?: never;
      shortcut?: never;
      subMenu?: never;
    }
  | {
      type: "text";
      label: string;
      value?: never;
      shortcut?: string;
      subMenu?: never;
      onClick?: () => void;
      isDisabled?: boolean;
    }
  | {
      type: "checkbox";
      label: string;
      value?: never;
      shortcut?: string;
      subMenu?: never;
      isChecked?: boolean;
      onCheckedChange?: (checked: boolean) => void;
    }
  | {
      type: "radio-group";
      label?: string;
      value?: string;
      shortcut?: string;
      subMenu?: Omit<DropdownMenuItemProps, "type">[];
      onValueChange?: (value: string) => void;
    }
  | {
      type: "sub-menu";
      label: string;
      value?: never;
      shortcut?: never;
      subMenu?: DropdownMenuItemProps[];
    }
  | {
      type: "separator";
      label?: never;
      value?: never;
      shortcut?: never;
      subMenu?: never;
    };

export type DropdownProps = {
  /**
   * Whether the dropdown menu is open.
   */
  isOpen?: boolean;
  /**
   * Whether the dropdown menu is open by default.
   */
  defaultOpen?: boolean;
  /**
   * Function that handles the open state of the dropdown menu.
   * @param open Whether the dropdown menu is open.
   */
  onOpenChange?(open: boolean): void;
  /**
   * Whether the dropdown menu is modal.
   * The modality of the dropdown menu. When set to `true`,
   * interaction with outside elements will be disabled and
   * only menu content will be visible to screen readers.
   * @default true
   */
  modal?: boolean;
  /**
   * The trigger element that will open the dropdown menu.
   */
  trigger: ReactNode;
  /**
   * The dropdown menu items.
   */
  menuItems?: DropdownMenuItemProps[];
  /**
   * The dropdown menu content props.
   */
  contentProps?: {
    /**
     * The dropdown menu content side.
     * @default "bottom"
     */
    side?: "bottom" | "left" | "right" | "top";
    /**
     * The dropdown menu content side offset.
     * @default 0
     */
    sideOffset?: number;
    /**
     * The dropdown menu content align.
     * @default "center"
     */
    align?: "center" | "end" | "start";
    /**
     * The dropdown menu content align offset.
     * @default 0
     */
    alignOffset?: number;
    /**
     * The dropdown menu content arrow padding.
     * @default 0
     */
    arrowPadding?: number;
  };
};

export const Dropdown = ({
  isOpen,
  trigger,
  menuItems = [],
  contentProps,
  ...rest
}: DropdownProps) => {
  const renderMenuItem = (
    menuItem: DropdownMenuItemProps,
    index: number
  ) => {
    switch (menuItem?.type) {
      case "label":
        return (
          <StyledDropdownMenuLabel key={index}>
            {menuItem?.value}
          </StyledDropdownMenuLabel>
        );
      case "text":
        return (
          <StyledDropdownMenuItem
            onClick={menuItem?.onClick}
            disabled={menuItem?.isDisabled}
            key={index}
          >
            {menuItem?.label}{" "}
            {menuItem?.shortcut && (
              <StyledRightSlot>{menuItem.shortcut}</StyledRightSlot>
            )}
          </StyledDropdownMenuItem>
        );
      case "sub-menu":
        return (
          <DropdownMenu.Sub key={index}>
            <StyledDropdownMenuSubTrigger>
              {menuItem?.label}
              <StyledRightSlot>
                <ChevronRightIcon />
              </StyledRightSlot>
            </StyledDropdownMenuSubTrigger>
            <DropdownMenu.Portal>
              <StyledDropdownMenuSubContent
                sideOffset={2}
                alignOffset={-5}
              >
                {menuItem?.subMenu?.map((item, index) =>
                  renderMenuItem(item, index)
                )}
              </StyledDropdownMenuSubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        );
      case "checkbox":
        return (
          <StyledDropdownMenuCheckboxItem
            checked={menuItem?.isChecked}
            onCheckedChange={menuItem?.onCheckedChange}
            key={index}
          >
            <StyledDropdownMenuItemIndicator>
              <CheckIcon />
            </StyledDropdownMenuItemIndicator>
            {menuItem?.label}{" "}
            {menuItem?.shortcut && (
              <StyledRightSlot>{menuItem.shortcut}</StyledRightSlot>
            )}
          </StyledDropdownMenuCheckboxItem>
        );
      case "radio-group":
        return (
          <DropdownMenu.RadioGroup
            value={menuItem?.value}
            onValueChange={menuItem?.onValueChange}
            key={index}
          >
            {menuItem?.subMenu?.map((item, index) => (
              <StyledDropdownMenuRadioItem
                value={item?.value as string}
                key={index}
              >
                <StyledDropdownMenuItemIndicator>
                  <DotFilledIcon />
                </StyledDropdownMenuItemIndicator>
                {item?.label}{" "}
                {item?.shortcut && (
                  <StyledRightSlot>{item.shortcut}</StyledRightSlot>
                )}
              </StyledDropdownMenuRadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        );
      case "separator":
        return <StyledDropdownMenuSeparator key={index} />;
    }
  };

  return (
    <DropdownMenu.Root open={isOpen} {...rest}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        {Boolean(menuItems.length) && (
          <StyledDropdownMenuContent {...contentProps}>
            {menuItems.map((item, index) =>
              renderMenuItem(item, index)
            )}
            <StyledDropdownMenuArrow />
          </StyledDropdownMenuContent>
        )}
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const MemoDropdown = memo(Dropdown);

export default MemoDropdown;
