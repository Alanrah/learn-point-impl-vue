// JZ79 判断是不是平衡二叉树

// 输入一棵节点数为 n 二叉树，判断该二叉树是否是平衡二叉树。
// 在这里，我们只需要考虑其平衡性，不需要考虑其是不是排序二叉树
// 平衡二叉树（Balanced Binary Tree），具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。
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

function depth(pRoot) {
    if(!pRoot) {
        return 0;
    }
    let l = depth(pRoot.left);
    let r = depth(pRoot.right);
    if(l == -1) return -1;
    if(r == -1) return -1; // 若某棵子树的高度为-1,则代表整棵树都不是平衡二叉树
    return Math.abs(l - r) > 1 ? -1 : Math.max(l, r) + 1;
}
function IsBalanced_Solution(pRoot)
{
    if(!pRoot) {
        return true;
    }
    return depth(pRoot) !== -1;
}