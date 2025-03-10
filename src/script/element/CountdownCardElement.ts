import { App, MarkdownPostProcessorContext } from "obsidian";
import { CountdownCardParser } from "../TagParsers";
import { getTextInLanguage } from "../lang/helpers";

// 处理空字符串的情况
const trim = (s: string): string => {
	const trimmed = s.trim();
	return trimmed.length === 0 ? "\u200B" : trimmed;
};

export class CountdownCardElement {
	app: App;
	context: MarkdownPostProcessorContext;
	source: string;
	element: HTMLElement;
	cardsEl: HTMLElement;
	timeCount: number[];
	targetTime: number[];
	currentTime: number[];
	timeCountStr: string[];

	constructor(
		source: string,
		element: HTMLElement,
		context: MarkdownPostProcessorContext,
		app: App
	) {
		element.className = "container";
		this.app = app;
		this.context = context;
		this.source = source;
		this.element = element;
		this.timeCount = [0, 0, 0];
		this.currentTime = [0, 0, 0];
		this.targetTime = [0, 0, 0];
		this.timeCountStr = ["0", "0", "0"];
		this.cardsEl = this.createCardsEl();
	}

	createCardsEl(): HTMLElement {
		const CountdownCardItemInfo = CountdownCardParser(this.source);
		const cardsEl = this.element;
		cardsEl.classList.add("countdown");
		CountdownCardItemInfo.forEach((item) => {
			const cardEl = cardsEl.createDiv({
				cls: "countdown-item",
			});

			const titleEl = cardEl.createDiv({
				cls: "countdown-item-title",
			});
			titleEl.createSpan({
				text: getTextInLanguage("until"),
			});
			titleEl.createSpan({
				cls: "countdown-item-count-title",
				text: item.title,
			});
			titleEl.createSpan({
				text: getTextInLanguage("remain"),
			});
			const countEl = cardEl.createDiv({
				cls: "countdown-item-count",
			});
			// 获取距离目标时间还剩，type = day，返回年月日，type = sec，返回时分秒

			this.timeCountStr = this.getTimeCountStr(item.type, item.time);
			if (item.type === "day") {
				const numAEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[0],
				});
				const unitAEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: getTextInLanguage("years"),
				});
				const numBEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[1],
				});
				const unitBEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: getTextInLanguage("months"),
				});
				const numCEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[2],
				});
				const unitCEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: getTextInLanguage("days"),
				});
				if (item.color !== null && item.color !== undefined) {
					numAEl.classList.add("accent-" + item.color);
					numBEl.classList.add("accent-" + item.color);
					numCEl.classList.add("accent-" + item.color);
					unitAEl.classList.add("text-" + item.color);
					unitBEl.classList.add("text-" + item.color);
					unitCEl.classList.add("text-" + item.color);
				} else {
					numAEl.classList.add("accent-color-active");
					numBEl.classList.add("accent-color-active");
					numCEl.classList.add("accent-color-active");
					unitAEl.classList.add("text-color-active");
					unitBEl.classList.add("text-color-active");
					unitCEl.classList.add("text-color-active");
				}
			} else if (item.type === "sec") {
				const numAEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[0],
				});
				const unitAEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: getTextInLanguage("hours"),
				});
				const numBEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[1],
				});
				const unitBEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: getTextInLanguage("minutes"),
				});
				const numCEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[2],
				});
				const unitCEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: getTextInLanguage("seconds"),
				});
				if (item.color !== null && item.color !== undefined) {
					numAEl.classList.add("accent-" + item.color);
					numBEl.classList.add("accent-" + item.color);
					numCEl.classList.add("accent-" + item.color);
					unitAEl.classList.add("text-" + item.color);
					unitBEl.classList.add("text-" + item.color);
					unitCEl.classList.add("text-" + item.color);
				} else {
					numAEl.classList.add("accent-color-active");
					numBEl.classList.add("accent-color-active");
					numCEl.classList.add("accent-color-active");
					unitAEl.classList.add("text-color-active");
					unitBEl.classList.add("text-color-active");
					unitCEl.classList.add("text-color-active");
				}
			} else {
				countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: getTextInLanguage("countdown type error"),
				});
			}
			if (item.color !== null && item.color !== undefined) {
				cardEl.classList.add("body-" + item.color);
			} else {
				cardEl.classList.add("body-color-active");
			}
		});

		return cardsEl;
	}
	getTimeCountStr(type: string, time: string) {
		if (type == "day") {
			this.targetTime = time.match(
				/(\d{4})-(\d{2})-(\d{2})/
			) as unknown as number[];
			const targetTime = [
				this.targetTime[1],
				this.targetTime[2],
				this.targetTime[3],
			];
			const currentTime = [
				new Date().getFullYear(),
				new Date().getMonth() + 1,
				new Date().getDate(),
			];
			const timeDiff =
				targetTime[0] * 365 +
				targetTime[1] * 30 +
				targetTime[2] * 1 -
				currentTime[0] * 365 -
				currentTime[1] * 30 -
				currentTime[2] * 1;
			if (timeDiff > 0) {
				this.timeCount[0] = Math.floor(timeDiff / 365);
				this.timeCount[1] = Math.floor((timeDiff % 365) / 30);
				this.timeCount[2] = Math.floor(timeDiff % 30);
			} else {
				this.timeCount = [0, 0, 0];
			}
			
		} else if (type == "sec") {
			this.targetTime = time.match(
				/(\d{2}):(\d{2}):(\d{2})/
			) as unknown as number[];
			const targetTime = [
				this.targetTime[1],
				this.targetTime[2],
				this.targetTime[3],
			];
			const currentTime = [
				new Date().getHours(),
				new Date().getMinutes(),
				new Date().getSeconds(),
			];
			const timeDiff =
				targetTime[0] * 3600 +
				targetTime[1] * 60 +
				targetTime[2] * 1 -
				currentTime[0] * 3600 -
				currentTime[1] * 60 -
				currentTime[2] * 1;

			if (timeDiff > 0) {
				this.timeCount[0] = Math.floor(timeDiff / 3600);
				this.timeCount[1] = Math.floor((timeDiff % 3600) / 60);
				this.timeCount[2] = Math.floor(timeDiff % 60);
			} else {
				this.timeCount = [0, 0, 0];
			}
			alert(timeDiff + " " + targetTime + " " + currentTime);
			alert(this.timeCount);
		} else {
			this.timeCount = [0, 0, 0];
		}
		this.timeCount.forEach((e) => {
			this.timeCountStr = this.timeCount.map((e) => {
				return this.toString(e);
			});
		});

		return this.timeCountStr;
	}
	toString(num: number) {
		let numStr = num.toString().padStart(2, "0");
		return numStr;
	}
}
