<template>
    <div class="home">输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。<br />
    </div>
</template>

<script>
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
const pRoot = {
    val: 1,
    left: {
        val: 1,
        left: {
            val: 2
        },
        right: {
            val: 1,
            left: {
                val: 2
            },
            right: {
                val: 3,
            }
        }
    },
    right: {
        val: 3,
    }
}
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

export default {
    name: "offer-38",
    components: {},
    mounted: function () {
        console.log(TreeDepth(pRoot));
    }
};
</script>
