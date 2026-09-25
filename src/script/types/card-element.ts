import { App, MarkdownPostProcessorContext } from "obsidian";

/**
 * 卡片元素实例类型
 * 卡片元素类共享的最小接口
 */
export type CardElementInstance = object & {
	cleanup?: () => void;
};

/**
 * 卡片元素构造函数类型
 */
export type CardElementConstructor = new (source: string, element: HTMLElement, context: MarkdownPostProcessorContext, app: App) => CardElementInstance;