import { MarkdownPostProcessorContext, Plugin } from "obsidian";
import { TagContainer } from "./TagContainer";
import {
	ContentCardsPluginSettingTab,
} from "./settings";
import { SettingsManager } from "./services/SettingsManager";
import { LanguageManager } from "./services/LanguageManager";
import "../style/styles.sass";

/**
 * 内容卡片插件
 * 在代码块中分别注册不同的 language , 来渲染不同的 Card
 * 根据不同的 language 调用不同的 Container ，Container 封装 element 和 content
 */
export default class ContentCardsPlugin extends Plugin {
	private settingsManager!: SettingsManager;
	private languageManager!: LanguageManager;
	private reloadingPlugins = false;
	private tagContainers: TagContainer[] = []; // 存储所有创建的 TagContainer 实例

	/**
	 * 插件加载时调用
	 */
	async onload() {
		// 初始化管理器
		this.settingsManager = new SettingsManager(this);
		this.languageManager = new LanguageManager();

		// 加载设置
		await this.loadSettings();
		// 注册设置界面
		this.addSettingTab(new ContentCardsPluginSettingTab(this.app, this));

		// 注册代码块处理器
		this.registerCodeBlockProcessors();

		console.log("插件加载成功");
	}

	/**
	 * 插件卸载时调用
	 */
	async onunload() {
		// 清理所有 TagContainer 实例
		this.cleanupTagContainers();
		// 清空容器数组
		this.tagContainers = [];
		
		console.log("插件卸载成功");
	}

	/**
	 * 清理所有 TagContainer 实例
	 */
	private cleanupTagContainers(): void {
		this.tagContainers.forEach(container => {
			container.cleanup();
		});
		console.log(`已清理 ${this.tagContainers.length} 个 TagContainer 实例`);
	}

	/**
	 * 注册代码块处理器
	 */
	private registerCodeBlockProcessors(): void {
		const languages = this.languageManager.getLanguageArray();
		languages.forEach((tag) => {
			this.registerMarkdownCodeBlockProcessor(
				tag,
				(
					source: string,
					root: HTMLElement,
					ctx: MarkdownPostProcessorContext
				) => {
					const container = new TagContainer(tag, source, root, ctx, this.app);
					this.tagContainers.push(container);
				}
			);
		});
		console.log(`已注册 ${languages.length} 个代码块处理器`);
	}

	/**
	 * 重新加载插件
	 */
	async reloadPlugin() {
		if (this.reloadingPlugins) return;
		this.reloadingPlugins = true;

		try {
			const plugins = (<any>this.app).plugins;
			if (!plugins?.enabledPlugins?.has(this.manifest.id)) {
				console.warn('插件未启用，无法重新加载');
				return;
			}

			// 清理现有实例
			this.cleanupTagContainers();
			this.tagContainers = [];

			await plugins.disablePlugin(this.manifest.id);
			await plugins.enablePlugin(this.manifest.id);
			console.log('插件重新加载成功');
		} catch (error) {
			console.error('插件重新加载失败:', error);
		} finally {
			this.reloadingPlugins = false;
		}
	}

	/**
	 * 加载设置
	 */
	async loadSettings() {
		try {
			const settings = await this.settingsManager.load();
			this.languageManager.updateFromSettings(settings);
			console.log('设置加载成功');
		} catch (error) {
			console.error('设置加载失败:', error);
		}
	}

	/**
	 * 保存设置
	 */
	async saveSettings() {
		try {
			const success = await this.settingsManager.save();
			if (success) {
				const settings = this.settingsManager.getSettings();
				this.languageManager.updateFromSettings(settings);
				// 清理现有实例
				this.cleanupTagContainers();
				this.tagContainers = [];
				// 重新注册代码块处理器
				this.registerCodeBlockProcessors();
			}
		} catch (error) {
			console.error('设置保存失败:', error);
		}
	}

	/**
	 * 获取设置管理器
	 * @returns 设置管理器
	 */
	getSettingsManager(): SettingsManager {
		return this.settingsManager;
	}

	/**
	 * 获取语言管理器
	 * @returns 语言管理器
	 */
	getLanguageManager(): LanguageManager {
		return this.languageManager;
	}
}
