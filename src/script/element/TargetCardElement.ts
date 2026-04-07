import { App, MarkdownPostProcessorContext } from 'obsidian';
import { TargetCardParser } from '../TagParsers';

interface TargetCardItem {
  title: string;
  value: string;
  unit: string;
  color: string | null | undefined;
}

export class TargetCardElement {
  private readonly DEFAULT_COLOR_CLASS = 'body-color-active';
  private readonly TARGET_CARD_CLASS = 'target-card';
  private readonly TARGET_CARD_ITEM_CLASS = 'target-card-item';
  private readonly TARGET_CARD_ITEM_TITLE_CLASS = 'target-card-item-title';
  private readonly TARGET_CARD_ITEM_CONTENT_CLASS = 'target-card-item-content';
  private readonly TARGET_CARD_ITEM_CONTENT_NUM_CLASS = 'target-card-item-content-num';
  private readonly TARGET_CARD_ITEM_CONTENT_UNIT_CLASS = 'target-card-item-content-unit';

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

  private createTargetCard(cardsEl: HTMLElement, item: TargetCardItem): void {
    const cardEl = cardsEl.createDiv({ cls: this.TARGET_CARD_ITEM_CLASS });
    const titleEl = cardEl.createDiv({ 
      cls: this.TARGET_CARD_ITEM_TITLE_CLASS, 
      text: item.title 
    });
    const contentEl = cardEl.createDiv({ cls: this.TARGET_CARD_ITEM_CONTENT_CLASS });
    
    const numEl = contentEl.createSpan({ 
      cls: this.TARGET_CARD_ITEM_CONTENT_NUM_CLASS, 
      text: item.value 
    });
    const unitEl = contentEl.createSpan({ 
      cls: this.TARGET_CARD_ITEM_CONTENT_UNIT_CLASS, 
      text: item.unit 
    });
    
    if (item.color !== null && item.color !== undefined && item.color !== '') {
      cardEl.classList.add('body-' + item.color);
    } else {
      cardEl.classList.add(this.DEFAULT_COLOR_CLASS);
    }
  }

  createCardsEl(): HTMLElement {
    const targetCardItemInfo: TargetCardItem[] = TargetCardParser(this.source);
    const cardsEl = this.element;
    cardsEl.classList.add(this.TARGET_CARD_CLASS);
    
    if (!targetCardItemInfo || targetCardItemInfo.length === 0) {
      return cardsEl;
    }

    targetCardItemInfo.forEach((item) => {
      this.createTargetCard(cardsEl, item);
    });

    return cardsEl;
  }
}
