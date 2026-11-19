import { link, open, unlink } from "fs/promises";
import { dirname, join } from "path";
import { randomUUID } from "crypto";

export function validExportRequest(
  filename: unknown,
  contents: unknown
): filename is string {
  return (
    typeof filename === "string" &&
    /^pomatez-\d{4}-\d{2}-\d{2}_\d{4}-\d{2}-\d{2}\.jsonl$/.test(
      filename
    ) &&
    typeof contents === "string" &&
    contents.startsWith('{"record_type":"export_header"') &&
    contents.endsWith("\n") &&
    Buffer.byteLength(contents, "utf8") <= 32 * 1024 * 1024
  );
}

export async function writeNewExport(
  destination: string,
  contents: string,
  write = async (
    file: Awaited<ReturnType<typeof open>>,
    data: string
  ) => file.writeFile(data, "utf8")
) {
  const temporary = join(
    dirname(destination),
    ".pomatez-" + randomUUID() + ".partial"
  );
  const file = await open(temporary, "wx", 0o600);
  try {
    try {
      await write(file, contents);
      await file.sync();
    } finally {
      await file.close();
    }
    // Atomically publish a complete file. Existing destinations are never replaced.
    await link(temporary, destination);
  } finally {
    await unlink(temporary).catch(() => {});
  }
}

export async function saveHistoryExport(
  choose: () => Promise<{ canceled: boolean; filePath?: string }>,
  contents: string,
  write = writeNewExport
) {
  const selection = await choose();
  if (selection.canceled || !selection.filePath)
    return { status: "cancelled" };
  try {
    await write(selection.filePath, contents);
    return { status: "saved", path: selection.filePath };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST")
      return { status: "exists" };
    throw error;
  }
}
