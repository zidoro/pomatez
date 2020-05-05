import {
  readHostsFile,
  EndOfLine,
  findBlockerIndexes,
  BLOCKER,
  writeHostsFile,
} from "../helpers";

// TODO: run ` ipconfig /flushdns` for Windows if doesn't work

async function blockWebsiteList(domains: string[]): Promise<boolean> {
  try {
    const hostsFile = await readHostsFile();
    const hosts = hostsFile.split(EndOfLine);

    const webBlockerPositions = findBlockerIndexes(hosts);

    let blockedDomains: string[] = [];

    if (webBlockerPositions.start >= 0 && webBlockerPositions.end > 0) {
      blockedDomains = hosts.splice(
        webBlockerPositions.start,
        webBlockerPositions.end - webBlockerPositions.start + 1
      );

      blockedDomains.shift();
      blockedDomains.pop();
    }

    const finalHostsContent = [
      ...hosts,
      BLOCKER.DOMAINS_START,
      ...blockedDomains,
      ...domains.map((domain) => `127.0.0.1 www.${domain}`),
      BLOCKER.DOMAINS_END,
    ].join(EndOfLine);

    await writeHostsFile(finalHostsContent);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function unBlockWebsiteList(): Promise<boolean> {
  try {
    const hostsFile = await readHostsFile();
    const hosts = hostsFile.split(EndOfLine);

    const webBlockerPositions = findBlockerIndexes(hosts);

    if (webBlockerPositions.start < 0 || webBlockerPositions.end < 0) {
      return true;
    }

    hosts.splice(
      webBlockerPositions.start,
      webBlockerPositions.end - webBlockerPositions.start + 1
    );

    const finalHostsContent = hosts.join(EndOfLine);

    await writeHostsFile(finalHostsContent);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { blockWebsiteList, unBlockWebsiteList };
