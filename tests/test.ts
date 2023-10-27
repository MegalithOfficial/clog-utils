import { ProgressBar, clogUtils } from "../src/main";

const bar = new ProgressBar({
  maxValue: 100,
  minValue: 0,
  barDesign: { 
      progressBarChar: "█",
      emptyProgressBarChar: " ",
      progressBarCharSuffix: ">"
  }
})

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
(async() => {
  bar.start()
  bar.update(20, `Hi!`);
  await delay(2000)
  bar.update(20, `Today its ${new Date().getFullYear()}`)
  await delay(2000)
  bar.update(20, `Always be happy!`)
  await delay(2000)
  bar.update(40, `Happy codings!`)
})();

const logger = new clogUtils({
  consoleSave: { enabled: true, fileName: `consolesave_${Date.now()}`, path: "./saves" },
  disableModification: false,
  presets: {
    test: { prefix: "TEST", disableAntiSpam: false }
  }
});

setInterval(() => { console.log("this is a Test message!", { preset: { prefix: "TEST", disableAntiSpam: false } }) }, 1000)