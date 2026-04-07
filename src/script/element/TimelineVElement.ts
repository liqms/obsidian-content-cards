import { App, MarkdownPostProcessorContext } from 'obsidian';
import { TimeLineParser } from '../TagParsers';
import { ItemContent } from '../ItemContent';

interface TimelineItem {
  time: string;
  title: string;
  content: string;
  color: string | null | undefined;
}

export class TimelineVElement {
  private readonly TIMELINE_V_CLASS = 'timeline-v';
  private readonly TIMELINE_V_ITEM_CLASS = 'timeline-v-item';
  private readonly VERTICAL_LINE_CLASS = 'vertical-line';
  private readonly TIMELINE_V_TIME_CLASS = 'timeline-v-time';
  private readonly TIMELINE_V_CONTENT_CLASS = 'timeline-v-content';
  private readonly TIMELINE_V_TITLE_CLASS = 'timeline-v-title';
  private readonly TIMELINE_V_DESCRIPTION_CLASS = 'timeline-v-description';
  private readonly DESCRIPTION_CLASS = 'description';
  private readonly DEFAULT_LINE_COLOR_CLASS = 'line-v-color-active';
  private readonly DEFAULT_BODY_COLOR_CLASS = 'line-v-body-color-active';

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

  private createTimelineItem(cardsEl: HTMLElement, item: TimelineItem): void {
    const cardEl = cardsEl.createDiv({ cls: this.TIMELINE_V_ITEM_CLASS });
    const vlineEl = cardEl.createDiv({ cls: this.VERTICAL_LINE_CLASS });
    const timeEl = cardEl.createDiv({ 
      cls: this.TIMELINE_V_TIME_CLASS, 
      text: item.time 
    });
    const contentEl = cardEl.createDiv({ cls: this.TIMELINE_V_CONTENT_CLASS });
    
    const titleEl = new ItemContent(item.title, contentEl, this.context, this.app);
    titleEl.itemEl.classList.add(this.TIMELINE_V_TITLE_CLASS, this.DESCRIPTION_CLASS);
    
    const descriptionEl = new ItemContent(item.content, contentEl, this.context, this.app);
    descriptionEl.itemEl.classList.add(this.TIMELINE_V_DESCRIPTION_CLASS, this.DESCRIPTION_CLASS);
    
    if (item.color !== null && item.color !== undefined && item.color !== '') {
      vlineEl.classList.add('line-v-' + item.color);
      contentEl.classList.add('line-v-body-' + item.color);
    } else {
      vlineEl.classList.add(this.DEFAULT_LINE_COLOR_CLASS);
      contentEl.classList.add(this.DEFAULT_BODY_COLOR_CLASS);
    }
  }

  createCardsEl(): HTMLElement {
    const timelineItemInfo: TimelineItem[] = TimeLineParser(this.source);
    const cardsEl = this.element;
    cardsEl.classList.add(this.TIMELINE_V_CLASS);
    
    if (!timelineItemInfo || timelineItemInfo.length === 0) {
      return cardsEl;
    }

    timelineItemInfo.forEach((item) => {
      this.createTimelineItem(cardsEl, item);
    });

    return cardsEl;
  }
}
