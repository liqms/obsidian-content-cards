import { App, PluginSettingTab, setIcon, Setting } from "obsidian";
import ContentCardsPlugin from "./main";
import { languageManager } from "./lang/helpers";
import { ContentCardsPluginSettings, DEFAULT_SETTINGS } from "./types/settings";

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
			text: languageManager.getTextInLanguage("code_block_variable"),
		});
		
		const settings = this.plugin.getSettingsManager().getSettings();
		
		const timelineVLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("timelineVLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("timelineVLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.timelineVLanguage)
					.onChange(async (value) => {
						settings.timelineVLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		timelineVLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.timelineVLanguage = DEFAULT_SETTINGS.timelineVLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const timelineHLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("timelineHLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("timelineHLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.timelineHLanguage)
					.onChange(async (value) => {
						settings.timelineHLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		timelineHLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.timelineHLanguage = DEFAULT_SETTINGS.timelineHLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const highlightblockLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("highlightblockLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("highlightblockLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.highlightblockLanguage)
					.onChange(async (value) => {
						settings.highlightblockLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		highlightblockLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.highlightblockLanguage = DEFAULT_SETTINGS.highlightblockLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const targetLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("targetLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("targetLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.targetLanguage)
					.onChange(async (value) => {
						settings.targetLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		targetLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.targetLanguage = DEFAULT_SETTINGS.targetLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const bookLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("bookLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("bookLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.bookLanguage)
					.onChange(async (value) => {
						settings.bookLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		bookLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.bookLanguage = DEFAULT_SETTINGS.bookLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const musicLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("musicLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("musicLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.musicLanguage)
					.onChange(async (value) => {
						settings.musicLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		musicLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.musicLanguage = DEFAULT_SETTINGS.musicLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const movieLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("movieLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("movieLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.movieLanguage)
					.onChange(async (value) => {
						settings.movieLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		movieLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.movieLanguage = DEFAULT_SETTINGS.movieLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const albumLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("albumLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("albumLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.albumLanguage)
					.onChange(async (value) => {
						settings.albumLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		albumLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.albumLanguage = DEFAULT_SETTINGS.albumLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const subfieldLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("subfieldLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("subfieldLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.subfieldLanguage)
					.onChange(async (value) => {
						settings.subfieldLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		subfieldLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.subfieldLanguage = DEFAULT_SETTINGS.subfieldLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const nameLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("nameLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("nameLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.nameLanguage)
					.onChange(async (value) => {
						settings.nameLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		nameLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.nameLanguage = DEFAULT_SETTINGS.nameLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const countdownLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("countdownLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("countdownLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.countdownLanguage)
					.onChange(async (value) => {
						settings.countdownLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		countdownLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.countdownLanguage = DEFAULT_SETTINGS.countdownLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const bcgLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("bcgLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("bcgLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.bcgLanguage)
					.onChange(async (value) => {
						settings.bcgLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		bcgLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.bcgLanguage = DEFAULT_SETTINGS.bcgLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
		const swotLanguageVariable = new Setting(containerEl)
			.setName(languageManager.getTextInLanguage("swotLanguage_name"))
			.setDesc(languageManager.getTextInLanguage("swotLanguage_desc"))
			.addText((text) =>
				text
					.setPlaceholder(languageManager.getTextInLanguage("language_placeholder"))
					.setValue(settings.swotLanguage)
					.onChange(async (value) => {
						settings.swotLanguage = value;
						await this.plugin.saveSettings();
					})
			);
		swotLanguageVariable.addExtraButton((button) => {
			button
				.setIcon("reset")
				.setTooltip(languageManager.getTextInLanguage("reset_tooltip"))
				.onClick(async () => {
					settings.swotLanguage = DEFAULT_SETTINGS.swotLanguage;
					await this.plugin.saveSettings();
					this.display();
				});
		});
	}
	refresh(): void {
		this.containerEl.empty();
		this.display();
	}
	clear(): void {
		this.containerEl.empty();
	}
}

