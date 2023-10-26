import { clogUtils } from "../src/main";

const logger = new clogUtils({
  consoleSave: { enabled: true, fileName: `consolesave_${Date.now()}`, path: "./saves" },
  disableModification: false,
  presets: {
    test: { prefix: "TEST", disableAntiSpam: false }
  }
});

setInterval(() => { console.log("this is a Test message!", { preset: { prefix: "TEST", disableAntiSpam: false } }) }, 100)
