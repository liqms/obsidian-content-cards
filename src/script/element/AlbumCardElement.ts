import { App, MarkdownPostProcessorContext } from "obsidian";
import { AlbumCardParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";

export class AlbumCardElement {
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
		const AlbumCardItemInfo = AlbumCardParser(this.source);
		const cardsEl = this.element;
		cardsEl.classList.add("album");
		for (let e = 0; e < AlbumCardItemInfo.length; e++) {
			const imagesArray: any[] = this.toImagesArray(
				AlbumCardItemInfo[e].images
			);
			const cardEl = cardsEl.createDiv();
			cardEl.classList.add("cards-container", "album-item");
			const titleEl = cardEl.createDiv({
				cls: "album-item-title",
				text: AlbumCardItemInfo[e].title,
			});
			if (
				AlbumCardItemInfo[e].color !== null &&
				AlbumCardItemInfo[e].color !== undefined
			) {
				titleEl.classList.add("body-" + AlbumCardItemInfo[e].color);
			} else {
				titleEl.classList.add("body-color-active");
			}

			for (let g = 0; g < imagesArray.length; g++) {
				const imagesGirdEl = cardEl.createDiv();
				imagesGirdEl.classList.add("cards-container", "album-item-images");
				const ImagesArrayItems = this.toImagesArrayItems(
					imagesArray[g]
				);
				let gridNumber = ImagesArrayItems.length;
				imagesGirdEl.classList.add("grid-" + gridNumber);

				ImagesArrayItems.forEach((item) => {
					// 本地图片地址的渲染
					if (item.startsWith("!")) {
						const imageItemEl = new ItemContent(
							item,
							imagesGirdEl,
							this.context,
							this.app
						);
						imageItemEl.itemEl.classList.add(
							"album-item-images-item"
						);
					} else if (item.startsWith("http")) {
						// 网络图片地址的渲染
						const imageItemEl = imagesGirdEl.createDiv({
							cls: "album-item-images-item",
						});
						const imageEl: HTMLImageElement =
							imageItemEl.createEl("img");
						imageEl.src = item;
						imageEl.alt = "";
						imageEl.referrerPolicy = "no-referrer";
					}
				});
			}
		}

		return cardsEl;
	}
	// 以空行分割字符串
	toImagesArray(images: string): string[] {
		const imagesArrayRegex = /^\s*$/gim;
		if (images === null || images === undefined) {
			return [];
		}
		const imagesArray = images.split(imagesArrayRegex);
		return imagesArray;
	}
	// 以换行符分割字符串
	toImagesArrayItems(imagesArray: string): string[] {
		const ItemRegex = /\n/;
		imagesArray = imagesArray.trim();

		const ImagesArrayItems = imagesArray.split(ItemRegex);

		return ImagesArrayItems;
	}
}
