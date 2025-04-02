import { App, MarkdownPostProcessorContext } from "obsidian";
import { subfieldParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";
export class SubfieldElement {
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
		element.className = "cards-container";
		this.app = app;
		this.context = context;
		this.source = source;
		this.element = element;
		this.cardNum = source.match(/@card/gi)?.length ?? 1;
		this.cardsEl = this.createCardsEl();
	}

	createCardsEl(): HTMLElement {
		const SubfieldItemInfo = subfieldParser(this.source);
		const cardsEl = this.element;
		cardsEl.classList.add("subfield");
		if (this.cardNum > 0) {
			cardsEl.classList.add("column-" + this.cardNum);
		}		
		SubfieldItemInfo.forEach((item) => {
			const cardEl = new ItemContent(
				item.content,
				cardsEl,
				this.context,
				this.app
			);
			cardEl.itemEl.classList.add("subfield-item");
		});
		
		return cardsEl;
	}
}