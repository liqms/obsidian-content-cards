import { App, MarkdownPostProcessorContext } from 'obsidian';
import { HighlightblockParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';

interface HighlightBlockItem {
  content: string;
  color: string | null | undefined;
}

export class HighlightBlockElement {
  private readonly DEFAULT_COLOR_CLASS = 'body-color-active';
  private readonly HIGHLIGHT_BLOCK_CLASS = 'highlightblock';
  private readonly HIGHLIGHT_BLOCK_ITEM_CLASS = 'highlightblock-item';

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

  private createHighlightBlock(cardsEl: HTMLElement, item: HighlightBlockItem): void {
    const cardEl = new ItemContent(item.content, cardsEl, this.context, this.app);
    cardEl.itemEl.classList.add(this.HIGHLIGHT_BLOCK_ITEM_CLASS);
    
    if (item.color !== null && item.color !== undefined && item.color !== '') {
      cardEl.itemEl.classList.add('body-' + item.color);
    } else {
      cardEl.itemEl.classList.add(this.DEFAULT_COLOR_CLASS);
    }
  }

  createCardsEl(): HTMLElement {
    const highlightBlockItemInfo: HighlightBlockItem[] = HighlightblockParser(this.source);
    const cardsEl = this.element;
    cardsEl.classList.add(this.HIGHLIGHT_BLOCK_CLASS);
    
    if (!highlightBlockItemInfo || highlightBlockItemInfo.length === 0) {
      return cardsEl;
    }

    highlightBlockItemInfo.forEach((item) => {
      this.createHighlightBlock(cardsEl, item);
    });

    return cardsEl;
  }
}
