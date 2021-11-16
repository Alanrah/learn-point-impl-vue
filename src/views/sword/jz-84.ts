// 给定一个二叉树root和一个整数值 sum ，求该树有多少路径的的节点值之和等于 sum 。
// 1.该题路径定义不需要从根节点开始，也不需要在叶子节点结束，但是一定是从父亲节点往下到孩子节点
// 2.总节点数目为n
// 3.保证最后返回的路径个数在整形范围内(即路径个数小于231-1)

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
const node1 = {val: 1};
const node2 = {
    val: 0,
    right: {
        val: 1,
    },
    left: {
        val: 1
    }
}
const node3 = {
    val: 1,
    right:{
        val:2,
        right: {
            val: 3,
            right: {
                val: 4,
                right: {
                    val: 5,
                }
            }
        }
    }
}

let res = [];
function findPathWay (root, expectNumber) {
    if (!root) {
        return [];
    }
    const stack = [[root, expectNumber - root.val, [root.val]]];
    while (stack.length) {
        const [root, num, paths] = stack.pop();
        if (num === 0) {
            res.push(paths);
        }
        if (root.left) {
            stack.push([root.left, num - root.left.val, [...paths, root.left.val]]);
            FindPath(root.left, num)
        }
        if (root.right) {
            stack.push([root.right, num - root.right.val, [...paths, root.right.val]]);
            FindPath(root.right, num)
        }
    }
}
function FindPath (root, expectNumber) {
    findPathWay(root, expectNumber);
    // console.log(res);
    return res.length;
}


let count = 0;
function FindPath (root, expectNumber) {
    if (!root) {
        return count;
    }
    function dfs (root, expectNumber) {
        if (!root) {
            return 0;
        }
        expectNumber -= root.val;
        if (expectNumber === 0) {
            count++;
        }
        if (root.right) dfs(root.right, expectNumber);
        if (root.left) dfs(root.left, expectNumber);
    }
    dfs(root, expectNumber);
    if (root.left) FindPath(root.left, expectNumber);
    if (root.right) FindPath(root.right, expectNumber);
    return count;
}