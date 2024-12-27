import { App, MarkdownPostProcessorContext } from "obsidian";
import { TimelineVElement } from "./element/TimelineVElement";
import { TimelineHElement } from "./element/TimelineHElement";
import { HighlightBlockElement } from "./element/HighlightBlockElement";
import { TargetCardElement } from "./element/TargetCardElement";
import { BookCardElement } from "./element/BookCardElement";
import { MusicCardElement } from "./element/MusicCardElement";
import { MovieCardElement } from "./element/MovieCardElement";
import { AlbumCardElement } from "./element/AlbumCardElement";
import { SubfieldElement } from "./element/SubfieldElement";
import { NameCardElement } from "./element/NameCardElement";
import { CountdownCardElement } from "./element/CountdownCardElement";

// 处理空字符串的情况
const trim = (s: string): string => {
	const trimmed = s.trim();
	return trimmed.length === 0 ? "\u200B" : trimmed;
};

export class TagContainer {
	app: App;
	context: MarkdownPostProcessorContext;
	source: string;
	element: HTMLElement;

	constructor(
		tag: string,
		source: string,
		element: HTMLElement,
		context: MarkdownPostProcessorContext,
		app: App
	) {
		this.source = source;
		this.app = app;
		this.context = context;

		this.element = element;

		switch (tag) {
			case "cards-timeline-v":
				new TimelineVElement(source, element, context, this.app);
				break;
			case "cards-timeline-h":
				new TimelineHElement(source, element, context, this.app);
				break;
			case "cards-highlightblock":
				new HighlightBlockElement(source, element, context, this.app);
				break;
			case "cards-target":
				new TargetCardElement(source, element, context, this.app);
				break;
			case "cards-book":
				new BookCardElement(source, element, context, this.app);
				break;
			case "cards-music":
				new MusicCardElement(source, element, context, this.app);
				break;
			case "cards-movie":
				new MovieCardElement(source, element, context, this.app);
				break;
			case "cards-album":
				new AlbumCardElement(source, element, context, this.app);
				break;
			case "cards-subfield":
				new SubfieldElement(source, element, context, this.app);
				break;
			case "cards-name":
				new NameCardElement(source, element, context, this.app);
				break;
			case "cards-countdown":
				new CountdownCardElement(source, element, context, this.app);
				break;
			default:
				break;
		}
	}
}
