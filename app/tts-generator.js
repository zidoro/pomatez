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
    text: "Work time has been finished.",
    filename: "short-break-start",
  },
  {
    text: "Short break has been finished.",
    filename: "short-break-finished",
  },
  {
    text: "Session rounds has completed.",
    filename: "long-break-start",
  },
  {
    text: "Long break has been finished.",
    filename: "long-break-finished",
  },
  {
    text: "Sixty seconds before special break start.",
    filename: "sixty-seconds-before-special-break",
  },
  {
    text: "Special break has been started.",
    filename: "special-break-start",
  },
  {
    text: "Special break has been finished.",
    filename: "special-break-finished",
  },
  {
    text: "Sixty seconds left for short break.",
    filename: "sixty-seconds-left-short-break",
  },
  {
    text: "Sixty seconds left for long break.",
    filename: "sixty-seconds-left-long-break",
  },
  {
    text: "Sixty seconds left for special break.",
    filename: "sixty-seconds-left-special-break",
  },
  {
    text: "Thirty seconds left to work.",
    filename: "thirty-seconds-left-to-work",
  },
];

textToGenerateList.map((v) => ttsGenerator(v.text, v.filename));
