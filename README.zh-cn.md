# Content Cards

[![Downloads](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2FHEAD%2Fcommunity-plugin-stats.json&query=content-cards.downloads&logo=obsidian&label=download&color=%25274222128)](https://obsidian.md/plugins?search=Content%20Cards)
[![Version](https://img.shields.io/github/v/release/liqms/obsidian-content-cards)](https://github.com/liqms/obsidian-content-cards)

[English](README.md) | 中文

在 Markdown 中插入各种内容卡片，包括时间轴，高亮块，指标卡片，图书卡片，音乐卡片，电影卡片，照片专辑，名片，内容分栏，倒计时等。

# 特性

-   支持 Obsidian 移动版

# I 安装

在官方“社区插件列表”中搜索 `Content Cards`，然后安装插件。

# 如何使用

每个卡片用 `@card` 标记，然后不同 card 添加不同的参数。

部分卡片可以设置颜色，在`@card` 后面添加` [color-red]` 即可。

支持的自定义颜色：

-   color-red
-   color-orange
-   color-yellow
-   color-green
-   color-cyan
-   color-blue
-   color-purple
-   color-pink

## 时间轴

时间轴有两种模式，一种是竖向时间轴，一种是横向时间轴。

### 竖向时间轴

![](/images/timeline-v.png)

#### 语法

使用 `cards-timeline-v` 语法插入一个代码块。

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

#### 参数

| Option  | Card Type | Required | Description                                                                                    |
| ------- | --------- | -------- | ---------------------------------------------------------------------------------------------- |
| time    | timeline  | Yes      | date                                                                                           |
| title   | timeline  | Yes      | title, can be multi-line text                                                                  |
| content | timeline  | Yes      | Introduction, can be multi-line text, but only the first 3 lines will be displayed on the card |

### 横向时间线

![](/images/timeline-h.png)

#### 语法

使用 `cards-timeline-h`语法插入一个代码块。

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

#### 参数

| Option  | Type   | Required | Description                                                   |
| ------- | ------ | -------- | ------------------------------------------------------------- |
| time    | string | Yes      | date                                                          |
| title   | string | Yes      | title / 标题                                                  |
| content | string | Yes      | Introduction, 介绍，可以多行文本，但只有前 3 行将显示在卡片上 |

## 高亮块

![](/images/highlightblock.png)

支持自定义颜色
内容支持 markdown 语法

### 语法

使用 `cards-highlightblock` 语法插入一个代码块。

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

## 指标卡片

![](/images/target.png)

### 语法

使用 `cards-target` 语法插入一个代码块。

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

## 图书卡片

![](/images/book.png)

### 语法

使用 `cards-book` 语法插入一个代码块。

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

### 参数

| Option       | Type   | Required | Description                                                   |
| ------------ | ------ | -------- | ------------------------------------------------------------- |
| title        | string | Yes      | title , 图书名称                                              |
| cover        | string | Yes      | Cover image, web url(https://...) , 封面图片 url              |
| meta         | object | Yes      | meta，图书元数据                                              |
| introduction | string | Yes      | Introduction, 介绍，可以多行文本，但只有前 3 行将显示在卡片上 |

## 音乐卡片

![](/images/music.png)

### Markdown 语法

使用 `cards-music` 语法插入一个代码块。

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

### 参数

| Option | Type   | Required | Description                                                   |
| ------ | ------ | -------- | ------------------------------------------------------------- |
| title  | string | Yes      | title , 音乐名称                                              |
| cover  | string | Yes      | Cover image, web url(https://...) are supported, 封面图片 url |
| meta   | object | Yes      | meta，音乐元数据                                              |

## 电影卡片

![](/images/movie.png)

### Markdown 语法

使用 `cards-movie` 语法插入一个代码块。

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

### 参数

| Option       | Type   | Required | Description                                                   |
| ------------ | ------ | -------- | ------------------------------------------------------------- |
| title        | string | Yes      | title , 电影名称                                              |
| cover        | string | Yes      | Cover image, web url(https://...) , 封面图片 url              |
| meta         | object | Yes      | meta，电影元数据                                              |
| introduction | string | Yes      | Introduction, 介绍，可以多行文本，但只有前 3 行将显示在卡片上 |

## 照片专辑

![](/images/ablum.png)

### Markdown 语法

使用 `cards-ablum` 语法插入一个代码块。

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

### 参数

| Option | Type   | Required | Description                                                            |
| ------ | ------ | -------- | ---------------------------------------------------------------------- |
| title  | string | Yes      | title ， 专辑名称                                                      |
| images | string | Yes      | Image links, 图片链接,每行 1 个链接，空行分组专辑的图片，每组最多 9 张 |

## 名片

![](/images/businesscard.png)

### Markdown 语法

使用 `cards-name` 语法插入一个代码块。

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

### 参数

| Option | Type   | Required | Description   |
| ------ | ------ | -------- | ------------- |
| name   | string | Yes      | name / 名字   |
| tags   | string | Yes      | tags / 标签   |
| remark | string | Yes      | remark / 备注 |

## 内容分栏

![](/images/subfield.png)

内容支持 markdown 语法

### 语法

使用 `cards-subfield` 语法插入一个代码块。

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

## 倒计时

![](/images/countdown.png)

### 语法

使用 `cards-countdown` 语法插入一个代码块。

````
```cards-countdown
@card [color-red]
title: 2026 new year
type: day
time: 2026-01-01
```
````

### 参数

| Option | Type   | Required | Description                                                          |
| ------ | ------ | -------- | -------------------------------------------------------------------- |
| title  | string | Yes      | title / 标题                                                         |
| type   | string | Yes      | type,currently supports `day`,`sec` / 类型                           |
| time   | string | Yes      | type = day, date, eg: 2024-02-12<br/>type = sec, timestamp, eg: 12:03:30 |

# 限制和已知问题

非常欢迎你提出问题、发布任何建议或报告任何错误！该项目主要在 GitHub 上维护：

当前存在的已知问题：

-   倒计时不能实时更新

# Changelog / 版本历史

| Version | Date       | Notes           |
| ------- | ---------- | --------------- |
| `1.0.0` | 2024-12-24 | Initial release |

# 付费

这个插件是免费的，如果您觉得插件对您有用的话, 可以给作者买杯咖啡支持一下:

![](/images/wechart.png)

# License

This project is released under the MIT License.

```

```
