import { Plugin } from "obsidian";
import { ContentCardsPluginSettings, DEFAULT_SETTINGS } from "../types/settings";

/**
 * 设置管理器
 * 负责设置的加载、保存和管理
 */
export class SettingsManager {
	private plugin: Plugin;
	private settings: ContentCardsPluginSettings;

	/**
	 * 构造函数
	 * @param plugin 插件实例
	 */
	constructor(plugin: Plugin) {
		this.plugin = plugin;
		this.settings = { ...DEFAULT_SETTINGS };
	}

	/**
	 * 加载设置
	 * @returns 加载后的设置
	 */
	async load(): Promise<ContentCardsPluginSettings> {
		try {
			const savedData = await this.plugin.loadData();
			this.settings = Object.assign({}, DEFAULT_SETTINGS, savedData);
			console.log('设置加载成功');
			return this.settings;
		} catch (error) {
			console.error('设置加载失败:', error);
			this.settings = { ...DEFAULT_SETTINGS };
			return this.settings;
		}
	}

	/**
	 * 保存设置
	 * @returns 保存是否成功
	 */
	async save(): Promise<boolean> {
		try {
			await this.plugin.saveData(this.settings);
			console.log('设置保存成功');
			return true;
		} catch (error) {
			console.error('设置保存失败:', error);
			return false;
		}
	}

	/**
	 * 获取当前设置
	 * @returns 当前设置
	 */
	getSettings(): ContentCardsPluginSettings {
		return this.settings;
	}

	/**
	 * 更新设置
	 * @param newSettings 新的设置
	 */
	updateSettings(newSettings: ContentCardsPluginSettings): void {
		this.settings = { ...newSettings };
	}
}
