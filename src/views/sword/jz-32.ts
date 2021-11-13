// JZ32 从上往下打印二叉树

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
// 层序遍历二叉树
function PrintFromTopToBottom(root)
{
    if (!root) {
        return [];
    }
    let queue = [root];
    let res = [];
    while(queue.length) {
        const cur = queue.shift()
        res.push(cur.val);
        cur.left ?  queue.push(cur.left): '';
        cur.right ? queue.push(cur.right) : '';
    }
    return res;
}