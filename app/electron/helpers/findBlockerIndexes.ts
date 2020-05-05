import { BLOCKER } from "./constants";

function findBlockerIndexes(hosts: string[]) {
  const positions = { start: -1, end: -1 };

  for (let index = 0; index < hosts.length; index++) {
    if (hosts[index].indexOf(BLOCKER.DOMAINS_START) > -1) {
      positions.start = index;
    }

    if (hosts[index].indexOf(BLOCKER.DOMAINS_END) > -1) {
      positions.end = index;
    }
  }

  if (positions.start > positions.end) {
    return { start: -1, end: -1 };
  }

  return positions;
}

export { findBlockerIndexes };
