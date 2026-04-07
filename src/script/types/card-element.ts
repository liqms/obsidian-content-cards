import { App, MarkdownPostProcessorContext } from "obsidian";

/**
 * 卡片元素构造函数类型
 */
export type CardElementConstructor = new (source: string, element: HTMLElement, context: MarkdownPostProcessorContext, app: App) => any;

/**
 * 卡片元素接口
 * 所有卡片元素类都应实现此接口
 */
export interface CardElement {
	// 卡片元素的基本接口
}
