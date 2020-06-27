<template>
    <div class="home">输入一棵二叉树，判断该二叉树是否是平衡二叉树<br />
        在这里，我们只需要考虑其平衡性，不需要考虑其是不是排序二叉树。<br />
        <p>平衡树的概念：</p>
        <p>(AVL 树）：空树，或者任一结点左、右子树高度差的绝对值不超过1. 即|BF(T)|<=1.</p>
    </div>
</template>

<script>
const pRoot = {
    val: 1,
    left: {
        val: 1,
        left: {
            val: 2
        },
        right: {
            val: 1,
        }
    },
    right: {
        val: 3,
    }
}
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeDepth(pRoot) {
    if (!pRoot) {
        return 1;
    }
    const leftTree = pRoot.left;
    const rightTree = pRoot.right;
    if (leftTree || rightTree || pRoot.val) {
        return 1 + (TreeDepth(leftTree) > TreeDepth(rightTree) ? TreeDepth(leftTree) : TreeDepth(rightTree));
    }
    return TreeDepth(leftTree) > TreeDepth(rightTree) ? TreeDepth(leftTree) : TreeDepth(rightTree);
}
function IsBalanced_Solution(pRoot) {
    if (!pRoot) {
        return true;
    }
    // write code here
    const leftTree = pRoot.left;
    const rightTree = pRoot.right;
    return Math.abs(TreeDepth(leftTree) - TreeDepth(rightTree)) <= 1;
}

export default {
    name: "offer-39",
    components: {},
    mounted: function () {
        console.log(IsBalanced_Solution(pRoot));
    }
};
</script>
