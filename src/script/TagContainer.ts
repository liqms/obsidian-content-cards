import { App, MarkdownPostProcessorContext } from "obsidian";
import * as Elements from "./element";
import { CardElementConstructor, CardElementInstance } from "./types/card-element";

/**
 * 标签容器类
 * 根据标签类型创建相应的卡片元素
 */
export class TagContainer {
	app: App;
	source: string;
	element: HTMLElement;
	elementInstance: CardElementInstance | undefined;

	constructor(
		tag: string,
		source: string,
		element: HTMLElement,
		context: MarkdownPostProcessorContext,
		app: App
	) {
		this.source = source;
		this.app = app;
		this.element = element;

		// 创建元素映射表
		// 注意：这里使用默认的语言标签，实际使用时会根据用户设置动态注册
		const elementMap: Record<string, CardElementConstructor> = {
			"cards-timeline-v": Elements.TimelineVElement,
			"cards-timeline-h": Elements.TimelineHElement,
			"cards-highlightblock": Elements.HighlightBlockElement,
			"cards-target": Elements.TargetCardElement,
			"cards-book": Elements.BookCardElement,
			"cards-music": Elements.MusicCardElement,
			"cards-movie": Elements.MovieCardElement,
			"cards-album": Elements.AlbumCardElement,
			"cards-subfield": Elements.SubfieldElement,
			"cards-name": Elements.NameCardElement,
			"cards-countdown": Elements.CountdownCardElement,
			"cards-bcg": Elements.BCGCardElement,
			"cards-swot": Elements.SWOTCardElement,
		};

		// 使用映射表创建相应的元素
		const ElementClass = elementMap[tag];
		if (ElementClass) {
			this.elementInstance = new ElementClass(source, element, context, this.app);
		}
	}

	/**
	 * 清理元素实例
	 */
	cleanup(): void {
		if (this.elementInstance && typeof this.elementInstance.cleanup === 'function') {
			this.elementInstance.cleanup();
		}
	}
}