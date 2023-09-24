import { clogUtils } from "../src/main";
import utils from "node:util"

const logger = new clogUtils({
  disableModification: false,
  presets: {
    error: {
      prefix: '[error]',
      prefixcolor: 'red',
    },
    info: {
      prefix: '[info]',
      prefixcolor: '#a8c9e3',
    }
  }
});

logger.addPreset({ 1: { prefix: "hi" } })

console.log("hello", "this is broken", ["hello", { "hi": "hello"} ], null, undefined, "error")

