import { progressBarOptions, progressBarDesign } from './interfaces/progressbarOptions';
import { Options, defaultOptions } from './interfaces/clogUtilsOptions';
import { ProgressBar, progressbarPresets } from './progressbar';
import { LogPreset } from './interfaces/LogPreset';
import { format } from "node:util";

import * as fs from 'fs';

class clogUtils {
  private originalConsoleLog: (...args: any[]) => void;
  private lastMessage: string | null = null;
  private messageStructure: string = '';
  private messageCount: number = 0;
  private prefix: string = '';
  private disableAntiSpam = false;
  private presets: Record<string, LogPreset | Function> = {};
  private prefixColor: string = '\x1b[0m';
  private logFilePath: string | undefined;
  private defaultPreset: LogPreset = {
    prefix: '',
    messageStructure: "%%prefix%%\x1b[0m%%message%% %%counter%%",
    disableAntiSpam: false,
    prefixcolor: 'white',
  };
  private logFileStream: any;
  private consoleSave: any;

  constructor(opt: Options = defaultOptions) {
    opt.disableModification = opt.disableModification ?? false;
    this.originalConsoleLog = console.log;

    if (!opt.disableModification) console.log = (...args: any[]) => this.log(...args);
    if (opt.presets) this.presets = opt.presets;

    this.consoleSave = opt.consoleSave ?? false;
    if (opt.consoleSave && opt.consoleSave.enabled) {

      if (!this.consoleSave.fileName.endsWith('.txt')) {
        this.consoleSave.fileName += '.txt';
      };

      this.logFilePath = this.consoleSave.path
      ? `${this.consoleSave.path}/${this.consoleSave.fileName}`
      : `${this.consoleSave.fileName}`;

      this.logFileStream = fs.createWriteStream(this.logFilePath, { flags: 'a', encoding: 'utf8' });
    } else this.logFileStream = null; 
    
  }


  public log(...args: any[]): void {
    let preset = args[args.length - 1];
    preset = this.parsePreset(args)

    let currentMessage: string = format.apply(this, args);
    if (!preset || preset === undefined) preset = this.defaultPreset;
    
    this.prefix = `${preset.prefix || this.defaultPreset.prefix} `;
    this.disableAntiSpam = preset.disableAntiSpam || false;
    this.messageStructure = preset.messageStructure || "%%prefix%%\x1b[0m%%message%% %%counter%%";
    this.prefixColor = clogUtils.resolveColor(preset.prefixcolor || 'white');
    
    let replacements: Record<string, string> = {
      'prefix': `${this.prefixColor}${this.prefix}\x1b[0m`,
      'prefixWithoutColor': `${this.prefix}\x1b[0m`,
      'message': currentMessage,
      'counter':  !this.disableAntiSpam ? `(${this.messageCount})` : "",
    };

    let finalMessage = "";

    if(currentMessage === this.lastMessage) {
      if (!this.disableAntiSpam) {
        this.messageCount++
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine(0);
      };

      finalMessage = this.replacePlaceholders(this.messageStructure, replacements) 
    } else {
      finalMessage = this.replacePlaceholders(this.messageStructure, replacements)
      this.lastMessage = currentMessage;
      this.messageCount = 1;
    }

    this.originalConsoleLog(finalMessage)

    if (this.consoleSave && this.consoleSave.enabled) {
      this.saveToLog(finalMessage);
    };
  };

  private saveToLog(message: string): void {
    if (this.logFileStream) {
      const cleanMessage = message.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');
      const logMessage = `[LOG - ${Date.now()}] - ${cleanMessage}\n`;
      this.logFileStream.write(logMessage);
    }
  };
  
  private replacePlaceholders(messageStructure: string, replacements: Record<string, string>): string {
    return messageStructure.replace(/%%([^%]+)%%/gi, (match, placeholder) => {
      return replacements[placeholder];
    });
  };

  private parsePreset(args: string[]): any {
    let preset = args[args.length - 1] as any;

    switch (typeof preset) {
      case "string":
        if (this.presets[preset]) {
          args.splice(-1);
          if (typeof this.presets[preset] === "function") return this.parseFunction(this.presets[preset]);
          return this.presets[preset];
        }
        break;

      case "object":
        args.splice(-1)
        if (typeof preset.preset === "function") {
          return this.parseFunction(preset.preset)
        } else if (typeof preset.preset === "string" && this.presets[preset.preset]) {
          return this.presets[preset.preset];
        } else if (typeof preset.preset === "object") {
          return preset.preset;
        }
        break;

      default:
        throw new Error(`Error Parsing Preset: Invalid preset type - ${typeof preset}. Expected a String, Function, or Object.`);
    }
  };

