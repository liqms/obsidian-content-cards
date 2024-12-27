import {
	App,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
	MarkdownRenderer,
} from "obsidian";

// 单个元素的渲染
export class ItemContent {
	app: App;
	context: MarkdownPostProcessorContext;
	content: string;
	itemEl: HTMLElement;

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
