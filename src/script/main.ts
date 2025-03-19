import { App, MarkdownPostProcessorContext, Plugin } from "obsidian";
import { TagContainer } from "./TagContainer";
import {
	ContentCardsPluginSettings,
	DEFAULT_SETTINGS,
	ContentCardsPluginSettingTab,
} from "./settings";
import "../style/styles.css";

// 处理空字符串的情况
const trim = (s: string): string => {
	const trimmed = s.trim();
	return trimmed.length === 0 ? "\u200B" : trimmed;
};
// 定义 language 数组
export let language: string[];
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
	settings!: ContentCardsPluginSettings;
	reloadingPlugins = false;
	async onload() {
		// 加载 settings
		await this.loadSettings();
		// 注册 settings 的界面
		this.addSettingTab(new ContentCardsPluginSettingTab(this.app, this));

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
// 通过开启和关闭插件来重新加载插件
	async reloadPlugin() {
        if (this.reloadingPlugins) return;
        this.reloadingPlugins = true;

        const plugins = (<any>this.app).plugins;
        if (!plugins?.enabledPlugins?.has(this.manifest.id)) return;
        await plugins.disablePlugin(this.manifest.id);
        try {
            await plugins.enablePlugin(this.manifest.id);
        } catch (error) {
            /* empty */
        }

        this.reloadingPlugins = false;
    }
	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);

		// 构建 language 数组
		language = [
			this.settings.timelineVLanguage,
			this.settings.timelineHLanguage,
			this.settings.highlightblockLanguage,
			this.settings.targetLanguage,
			this.settings.bookLanguage,
			this.settings.musicLanguage,
			this.settings.movieLanguage,
			this.settings.albumLanguage,
			this.settings.subfieldLanguage,
			this.settings.nameLanguage,
			this.settings.countdownLanguage,
		];
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
