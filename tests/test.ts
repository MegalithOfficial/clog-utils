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

setInterval(() => console.log("test", "error"), 1000)

