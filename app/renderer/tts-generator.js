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

// TODO: Make it simple

const textToGenerateList = [
	{
		text: "Focus time finished.",
		filename: "focus-finished",
	},
	{
		text: "Break time finished.",
		filename: "break-finished",
	},
	{
		text: "Session rounds completed.",
		filename: "session-completed",
	},
	{
		text: "Sixty seconds left.",
		filename: "sixty-seconds-left",
	},
	{
		text: "Special break started.",
		filename: "special-break-started",
	},
	{
		text: "Thirty seconds left.",
		filename: "thirty-seconds-left",
	},
];

textToGenerateList.map((v) => ttsGenerator(v.text, v.filename));
