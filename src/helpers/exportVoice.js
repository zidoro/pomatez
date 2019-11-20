const say = require("say");

const outDir = "src/assets/voices";

function exportVoice(speak, filename) {
  const fileExt = "wav";
  say.export(speak, "", 1, `${outDir}/${filename}.${fileExt}`, err =>
    err
      ? console.error(err)
      : console.log(`Text has been saved to ${filename}${fileExt}`)
  );
}

const voiceToSpeak = [
  {
    words:
      "60 Seconds Left for Short Break. Please prepare yourself to get back to work. Do your task and focus again.",
    filename: "60-seconds-left-for-shortbreak"
  },
  {
    words:
      "60 Seconds Left for Long Break. Please prepare yourself to get back to work. Relax, focus and continue doing your task.",
    filename: "60-seconds-left-for-longbreak"
  },
  {
    words:
      "30 Seconds Left to Work. Please finalize your task. Paused all media playing if there's one.",
    filename: "30-seconds-left-to-work"
  },
  {
    words: "Work Time Finished. It is time to take a short break.",
    filename: "work-time-finished"
  },
  {
    words: "Session Rounds Completed. It is time to take long break now.",
    filename: "session-rounds-completed"
  },
  {
    words: "Short Break Finished. It is time to focus and work again.",
    filename: "short-break-finished"
  },
  {
    words: "Long Break Finished. It is time to go back in work.",
    filename: "long-break-finished"
  }
];

voiceToSpeak.map(v => exportVoice(v.words, v.filename));
