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
    cardEl.style.setProperty('--moviecard-cover-image', `url(${cover})`);
  }

  private createMovieCard(cardsEl: HTMLElement, item: MovieCardItem): void {
    const cardEl = cardsEl.createDiv({ cls: 'moviecard-item' });
    
    if (item.cover.startsWith(this.IMAGE_TYPE_HTTP)) {
      this.addBackgroundImageStyle(cardEl, item.cover);
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
    
    if (!movieCardItemInfo || movieCardItemInfo.length === 0) {
      return cardsEl;
    }

    movieCardItemInfo.forEach((item) => {
      this.createMovieCard(cardsEl, item);
    });

    return cardsEl;
  }
}