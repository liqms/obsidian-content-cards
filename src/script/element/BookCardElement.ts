import { App, MarkdownPostProcessorContext } from "obsidian";
import { BookCardParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";

export class BookCardElement {
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
		const BookCardItemInfo = BookCardParser(this.source);
		const cardsEl = this.element;
		let timestamp: number = new Date().getTime();
		BookCardItemInfo.forEach((item) => {
			const cardEl = cardsEl.createDiv({
				cls: "bookcard-item",
			});
			// 判断图片是网络图片还是本地图片
			if (item.cover.startsWith("http")) {
				cardEl.addClass("bookcard-item-pg-" + timestamp);
			// 插入背景图, 插入到body中,内联样式
			const style = document.createElement("style");
			const bgImgAttr = document.createTextNode(
				".bookcard-item-pg-" +
					timestamp +
					"::before { background-image: url(" +
					item.cover +
					");}"
			);
			style.appendChild(bgImgAttr);
			document.body.appendChild(style);
			// 插入背景图结束
			}else if(item.cover.startsWith("!")){
				const bookcardBgEl = new ItemContent(
					item.cover,
					cardEl,
					this.context,
					this.app
				);
				bookcardBgEl.itemEl.classList.add("bookcard-item-bg");
			}
			

			const CardMainEl = cardEl.createDiv({
				cls: "bookcard-main",
			});
			const infoEl = CardMainEl.createDiv({
				cls: "bookcard-main-info",
			});
			const coverEl = infoEl.createDiv({
				cls: "bookcard-info-cover",
			});
			// 判断图片是网络图片还是本地图片
			if (item.cover.startsWith("http")) {
				const imgEl: HTMLImageElement = coverEl.createEl("img");
				imgEl.src = item.cover;
				imgEl.alt = "cover";
				imgEl.referrerPolicy = "no-referrer";
			} else if (item.cover.startsWith("!")) {
				const coverImgEl = new ItemContent(
					item.cover,
					coverEl,
					this.context,
					this.app
				);
				coverImgEl.itemEl.classList.add("bookcard-info-cover-img");
			}
			
			const contentEl = infoEl.createDiv({
				cls: "bookcard-info-content",
			});
			const titleEl = contentEl.createDiv({
				cls: "bookcard-info-content-title",
				text: item.title,
			});
			titleEl.classList.add("description");
			const metaEl = new ItemContent(
				item.meta,
				contentEl,
				this.context,
				this.app
			);
			metaEl.itemEl.classList.add("bookcard-info-content-meta");
			const introductionEl = new ItemContent(
				item.introduction,
				CardMainEl,
				this.context,
				this.app
			);
			introductionEl.itemEl.classList.add(
				"bookcard-main-introduction",
				"description"
			);
		});
	
		return cardsEl;
	}
}
