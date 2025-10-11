import { App, MarkdownPostProcessorContext } from "obsidian";
import { MindmapCardParser } from "../TagParsers";
import { getTextInLanguage } from "../lang/helpers";
import treeToSvg from "../lib/treeToSVG";
import markdownToTree from "../lib/markdownToTree";


export class MindMapCardElement {
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
		element.className = "cards-container";
		this.app = app;
		this.context = context;
		this.source = source;
		this.element = element;
		this.cardsEl = this.createCardsEl();
	}
	

	createCardsEl(): HTMLElement {
		const MindMapItemInfo = MindmapCardParser(this.source);
		const cardsEl = this.element;
		MindMapItemInfo.forEach((item) => {
			const validateResult = this.validateMindmapFormat(item.map);
			const color = item.color;
			const mindmapEl = cardsEl.createDiv({ cls: "mindmap" });
			const treeLineNum = this.countLeaves(markdownToTree(item.map));
			const mapHeight = treeLineNum * 100;
			if (validateResult.status === false) {
				cardsEl.createEl("p", { text: validateResult.message });
			} else {
				const tree = markdownToTree(item.map);
				const svgContent = treeToSvg(tree, color,"map",0,mapHeight);
				const svg = `<svg class="mindmap-svg" width="100%" height="${mapHeight}">${svgContent}</svg>`;
				mindmapEl.innerHTML = svg;
			}
		});

		alert(cardsEl.outerHTML);
		return cardsEl;
	}
	// 验证 mindmap 格式,只有一个根节点
	validateMindmapFormat(mindmap: string): {
		status: boolean;
		message: string;
		lineNum: number;
	} {
		const mindmapRegexp = /^[ \t]*# /gm;
		const mindmapMatch = mindmap.match(mindmapRegexp);
		const mindmapLineNum = mindmap.match(/\n/g)?.length || 0;
		if (mindmapMatch !== null && mindmapMatch !== undefined) {
			if (mindmapMatch.length === 1) {
				return {
					status: true,
					message: "",
					lineNum: mindmapLineNum,
				};
			} else {
				return {
					status: false,
					message: getTextInLanguage("node_1"),
					lineNum: mindmapLineNum,
				};
			}
		} else {
			return {
				status: false,
				message: getTextInLanguage("node_not_exist"),
				lineNum: mindmapLineNum,
			};
		}
	}
	
	// 树结构转 html
	treeToHtml(tree: TreeNode[], color: string, ulType: string): string {
		if (!tree || tree.length === 0) {
			return "";
		}
		let html = "";
		if (ulType === "rootUl") {
			html += '<ul class="map-root">';
		} else if (ulType === "oneChildUl") {
			html += '<ul class="map-list-1">';
		} else {
			html += "<ul>";
		}

		for (const node of tree) {
			const mapTypeClass = `-${node.level <= 3 ? node.level : "n"}`;
			html += "<li>";
			html += `<div data-level="${node.level}" data-children="${node.childrenCount}" class="map-type${mapTypeClass} level${mapTypeClass}-${color}">`;
			html += `<div class="map-title">${node.title}</div>`;
			html += `<div class="map-remark">${node.remark}</div>`;
			html += "</div>";

			if (node.children && node.children.length == 1) {
				html += this.treeToHtml(node.children, color, "oneChildUl");
			} else {
				html += this.treeToHtml(node.children, color, "");
			}

			html += "</li>";
		}
		html += "</ul>";

		return html;
	}
	// 计算树的叶节点数量
    countLeaves(node: TreeNode[]): number {
        let count = 0;
        for (let i = 0; i < node.length; i++) {
            if (node[i].childrenCount === 0) {
                count++;
            } else {
				count += this.countLeaves(node[i].children);
            }
        }
        return count;
    }
}
