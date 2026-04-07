import { getString, NestedKeyOf } from "../utils/nested-keyof";
import enUS from "./locale/en-US";
import zhCN from "./locale/zh-CN";

/**
 * 语言管理器类
 * 负责语言的管理和文本获取
 */
export class LanguageManager {
	private static instance: LanguageManager;
	private localeMap: { [k: string]: LanguageLocale };
	private defaultLang: string;
	private currentLang: string;
	private currentLocale: LanguageLocale;

	/**
	 * 私有构造函数，防止外部实例化
	 */
	private constructor() {
		this.localeMap = {
			en: enUS,
			zh: zhCN,
		};
		this.defaultLang = 'en';
		this.currentLang = require('obsidian').getLanguage();
		this.currentLocale = this.localeMap[this.currentLang] || this.localeMap[this.defaultLang];
	}

	/**
	 * 获取单例实例
	 * @returns LanguageManager 实例
	 */
	public static getInstance(): LanguageManager {
		if (!LanguageManager.instance) {
			LanguageManager.instance = new LanguageManager();
		}
		return LanguageManager.instance;
	}

	/**
	 * 设置语言
	 * @param newLang 语言代码
	 */
	public setLanguage(newLang: string): void {
		this.currentLang = newLang;
		this.currentLocale = this.localeMap[newLang];
		if (!this.currentLocale) {
			this.currentLocale = this.localeMap[this.defaultLang];
		}
	}

	/**
	 * 获取指定键的文本
	 * @param key 文本键
	 * @returns 文本内容
	 */
	public getTextInLanguage(key: LanguageStringKey): string {
		const text: unknown =
			(this.currentLocale && getString<LanguageStrings>(this.currentLocale, key)) ||
			getString<LanguageStrings>(this.localeMap[this.defaultLang], key);

		return text as string;
	}

	/**
	 * 获取当前语言
	 * @returns 当前语言代码
	 */
	public getCurrentLanguage(): string {
		return this.currentLang;
	}

}

// 类型定义
type LanguageStrings = typeof enUS;
export type LanguageLocale = Partial<LanguageStrings>;
export type LanguageStringKey = NestedKeyOf<LanguageStrings>;

// 导出默认实例
export const languageManager = LanguageManager.getInstance();


