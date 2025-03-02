# Content Cards

English | [中文](README.zh-cn.md)

Insert content cards in Markdown, such as timeline, highlightblock, target card, book information card, music information card, movie information card, photoes ablum, business card, content subfield, countdown, etc.

# Features

-   Obsidian Mobile supported.

# Installation

Search `Content cards` in the Community plugins and install it.

# Usage

Each card is marked with '@card', and different parameters are added for different cards.

Some cards can be colored by adding '[color-red]' after '@card'.

Supported custom colors:

-   color-red
-   color-orange
-   color-yellow
-   color-green
-   color-cyan
-   color-blue
-   color-purple
-   color-pink

## Timeline

There are two modes of the timeline, one is the vertical timeline and the other is the horizontal timeline.

### Vertical timeline

![](/images/timeline-v.png)

#### Markdown Syntax

Insert a codeblock with the `cards-timeline-v` syntax.

````
```cards-timeline-v
@card
time: 2024-12-12
title: Example Titles
content:
描述描述 Sample Content 描述描述 Sample Content 描述描述 Sample Content
描述描述 Sample Content 描述描述 Sample Content 描述描述 Sample Content

@card [color-red]
time: 2024-12-12
title: Example Titles
content:
描述描述 Sample Content 描述描述 Sample Content 描述描述 Sample Content
描述描述 Sample Content 描述描述 Sample Content 描述描述 Sample Content
```
````

#### Parameters

| Option  | Card Type | Required | Description                                                                                    |
| ------- | --------- | -------- | ---------------------------------------------------------------------------------------------- |
| time    | timeline  | Yes      | date                                                                                           |
| title   | timeline  | Yes      | title, can be multi-line text                                                                  |
| content | timeline  | Yes      | Introduction, can be multi-line text, but only the first 3 lines will be displayed on the card |

### horizontal timeline

![](/images/timeline-h.png)

#### Markdown Syntax

Insert a codeblock with the `cards-timeline-h` syntax.

````
```cards-timeline-h
@card
time: 2024-12-12
title: Example Titles
content:
描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述

@card [color-red]
time: 2024-12-12
title: Example Titles
content:
描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
```
````

#### Parameters

| Option  | Type   | Required | Description                                                                                    |
| ------- | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| time    | string | Yes      | date                                                                                           |
| title   | string | Yes      | title                                                                                          |
| content | string | Yes      | Introduction, can be multi-line text, but only the first 3 lines will be displayed on the card |

## Highlightblock

![](/images/highlightblock.png)

Support for custom colors
The content supports markdown syntax

### Markdown Syntax

Insert a codeblock with the `cards-highlightblock` syntax.

````
```cards-highlightblock
@card [color-red]
示例文字示例文字示例文字
示例文字

@card
示例文字
示例文字
```
````

## Target card

![](/images/target.png)

### Markdown Syntax

Insert a codeblock with the `cards-target` syntax.

````
```cards-target
@card [color-red]
title: 指标名称
value: 1000
unit: 元

@card
title: 指标名称
value: 1,200
unit: 元
```
````

## book information card

![](/images/book.png)

### Markdown Syntax

Insert a codeblock with the `cards-book` syntax.

````
```cards-book
@card
title: Blindness Chronicles
cover: https://img3.doubanio.com/view/subject/s/public/s34269503.jpg
meta:
分类: 计算机
出版日期: 2022-08-27
作者: 若泽·萨拉马戈
评分: 9.1
introduction:
街上出现了第一个突然失明的人，紧接着是第二个、第三个……  一种会传染的失明症在城市蔓延，无人知晓疫情为何爆发、何时结束。  失明症造成了前所未有的恐慌与灾难
```
````

### Parameters

