import { clogUtils } from "../src/main";

const logger = new clogUtils({
  disableModification: false,
  presets: {
    error: {
      prefix: '[error]',
      prefixcolor: 'red',
      messageStructure: "%%counter%% %%message%% %%prefix%%"
    },
    info: {
      prefix: '[info]',
      prefixcolor: '#a8c9e3',
    }
  }
});

console.log("hello!")
logger.warn("This is a warning");
logger.error("This is an error");
logger.error(new Error("This is an error"));