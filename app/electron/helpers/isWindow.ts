export const isWindow = () => process.platform === "win32";

export const EndOfLine = isWindow() ? "\r\n" : "\n";

export const HOSTS_FILE_PATH = isWindow()
  ? "C:/Windows/System32/drivers/etc/hosts"
  : "/etc/hosts";
