export interface progressBarOptions {
    maxValue: number;
    minValue: number;
    barDesign?: progressBarDesign;
};

export interface progressBarDesign {
    progressBarChar: string;
    emptyProgressBarChar: string;
    progressBarCharSuffix: string;
};

export const defaultOptions: progressBarOptions = {
    maxValue: 100,
    minValue: 0,
    barDesign: {
        progressBarChar: "█",
        emptyProgressBarChar: " ",
        progressBarCharSuffix: ">"
    },
};

export const progressbarPresets: { [key: string]: progressBarDesign } = {
    modern: {
        progressBarChar: "█",
        emptyProgressBarChar: " ",
        progressBarCharSuffix: ">",
    },
    modern2: {
        progressBarChar: "■",
        emptyProgressBarChar: "□",
        progressBarCharSuffix: ">>",
    },
    legacy: {
        progressBarChar: "=",
        emptyProgressBarChar: " ",
        progressBarCharSuffix: ">"
    },
    legacy2: {
        progressBarChar: "-",
        emptyProgressBarChar: " ",
        progressBarCharSuffix: ">"
    },
    shades: {
        progressBarChar: "▓",
        emptyProgressBarChar: "░",
        progressBarCharSuffix: ">>",
    },
    emoji: {
        progressBarChar: "⬛",
        emptyProgressBarChar: "⬜",
        progressBarCharSuffix: "=>",
    }
};