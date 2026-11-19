import { invoke } from "@tauri-apps/api/core";

export async function saveExport(filename: string, contents: string) {
  if (window.electron?.saveHistoryJsonl) {
    return window.electron.saveHistoryJsonl(filename, contents);
  }
  const path = await invoke<string>("save_history_jsonl", {
    filename,
    contents,
  });
  return { status: "saved" as const, path };
}
