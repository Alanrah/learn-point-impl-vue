// 输入一颗二叉树的根节点root和一个整数expectNumber，找出二叉树中结点值的和为expectNumber的所有路径。
// 1.该题路径定义为从树的根结点开始往下一直到叶子结点所经过的结点
// 2.叶子节点是指没有子节点的节点
// 3.路径只能从父节点到子节点，不能从子节点到父节点
// 4.总节点数目为n
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

function FindPath (root, expectNumber) {
    if (!root) {
        return [];
    }
    const res = [];
    const stack = [[root, expectNumber - root.val, [root.val]]];
    while (stack.length) {
        const [root, num, paths] = stack.pop();
        if (num === 0 && !root.left && !root.right) {
            res.push(paths);
        }
        if(root.left) {
            stack.push([root.left, num - root.left.val, [...paths, root.left.val]]);
        }
        if (root.right) {
            stack.push([root.right, num - root.right.val, [...paths, root.right.val]]);
        }
    }
    return res;
}
