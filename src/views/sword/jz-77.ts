/* 给定一个二叉树，返回该二叉树的之字形层序遍历，（第一层从左向右，下一层从右向左，一直这样交替）
function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// [[8],[10,6],[5,7,9,11]]
const node = {
    val: 8,
    left: {
        val: 6,
        left: {
            val: 5,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        }
    },
    right: {
        val: 10,
        left: {
            val: 9,
            left: null,
            right: null,
        },
        right: {
            val: 11,
            left: null,
            right: null,
        }
    }
}

// 考察BFS(Breath First Search)广度优先搜索，DFS(Deep First Search)深度优先搜索
function Print (pRoot = node) {
    let res = [];
    if (!pRoot) {
        return res;
    }
    let queue = [pRoot];
    let level = 1;
    while(queue.length) {
        let temp = [];
        let len = queue.length; // 当前层的节点数目
        while(len) {
            let cur = queue.shift();
            temp.push(cur.val);
            len--;
            cur.left ?  queue.push(cur.left): '';
            cur.right ? queue.push(cur.right) : '';
        }
        level % 2 === 1 ? res.push(temp) : res.push(temp.reverse());
        level++;
    }
    return res;
}