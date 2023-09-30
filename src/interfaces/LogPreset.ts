export interface LogPreset {
  prefix: string;
  messageStructure?: string;
  disableAntiSpam?: boolean;
  prefixcolor?:
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "brightblack"
  | "brightred"
  | "brightgreen"
  | "brightyellow"
  | "brightblue"
  | "brightmagenta"
  | "brightcyan"
  | "brightwhite"
  | "bgblack"
  | "bgred"
  | "bggreen"
  | "bgyellow"
  | "bgblue"
  | "bgmagenta"
  | "bgcyan"
  | "bgwhite"
  | string;
};