import { App, MarkdownPostProcessorContext } from "obsidian";
import { BCGCardParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";
import { getTextInLanguage } from "../lang/helpers";

export class BCGCardElement {
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
		element.className = "cards-container";
		this.app = app;
		this.context = context;
		this.source = source;
		this.element = element;
		this.cardsEl = this.createCardsEl();
	}

	createCardsEl(): HTMLElement {
        const BCGCardItemInfo = BCGCardParser(this.source);
		const cardsEl = this.element;
        BCGCardItemInfo.forEach((item) => {
            const bcgCardEl = cardsEl.createDiv({
                cls: "bcg-item",
            });	
            const bcgBarLeftEl = bcgCardEl.createDiv({
                cls: "bcg-bar-left",	
            });
            const bcgContentEl = bcgCardEl.createDiv({
                cls: "bcg-content",
            });
            // 左侧bar
            const bcgBarLeftTextEl = bcgBarLeftEl.createDiv({
                cls: "bcg-bar-left-text",
            });
            bcgBarLeftTextEl.createDiv({
                cls: "bcg-bar-left-text-up",
                text: getTextInLanguage("high"),	
            });
            bcgBarLeftTextEl.createDiv({
                cls: "bcg-bar-left-text-title",
                text: item.y,
            });
            bcgBarLeftTextEl.createDiv({
                cls: "bcg-bar-left-text-down",
                text: getTextInLanguage("low"),
            });
            bcgBarLeftEl.createDiv({
            cls: "bcg-vertical-line",	
            });
            // 右侧内容区域
            const bcgContentMainEl = bcgContentEl.createDiv({
                cls: "bcg-content-main", 	
            });
            // 第一象限
            const bcgItemOneEl = bcgContentMainEl.createDiv({
                cls: "bcg-item-one",	
            });
            bcgItemOneEl.createDiv({
                cls: "bcg-item-one-title description",
                text: item.a1_title,
            });
            const bcgItemOneContentEl = new ItemContent( item.a1_content, bcgItemOneEl, this.context, this.app);
            bcgItemOneContentEl.itemEl.classList.add("bcg-item-one-content", "description");
            // 第二象限
            const bcgItemTwoEl = bcgContentMainEl.createDiv({
                cls: "bcg-item-two",
            });
            bcgItemTwoEl.createDiv({
                cls: "bcg-item-two-title description",
                text: item.a2_title,
            });
            const bcgItemTwoContentEl = new ItemContent( item.a2_content, bcgItemTwoEl, this.context, this.app);
            bcgItemTwoContentEl.itemEl.classList.add("bcg-item-two-content", "description");
            // 第三象限
            const bcgItemThreeEl = bcgContentMainEl.createDiv({
                cls: "bcg-item-three",
            });
            bcgItemThreeEl.createDiv({
                cls: "bcg-item-three-title description",
                text: item.a3_title,	
            });
            const bcgItemThreeContentEl = new ItemContent( item.a3_content, bcgItemThreeEl, this.context, this.app);
            bcgItemThreeContentEl.itemEl.classList.add("bcg-item-three-content", "description");
            // 第四象限
            const bcgItemFourEl = bcgContentMainEl.createDiv({
                cls: "bcg-item-four",
            });
            bcgItemFourEl.createDiv({
                cls: "bcg-item-four-title description",
                text: item.a4_title,
            });
            const bcgItemFourContentEl = new ItemContent( item.a4_content, bcgItemFourEl, this.context, this.app);
            bcgItemFourContentEl.itemEl.classList.add("bcg-item-four-content", "description");
            // 底部
            const bcgContentBottomEl = bcgContentEl.createDiv({
                cls: "bcg-bar-bottom",
            });
            bcgContentBottomEl.createDiv({
                cls: "bcg-horizontal-line",
            });
            const bcgContentBottomTextEl = bcgContentBottomEl.createDiv({
                cls: "bcg-bar-bottom-text",
            });
            bcgContentBottomTextEl.createDiv({
                cls: "bcg-bar-bottom-text-down",
                text: getTextInLanguage("low"),
            });
            bcgContentBottomTextEl.createDiv({
                cls: "bcg-bar-bottom-text-title",
                text: item.x,	
            });
            bcgContentBottomTextEl.createDiv({
                cls: "bcg-bar-bottom-text-up",
                text: getTextInLanguage("high"),	
            });
        });


        return cardsEl;
		
    }
}
