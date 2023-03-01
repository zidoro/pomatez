import { forwardRef, memo, ReactNode, useState } from "react";
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

type MenuItemProps =
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
    }
  | {
      type: "checkbox";
      label: string;
      value?: never;
      shortcut?: string;
      subMenu?: never;
    }
  | {
      type: "radio-group";
      label?: string;
      value?: string;
      shortcut?: string;
      subMenu?: MenuItemProps[];
    }
  | {
      type: "separator";
      label?: never;
      value?: never;
      shortcut?: never;
      subMenu?: never;
    }
  | {
      type: "sub-menu";
      label: string;
      value?: never;
      shortcut?: never;
      subMenu?: MenuItemProps[];
    };

export type DropdownProps = {
  trigger?: ReactNode;
  menuItems?: MenuItemProps[];
};

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, menuItems = [] }, ref) => {
    const [bookmarksChecked, setBookmarksChecked] = useState(true);
    const [urlsChecked, setUrlsChecked] = useState(false);
    const [person, setPerson] = useState("pedro");

    const renderMenuItem = (menuItem: MenuItemProps) => {
      switch (menuItem.type) {
        case "label":
          return (
            <StyledDropdownMenuLabel>
              {menuItem.value}
            </StyledDropdownMenuLabel>
          );
        case "text":
          return (
            <StyledDropdownMenuItem>
              {menuItem.label}{" "}
              {menuItem.shortcut && (
                <StyledRightSlot>{menuItem.shortcut}</StyledRightSlot>
              )}
            </StyledDropdownMenuItem>
          );
        case "sub-menu":
          return (
            <DropdownMenu.Sub>
              <StyledDropdownMenuSubTrigger>
                {menuItem.label}
                <StyledRightSlot>
                  <ChevronRightIcon />
                </StyledRightSlot>
              </StyledDropdownMenuSubTrigger>
              <DropdownMenu.Portal>
                <StyledDropdownMenuSubContent
                  sideOffset={2}
                  alignOffset={-5}
                >
                  {menuItem?.subMenu?.map((item) =>
                    renderMenuItem(item)
                  )}
                </StyledDropdownMenuSubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
          );
        case "checkbox":
          return (
            <StyledDropdownMenuCheckboxItem
              checked={bookmarksChecked}
              onCheckedChange={setBookmarksChecked}
            >
              <StyledDropdownMenuItemIndicator>
                <CheckIcon />
              </StyledDropdownMenuItemIndicator>
              {menuItem.label}{" "}
              {menuItem.shortcut && (
                <StyledRightSlot>{menuItem.shortcut}</StyledRightSlot>
              )}
            </StyledDropdownMenuCheckboxItem>
          );
        case "radio-group":
          return (
            <DropdownMenu.RadioGroup
              value={person}
              onValueChange={setPerson}
            >
              {menuItem?.subMenu?.map((item) => (
                <StyledDropdownMenuRadioItem
                  value={item.value as string}
                >
                  <StyledDropdownMenuItemIndicator>
                    <DotFilledIcon />
                  </StyledDropdownMenuItemIndicator>
                  {item.label}{" "}
                  {item.shortcut && (
                    <StyledRightSlot>{item.shortcut}</StyledRightSlot>
                  )}
                </StyledDropdownMenuRadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          );
        case "separator":
          return <StyledDropdownMenuSeparator />;
      }
    };

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <StyledDropdownMenuContent sideOffset={5}>
            {menuItems.map((item) => renderMenuItem(item))}

            <StyledDropdownMenuArrow />
          </StyledDropdownMenuContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);

const MemoDropdown = memo(Dropdown);

export default MemoDropdown;
