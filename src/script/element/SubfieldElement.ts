import { App, MarkdownPostProcessorContext } from 'obsidian';
import { subfieldParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';

interface SubfieldItem {
  content: string;
}

export class SubfieldElement {
  private readonly SUBFIELD_CLASS = 'subfield';
  private readonly SUBFIELD_ITEM_CLASS = 'subfield-item';
  private readonly COLUMN_CLASS_PREFIX = 'column-';
  private readonly CARD_PATTERN = /@card/gi;
  private readonly DEFAULT_CARD_NUM = 1;

  app: App;
  context: MarkdownPostProcessorContext;
  source: string;
  element: HTMLElement;
  cardsEl: HTMLElement;
  cardNum: number;

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
    this.cardNum = this.calculateCardNum(source);
    this.cardsEl = this.createCardsEl();
  }

  private calculateCardNum(source: string): number {
    const matches = source.match(this.CARD_PATTERN);
    return matches?.length ?? this.DEFAULT_CARD_NUM;
  }

  private createSubfieldItem(cardsEl: HTMLElement, item: SubfieldItem): void {
    const cardEl = new ItemContent(item.content, cardsEl, this.context, this.app);
    cardEl.itemEl.classList.add(this.SUBFIELD_ITEM_CLASS);
  }

  createCardsEl(): HTMLElement {
    const subfieldItemInfo: SubfieldItem[] = subfieldParser(this.source);
    const cardsEl = this.element;
    cardsEl.classList.add(this.SUBFIELD_CLASS);
    
    if (this.cardNum > 0) {
      cardsEl.classList.add(this.COLUMN_CLASS_PREFIX + this.cardNum);
    }
    
    if (!subfieldItemInfo || subfieldItemInfo.length === 0) {
      return cardsEl;
    }

    subfieldItemInfo.forEach((item) => {
      this.createSubfieldItem(cardsEl, item);
    });

    return cardsEl;
  }
}
