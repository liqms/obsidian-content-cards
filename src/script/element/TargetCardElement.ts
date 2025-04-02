import { App, MarkdownPostProcessorContext } from "obsidian";
import { TargetCardParser } from "../TagParsers";
export class TargetCardElement {
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
        const TargetCardItemInfo = TargetCardParser(this.source);
		const cardsEl = this.element;
		cardsEl.classList.add("target-card");
		TargetCardItemInfo.forEach((item) => {
			const cardEl = cardsEl.createDiv({
				cls: "target-card-item",
			});			
			const titleEl = cardEl.createDiv({
				cls: "target-card-item-title",
				text: item.title,
			});
			const contentEl = cardEl.createDiv({
				cls: "target-card-item-content",
			});
            const numEl = contentEl.createSpan({
				cls: "target-card-item-content-num",
				text: item.value,
			});
            const unitEl = contentEl.createSpan({
				cls: "target-card-item-content-unit",
				text: item.unit,
			});
			if (item.color !== null && item.color !== undefined) {
				cardEl.classList.add("body-" + item.color);
			} else {
				cardEl.classList.add("body-color-active");
			}
		});
		return cardsEl;
	}
}