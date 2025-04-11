import { App, MarkdownPostProcessorContext } from "obsidian";
import { SWOTCardParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";
import { getTextInLanguage } from "../lang/helpers";

export class SWOTCardElement {
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
		const SWOTCardItemInfo = SWOTCardParser(this.source);
		const cardsEl = this.element;
		SWOTCardItemInfo.forEach((item) => {
			const swotItemEl = cardsEl.createDiv({
				cls: "swot-item",
			});
			const swotItemSEl = swotItemEl.createDiv({
				cls: "swot-item-s",
			});
			const swotItemSContentEl = new ItemContent(
				item.s_content,
				swotItemSEl,
				this.context,
				this.app
			);
			swotItemSContentEl.itemEl.classList.add(
				"swot-item-s-content",
				"description"
			);
			swotItemSEl.createDiv({
				cls: "swot-item-s-icon",
				text: "S",
			});
			const swotItemWEl = swotItemEl.createDiv({
				cls: "swot-item-w",
			});
			const swotItemWContentEl = new ItemContent(
				item.w_content,
				swotItemWEl,
				this.context,
				this.app
			);
			swotItemWContentEl.itemEl.classList.add(
				"swot-item-w-content",
				"description"
			);
			swotItemWEl.createDiv({
				cls: "swot-item-w-icon",
				text: "W",
			});
			const swotItemOEl = swotItemEl.createDiv({
				cls: "swot-item-o",
			});
			swotItemOEl.createDiv({
				cls: "swot-item-o-icon",
				text: "O",
			});
			const swotItemOContentEl = new ItemContent(
				item.o_content,
				swotItemOEl,
				this.context,
				this.app
			);
			swotItemOContentEl.itemEl.classList.add(
				"swot-item-o-content",
				"description"
			);
			const swotItemTEl = swotItemEl.createDiv({
				cls: "swot-item-t",
			});
			swotItemTEl.createDiv({
				cls: "swot-item-t-icon",
				text: "T",
			});
			const swotItemTContentEl = new ItemContent(
				item.t_content,
				swotItemTEl,
				this.context,
				this.app
			);
			swotItemTContentEl.itemEl.classList.add(
				"swot-item-t-content",
				"description"
			);
		});
		
		return cardsEl;
	}
}
