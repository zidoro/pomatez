import fs from "fs";
import { HOSTS_FILE_PATH } from ".";

function writeHostsFile(content: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.writeFile(HOSTS_FILE_PATH, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export { writeHostsFile };
