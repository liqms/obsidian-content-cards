import { App, MarkdownPostProcessorContext } from 'obsidian';
import { BCGCardParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';
import { languageManager } from '../lang/helpers';

interface BCGCardItem {
  x: string;
  y: string;
  a1_title: string;
  a1_content: string;
  a2_title: string;
  a2_content: string;
  a3_title: string;
  a3_content: string;
  a4_title: string;
  a4_content: string;
}

export class BCGCardElement {
  private readonly DESCRIPTION_CLASS = 'description';
  private readonly HIGH_TEXT = languageManager.getTextInLanguage('high');
  private readonly LOW_TEXT = languageManager.getTextInLanguage('low');

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

  private createQuadrant(container: HTMLElement, className: string, title: string, content: string): void {
    const quadrantEl = container.createDiv({ cls: className });
    quadrantEl.createDiv({
      cls: `${className}-title ${this.DESCRIPTION_CLASS}`,
      text: title,
    });
    const contentEl = new ItemContent(content, quadrantEl, this.context, this.app);
    contentEl.itemEl.classList.add(`${className}-content`, this.DESCRIPTION_CLASS);
  }

  private createLeftBar(container: HTMLElement, title: string): void {
    const bcgBarLeftEl = container.createDiv({ cls: 'bcg-bar-left' });
    const bcgBarLeftTextEl = bcgBarLeftEl.createDiv({ cls: 'bcg-bar-left-text' });
    
    bcgBarLeftTextEl.createDiv({
      cls: 'bcg-bar-left-text-up',
      text: this.HIGH_TEXT,
    });
    bcgBarLeftTextEl.createDiv({
      cls: 'bcg-bar-left-text-title',
      text: title,
    });
    bcgBarLeftTextEl.createDiv({
      cls: 'bcg-bar-left-text-down',
      text: this.LOW_TEXT,
    });
    bcgBarLeftEl.createDiv({ cls: 'bcg-vertical-line' });
  }

  private createBottomBar(container: HTMLElement, title: string): void {
    const bcgContentBottomEl = container.createDiv({ cls: 'bcg-bar-bottom' });
    bcgContentBottomEl.createDiv({ cls: 'bcg-horizontal-line' });
    const bcgContentBottomTextEl = bcgContentBottomEl.createDiv({ cls: 'bcg-bar-bottom-text' });
    
    bcgContentBottomTextEl.createDiv({
      cls: 'bcg-bar-bottom-text-down',
      text: this.LOW_TEXT,
    });
    bcgContentBottomTextEl.createDiv({
      cls: 'bcg-bar-bottom-text-title',
      text: title,
    });
    bcgContentBottomTextEl.createDiv({
      cls: 'bcg-bar-bottom-text-up',
      text: this.HIGH_TEXT,
    });
  }

  private createBCGCard(cardsEl: HTMLElement, item: BCGCardItem): void {
    const bcgCardEl = cardsEl.createDiv({ cls: 'bcg-item' });
    
    this.createLeftBar(bcgCardEl, item.y);
    
    const bcgContentEl = bcgCardEl.createDiv({ cls: 'bcg-content' });
    const bcgContentMainEl = bcgContentEl.createDiv({ cls: 'bcg-content-main' });
    
    this.createQuadrant(bcgContentMainEl, 'bcg-item-one', item.a1_title, item.a1_content);
    this.createQuadrant(bcgContentMainEl, 'bcg-item-two', item.a2_title, item.a2_content);
    this.createQuadrant(bcgContentMainEl, 'bcg-item-three', item.a3_title, item.a3_content);
    this.createQuadrant(bcgContentMainEl, 'bcg-item-four', item.a4_title, item.a4_content);
    
    this.createBottomBar(bcgContentEl, item.x);
  }

  createCardsEl(): HTMLElement {
    const bcgCardItemInfo: BCGCardItem[] = BCGCardParser(this.source);
    const cardsEl = this.element;
    
    if (!bcgCardItemInfo || bcgCardItemInfo.length === 0) {
      return cardsEl;
    }
    
    bcgCardItemInfo.forEach((item) => {
      this.createBCGCard(cardsEl, item);
    });

    return cardsEl;
  }
}
