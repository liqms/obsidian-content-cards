import { App, MarkdownPostProcessorContext } from "obsidian";
import { MusicCardParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";
export class MusicCardElement {
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
		const MusicCardItemInfo = MusicCardParser(this.source);
		const cardsEl = this.element;

		MusicCardItemInfo.forEach((item) => {
			let timestamp: number = new Date().getTime();

			const cardEl = cardsEl.createDiv({
				cls: "musiccard-item",
			});
			// 判断图片是网络图片还是本地图片
			if (item.cover.startsWith("http")) {
				cardEl.addClass("musiccard-item-pg-" + timestamp);
				// 插入背景图
				const style = document.createElement("style");
				const bgImgAttr = document.createTextNode(
					".musiccard-item-pg-" +
					timestamp +
					"::before { background-image: url(" +
					item.cover +
					");}"
				);
				style.appendChild(bgImgAttr);
				document.body.appendChild(style);
				// 插入背景图结束
			} else if (item.cover.startsWith("!")) {
				const musiccardBgEl = new ItemContent(
					item.cover,
					cardEl,
					this.context,
					this.app
				);
				musiccardBgEl.itemEl.classList.add("musiccard-item-bg");
			}

			const CardMainEl = cardEl.createDiv({
				cls: "musiccard-main",
			});
			const infoEl = CardMainEl.createDiv({
				cls: "musiccard-main-info",
			});
			const coverEl = infoEl.createDiv({
				cls: "musiccard-info-cover",
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
				coverImgEl.itemEl.classList.add("musiccard-info-cover-img");
			}


			const contentEl = infoEl.createDiv({
				cls: "musiccard-info-content",
			});

			const titleEl = contentEl.createDiv({
				cls: "musiccard-info-content-title",
				text: item.title,
			});
			titleEl.classList.add("description");
			const metaEl = new ItemContent(
				item.meta,
				contentEl,
				this.context,
				this.app
			);
			metaEl.itemEl.classList.add("musiccard-info-content-meta");
		});

		return cardsEl;
	}
}
