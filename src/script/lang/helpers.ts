// based on https://github.com/mgmeyers/obsidian-kanban/blob/main/src/lang/helpers.ts
import { getString, NestedKeyOf } from "../utils/nested-keyof";
import en from "./locale/en-US";
import zhCN from "./locale/zh-CN";


type LanguageStrings = typeof en;

export type LanguageLocale = Partial<LanguageStrings>;

export const localeMap: { [k: string]: LanguageLocale } = {
	en,
	zh: zhCN,
};

export const localeToFileName: { [k: string]: string } = {
	en: "en",
	zh: "zh-CN",
};

export type LanguageStringKey = NestedKeyOf<LanguageStrings>;

// 获取系统语言，自动切换语言
const defaultLang = require('obsidian').getLanguage();

// const defaultLang = "en";
let lang = defaultLang;
let locale = localeMap[lang];


export function setLanguage(newLang: string) {
	lang = newLang;
	locale = localeMap[lang];
	if (!locale) {
		locale = localeMap[defaultLang];
	}
}

export function getTextInLanguage(str: LanguageStringKey): string {
	const text: unknown =
		(locale && getString<LanguageStrings>(locale, str)) ||
		getString<LanguageStrings>(en, str);

	return text as string;
}

export function localeHasKey(
	locale: LanguageLocale,
	key: LanguageStringKey
): boolean {
	return !!getString<LanguageStrings>(locale, key);
}

export function getLanguageSourceFile(language: string) {
	return `./src/lang/locale/${localeToFileName[language]}.ts`;
}
