const say = require("say");
const fs = require("fs");

const exportDir = "src/assets/audios";

if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir);
}

function ttsGenerator(text, filename) {
  say.export(text, "", 1, `${exportDir}/${filename}.wav`, (errors) => {
    if (errors) {
      return console.log(errors);
    }
    console.log(`Audio file has been saved to folder ${exportDir}`);
  });
}

const textToGenerateList = [
  {
    text: "Work Time Finished. It is time to take a short break.",
    filename: "short-break-start",
  },
  {
    text: "Short Break Finished. It is time to focus and work again.",
    filename: "short-break-finished",
  },
  {
    text: "Session Rounds Completed. It is time to take a long break.",
    filename: "long-break-start",
  },
  {
    text: "Long Break Finished. It is time to focus and work again.",
    filename: "long-break-finished",
  },
  {
    text: "Special Break. It is time to take your this break with joy.",
    filename: "special-break-start",
  },
  {
    text: "Special Break Finished. It is time to focus and work again.",
    filename: "special-break-finished",
  },
  {
    text:
      "Sixty Seconds Left for Short Break. Please prepare yourself getting  back to work.",
    filename: "sixty-seconds-left-short-break",
  },
  {
    text:
      "Sixty Seconds Left for Long Break. Please prepare yourself getting  back to work.",
    filename: "sixty-seconds-left-long-break",
  },
  {
    text:
      "Sixty Seconds Left for Special Break. Please prepare yourself getting  back to work.",
    filename: "sixty-seconds-left-special-break",
  },
  {
    text:
      "Thirty Seconds Left to Work. Please pause all media playing if there's one.",
    filename: "thirty-seconds-left-to-work",
  },
];

textToGenerateList.map((v) => ttsGenerator(v.text, v.filename));