| Option       | Type   | Required | Description                                                                                    |
| ------------ | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| title        | string | Yes      | title                                                                                          |
| cover        | string | Yes      | Cover image, web url(https://...) are supported                                                |
| meta         | object | Yes      | meta                                                                                           |
| introduction | string | Yes      | Introduction, can be multi-line text, but only the first 3 lines will be displayed on the card |

## Music information card

![](/images/music.png)

### Markdown Syntax

Insert a codeblock with the `cards-music` syntax.

````
```cards-music
@card
title: Love Story
cover: https://p1.music.126.net/GZERNplXUdzTPkKqo2F4tA==/109951169217536854.jpg
meta:
艺术家: Taylor Swift
流派: 流行
```
````

### Parameters

| Option | Type   | Required | Description                                     |
| ------ | ------ | -------- | ----------------------------------------------- |
| title  | string | Yes      | title                                           |
| cover  | string | Yes      | Cover image, web url(https://...) are supported |
| meta   | object | Yes      | meta                                            |

## Movie information card

![](/images/movie.png)

### Markdown Syntax

Insert a codeblock with the `cards-movie` syntax.

````
```cards-movie
@card
title: 流浪地球2
cover: https://img9.doubanio.com/view/photo/s/public/p2885842436.jpg
meta:
导演: 郭帆
演员: 吴京 / 刘德华 / 李雪健 / 沙溢
分类: 国产
上映日期: 2023-01-22
评分: 8.3
introduction:
在并不遥远的未来，太阳急速衰老与膨胀，再过几百年整个太阳系将被它吞噬毁灭。为了应对这场史无前例的危机，地球各国放下芥蒂，成立联合政府，试图寻找人类存续的出路。通过摸索与考量，最终推着地球逃出太阳系的“移山计划”获得压倒性胜利。人们着手建造上万台巨大的行星发动机，带着地球踏上漫漫征程。满腔赤诚的刘培强（吴京 饰）和韩朵朵（王智 饰）历经层层考验成为航天员大队的一员，并由此相知相恋。但是漫漫征途的前方，仿佛有一股神秘的力量不断破坏者人类的自救计划。看似渺小的刘培强、量子科学家图恒宇（刘德华 饰）、联合政府中国代表周喆直（李雪健 饰）以及无数平凡的地球人，构成了这项伟大计划的重要一环……
```
````

### Parameters

| Option       | Type   | Required | Description                                                                                    |
| ------------ | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| title        | string | Yes      | title 称                                                                                       |
| cover        | string | Yes      | Cover image, web url(https://...) are supportedurl                                             |
| meta         | object | Yes      | meta 据                                                                                        |
| introduction | string | Yes      | Introduction, can be multi-line text, but only the first 3 lines will be displayed on the card |

## photoes ablum

![](/images/ablum.png)

### Markdown Syntax

Insert a codeblock with the `cards-ablum` syntax.

````
```cards-album
@card [color-blue]
title: 画册名称
images:
https://img9.doubanio.com/view/photo/s/public/p2885842436.jpg
https://img9.doubanio.com/view/photo/s/public/p2885842436.jpg
https://img9.doubanio.com/view/photo/s/public/p2885842436.jpg

https://img9.doubanio.com/view/photo/s/public/p2885842436.jpg
https://img9.doubanio.com/view/photo/s/public/p2885842436.jpg
```
````

### Parameters

| Option | Type   | Required | Description                                                                                            |
| ------ | ------ | -------- | ------------------------------------------------------------------------------------------------------ |
| title  | string | Yes      | title                                                                                                  |
| images | string | Yes      | Image links, 1 link per line, blank lines group images of albums, with a maximum of 9 images per group |

## Business card

![](/images/businesscard.png)

### Markdown Syntax

Insert a codeblock with the `cards-name` syntax.

````
```cards-name
@card
name: 姓名
tags: 标签,标签
remark: 人物的简单描述 A brief description of the character

@card [color-green]
name: 姓名
tags: 标签,标签
remark: 人物的简单描述 A brief description of the character
```
````

### Parameters

| Option | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| name   | string | Yes      | name        |
| tags   | string | Yes      | tags        |
| remark | string | Yes      | remark      |

## Content subfield

![](/images/subfield.png)

The content supports markdown syntax

### Markdown Syntax

Insert a codeblock with the `cards-subfield` syntax.

````
```cards-subfield
@card
示例文字
示例文字

@card
示例文字
示例文字
```
````

## Countdown

![](/images/countdown.png)

### Markdown Syntax

Insert a codeblock with the `cards-countdown` syntax.

````
```cards-countdown
@card [color-red]
title: 2026 new year
type: day
time: 2026-01-01
```
````

### Parameters

| Option | Type   | Required | Description                                                          |
| ------ | ------ | -------- | -------------------------------------------------------------------- |
| title  | string | Yes      | title                                                                |
| type   | string | Yes      | type,currently supports `day`,`sec`                                  |
| time   | string | Yes      | type=day, date, eg: 2024-02-12<br/>type=sec, timestamp, eg: 12:03:30 |

# Limitations and known bugs

You are greatly welcome to ask questions, post any suggestions, or report any bugs! The project is mainly maintained on GitHub:

Known issues:

-   The countdown cannot be updated in real time

# Changelog

| Version | Date       | Notes           |
| ------- | ---------- | --------------- |
| `1.0.0` | 2024-12-24 | Initial release |

# Pricing

The plugin is free, athough if you wanna say thanks, feel free to buy me a coffee.

![](/images/wechart.png)

# License

This project is released under the MIT License.

```

```
