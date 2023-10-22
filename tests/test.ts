import { clogUtils } from "../src/main";

const logger = new clogUtils({
  disableModification: false,
  presets: {
    error: {
      prefix: '[error]',
      prefixcolor: 'red',
      messageStructure: "%%counter%% %%message%% %%prefix%%"
    }
  }
});
setInterval(() => {
  console.log("hello!", {
    preset: {
      prefix: '[info]',
      prefixcolor: '#a8c9e3',
    }
  })
}, 500)