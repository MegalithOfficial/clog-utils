import { defaultOptions, progressBarOptions, progressbarPresets } from "./interfaces/progressbarOptions";

class ProgressBar {
    private progressBarChar: string;
    private emptyProgressBarChar: string;
    private completed: number;
    private length: number;
    private maxValue: number;
    private minValue: number;
    private progressBarCharSuffix: string;
    private isCompleted: boolean = false;
    private defaultSettings: progressBarOptions = {
        maxValue: 100,
        minValue: 0,
        barDesign: progressbarPresets.modern
    }

    constructor(opt: progressBarOptions = defaultOptions) {
        this.maxValue = opt.maxValue ?? this.defaultSettings.maxValue;
        this.minValue = opt.minValue ?? this.defaultSettings.minValue;
        this.completed = opt.minValue;

        this.progressBarChar = opt.barDesign?.progressBarChar ?? this.defaultSettings.barDesign!.progressBarChar;
        this.emptyProgressBarChar = opt.barDesign?.emptyProgressBarChar ?? this.defaultSettings.barDesign!.emptyProgressBarChar;
        this.progressBarCharSuffix = opt.barDesign?.progressBarCharSuffix ?? this.defaultSettings.barDesign!.progressBarCharSuffix;

        this.length = this.calculateLength();
        this.validateMinMaxValues();
    };

    private validateMinMaxValues(): void {
        if (this.minValue < 0) this.minValue = 0;
        if (this.minValue > this.maxValue) this.maxValue = this.minValue;
    };

    private calculateLength(): number {
        return (this.maxValue - this.minValue) / 2;
    };

    private render(...messages: any[]): void {
        if (this.isCompleted) return;
        if (this.maxValue < this.completed) return;

        const progress = (this.completed - this.minValue) / (this.maxValue - this.minValue);
        const progressBarLength = Math.floor(this.length * progress);
        const progressBar = this.progressBarChar.repeat(progressBarLength);
        const emptyProgressBar = this.emptyProgressBarChar.repeat(this.length - progressBarLength);
        const percentage = (progress * 100).toFixed(2);

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        if (progress === 1) process.stdout.write(`[${this.progressBarChar.repeat(this.length)}${this.progressBarCharSuffix}] ${percentage}% | ${messages}`);
        else process.stdout.write(`[${progressBar}${this.progressBarCharSuffix}${emptyProgressBar}] ${percentage}% |  ${messages}`);
    };

    update(amount: number = 1, ...messages: any): void {
        if (this.isCompleted) return;

        this.completed += amount;
        if (this.completed < this.minValue) this.completed = this.minValue;
        if (this.completed > this.maxValue) this.isCompleted = true, this.completed = this.maxValue;
        if(!messages) messages = "";


        return this.render(messages);
    };

    end(): void {
        this.isCompleted = true;
        this.render();
    };

    start(): void {
        this.completed = this.minValue;
        this.render();
    };
};

export { ProgressBar, progressbarPresets };