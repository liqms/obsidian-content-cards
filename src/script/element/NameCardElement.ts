import { App, MarkdownPostProcessorContext } from 'obsidian';
import { NameCardParser } from '../TagParsers';

interface NameCardItem {
  icon: string;
  name: string;
  tags: string;
  remark: string;
  color: string | null | undefined;
}

export class NameCardElement {
  private readonly DEFAULT_BODY_COLOR_CLASS = 'body-color-active';
  private readonly DEFAULT_ACCENT_COLOR_CLASS = 'accent-color-active';
  private readonly DESCRIPTION_CLASS = 'description';
  private readonly NAMECARD_CLASS = 'namecard';
  private readonly NAMECARD_ITEM_CLASS = 'namecard-item';
  private readonly NAMECARD_ITEM_INFO_CLASS = 'namecard-item-info';
  private readonly NAMECARD_ITEM_PROFILE_CLASS = 'namecard-item-profile';
  private readonly NAMECARD_ITEM_PROFILE_IMG_CLASS = 'namecard-item-profile-img';
  private readonly NAMECARD_ITEM_CONTENT_CLASS = 'namecard-item-content';
  private readonly NAMECARD_ITEM_CONTENT_NAME_CLASS = 'namecard-item-content-name';
  private readonly NAMECARD_ITEM_CONTENT_TAGS_CLASS = 'namecard-item-content-tags';
  private readonly NAMECARD_ITEM_REMARK_CLASS = 'namecard-item-remark';

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

  private createNameCard(cardsEl: HTMLElement, item: NameCardItem): void {
    const cardEl = cardsEl.createDiv({ cls: this.NAMECARD_ITEM_CLASS });
    const infoEl = cardEl.createDiv({ cls: this.NAMECARD_ITEM_INFO_CLASS });
    const profileEl = infoEl.createDiv({ cls: this.NAMECARD_ITEM_PROFILE_CLASS });
    const iconEl = profileEl.createDiv({ 
      cls: this.NAMECARD_ITEM_PROFILE_IMG_CLASS, 
      text: item.icon 
    });
    const contentEl = infoEl.createDiv({ cls: this.NAMECARD_ITEM_CONTENT_CLASS });
    const nameEl = contentEl.createDiv({ 
      cls: this.NAMECARD_ITEM_CONTENT_NAME_CLASS, 
      text: item.name 
    });
    const tagsEl = contentEl.createDiv({ 
      cls: this.NAMECARD_ITEM_CONTENT_TAGS_CLASS, 
      text: item.tags 
    });
    const remarkEl = cardEl.createDiv({ 
      cls: this.NAMECARD_ITEM_REMARK_CLASS, 
      text: item.remark 
    });
    
    remarkEl.classList.add(this.DESCRIPTION_CLASS);
    tagsEl.classList.add(this.DESCRIPTION_CLASS);
    
    if (item.color !== null && item.color !== undefined && item.color !== '') {
      cardEl.classList.add('body-' + item.color);
      iconEl.classList.add('accent-' + item.color);
    } else {
      cardEl.classList.add(this.DEFAULT_BODY_COLOR_CLASS);
      iconEl.classList.add(this.DEFAULT_ACCENT_COLOR_CLASS);
    }
  }

  createCardsEl(): HTMLElement {
    const nameCardItemInfo: NameCardItem[] = NameCardParser(this.source);
    const cardsEl = this.element;
    cardsEl.classList.add(this.NAMECARD_CLASS);
    
    if (!nameCardItemInfo || nameCardItemInfo.length === 0) {
      return cardsEl;
    }

    nameCardItemInfo.forEach((item) => {
      this.createNameCard(cardsEl, item);
    });

    return cardsEl;
  }
}
