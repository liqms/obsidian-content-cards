import { App, MarkdownPostProcessorContext } from 'obsidian';
import { BookCardParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';

interface BookCardItem {
  cover: string;
  title: string;
  meta: string;
  introduction: string;
}

export class BookCardElement {
  private readonly IMAGE_TYPE_LOCAL = '!';
  private readonly IMAGE_TYPE_HTTP = 'http';
  private readonly DESCRIPTION_CLASS = 'description';

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
      const imgEl: HTMLImageElement = container.createEl('img');
      imgEl.src = imageSrc;
      imgEl.alt = 'cover';
      imgEl.referrerPolicy = 'no-referrer';
    }
  }

  private addBackgroundImageStyle(cardEl: HTMLElement, cover: string): void {
    cardEl.style.setProperty('--bookcard-cover-image', `url(${cover})`);
  }

  private createBookCard(cardsEl: HTMLElement, item: BookCardItem): void {
    const cardEl = cardsEl.createDiv({ cls: 'bookcard-item' });
    
    if (item.cover.startsWith(this.IMAGE_TYPE_HTTP)) {
      this.addBackgroundImageStyle(cardEl, item.cover);
    } else if (item.cover.startsWith(this.IMAGE_TYPE_LOCAL)) {
      const bookcardBgEl = new ItemContent(item.cover, cardEl, this.context, this.app);
      bookcardBgEl.itemEl.classList.add('bookcard-item-bg');
    }

    const cardMainEl = cardEl.createDiv({ cls: 'bookcard-main' });
    const infoEl = cardMainEl.createDiv({ cls: 'bookcard-main-info' });
    const coverEl = infoEl.createDiv({ cls: 'bookcard-info-cover' });
    
    this.renderImage(coverEl, item.cover, 'bookcard-info-cover-img');

    const contentEl = infoEl.createDiv({ cls: 'bookcard-info-content' });
    const titleEl = contentEl.createDiv({ cls: 'bookcard-info-content-title', text: item.title });
    titleEl.classList.add(this.DESCRIPTION_CLASS);
    
    const metaEl = new ItemContent(item.meta, contentEl, this.context, this.app);
    metaEl.itemEl.classList.add('bookcard-info-content-meta');
    
    const introductionEl = new ItemContent(item.introduction, cardMainEl, this.context, this.app);
    introductionEl.itemEl.classList.add('bookcard-main-introduction', this.DESCRIPTION_CLASS);
  }

  createCardsEl(): HTMLElement {
    const bookCardItemInfo: BookCardItem[] = BookCardParser(this.source);
    const cardsEl = this.element;
    
    if (!bookCardItemInfo || bookCardItemInfo.length === 0) {
      return cardsEl;
    }

    bookCardItemInfo.forEach((item) => {
      this.createBookCard(cardsEl, item);
    });

    return cardsEl;
  }
}