import { App, MarkdownPostProcessorContext } from "obsidian";
import { TimeLineParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";

export class TimelineHElement {
	app: App;
	context: MarkdownPostProcessorContext;
	source: string;
	element: HTMLElement;
	cardsEl: HTMLElement;
	cardNum: number;
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
		this.cardNum = source.match(/@card/gi)?.length ?? 1;
		this.cardsEl = this.createCardsEl();
	}

	createCardsEl(): HTMLElement {
		const TimelineItemInfo = TimeLineParser(this.source);
		const cardsEl = this.element;
		cardsEl.classList.add("timeline-h");
		if (this.cardNum > 0) {
			this.element.classList.add("column-" + this.cardNum);
		}
		TimelineItemInfo.forEach((item) => {
			const cardEl = cardsEl.createDiv({
				cls: "timeline-h-item",
			});
			const timeEl = cardEl.createDiv({
				cls: "timeline-h-time",
				text: item.time,
			});
			const hlineEl = cardEl.createDiv({
				cls: "timeline-h-hr",
			});

			const contentEl = cardEl.createDiv({
				cls: "timeline-h-content",
			});
//			const titleEl = contentEl.createDiv({
//				cls: "timeline-h-title",
//				text: item.title,
//			});
			const titleEl = new ItemContent(
				item.title,
				contentEl,
				this.context,
				this.app
			);
			titleEl.itemEl.classList.add("timeline-h-title", "description");

			const descriptionEl = new ItemContent(
				item.content,
				contentEl,
				this.context,
				this.app
			);
			descriptionEl.itemEl.classList.add(
				"timeline-h-description",
				"description"
			);

			if (item.color !== null && item.color !== undefined) {
				hlineEl.classList.add("line-h-" + item.color);
				contentEl.classList.add("body-" + item.color);
			} else {
				hlineEl.classList.add("line-h-color-active");
				contentEl.classList.add("body-color-active");
			}
		});

		return cardsEl;
	}
}
