import { App, MarkdownPostProcessorContext } from 'obsidian';
import { CountdownCardParser } from '../TagParsers';
import { languageManager } from '../lang/helpers';

interface CountdownCardItem {
  type: string;
  time: string;
  title: string;
  color: string | null | undefined;
}

export class CountdownCardElement {
  private readonly COUNTDOWN_CLASS = 'countdown';
  private readonly COUNTDOWN_ITEM_CLASS = 'countdown-item';
  private readonly COUNTDOWN_ITEM_TITLE_CLASS = 'countdown-item-title';
  private readonly COUNTDOWN_ITEM_COUNT_TITLE_CLASS = 'countdown-item-count-title';
  private readonly COUNTDOWN_ITEM_COUNT_CLASS = 'countdown-item-count';
  private readonly COUNTDOWN_ITEM_COUNT_NUM_CLASS = 'countdown-item-count-num';
  private readonly COUNTDOWN_ITEM_COUNT_UNIT_CLASS = 'countdown-item-count-unit';
  private readonly DEFAULT_BODY_COLOR_CLASS = 'body-color-active';
  private readonly DEFAULT_ACCENT_COLOR_CLASS = 'accent-color-active';
  private readonly DEFAULT_ACCENT_COLOR_CLASS_B = 'accent-color-active-b';
  private readonly DEFAULT_TEXT_COLOR_CLASS = 'text-color-active';
  private readonly TYPE_DAY = 'day';
  private readonly TYPE_SEC = 'sec';
  private readonly UPDATE_INTERVAL = 1000; // 1秒更新一次

