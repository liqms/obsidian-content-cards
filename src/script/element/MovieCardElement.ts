import { App, MarkdownPostProcessorContext } from "obsidian";
import { MovieCardParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";
export class MovieCardElement {
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
		const MovieCardItemInfo = MovieCardParser(this.source);
		const cardsEl = this.element;
		let timestamp: number = new Date().getTime();
		MovieCardItemInfo.forEach((item) => {
			const cardEl = cardsEl.createDiv({
				cls: "moviecard-item",
			});
			// 判断图片是网络图片还是本地图片
			if (item.cover.startsWith("http")) {
				cardEl.addClass("moviecard-item-pg-" + timestamp);
				// 插入背景图, 插入到body中
				const style = document.createElement("style");
				const bgImgAttr = document.createTextNode(
					".moviecard-item-pg-" +
					timestamp +
					"::before { background-image: url(" +
					item.cover +
					");}"
				);
				style.appendChild(bgImgAttr);
				document.body.appendChild(style);
				// 插入背景图结束
			} else if (item.cover.startsWith("!")) {
				const moviecardBgEl = new ItemContent(
					item.cover,
					cardEl,
					this.context,
					this.app
				);
				moviecardBgEl.itemEl.classList.add("moviecard-item-bg");
			}

			const CardMainEl = cardEl.createDiv({
				cls: "moviecard-main",
			});

			const infoEl = CardMainEl.createDiv({
				cls: "moviecard-main-info",
			});

			const coverEl = infoEl.createDiv({
				cls: "moviecard-info-cover",
			});
			// 判断图片是网络图片还是本地图片
			if (item.cover.startsWith("http")) {
				const img: HTMLImageElement = coverEl.createEl("img");
				img.src = item.cover;
				img.alt = "cover";
				img.referrerPolicy = "no-referrer";
			} else if (item.cover.startsWith("!")) {
				const coverImgEl = new ItemContent(
					item.cover,
					coverEl,
					this.context,
					this.app
				);
				coverImgEl.itemEl.classList.add("moviecard-info-cover-img");
			}

			const contentEl = infoEl.createDiv({
				cls: "moviecard-info-content",
			});
			const titleEl = contentEl.createDiv({
				cls: "moviecard-info-content-title",
				text: item.title,
			});
			titleEl.classList.add("description");
			const metaEl = new ItemContent(
				item.meta,
				contentEl,
				this.context,
				this.app
			);
			metaEl.itemEl.classList.add("moviecard-info-content-meta");
			const introductionEl = new ItemContent(
				item.introduction,
				CardMainEl,
				this.context,
				this.app
			);
			introductionEl.itemEl.classList.add(
				"moviecard-main-introduction",
				"description"
			);
		});

		return cardsEl;
	}
}
