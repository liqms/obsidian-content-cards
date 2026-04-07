import { App, MarkdownPostProcessorContext } from 'obsidian';
import { MovieCardParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';

interface MovieCardItem {
  cover: string;
  title: string;
  meta: string;
  introduction: string;
}

export class MovieCardElement {
  private readonly IMAGE_TYPE_LOCAL = '!';
  private readonly IMAGE_TYPE_HTTP = 'http';
  private readonly DESCRIPTION_CLASS = 'description';
  private styleElements: HTMLStyleElement[] = [];

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

  private addBackgroundImageStyle(cardEl: HTMLElement, cover: string, timestamp: number): void {
    const className = `moviecard-item-pg-${timestamp}`;
    cardEl.addClass(className);
    
    const style = document.createElement('style');
    const bgImgAttr = document.createTextNode(
      `.${className}::before { background-image: url(${cover});}`
    );
    style.appendChild(bgImgAttr);
    document.body.appendChild(style);
    this.styleElements.push(style);
  }

  private createMovieCard(cardsEl: HTMLElement, item: MovieCardItem, timestamp: number): void {
    const cardEl = cardsEl.createDiv({ cls: 'moviecard-item' });
    
    if (item.cover.startsWith(this.IMAGE_TYPE_HTTP)) {
      this.addBackgroundImageStyle(cardEl, item.cover, timestamp);
    } else if (item.cover.startsWith(this.IMAGE_TYPE_LOCAL)) {
      const moviecardBgEl = new ItemContent(item.cover, cardEl, this.context, this.app);
      moviecardBgEl.itemEl.classList.add('moviecard-item-bg');
    }

    const cardMainEl = cardEl.createDiv({ cls: 'moviecard-main' });
    const infoEl = cardMainEl.createDiv({ cls: 'moviecard-main-info' });
    const coverEl = infoEl.createDiv({ cls: 'moviecard-info-cover' });
    
    this.renderImage(coverEl, item.cover, 'moviecard-info-cover-img');

    const contentEl = infoEl.createDiv({ cls: 'moviecard-info-content' });
    const titleEl = contentEl.createDiv({ cls: 'moviecard-info-content-title', text: item.title });
    titleEl.classList.add(this.DESCRIPTION_CLASS);
    
    const metaEl = new ItemContent(item.meta, contentEl, this.context, this.app);
    metaEl.itemEl.classList.add('moviecard-info-content-meta');
    
    const introductionEl = new ItemContent(item.introduction, cardMainEl, this.context, this.app);
    introductionEl.itemEl.classList.add('moviecard-main-introduction', this.DESCRIPTION_CLASS);
  }

  createCardsEl(): HTMLElement {
    const movieCardItemInfo: MovieCardItem[] = MovieCardParser(this.source);
    const cardsEl = this.element;
    const timestamp: number = new Date().getTime();
    
    if (!movieCardItemInfo || movieCardItemInfo.length === 0) {
      return cardsEl;
    }

    movieCardItemInfo.forEach((item) => {
      this.createMovieCard(cardsEl, item, timestamp);
    });

    return cardsEl;
  }

  cleanup(): void {
    this.styleElements.forEach(style => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    });
    this.styleElements = [];
  }
}
