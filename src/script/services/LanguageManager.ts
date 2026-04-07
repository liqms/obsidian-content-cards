import { ContentCardsPluginSettings,DEFAULT_SETTINGS } from "../types/settings";
import { createLanguageConfig, LanguageConfig, languageConfigToArray } from "../utils/languageConfig";

/**
 * 语言管理器
 * 负责语言配置的管理和更新
 */
export class LanguageManager {
	private config: LanguageConfig;
	private languageArray: string[];

	/**
	 * 构造函数
	 */
	constructor() {
		this.config = createLanguageConfig(DEFAULT_SETTINGS);
		this.languageArray = languageConfigToArray(this.config);
	}

	/**
	 * 从设置更新语言配置
	 * @param settings 插件设置
	 */
	updateFromSettings(settings: ContentCardsPluginSettings): void {
		this.config = createLanguageConfig(settings);
		this.languageArray = languageConfigToArray(this.config);
		console.log('插件语言配置更新');
	}

	/**
	 * 获取语言配置对象
	 * @returns 语言配置对象
	 */
	getConfig(): LanguageConfig {
		return this.config;
	}

	/**
	 * 获取语言数组
	 * @returns 语言数组
	 */
	getLanguageArray(): string[] {
		return this.languageArray;
	}
}
