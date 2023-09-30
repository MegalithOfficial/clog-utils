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
      messageStructure: "%%message%% %%prefix%%"
    }
  }
});
setInterval(() => logger.warn("test"), 1000)

