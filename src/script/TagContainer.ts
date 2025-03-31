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
import { MindmapCardElement } from "./element/MindmapElement";
import { language } from "./main";

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
			case language[0]:
				new TimelineVElement(source, element, context, this.app);
				break;
			case language[1]:
				new TimelineHElement(source, element, context, this.app);
				break;
			case language[2]:
				new HighlightBlockElement(source, element, context, this.app);
				break;
			case language[3]:
				new TargetCardElement(source, element, context, this.app);
				break;
			case language[4]:
				new BookCardElement(source, element, context, this.app);
				break;
			case language[5]:
				new MusicCardElement(source, element, context, this.app);
				break;
			case language[6]:
				new MovieCardElement(source, element, context, this.app);
				break;
			case language[7]:
				new AlbumCardElement(source, element, context, this.app);
				break;
			case language[8]:
				new SubfieldElement(source, element, context, this.app);
				break;
			case language[9]:
				new NameCardElement(source, element, context, this.app);
				break;
			case language[10]:
				new CountdownCardElement(source, element, context, this.app);
				break;
			case language[11]:
				new MindmapCardElement(source, element, context, this.app);
				break;
			default:
				break;
		}
	}
}
