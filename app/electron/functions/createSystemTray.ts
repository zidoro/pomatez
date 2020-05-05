import { Tray, Menu, MenuItemConstructorOptions, MenuItem } from "electron";

type SystemTrayProps = {
  icon: string;
  tooltip?: string;
  template: (MenuItemConstructorOptions | MenuItem)[];
};

let tray: Tray;

export function createSystemTray({
  icon,
  tooltip,
  template,
}: SystemTrayProps): Tray {
  tray = new Tray(icon);

  let contextMenu = Menu.buildFromTemplate(template);

  if (tooltip) tray.setToolTip(tooltip);
  tray.setContextMenu(contextMenu);

  return tray;
}
