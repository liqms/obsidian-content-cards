import { App, MarkdownPostProcessorContext } from "obsidian";
import { TimeLineParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";

export class TimelineVElement {
	app: App;
	context: MarkdownPostProcessorContext;
	source: string;
	element: HTMLElement;
	cardsEl: HTMLElement;
	constructor(
		source: string,
		element: HTMLElement,
		context: MarkdownPostProcessorContext,
		app: App
	) {
		element.className = "cards-container";
		this.app = app;
		this.context = context;
		this.source = source;
		this.element = element;
		this.cardsEl = this.createCardsEl();
	}

	createCardsEl(): HTMLElement {
		const TimelineItemInfo = TimeLineParser(this.source);
		const cardsEl = this.element;
		cardsEl.classList.add("timeline-v");
		TimelineItemInfo.forEach((item) => {
			const cardEl = cardsEl.createDiv({
				cls: "timeline-v-item",
			});
			const vlineEl = cardEl.createDiv({
				cls: "vertical-line",
			});
			const timeEl = cardEl.createDiv({
				cls: "timeline-v-time",
				text: item.time,
			});
			const contentEl = cardEl.createDiv({
				cls: "timeline-v-content",

			});
//			const titleEl = contentEl.createDiv({
//				cls: "timeline-v-title",
//				text: item.title,
//			});
			const titleEl = new ItemContent(
				item.title,
				contentEl,
				this.context,
				this.app
			);
			titleEl.itemEl.classList.add("timeline-v-title","description");

			const descriptionEl = new ItemContent(
				item.content,
				contentEl,
				this.context,
				this.app
			);
			descriptionEl.itemEl.classList.add("timeline-v-description","description");

			if (item.color !== null && item.color!== undefined) {
				vlineEl.classList.add("line-v-" + item.color);
				contentEl.classList.add("line-v-body-" + item.color);
			} else {
				vlineEl.classList.add("line-v-color-active");
				contentEl.classList.add("line-v-body-color-active");
			}
			
		});
		
		return cardsEl;
	}
}
