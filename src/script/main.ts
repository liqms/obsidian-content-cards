import { App, MarkdownPostProcessorContext, Plugin } from "obsidian";
import { TagContainer } from "./TagContainer";
import  "../style/styles.css";

// 处理空字符串的情况
const trim = (s: string): string => {
	const trimmed = s.trim();
	return trimmed.length === 0 ? "\u200B" : trimmed;
};
// 定义 language 的类型
const language: string[] = [
	"cards-timeline-v",
	"cards-timeline-h",
	"cards-highlightblock",
	"cards-target",
	"cards-book",
	"cards-music",
	"cards-movie",
	"cards-album",
	"cards-subfield",
	"cards-name",
	"cards-countdown",
];
/**
 * 在代码块中分别注册不同的 language , 来渲染不同的 Card
 * 根据不同的 language 调用不同的 Container ，Container 封装 element 和 content
 *
 *
 * @param source - 代码块中的内容
 * @param el - 代码块的 root 父元素
 * @param ctx - 由 Obsidian 的 registerMarkdownCodeBlockProcessor() 方法提供的上下文，包含了正在处理的笔记的源路径信息。
 * @param ctx.sourcePath - 一个字符串，表示正在处理的笔记的文件系统路径。
 */

export default class ContentCardsPlugin extends Plugin {
	async onload() {
		language.forEach((tag) => {
			this.registerMarkdownCodeBlockProcessor(
				tag,
				(
					source: string,
					root: HTMLElement,
					ctx: MarkdownPostProcessorContext
				) => {
					
					new TagContainer(tag, source, root, ctx, this.app);
				}
			);
		});

		console.log("loading content cards plugin");
	}
	async onunload() {
		console.log("unloading content cards plugin");
	}
}
