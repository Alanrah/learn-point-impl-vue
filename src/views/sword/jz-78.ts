// JZ78 把二叉树打印成多行
// 给定一个节点数为 n 二叉树，要求从上到下按层打印二叉树的 val 值，同一层结点从左至右输出，每一层输出一行，将输出的结果存放到一个二维数组中返回。

const node = {
    val: 1,
    left: {
        val: 2,
    },
    right: {
        val: 3,
        left: {
            val: 4,
            left: null,
            right: null,
        },
        right: {
            val: 5,
            left: null,
            right: null,
        }
    }
}
function Print(pRoot){
    // 这笔jz77还简单了呢
    let res = [];
    if(!pRoot) {
        return res;
    }
    let queue = [pRoot];
    while(queue.length) {
        let len = queue.length;
        let temp = [];
        while(len) {
            const cur = queue.shift();
            temp.push(cur.val);
            cur.left ?  queue.push(cur.left): '';
            cur.right ? queue.push(cur.right) : '';
            len--;
        };
        res.push(temp);
    }
    return res;
}