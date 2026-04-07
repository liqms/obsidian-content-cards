import { ContentCardsPluginSettings } from "../types/settings";

/**
 * 语言配置映射
 */
export interface LanguageConfig {
	timelineV: string;
	timelineH: string;
	highlightblock: string;
	target: string;
	book: string;
	music: string;
	movie: string;
	album: string;
	subfield: string;
	name: string;
	countdown: string;
	bcg: string;
	swot: string;
}

/**
 * 从插件设置创建语言配置
 */
export function createLanguageConfig(settings: ContentCardsPluginSettings): LanguageConfig {
	return {
		timelineV: settings.timelineVLanguage,
		timelineH: settings.timelineHLanguage,
		highlightblock: settings.highlightblockLanguage,
		target: settings.targetLanguage,
		book: settings.bookLanguage,
		music: settings.musicLanguage,
		movie: settings.movieLanguage,
		album: settings.albumLanguage,
		subfield: settings.subfieldLanguage,
		name: settings.nameLanguage,
		countdown: settings.countdownLanguage,
		bcg: settings.bcgLanguage,
		swot: settings.swotLanguage,
	};
}

/**
 * 将语言配置转换为数组
 */
export function languageConfigToArray(config: LanguageConfig): string[] {
	return [
		config.timelineV,
		config.timelineH,
		config.highlightblock,
		config.target,
		config.book,
		config.music,
		config.movie,
		config.album,
		config.subfield,
		config.name,
		config.countdown,
		config.bcg,
		config.swot,
	];
}
