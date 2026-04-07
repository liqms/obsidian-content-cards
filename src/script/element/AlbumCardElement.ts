import { App, MarkdownPostProcessorContext } from 'obsidian';
import { AlbumCardParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';

interface AlbumCardItem {
  title: string;
  color: string | null | undefined;
  type: string;
  images: string;
}

export class AlbumCardElement {
  private readonly IMAGE_TYPE_LOCAL = '!';
  private readonly IMAGE_TYPE_HTTP = 'http';
  private readonly CARD_TYPE_ALBUM = 'album';
  private readonly CARD_TYPE_WATERFALL = 'waterfall';
  private readonly DEFAULT_COLOR_CLASS = 'body-color-active';

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
    element.className = 'cards-container';
    this.app = app;
    this.context = context;
    this.source = source;
    this.element = element;
    this.cardsEl = this.createCardsEl();
  }

  private renderImage(container: HTMLElement, imageSrc: string, className: string): void {
    if (imageSrc.startsWith(this.IMAGE_TYPE_LOCAL)) {
      const imageItemEl = new ItemContent(imageSrc, container, this.context, this.app);
      imageItemEl.itemEl.classList.add(className);
    } else if (imageSrc.startsWith(this.IMAGE_TYPE_HTTP)) {
      const imageItemEl = container.createDiv({ cls: className });
      const imageEl: HTMLImageElement = imageItemEl.createEl('img');
      imageEl.src = imageSrc;
      imageEl.alt = '';
      imageEl.referrerPolicy = 'no-referrer';
    }
  }

  private createTitleElement(container: HTMLElement, title: string, color: string | null | undefined): HTMLElement {
    const titleEl = container.createDiv({
      cls: 'album-item-title',
      text: title,
    });
    if (color !== null && color !== undefined && color !== '') {
      titleEl.classList.add('body-' + color);
    } else {
      titleEl.classList.add(this.DEFAULT_COLOR_CLASS);
    }
    return titleEl;
  }

  createCardsEl(): HTMLElement {
    const albumCardItemInfo: AlbumCardItem[] = AlbumCardParser(this.source);
    const cardsEl = this.element;
    cardsEl.classList.add('album');
    
    if (!albumCardItemInfo || albumCardItemInfo.length === 0) {
      return cardsEl;
    }

    for (let e = 0; e < albumCardItemInfo.length; e++) {
      const imagesArray: string[] = this.toImagesArray(albumCardItemInfo[e].images);
      const cardEl = cardsEl.createDiv();
      cardEl.classList.add('cards-container', 'album-item');
      
	  if (albumCardItemInfo[e].title !== null && albumCardItemInfo[e].title !== undefined && albumCardItemInfo[e].title !== '') {
        this.createTitleElement(cardEl, albumCardItemInfo[e].title, albumCardItemInfo[e].color);
      }

      const typeArr: string[] = albumCardItemInfo[e].type.split('-');
      const type: string = typeArr[0];
      const column: number = parseInt(typeArr[1]);

      if (type === this.CARD_TYPE_ALBUM) {
        this.createAlbumCard(cardEl, imagesArray);
      } else if (type === this.CARD_TYPE_WATERFALL) {
        this.createWaterfallCard(cardEl, albumCardItemInfo[e].images, column);
      }
    }

    return cardsEl;
  }

  private createAlbumCard(cardEl: HTMLElement, imagesArray: string[]): void {
    for (let g = 0; g < imagesArray.length; g++) {
      const imagesGridEl = cardEl.createDiv();
      imagesGridEl.classList.add('cards-container', 'album-item-images');
      const imagesArrayItems = this.toImagesArrayItems(imagesArray[g]);
      let gridNumber = imagesArrayItems.length;
      imagesGridEl.classList.add('grid-' + gridNumber);

      imagesArrayItems.forEach((item) => {
        this.renderImage(imagesGridEl, item, 'album-item-images-item');
      });
    }
  }

  private createWaterfallCard(cardEl: HTMLElement, images: string, column: number): void {
    const waterfallEl = cardEl.createDiv();
    waterfallEl.classList.add('waterfall');

    if (column > 0 && column !== undefined) {
      const imageColArr: string[] = this.toImageColArr(images, column);
      imageColArr.forEach((itemX) => {
        const waterfallColumnEl = waterfallEl.createDiv();
        waterfallColumnEl.classList.add('waterfall-column-images');
        const imagesArrayItems = this.toImagesArrayItems(itemX);
        imagesArrayItems.forEach((itemY) => {
          this.renderImage(waterfallColumnEl, itemY, 'waterfall-column-images-item');
        });
      });
    }
  }
  private toImagesArray(images: string): string[] {
    const imagesArrayRegex = /^\s*$/gim;
    if (images === null || images === undefined) {
      return [];
    }
    const imagesArray = images.split(imagesArrayRegex);
    return imagesArray;
  }

  private toImagesArrayItems(imagesArray: string): string[] {
    const itemRegex = /\n/;
    imagesArray = imagesArray.trim();
    const imagesArrayItems = imagesArray.split(itemRegex);
    return imagesArrayItems;
  }

  private toImageColArr(images: string, column: number): string[] {
    images = images.replace(/^\s*$/gim, '');
    const imagesArray: string[] = this.toImagesArrayItems(images);
    const imagesArrayLength: number = imagesArray.length;
    const imageColArr: string[] = [];
    for (let i = 0; i < column; i++) {
      imageColArr[i] = '';
      for (let j = i; j < imagesArrayLength; j += column) {
        imageColArr[i] += imagesArray[j] + '\n';
      }
    }
    return imageColArr;
  }
}
