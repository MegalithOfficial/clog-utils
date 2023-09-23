import { clogUtils } from "../src/main";

const logger = new clogUtils();
logger.setPresets({
  error: {
    prefix: '[error]',
    prefixcolor: 'red',
  },
  info: {
    prefix: '[info]',
    prefixcolor: '#a8c9e3',
  }
})

logger.addPreset({ 1: { prefix: "hi" } })

console.log("hello","this is broken", "error")

