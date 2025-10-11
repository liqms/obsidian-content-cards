function markdownToTree(markdown: string): TreeNode[] {
    const lines = markdown
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("#"));
    const tree: TreeNode[] = [];
    const stack: TreeNode[] = [];
    let title: string;
    let remark: string;

    for (const line of lines) {
        const level = line.split("").filter((c) => c === "#").length;
        const text = line.replace(/^#+\s*/, "");
        // 判断是否有remark
        const spitRegexpMatch = text.match(/%%/);
        if (spitRegexpMatch === null || spitRegexpMatch === undefined) {
            title = trim(text);
            remark = "";
        } else {
            title = trim(text.split("%%")[0]);
            remark = trim(text.split("%%")[1]);
        }
        // title 节点标题，remark 节点备注，level 节点层级，children 子节点，childrenCount 子节点数量
        const node: TreeNode = {
            title,
            remark,
            level,
            children: [],
            childrenCount: 0,
        };

        while (stack.length >= level) {
            stack.pop();
        }

        if (stack.length === 0) {
            tree.push(node);
        } else {
            stack[stack.length - 1].children.push(node);
            stack[stack.length - 1].childrenCount++;
        }

        stack.push(node);
    }

    return tree;
}
// 处理空字符串的情况
const trim = (s: string): string => {
	const trimmed = s.trim();
	return trimmed.length === 0 ? "\u200B" : trimmed;
};
export default markdownToTree;