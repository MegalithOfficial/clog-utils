import { LogPreset } from "./LogPreset";

export interface Options {
  disableModification?: boolean;
  presets?: Record<string, LogPreset | Function>;
  consoleSave?: consoleSaveOptions;
};

export interface consoleSaveOptions {
  enabled: boolean, 
  fileName: string,
  path?: string,
}

export const defaultOptions: Options = {
  disableModification: false,
  presets: {},
  consoleSave: {
    enabled: false,
    fileName: `ConsoleSave_${Date.now()}`
  }
};
