/**
 * 单个元素的渲染类
 * 负责将内容渲染为 Markdown 元素
 */
import {
	App,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
	MarkdownRenderer,
} from "obsidian";

export class ItemContent {
	app: App;
	context: MarkdownPostProcessorContext;
	content: string;
	itemEl: HTMLElement;

	/**
	 * 构造函数
	 * @param content 要渲染的内容
	 * @param element 父元素
	 * @param context Markdown 后处理器上下文
	 * @param app Obsidian 应用实例
	 */
	constructor(
		content: string,
		element: HTMLElement,
		context: MarkdownPostProcessorContext,
		app: App,
	) {
		this.app = app;
		this.context = context;
		this.content = content;
		this.itemEl = element;
		this.createItemEl(content, context, app);
	}

	/**
	 * 创建并渲染项目元素
	 * @param content 要渲染的内容
	 * @param context Markdown 后处理器上下文
	 * @param app Obsidian 应用实例
	 */
	createItemEl(
		content: string,
		context: MarkdownPostProcessorContext,
		app: App
	) {
		this.itemEl = this.itemEl.createDiv();
		const cardComponent = new MarkdownRenderChild(this.itemEl);
		MarkdownRenderer.render(
			this.app,
			content,
			this.itemEl,
			this.context?.sourcePath,
			cardComponent
		);
	}
}