  private parseFunction(fn: any): any {
    const result = fn();

    if (result === undefined) {
      throw new Error("Error Parsing Preset: The function did not return a value.");
    } else if (!result?.prefix) {
      throw new Error("Error Parsing Preset: The 'prefix' property is missing in the returned parameters.");
    } else if (!result?.prefixColor) {
      throw new Error("Error Parsing Preset: The 'prefixColor' property is missing in the returned parameters.");
    }

    return {
      prefix: result.prefix,
      prefixcolor: result.prefixColor,
      messageStructure: result.messageStructure ?? "%%prefix%%\x1b[0m%%message%% %%counter%%",
      disableAntiSpam: result.disableAntiSpam ?? false,
    };
  }

  public warn(message: string): void {
    this.log(message, { preset: { prefix: ` \x1b[1;30mWARNING \x1b[0m`, prefixcolor: "bgyellow", messageStructure: "%%prefix%%\x1b[0m%%message%% %%counter%%", disableAntiSpam: false } });
  };

  public error(data: string | Error) {
    if (typeof data === "string") {
      this.log(data, { preset: { prefix: ` \x1b[1;30mError \x1b[0m`, prefixcolor: "bgred", messageStructure: "%%prefix%%\x1b[0m %%message%%", disableAntiSpam: true } })
    } else if (data instanceof Error) {
      let formatteddata = data.stack?.split("\n") || [];
      formatteddata.shift();
      this.log(formatteddata.join("\n"), { preset: { prefix: ` \x1b[1;30m${data.name} \x1b[0m ${data.message}`, prefixcolor: "bgred", messageStructure: ` \n%%prefix%%\x1b[0m  \n\n${clogUtils.resolveColor("#595959")}%%message%%\n\nNode.js v${process.versions.node}\x1b[0m`, disableAntiSpam: true } })
    }
  }

  public static resolveColor(colorName: string): string {
    if (!colorName || typeof colorName !== "string") throw Error("Color name must be a string!");

    if (colorName.startsWith('#')) {
      return this.hexToAnsi(colorName);
    } else colorName = colorName.toLowerCase();

    const colorCodes = {
      black: 30,
      red: 31,
      green: 32,
      yellow: 33,
      blue: 34,
      magenta: 35,
      cyan: 36,
      white: 37,
      brightblack: 90,
      brightred: 91,
      brightgreen: 92,
      brightyellow: 93,
      brightblue: 94,
      brightmagenta: 95,
      brightcyan: 96,
      brightwhite: 97,
      bgblack: 40,
      bgred: 41,
      bggreen: 42,
      bgyellow: 43,
      bgblue: 44,
      bgmagenta: 45,
      bgcyan: 46,
      bgwhite: 47
    };

    if (colorName in colorCodes) {
      return `\x1b[${colorCodes[colorName]}m`;
    } else {
      return '\x1b[0m';
    }
  }

  public static hexToAnsi(hexCode: string): string {
    if (!hexCode || typeof hexCode !== "string") throw Error("Invalid argument: 'hexCode' cannot be null or undefined.");

    hexCode = hexCode.replaceAll('#', '');
    const r = parseInt(hexCode.substring(0, 2), 16);
    const g = parseInt(hexCode.substring(2, 4), 16);
    const b = parseInt(hexCode.substring(4, 6), 16);

    return `\x1b[38;2;${r};${g};${b}m`;
  }

  public restore(): void {
    console.log = this.originalConsoleLog;
  }

  public setup(): void {
    console.log = (...args: any[]) => this.log(...args);
  };

  public setPresets(presets: Record<string, LogPreset>): void {
    if (!presets) {
      this.presets = { default: this.defaultPreset };
    } else if (typeof presets === "object") {
      this.presets = presets
    } else throw new Error("Invalid argument: 'presets' must be an object.");
  };

  public addPreset(preset: Record<string, LogPreset>): LogPreset {
    if (!preset) throw new Error("Invalid argument: 'preset' cannot be null or undefined.");
    if (Object.keys(preset).length > 1) throw Error("Invalid argument: 'preset' cannot have more than 1 object.")
    return this.presets[Object.keys(preset)[0]] = preset[Object.keys(preset)[0]];
  };

  public removePreset(presetName: string): boolean {
    if (!presetName) throw new Error("Invalid argument: 'presetName' cannot be null or undefined.");
    return delete this.presets[presetName];
  };

  public getPreset(presetName: string): LogPreset | Function {
    if (!presetName) throw new Error("Invalid argument: 'presetName' cannot be null or undefined.");
    return this.presets[presetName];
  };

  public getAllPresets(): Record<string, LogPreset | Function>[] {
    const presetsArray: Record<string, LogPreset | Function>[] = [];

    for (const key in this.presets) {
      if (this.presets.hasOwnProperty(key)) {
        const presetObj: Record<string, LogPreset | Function> = {};
        presetObj[key] = this.presets[key];
        presetsArray.push(presetObj);
      }
    }

    return presetsArray;
  };
};

export { LogPreset, clogUtils, ProgressBar, progressBarDesign, progressBarOptions, progressbarPresets };