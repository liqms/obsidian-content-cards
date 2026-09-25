import { App, MarkdownPostProcessorContext } from 'obsidian';
import { MusicCardParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';

interface MusicCardItem {
  cover: string;
  title: string;
  meta: string;
}

export class MusicCardElement {
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
    cardEl.style.setProperty('--musiccard-cover-image', `url(${cover})`);
  }

  private createMusicCard(cardsEl: HTMLElement, item: MusicCardItem): void {
    const cardEl = cardsEl.createDiv({ cls: 'musiccard-item' });
    
    if (item.cover.startsWith(this.IMAGE_TYPE_HTTP)) {
      this.addBackgroundImageStyle(cardEl, item.cover);
    } else if (item.cover.startsWith(this.IMAGE_TYPE_LOCAL)) {
      const musiccardBgEl = new ItemContent(item.cover, cardEl, this.context, this.app);
      musiccardBgEl.itemEl.classList.add('musiccard-item-bg');
    }

    const cardMainEl = cardEl.createDiv({ cls: 'musiccard-main' });
    const infoEl = cardMainEl.createDiv({ cls: 'musiccard-main-info' });
    const coverEl = infoEl.createDiv({ cls: 'musiccard-info-cover' });
    
    this.renderImage(coverEl, item.cover, 'musiccard-info-cover-img');

    const contentEl = infoEl.createDiv({ cls: 'musiccard-info-content' });
    const titleEl = contentEl.createDiv({ cls: 'musiccard-info-content-title', text: item.title });
    titleEl.classList.add(this.DESCRIPTION_CLASS);
    
    const metaEl = new ItemContent(item.meta, contentEl, this.context, this.app);
    metaEl.itemEl.classList.add('musiccard-info-content-meta');
  }

  createCardsEl(): HTMLElement {
    const musicCardItemInfo: MusicCardItem[] = MusicCardParser(this.source);
    const cardsEl = this.element;
    
    if (!musicCardItemInfo || musicCardItemInfo.length === 0) {
      return cardsEl;
    }

    musicCardItemInfo.forEach((item) => {
      this.createMusicCard(cardsEl, item);
    });

    return cardsEl;
  }
}