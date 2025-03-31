import { App, PluginSettingTab, setIcon, Setting } from "obsidian";
import ContentCardsPlugin from "./main";
import { getTextInLanguage } from "./lang/helpers";

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
	mindmapLanguage: string;
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
	mindmapLanguage: "cards-mindmap",
};
// 定义 settings 的界面
export class ContentCardsPluginSettingTab extends PluginSettingTab {
	plugin: ContentCardsPlugin;

	constructor(app: App, plugin: ContentCardsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}
	hide(): void {
		this.plugin.reloadPlugin();
	}
	display(): void {
		let { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", {
			text: getTextInLanguage("code_block_variable"),
		});
		const timelineVLanguageVariable = new Setting(containerEl)
			.setName(getTextInLanguage("timelineVLanguage_name"))
			.setDesc(getTextInLanguage("timelineVLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.timelineVLanguage)
					.onChange(async (value) => {
						this.plugin.settings.timelineVLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		timelineVLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.timelineVLanguage =
						DEFAULT_SETTINGS.timelineVLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const timelineHLanguageVariable = new Setting(containerEl)
			.setName(getTextInLanguage("timelineHLanguage_name"))
			.setDesc(getTextInLanguage("timelineHLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.timelineHLanguage)
					.onChange(async (value) => {
						this.plugin.settings.timelineHLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		timelineHLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.timelineHLanguage =
						DEFAULT_SETTINGS.timelineHLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const highlightblockLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("highlightblockLanguage_name"))
			.setDesc(getTextInLanguage("highlightblockLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.highlightblockLanguage)
					.onChange(async (value) => {
						this.plugin.settings.highlightblockLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		highlightblockLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.highlightblockLanguage =
						DEFAULT_SETTINGS.highlightblockLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const targetLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("targetLanguage_name"))
			.setDesc(getTextInLanguage("targetLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.targetLanguage)
					.onChange(async (value) => {
						this.plugin.settings.targetLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		targetLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.targetLanguage =
						DEFAULT_SETTINGS.targetLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const bookLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("bookLanguage_name"))
			.setDesc(getTextInLanguage("bookLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.bookLanguage)
					.onChange(async (value) => {
						this.plugin.settings.bookLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		bookLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.bookLanguage =
						DEFAULT_SETTINGS.bookLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const musicLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("musicLanguage_name"))
			.setDesc(getTextInLanguage("musicLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.musicLanguage)
					.onChange(async (value) => {
						this.plugin.settings.musicLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		musicLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.musicLanguage =
						DEFAULT_SETTINGS.musicLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const movieLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("movieLanguage_name"))
			.setDesc(getTextInLanguage("movieLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.movieLanguage)
					.onChange(async (value) => {
						this.plugin.settings.movieLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		movieLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.movieLanguage =
						DEFAULT_SETTINGS.movieLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const albumLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("albumLanguage_name"))
			.setDesc(getTextInLanguage("albumLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.albumLanguage)
					.onChange(async (value) => {
						this.plugin.settings.albumLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		albumLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.albumLanguage =
						DEFAULT_SETTINGS.albumLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const subfieldLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("subfieldLanguage_name"))
			.setDesc(getTextInLanguage("subfieldLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.subfieldLanguage)
					.onChange(async (value) => {
						this.plugin.settings.subfieldLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		subfieldLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.subfieldLanguage =
						DEFAULT_SETTINGS.subfieldLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const nameLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("nameLanguage_name"))
			.setDesc(getTextInLanguage("nameLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.nameLanguage)
					.onChange(async (value) => {
						this.plugin.settings.nameLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		nameLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.nameLanguage =
						DEFAULT_SETTINGS.nameLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const countdownLanguageVariable = new Setting(containerEl)

			.setName(getTextInLanguage("countdownLanguage_name"))
			.setDesc(getTextInLanguage("countdownLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.countdownLanguage)
					.onChange(async (value) => {
						this.plugin.settings.countdownLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		countdownLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.countdownLanguage =
						DEFAULT_SETTINGS.countdownLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const mindmapLanguageVariable = new Setting(containerEl)
			.setName(getTextInLanguage("mindmap_name"))
			.setDesc(getTextInLanguage("mindmap_desc"))
			.addText((text) =>
				text
					.setPlaceholder(getTextInLanguage("language_placeholder"))
					.setValue(this.plugin.settings.mindmapLanguage)
					.onChange(async (value) => {
						this.plugin.settings.mindmapLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		mindmapLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					this.plugin.settings.mindmapLanguage =
						DEFAULT_SETTINGS.mindmapLanguage;
					await this.plugin.saveSettings();
					this.display();
				})
		})
	}
	refresh(): void {
		this.containerEl.empty();
		this.display();
	}
	clear(): void {
		this.containerEl.empty();
	}
}

function createLink(
	el: HTMLElement | DocumentFragment,
	text: string,
	href: string
) {
	const link = el.createEl("a", { text, href });
	return link;
}
