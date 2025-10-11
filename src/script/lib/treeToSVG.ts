
// 函数实现输入tree数组，返回svg，包含 map 和 wbs 
function treeToSvg(tree: TreeNode[], color: string, type: string,x:number,height:number): string {
    if (!tree || tree.length === 0) {
        return "";
    }
    let svg = ``;
    let nodeWidth;
    let nodeHeight;
    let nodeTitleLineNum;
    let nodeRemarkLineNum;
     // 叶节点Y坐标
    let leafNodeY = 0;
     // 当前node的height
     let currentNodeHeight = 0;
    const horizontalSpacing = 80;
    const verticalSpacing = 20;
    // 默认颜色
    if (color === ""||color === undefined) {
        color = "color-active";
    }
    // node 结束Y坐标
    let lastNodeY = 0;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        const nodeTitle = node.title;
        const nodeRemark = node.remark;
        const nodeLevel = node.level;
        const nodeChildren = node.children;
        const nodeChildrenCount = node.childrenCount;
        const nodeSize = calculateNodeSize(nodeTitle, nodeRemark, nodeLevel);
        nodeWidth = nodeSize.width;
        nodeHeight = nodeSize.height;
        nodeTitleLineNum = nodeSize.titleLineNum;
        nodeRemarkLineNum = nodeSize.remarkLineNum;
        // title remark 字符串分割
        let titleLines = splitStringByWidth(nodeTitle, 14);
        let remarkFirstLine = splitStringByWidth(nodeRemark, 17)[0] || '';
        const currentX = x;
        const currentY = height / (i + 1) / 2 - nodeHeight / 2;
        const mapTypeClass = `${node.level <= 3 ? node.level : "n"}`;
       
        // 绘制节点

        svg += `<rect class="mindmap-node-rect rect-${mapTypeClass}-${color}" x="${currentX}" y="${currentY}" width="${nodeWidth}" height="${nodeHeight}" />`;
        svg += `<text x="${currentX + 5}" y="${currentY + 20} " >`;
        // 绘制节点title remark
        for (let j = 0; j < nodeTitleLineNum; j++) {
            svg += `<tspan class="mindmap-node-title-${mapTypeClass}-${color}" x="${currentX + 5}" dy="${j * 20}">${titleLines[j]}</tspan>`;
        }
        if(nodeRemarkLineNum === 1){
            svg += `<tspan class="mindmap-node-remark-${mapTypeClass}-${color}" x="${currentX + 5}" dy="20">${remarkFirstLine}</tspan>`;
        }
        svg += '</text>';
        
        // 绘制连接线
        if (nodeChildren && nodeChildren.length > 0) {

            const childAreaHeight = calculateChildrenHeight(nodeChildren);
            const nodeDotX = currentX + nodeWidth;
            const nodeDotY = currentY + nodeHeight / 2;
            currentNodeHeight = childAreaHeight;

            for (let j = 0; j < nodeChildren.length; j++) {
                const childNodeSize = calculateNodeSize(nodeChildren[j].title, nodeChildren[j].remark, nodeChildren[j].level);
                const childCurrentY = lastNodeY;
                const childCurrentX = nodeDotX + horizontalSpacing;
                const childNodePotY = lastNodeY + childNodeSize.height / 2;
                const childNodePotX = childCurrentX;

                svg += `<path class="mindmap-path" d="M ${nodeDotX},${nodeDotY} L ${nodeDotX + horizontalSpacing / 2},${nodeDotY} L ${childCurrentX - horizontalSpacing / 2},${childNodePotY} L ${childNodePotX},${childNodePotY} " fill="none"/>`;
            }
            // 递归绘制子节点
            svg += treeToSvg(nodeChildren, color, "map", nodeDotX + horizontalSpacing, childAreaHeight);
        }  else {
            leafNodeY += currentNodeHeight;
        } 

    }


    return svg;
}

// 输入 node 节点level ，title和remark，返回node的宽度和高度，title 要 调用方法splitTextByLine拆分，remark 要调用方法splitStringByWidth 获取第1个元素
function calculateNodeSize(title: string, remark: string, level: number): { width: number; height: number;titleLineNum:number; remarkLineNum:number;} {
    const titleLines = splitStringByWidth(title, 14);
    const remarkFirstLine = splitStringByWidth(remark, 17)[0] || '';
    const titleLineNum = titleLines.length;

    const charWidth = 8; // 假设每个字符宽度为8像素
    const lineHeight = 20; // 假设每行高度为20像素
    const titleWidth = getLen(titleLines[0]) * charWidth;
    const titleHeight = titleLines.length * lineHeight;

    let remarkLineNum = 0;
    let remarkWidth = 0;
    let remarkHeight = 0;
    if(remarkFirstLine === ''||remarkFirstLine === undefined){
         remarkLineNum = 0;      
         remarkWidth = 0;
         remarkHeight = 0;  
    }else{
         remarkLineNum = 1;
         remarkWidth = getLen(remarkFirstLine) * charWidth * 0.8;
         remarkHeight = lineHeight * 0.8;
    }


    if (level === 1) {
        const nodeWidth = Math.max(titleWidth, remarkWidth) + 10 ;
        const nodeHeight = titleHeight  + remarkHeight + 10;
        return { width: nodeWidth, height: nodeHeight,titleLineNum:titleLineNum, remarkLineNum:remarkLineNum };
    } else {
        const nodeWidth = Math.max(titleWidth, remarkWidth) * 0.9 + 10;
        const nodeHeight = titleHeight + remarkHeight + 10;
        return { width: nodeWidth, height: nodeHeight,titleLineNum:titleLineNum, remarkLineNum:remarkLineNum  };
    }
    

    
}


/**
 * 输入字符串，按最大宽度截取字符串，返回截取后的字符串数组
 * @param str - 输入的字符串
 * @param maxWidth - 每行的最大宽度（字符数）
 * @returns 截取后的字符串数组
 */
function splitStringByWidth(str: string, maxWidth: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < str.length; i += maxWidth) {
        result.push(str.slice(i, i + maxWidth));
    }
    return result;
}

// 计算children 的 height
function calculateChildrenHeight(children: TreeNode[]): number {
    let leafNodeNum = countLeaves(children);
    let height = leafNodeNum * 100;  
    return height;
}
// 计算字符串长度，汉字算2，英文算1
function getLen(str: string) {    
    var len = 0;    
    for (var i=0; i<str.length; i++) {    
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {    
             len += 2;    
         } else {    
             len ++;    
         }    
     }    
    return len;    
}    
// 计算树的叶节点数量
    function countLeaves(node: TreeNode[]): number {
        let count = 0;
        for (let i = 0; i < node.length; i++) {
            if (node[i].childrenCount === 0) {
                count++;
            } else {
                count += countLeaves(node[i].children);
            }
        }
        return count;
    }
export default treeToSvg;