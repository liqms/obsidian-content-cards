import { App, MarkdownPostProcessorContext } from "obsidian";
import { CountdownCardParser } from "../TagParsers";

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
				text: "距离 ",
			});
			titleEl.createSpan({
				cls: "countdown-item-count-title",
				text: item.title,
			});
			titleEl.createSpan({
				text: " 还有",
			});
			const countEl = cardEl.createDiv({
				cls: "countdown-item-count",
			});
            // 获取距离目标时间还剩，type = day，返回年月日，type = sec，返回时分秒		
			
			this.timeCountStr = this.getTimeCountStr(item.type, item.time);	
			if (item.type === "day") {
				const numAEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[0] as unknown as string,
				});
				const unitAEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: "年",
				});
				const numBEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[1] as unknown as string,
				});
				const unitBEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: "月",
				});
				const numCEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[2] as unknown as string,
				});
				const unitCEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: "日",
				});
				if (item.color!== null && item.color!== undefined) {
					numAEl.classList.add("accent-"+item.color);
					numBEl.classList.add("accent-"+item.color);
					numCEl.classList.add("accent-"+item.color);
					unitAEl.classList.add("text-"+item.color);
					unitBEl.classList.add("text-"+item.color);
					unitCEl.classList.add("text-"+item.color);
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
					text: this.timeCountStr[0] as unknown as string,
				});
				const unitAEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: "时",
				});
				const numBEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[1] as unknown as string,
				});
				const unitBEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: "分",
				});
				const numCEl = countEl.createDiv({
					cls: "countdown-item-count-num",
					text: this.timeCountStr[2] as unknown as string,
				});
				const unitCEl = countEl.createDiv({
					cls: "countdown-item-count-unit",
					text: "秒",
				});
				if (item.color!== null && item.color!== undefined) {
					numAEl.classList.add("accent-"+item.color);
					numBEl.classList.add("accent-"+item.color);
					numCEl.classList.add("accent-"+item.color);
					unitAEl.classList.add("text-"+item.color);
					unitBEl.classList.add("text-"+item.color);
					unitCEl.classList.add("text-"+item.color);
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
					text: "请输入正确的时间类型: day 或 sec",
				});
				
			}
			if (item.color !== null && item.color!== undefined) {
				cardEl.classList.add("body-"+item.color);
			} else {
				cardEl.classList.add("body-color-active");
			}

		});
		
		return cardsEl;
	}
	getTimeCountStr(type: string, time: string) {
		if (type == "day") {					
			this.targetTime = time.match(/(\d{4})-(\d{2})-(\d{2})/) as unknown as number[];
			const targetTime = [this.targetTime[1], this.targetTime[2], this.targetTime[3]];
			const currentTime = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
			const timeDiff = (targetTime[0] - currentTime[0]) * 365 + (targetTime[1] - currentTime[1]) * 30 + (targetTime[2] - currentTime[2]);
			if (timeDiff > 0) {			
				this.timeCount[0] = Math.floor(timeDiff / 365);
				this.timeCount[1] = Math.floor((timeDiff % 365 / 30));
				this.timeCount[2] = Math.floor(timeDiff % 30) ;						
			} else {
				this.timeCount = [0, 0, 0];			
			} 			
		} else if (type == "sec") {
			this.targetTime = time.match(/(\d{2}):(\d{2}):(\d{2})/) as unknown as number[];
			const targetTime = [this.targetTime[1], this.targetTime[2], this.targetTime[3]]
			const currentTime = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()];
			const timeDiff = (targetTime[0] - currentTime[0]) * 60 * 60 + (targetTime[1] - currentTime[1]) * 60 + (targetTime[2] - currentTime[2]);
			
			if (timeDiff > 0) {
				
				this.timeCount[0] = Math.floor(timeDiff / 60 / 60);
				this.timeCount[1] = Math.floor((timeDiff % 60 / 60));
				this.timeCount[2] = Math.floor(timeDiff % 60) ;
			} else {
				
				this.timeCount = [0, 0, 0];
			}						
		} else {
			this.timeCount = [0, 0, 0];
		}
		this.timeCount.forEach(e => {
			this.timeCountStr = this.timeCount.map(e => {
				return this.toString(e);
			});
		});
		return this.timeCountStr;
	}
	toString(num: number) {
		let numStr = num.toString();
		return numStr;
	}
	

}