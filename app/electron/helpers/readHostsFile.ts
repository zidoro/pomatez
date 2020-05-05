import fs from "fs";
import { HOSTS_FILE_PATH, findBlockerIndexes, BLOCKER } from ".";
import { EndOfLine } from "./isWindow";

function readHostsFile(): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(HOSTS_FILE_PATH, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
}

export { readHostsFile };
