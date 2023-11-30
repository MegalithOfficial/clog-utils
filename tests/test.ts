import { ProgressBar, clogUtils } from "../src/main";

const logger = new clogUtils({ disableModification: true });

setInterval(() => {
  logger.log(`hello`)
}, 1000)
