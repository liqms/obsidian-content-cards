// 定义 settings 的类型
export interface ContentCardsPluginSettings {
	timelineVLanguage: string;
	timelineHLanguage: string;
	highlightblockLanguage: string;
	targetLanguage: string;
	bookLanguage: string;
	musicLanguage: string;
	movieLanguage: string;
	albumLanguage: string;
	subfieldLanguage: string;
	nameLanguage: string;
	countdownLanguage: string;
	bcgLanguage: string;
	swotLanguage: string;
}
// 定义默认的 settings
export const DEFAULT_SETTINGS: ContentCardsPluginSettings = {
	timelineVLanguage: "cards-timeline-v",
	timelineHLanguage: "cards-timeline-h",
	highlightblockLanguage: "cards-highlightblock",
	targetLanguage: "cards-target",
	bookLanguage: "cards-book",
	musicLanguage: "cards-music",
	movieLanguage: "cards-movie",
	albumLanguage: "cards-album",
	subfieldLanguage: "cards-subfield",
	nameLanguage: "cards-name",
	countdownLanguage: "cards-countdown",
	bcgLanguage: "cards-bcg",
	swotLanguage: "cards-swot",
};