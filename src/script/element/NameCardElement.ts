import { App, MarkdownPostProcessorContext } from "obsidian";
import { NameCardParser } from "../TagParsers";

export class NameCardElement {
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
		const NameCardItemInfo = NameCardParser(this.source);
		const cardsEl = this.element;
		cardsEl.classList.add("namecard");
		NameCardItemInfo.forEach((item) => {
			const cardEl = cardsEl.createDiv({
				cls: "namecard-item",
			});
			const infoEl = cardEl.createDiv({
				cls: "namecard-item-info",
			});
			const profileEl = infoEl.createDiv({
				cls: "namecard-item-profile",
			});
			const iconEl = profileEl.createDiv({
				cls: "namecard-item-profile-img",
				text: item.icon,
			});
			const contentEl = infoEl.createDiv({
				cls: "namecard-item-content",
			});
			const nameEl = contentEl.createDiv({
				cls: "namecard-item-content-name",
				text: item.name,
			});
			const tagsEl = contentEl.createDiv({
				cls: "namecard-item-content-tags",
				text: item.tags,
			});
			const remarkEl = cardEl.createDiv({
				cls: "namecard-item-remark",
				text: item.remark,
			});
			remarkEl.classList.add("description");
			tagsEl.classList.add("description");
			if (item.color !== null && item.color !== undefined) {
				cardEl.classList.add("body-" + item.color);
				iconEl.classList.add("accent-" + item.color);
			} else {
				cardEl.classList.add("body-color-active");
				iconEl.classList.add("accent-color-active");
			}
		});

		return cardsEl;
	}
}
