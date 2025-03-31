/**
 * 根据不同的 Tag ，调用不同的 Parser ，解析成不同的 Content
 *
 */

// 处理空字符串的情况
const trim = (s: string): string => {
	const trimmed = s.trim();
	return trimmed.length === 0 ? "\u200B" : trimmed;
};
// 定义参数解析
const toClassArray = (input: string): string[] => {
	input = input.trim();
	if (input[0] != "[" || input[input.length - 1] != "]") return [];

	return input
		.substring(1, input.length - 1)
		.trim()
		.split(/\s*,\s*/);
};
// timeline
const timelineRegex =
	/^[ \t]*@card(.+?)(?:^[ \t]*time:(.+?))?(?:^[ \t]*title:(.+?))?(?:^[ \t]*content:(.+?))?(?=^[ \t]*@card)/gimsu;

const TimeLineParser = (source: string): TimelineItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];

	while ((sourceMatch = timelineRegex.exec(source)) !== null) {
		const cardColor = toClassArray(sourceMatch[1]);
		parsed.push({
			color: cardColor[0],
			time: sourceMatch[2],
			title: sourceMatch[3],
			content: sourceMatch[4],
		});
	}

	return parsed;
};

// highlightblock
const highlightblockRegex = /^[ \t]*@card(.+?)(?:^(.+?))?(?=^[ \t]*@card)/gimsu;

const HighlightblockParser = (source: string): HighlightBlockItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = highlightblockRegex.exec(source)) !== null) {
		const cardColor = toClassArray(sourceMatch[1]);
		parsed.push({
			color: cardColor[0],
			content: sourceMatch[2],
		});
	}
	return parsed;
};

// targetcard
const targetcardRegex =
	/^[ \t]*@card(.+?)(?:^[ \t]*title:(.+?))?(?:^[ \t]*value:(.+?))?(?:^[ \t]*unit:(.+?))?(?=^[ \t]*@card)/gimsu;

const TargetCardParser = (source: string): TargetCardItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = targetcardRegex.exec(source)) !== null) {
		const cardColor = toClassArray(sourceMatch[1]);
		parsed.push({
			color: cardColor[0],
			title: sourceMatch[2],
			value: sourceMatch[3],
			unit: sourceMatch[4],
		});
	}
	return parsed;
};

// bookcard
const bookcardRegex =
	/^[ \t]*@card(.+?)(?:^[ \t]*title:(.+?))?(?:^[ \t]*cover:(.+?))?(?:^[ \t]*meta:(.+?))?(?:^[ \t]*introduction:(.+?))?(?=^[ \t]*@card)/gimsu;

const BookCardParser = (source: string): BookCardItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = bookcardRegex.exec(source)) !== null) {
		parsed.push({
			title: sourceMatch[2],
			cover: trim(sourceMatch[3]),
			meta: sourceMatch[4],
			introduction: sourceMatch[5],
		});
	}
	return parsed;
};

// musiccard
const musiccardRegex =
	/^[ \t]*@card(.+?)(?:^[ \t]*title:(.+?))?(?:^[ \t]*cover:(.+?))?(?:^[ \t]*meta:(.+?))?(?=^[ \t]*@card)/gimsu;

const MusicCardParser = (source: string): MusicCardItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = musiccardRegex.exec(source)) !== null) {
		parsed.push({
			title: sourceMatch[2],
			cover: trim(sourceMatch[3]),
			meta: sourceMatch[4],
		});
	}
	return parsed;
};

// moviecard
const moviecardRegex =
	/^[ \t]*@card(.+?)(?:^[ \t]*title:(.+?))?(?:^[ \t]*cover:(.+?))?(?:^[ \t]*meta:(.+?))?(?:^[ \t]*introduction:([\s\S]*))?(?=^[ \t]*@card)/gimsu;

const MovieCardParser = (source: string): MovieCardItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = moviecardRegex.exec(source)) !== null) {
		parsed.push({
			title: sourceMatch[2],
			cover: trim(sourceMatch[3]),
			meta: sourceMatch[4],
			introduction: sourceMatch[5],
		});
	}
	return parsed;
};

// albumcard
const albumcardRegex =
	/^[ \t]*@card(.+?)(?:^[ \t]*title:(.+?))?(?:^[ \t]*images:(.+?))?(?=^[ \t]*@card)/gimsu;

const AlbumCardParser = (source: string): AlbumCardItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = albumcardRegex.exec(source)) !== null) {
		const cardColor = toClassArray(sourceMatch[1]);
		parsed.push({
			color: cardColor[0],
			title: sourceMatch[2],
			images: sourceMatch[3],
		});
	}
	return parsed;
};

// subfield
const subfieldRegex = /^[ \t]*@card(.+?)?(?=^[ \t]*@card)/gimsu;

const SubfieldParser = (source: string): SubfieldItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = subfieldRegex.exec(source)) !== null) {
		parsed.push({
			content: sourceMatch[1],
		});
	}
	return parsed;
};

// namecard
const namecardRegex =
	/^[ \t]*@card(.+?)(?:^[ \t]*name:(.+?))?(?:^[ \t]*tags:(.+?))?(?:^[ \t]*remark:(.+?))?(?=^[ \t]*@card)/gimsu;

const toNameStr = (input: string): string[] => {
	input = input.trim();
	if (input[0] == null) return [];

	return input
		.substring(input.length - 1, input.length)
		.trim()
		.split(/\s*,\s*/);
};

const NameCardParser = (source: string): NameCardItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = namecardRegex.exec(source)) !== null) {
		const cardColor = toClassArray(sourceMatch[1]);
		const iconX = toNameStr(sourceMatch[2]);
		parsed.push({
			color: cardColor[0],
			name: sourceMatch[2],
			icon: iconX[0],
			tags: sourceMatch[3],
			remark: sourceMatch[4],
		});
	}
	return parsed;
};

// countdown
const countdownRegex =
	/^[ \t]*@card(.+?)(?:^[ \t]*title:(.+?))?(?:^[ \t]*type:(.+?))?(?:^[ \t]*time:(.+?))?(?=^[ \t]*@card)/gimsu;

const CountdownCardParser = (source: string): CountdownItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = countdownRegex.exec(source)) !== null) {
		const cardColor = toClassArray(sourceMatch[1]);
		parsed.push({
			color: cardColor[0],
			title: sourceMatch[2],
			type: trim(sourceMatch[3]),
			time: trim(sourceMatch[4]),
		});
	}
	return parsed;
};

// mindmap
const mindmapRegex = /^[ \t]*@card(.+?)(?:^(.+?))?(?=^[ \t]*@card)/gimsu;

const MindmapParser = (source: string): MindmapItemInfo[] => {
	source += "\n@card";
	let sourceMatch;
	const parsed = [];
	while ((sourceMatch = mindmapRegex.exec(source)) !== null) {
		const cardColor = toClassArray(sourceMatch[1]);
		parsed.push({
			color: cardColor[0],
			content: sourceMatch[2],
		});
	}
	return parsed;
};

export {
	TimeLineParser,
	HighlightblockParser,
	TargetCardParser,
	BookCardParser,
	MusicCardParser,
	MovieCardParser,
	AlbumCardParser,
	SubfieldParser,
	NameCardParser,
	CountdownCardParser,
	MindmapParser,
};
