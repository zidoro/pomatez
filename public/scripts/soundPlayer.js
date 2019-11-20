function soundPlayer(filename) {
  const fs = require("fs");
  const path = require("path");
  const sound = require("sound-play");

  return new Promise(function(resolve, reject) {
    const filePath = path.join(__dirname, "../../src/assets/voices", filename);

    if (fs.existsSync(filePath)) {
      sound.play(filePath);
      resolve(`Now playing ${filename}`);
    } else {
      reject(new Error(`File "${filename}" doesn't exist.`));
    }
  });
}

module.exports = soundPlayer;
