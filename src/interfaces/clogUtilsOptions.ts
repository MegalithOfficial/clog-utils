import { LogPreset } from "./LogPreset";

export interface Options {
  disableModification?: boolean
  presets?: Record<string, LogPreset> 
};

export const defaultOptions: Options = {
  disableModification: false,
  presets: {}
};