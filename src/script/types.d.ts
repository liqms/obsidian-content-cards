/*定义每个 card 的 item 接收数据结构*/ 
// timeline
interface TimelineItemInfo {
    [key: string]: string,
    color: string,
    time: string,
    title: string,
    content: string
}

type TimelineParser = (source: string) => TimelineItemInfo[];

interface TimelineTagParser {
    tag: string,
    parser: TimelineParser
}

// HighlightBlock
interface HighlightBlockItemInfo {
    [key: string]: string,
    color: string,
    content: string
}

type HighlightBlockParser = (source: string) => HighlightBlockItemInfo[];

interface HighlightBlockTagParser {
    tag: string,
    parser: HighlightBlockParser
}

// TargetCard
interface TargetCardItemInfo {
    [key: string]: string,
    color: string,
    title: string,
    value: string,
    unit: string
}

type TargetCardParser = (source: string) => TargetCardItemInfo[];

interface TargetCardTagParser {
    tag: string,
    parser: TargetCardParser
}

// BookCard
interface BookCardItemInfo {
    [key: string]: string,
    title: string,
    cover: string,
    meta: string,
    introduction: string
}

type BookCardParser = (source: string) => BookCardItemInfo[];

interface BookCardTagParser {
    tag: string,
    parser: BookCardParser
}

// MusicCard
interface MusicCardItemInfo {
    [key: string]: string,
    title: string,
    cover: string,
    meta: string,
}

type MusicCardParser = (source: string) => MusicCardItemInfo[];

interface MusicCardTagParser {
    tag: string,
    parser: MusicCardParser
}

// MovieCard
interface MovieCardItemInfo {
    [key: string]: string,
    title: string,
    cover: string,
    meta: string,
    introduction: string
}

// Album
interface AlbumCardItemInfo {
    [key: string]: string,
    color: string,
    title: string,
    images: string
}

type AlbumCardParser = (source: string) => AlbumCardItemInfo[];

interface AlbumCardTagParser {
    tag: string,
    parser: AlbumCardParser
}

// Subfield
interface SubfieldItemInfo {
    [key: string]: string,
    content: string
}

type SubfieldParser = (source: string) => SubfieldItemInfo[];

interface SubfieldTagParser {
    tag: string,
    parser: SubfieldParser
}

// NameCard
interface NameCardItemInfo {
    [key: string]: string,
    color: string,
    name: string,
    icon: string,
    tags: string,
    remark: string
}

type NameCardParser = (source: string) => NameCardItemInfo[];

interface NameCardTagParser {
    tag: string,
    parser: NameCardParser
}

// CountDown
interface CountdownItemInfo {
    [key: string]: string,
    color: string,
    title: string,
    type: string,
    time: string
}

type CountdownParser = (source: string) => CountdownItemInfo[];

interface CountdownTagParser {
    tag: string,
    parser: CountdownParser
}

// mindmap
interface MindmapItemInfo {
    [key: string]: string,
    color: string,
    content: string
}
type MindmapParser = (source: string) => MindmapItemInfo[];

interface MindmapTagParser {
    tag: string,
    parser: MindmapParser
}
