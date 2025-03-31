import { App, MarkdownPostProcessorContext } from "obsidian";
import { MindmapParser } from "../TagParsers";
import { ItemContent } from "../ItemContent";
import { getTextInLanguage } from "../lang/helpers";

export class MindmapCardElement {
	app: App;
	context: MarkdownPostProcessorContext;
	source: string;
	element: HTMLElement;
	cardsEl: HTMLElement;
	constructor(
		source: string,
		element: HTMLElement,
		context: MarkdownPostProcessorContext,
		app: App
	) {
		element.className = "container";
		this.app = app;
		this.context = context;
		this.source = source;
		this.element = element;
		this.cardsEl = this.createCardsEl();
	}

	createCardsEl(): HTMLElement {
		const MindmapElementInfo = MindmapParser(this.source);
		const cardsEl = this.element;
		
		
		MindmapElementInfo.forEach((item) => {
			const validateResult = this.validateMindmapFormat(item.content);
			const color = item.color;
			const mindmapEl = cardsEl.createEl("div", {
				cls: "mindmap",
			});
			
//			alert(validateResult.status);
			if (validateResult.status === false) {
				cardsEl.createEl("p", { text: validateResult.message });
			} else {
				alert(item.content);
				const mindmapDataArray = this.toMindmapDataArray(item.content);
				const mindmapHTML = this.generateMindmapHTML(mindmapDataArray);
				mindmapEl.innerHTML = mindmapHTML;
				
				
			}
			
		});
		alert(cardsEl.outerHTML);
		return cardsEl;
	}

	// 验证 mindmap 格式,只有一个根节点
	validateMindmapFormat(mindmap: string): { status: boolean; message: string } {
		const mindmapRegexp = /^[ \t]*# /gm;
		const mindmapMatch = mindmap.match(mindmapRegexp);
		if (mindmapMatch!== null && mindmapMatch!== undefined) {
			if (mindmapMatch.length === 1) {
				return {
					status: true,
					message: '',
				};
			} else {
				return {
					status: false,
					message: getTextInLanguage("node_1"),
				};
			}
		} else {
			return {
				status: false,
				message: getTextInLanguage("node_not_exist"),
			};
		}
	}
	// 组装 mindmap 数组
	toMindmapDataArray(mindmap: string): {level: number;title: string; desc: string;}[] {
		const nodeRegexp = /^[ \t]*(#+) (.*)$/gm;
		const nodes: {level: number;title: string; desc: string;}[] = [];
		let nodeMatch;
		const spitRegexp = /%%/;


		while ((nodeMatch = nodeRegexp.exec(mindmap))!== null) {
			const level = nodeMatch[1].length;
			// 判断是否有描述
			const spitRegexpMatch = nodeMatch[2].match(spitRegexp);
//			alert(nodeMatch);
//			alert(spitRegexpMatch);
			if (spitRegexpMatch === null || spitRegexpMatch === undefined) {
				const title = nodeMatch[2];
				const desc = '';
				nodes.push({
					level: level,
					title: title,
					desc: '',
				});
//				alert(level);
//				alert(title);
//				alert(desc);
			} else {
				const titleRegexp = /^(.*)%%/;
				const descRegexp = /%%(.*)$/;
				const title = titleRegexp.exec(nodeMatch[2])![1];
				const desc = descRegexp.exec(nodeMatch[2])![1];
				nodes.push({
					level: level,
					title: title,
					desc: desc,
				})
//				alert(level);
//				alert(title);
//				alert(desc);
			}			
		}
		
		
		return nodes;
	}
	

	// 生成 mindmap HTML 结构
	generateMindmapHTML(nodes:{level: number;title: string; desc: string;}[] ): string {
		let html = '';
		const stack: number[] = [];
		for (const {level,title,desc} of nodes) {
			while (stack.length > 0 && stack[stack.length - 1] >= level) {
				stack.pop();
				html += '</ul></li>';
			}
			if (stack.length === 0 || stack[stack.length - 1] < level) {
				html += `<li>`;
				if (level === 1) {
					html += '<div class="map-node-1">';
					html += `<h1>${title}</h1>`;
					if (desc) html += `<p>${desc}</p>`;
					html += '</div>';
				} else if (level === 2) {
					html += '<div class="map-node-2">';
					html += `<h1>${title}</h1>`;
					if (desc) html += `<p>${desc}</p>`;
					html += '</div>';
				} else {
					html += '<div class="map-node-3">';
					html += `<h1>${title}</h1>`;
					if (desc) html += `<p>${desc}</p>`;
					html += '</div>';
				}
				
				html += '<ul>';
				stack.push(level);
			}
		}
		while (stack.length > 0) {
			stack.pop();
			html += '</ul></li>';
		}
		return `<ul class="mindmap-root">${html}</ul>`.replace(/<ul><\/ul>/g, '');
	}
	
	
}
function elseif(arg0: boolean) {
	throw new Error("Function not implemented.");
}

