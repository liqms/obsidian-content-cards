import { App, MarkdownPostProcessorContext } from "obsidian";
import { HighlightblockParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";

export class HighlightBlockElement {
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
		element.className = "container";
		this.app = app;
		this.context = context;
		this.source = source;
		this.element = element;
		this.cardsEl = this.createCardsEl();
	}
	createCardsEl(): HTMLElement {
		const HighlightBlockItemInfo = HighlightblockParser(this.source);
		const cardsEl = this.element;
		cardsEl.classList.add("highlightblock");
		HighlightBlockItemInfo.forEach((item) => {
			const cardEl = new ItemContent(
				item.content,
				cardsEl,
				this.context,
				this.app
			);
			cardEl.itemEl.classList.add("highlightblock-item");
			if (item.color !== null && item.color !== undefined) {
				cardEl.itemEl.classList.add("body-" + item.color);
			} else {
				cardEl.itemEl.classList.add("body-color-active");
			}
		});
		
		return cardsEl;
	}
}
