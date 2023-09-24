export interface LogPreset {
  prefix: string;
  messageStructure?: string;
  prefixcolor?:
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
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
  | string;
};