  app: App;
  context: MarkdownPostProcessorContext;
  source: string;
  element: HTMLElement;
  cardsEl: HTMLElement;
  timeCount: number[];
  targetTime: number[];
  currentTime: number[];
  timeCountStr: string[];
  private countdownIntervals: NodeJS.Timeout[] = [];

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
    this.timeCount = [0, 0, 0];
    this.currentTime = [0, 0, 0];
    this.targetTime = [0, 0, 0];
    this.timeCountStr = ['0', '0', '0'];
    this.cardsEl = this.createCardsEl();
  }

  private createCountdownItem(cardsEl: HTMLElement, item: CountdownCardItem): void {
    const cardEl = cardsEl.createDiv({ cls: this.COUNTDOWN_ITEM_CLASS });
    const titleEl = cardEl.createDiv({ cls: this.COUNTDOWN_ITEM_TITLE_CLASS });
    
    titleEl.createSpan({ text: languageManager.getTextInLanguage('until') });
    titleEl.createSpan({ 
      cls: this.COUNTDOWN_ITEM_COUNT_TITLE_CLASS, 
      text: item.title 
    });
    titleEl.createSpan({ text: languageManager.getTextInLanguage('remain') });
    
    const countEl = cardEl.createDiv({ cls: this.COUNTDOWN_ITEM_COUNT_CLASS });
    
    this.timeCountStr = this.getTimeCountStr(item.type, item.time);
    
    if (item.type === this.TYPE_DAY) {
      this.createDayCountdown(countEl, item.color);
    } else if (item.type === this.TYPE_SEC) {
      const numElements = this.createSecondCountdown(countEl, item.color);
      // 为秒倒计时添加动态更新
      this.startSecondCountdownUpdate(numElements, item.type, item.time, item.color);
    } else {
      countEl.createDiv({ 
        cls: this.COUNTDOWN_ITEM_COUNT_UNIT_CLASS, 
        text: languageManager.getTextInLanguage('countdown_type_error') 
      });
    }
    
    if (item.color !== null && item.color !== undefined && item.color !== '') {
      cardEl.classList.add('body-' + item.color);
    } else {
      cardEl.classList.add(this.DEFAULT_BODY_COLOR_CLASS);
    }
  }

  private createDayCountdown(countEl: HTMLElement, color: string | null | undefined): void {
    const numAEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_NUM_CLASS, 
      text: this.timeCountStr[0] 
    });
    const unitAEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_UNIT_CLASS, 
      text: languageManager.getTextInLanguage('years') 
    });
    const numBEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_NUM_CLASS, 
      text: this.timeCountStr[1] 
    });
    const unitBEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_UNIT_CLASS, 
      text: languageManager.getTextInLanguage('months') 
    });
    const numCEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_NUM_CLASS, 
      text: this.timeCountStr[2] 
    });
    const unitCEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_UNIT_CLASS, 
      text: languageManager.getTextInLanguage('days') 
    });
    
    this.applyColorToElements([numAEl, numBEl, numCEl], [unitAEl, unitBEl, unitCEl], color);
  }

  private createSecondCountdown(countEl: HTMLElement, color: string | null | undefined): HTMLElement[] {
    const numAEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_NUM_CLASS, 
      text: this.timeCountStr[0] 
    });
    const unitAEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_UNIT_CLASS, 
      text: languageManager.getTextInLanguage('hours') 
    });
    const numBEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_NUM_CLASS, 
      text: this.timeCountStr[1] 
    });
    const unitBEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_UNIT_CLASS, 
      text: languageManager.getTextInLanguage('minutes') 
    });
    const numCEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_NUM_CLASS, 
      text: this.timeCountStr[2] 
    });
    const unitCEl = countEl.createDiv({ 
      cls: this.COUNTDOWN_ITEM_COUNT_UNIT_CLASS, 
      text: languageManager.getTextInLanguage('seconds') 
    });
    
    this.applyColorToElements([numAEl, numBEl, numCEl], [unitAEl, unitBEl, unitCEl], color);
    return [numAEl, numBEl, numCEl];
  }

  private startSecondCountdownUpdate(numElements: HTMLElement[], type: string, time: string, color: string | null | undefined): void {
    const interval = setInterval(() => {
      const newTimeCountStr = this.getTimeCountStr(type, time);
      
      // 更新数字和样式
      numElements.forEach((el, index) => {
        if (el.textContent !== newTimeCountStr[index]) {
          el.textContent = newTimeCountStr[index];
          // 移除旧的颜色类
          el.classList.remove(
            'accent-color-active',
            'accent-color-active-b'
          );
          if (color) {
            el.classList.remove('accent-' + color, 'accent-' + color + '-b');
          }
          // 添加新的颜色类
          if (color !== null && color !== undefined && color !== '') {
            if (newTimeCountStr[index] === '0' || newTimeCountStr[index] === '00') {
              el.classList.add('accent-' + color + '-b');
            } else {
              el.classList.add('accent-' + color);
            }
          } else {
            if (newTimeCountStr[index] === '0' || newTimeCountStr[index] === '00') {
              el.classList.add(this.DEFAULT_ACCENT_COLOR_CLASS_B);
            } else {
              el.classList.add(this.DEFAULT_ACCENT_COLOR_CLASS);
            }
          }
        }
      });
      
      // 检查是否倒计时结束
      if (newTimeCountStr.every(str => str === '0' || str === '00')) {
        clearInterval(interval);
      }
    }, this.UPDATE_INTERVAL);
    
    this.countdownIntervals.push(interval);
  }

  private applyColorToElements(numElements: HTMLElement[], unitElements: HTMLElement[], color: string | null | undefined): void {
    if (color !== null && color !== undefined && color !== '') {
      numElements.forEach((el, index) => {
        if (this.timeCountStr[index] === '0'||this.timeCountStr[index] === '00') {
          el.classList.add('accent-' + color + '-b');
        } else {
          el.classList.add('accent-' + color);
        }
      });
      unitElements.forEach(el => el.classList.add('text-' + color));
    } else {
      numElements.forEach((el, index) => {
        if (this.timeCountStr[index] === '0'||this.timeCountStr[index] === '00') {
          el.classList.add(this.DEFAULT_ACCENT_COLOR_CLASS_B);
        } else {
          el.classList.add(this.DEFAULT_ACCENT_COLOR_CLASS);
        }
      });
      unitElements.forEach(el => el.classList.add(this.DEFAULT_TEXT_COLOR_CLASS));
    }
  }

  getTimeCountStr(type: string, time: string): string[] {
    if (type === this.TYPE_DAY) {
      const match = time.match(/(\d{4})-(\d{2})-(\d{2})/);
      if (match) {
        this.targetTime = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        const currentTime = [
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate()
        ];
        const timeDiff = 
          this.targetTime[0] * 365 + 
          this.targetTime[1] * 30 + 
          this.targetTime[2] - 
          currentTime[0] * 365 - 
          currentTime[1] * 30 - 
          currentTime[2];
        
        if (timeDiff > 0) {
          this.timeCount[0] = Math.floor(timeDiff / 365);
          this.timeCount[1] = Math.floor((timeDiff % 365) / 30);
          this.timeCount[2] = Math.floor(timeDiff % 30);
        } else {
          this.timeCount = [0, 0, 0];
        }
      } else {
        this.timeCount = [0, 0, 0];
      }
    } else if (type === this.TYPE_SEC) {
      const match = time.match(/(\d{2}):(\d{2}):(\d{2})/);
      if (match) {
        this.targetTime = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        const currentTime = [
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds()
        ];
        const timeDiff = 
          this.targetTime[0] * 3600 + 
          this.targetTime[1] * 60 + 
          this.targetTime[2] - 
          currentTime[0] * 3600 - 
          currentTime[1] * 60 - 
          currentTime[2];
        
        if (timeDiff > 0) {
          this.timeCount[0] = Math.floor(timeDiff / 3600);
          this.timeCount[1] = Math.floor((timeDiff % 3600) / 60);
          this.timeCount[2] = Math.floor(timeDiff % 60);
        } else {
          this.timeCount = [0, 0, 0];
        }
      } else {
        this.timeCount = [0, 0, 0];
      }
    } else {
      this.timeCount = [0, 0, 0];
    }
    
    this.timeCountStr = this.timeCount.map(e => this.toString(e));
    return this.timeCountStr;
  }

  private toString(num: number): string {
    return num.toString().padStart(2, '0');
  }

  createCardsEl(): HTMLElement {
    const countdownCardItemInfo: CountdownCardItem[] = CountdownCardParser(this.source);
    const cardsEl = this.element;
    cardsEl.classList.add(this.COUNTDOWN_CLASS);
    
    if (!countdownCardItemInfo || countdownCardItemInfo.length === 0) {
      return cardsEl;
    }

    countdownCardItemInfo.forEach((item) => {
      this.createCountdownItem(cardsEl, item);
    });

    return cardsEl;
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    // 清除所有倒计时定时器
    this.countdownIntervals.forEach(interval => clearInterval(interval));
    this.countdownIntervals = [];
  }
}
