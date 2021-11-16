// JZ8 二叉树的下一个结点
// 给定一个二叉树其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，
// 同时包含指向父结点的next指针。下图为一棵有9个节点的二叉树。树中从父节点指向子节点的指针用实线表示，
// 从子节点指向父节点的用虚线表示
// 输入:{8,6,10,5,7,9,11},8
// 返回: 9

// next指针指向父节点
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
            val: 3,
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
function GetNext (pRoot) {
    // pRoot 有父节点，在一棵树里面，现在要找出pRoot中序遍历的下一个节点
    // 其实就是找pRoot 右子树的最左边的节点
    if (!pRoot) {
        return null;
    }
    if (pRoot.right) {
        pRoot = pRoot.right;
        while (pRoot.left) {
            pRoot = pRoot.left;
        }
        return pRoot;
    }
    // pRoot 是叶子节点
    // pRoot 如果是左叶子节点，那下一个节点就是父节点
    // pRoot 如果是右叶子节点，那下一节点就是父节点的父节点
    while (pRoot.next) {
        let root = pRoot.next;
        if (root.left === pRoot) { 
            return root;
        }
        pRoot = pRoot.next;
    }
    return null;
}