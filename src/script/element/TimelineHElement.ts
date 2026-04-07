import { App, MarkdownPostProcessorContext } from 'obsidian';
import { TimeLineParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';

interface TimelineItem {
  time: string;
  title: string;
  content: string;
  color: string | null | undefined;
}

export class TimelineHElement {
  private readonly TIMELINE_H_CLASS = 'timeline-h';
  private readonly TIMELINE_H_ITEM_CLASS = 'timeline-h-item';
  private readonly TIMELINE_H_TIME_CLASS = 'timeline-h-time';
  private readonly TIMELINE_H_HR_CLASS = 'timeline-h-hr';
  private readonly TIMELINE_H_CONTENT_CLASS = 'timeline-h-content';
  private readonly TIMELINE_H_TITLE_CLASS = 'timeline-h-title';
  private readonly TIMELINE_H_DESCRIPTION_CLASS = 'timeline-h-description';
  private readonly DESCRIPTION_CLASS = 'description';
  private readonly DEFAULT_LINE_COLOR_CLASS = 'line-h-color-active';
  private readonly DEFAULT_BODY_COLOR_CLASS = 'body-color-active';
  private readonly CARD_PATTERN = /@card/gi;
  private readonly DEFAULT_CARD_NUM = 1;
  private readonly COLUMN_CLASS_PREFIX = 'column-';

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

  private createTimelineItem(cardsEl: HTMLElement, item: TimelineItem): void {
    const cardEl = cardsEl.createDiv({ cls: this.TIMELINE_H_ITEM_CLASS });
    const timeEl = cardEl.createDiv({ 
      cls: this.TIMELINE_H_TIME_CLASS, 
      text: item.time 
    });
    const hlineEl = cardEl.createDiv({ cls: this.TIMELINE_H_HR_CLASS });
    const contentEl = cardEl.createDiv({ cls: this.TIMELINE_H_CONTENT_CLASS });
    
    const titleEl = new ItemContent(item.title, contentEl, this.context, this.app);
    titleEl.itemEl.classList.add(this.TIMELINE_H_TITLE_CLASS, this.DESCRIPTION_CLASS);
    
    const descriptionEl = new ItemContent(item.content, contentEl, this.context, this.app);
    descriptionEl.itemEl.classList.add(this.TIMELINE_H_DESCRIPTION_CLASS, this.DESCRIPTION_CLASS);
    
    if (item.color !== null && item.color !== undefined && item.color !== '') {
      hlineEl.classList.add('line-h-' + item.color);
      contentEl.classList.add('body-' + item.color);
    } else {
      hlineEl.classList.add(this.DEFAULT_LINE_COLOR_CLASS);
      contentEl.classList.add(this.DEFAULT_BODY_COLOR_CLASS);
    }
  }

  createCardsEl(): HTMLElement {
    const timelineItemInfo: TimelineItem[] = TimeLineParser(this.source);
    const cardsEl = this.element;
    cardsEl.classList.add(this.TIMELINE_H_CLASS);
    
    if (this.cardNum > 0) {
      cardsEl.classList.add(this.COLUMN_CLASS_PREFIX + this.cardNum);
    }
    
    if (!timelineItemInfo || timelineItemInfo.length === 0) {
      return cardsEl;
    }

    timelineItemInfo.forEach((item) => {
      this.createTimelineItem(cardsEl, item);
    });

    return cardsEl;
  }
}
