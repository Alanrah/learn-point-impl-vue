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
// JZ82 二叉树中和为某一值的路径(一)
// 给定一个二叉树root和一个值 sum ，判断是否有从根节点到叶子节点的节点值之和等于 sum 的路径。
// 1.该题路径定义为从树的根结点开始往下一直到叶子结点所经过的结点
// 2.叶子节点是指没有子节点的节点
// 3.路径只能从父节点到子节点，不能从子节点到父节点
// 4.总节点数目为n
// 输入：{ 5, 4, 8, 1, 11,#, 9,#,#, 2, 7 }, 22
// 返回值：true

// 地柜解法
function getSum(root, res, sum){
    if (!root) {
        return false;
    }
    res += root.val;
    if (!root.left && !root.right && res === sum) return true;
    return getSum(root.left, res, sum) || getSum(root.right, res, sum);
}
function hasPathSum1 (root, sum) {
    return getSum(root, 0, sum);
}

// 另一种递归
function dfs (root, target) {
    if (!root) {
        return false;
    }
    target -= root.val;
    if (!root.left && !root.right && target === 0) return true;
    return dfs(root.left, target) || dfs(root.right, target);
}
function hasPathSumDfs (root, sum) {
    return dfs(root, sum);
}



// 层次  from https://cloud.tencent.com/developer/article/1618046
// 遍历，保存每一条路径
function hasPathSum (root, sum) {
    if (!root) {
        return false;
    }
    const stack = [[root, sum, [root.val]]];
    const result = [];

    while (stack.length) {
        const [node, num, path] = stack.pop();

        if (!node.left && !node.right && node.val === num) {
            result.push(path);
        }
        if (node.right) {
            stack.push([
                node.right,
                num - node.val,
                [...path, node.right.val]
            ]);
        }
        if (node.left) {
            stack.push([node.left, num - node.val, [...path, node.left.val]]);
        }
    }
    return !!result.length;
}


// 本来想采用中序遍历，求子节点的path值，但是发现中序遍历，其实中间会把父节点pop出去，取的是一层一层子树的和
// 但是这种解法不适用于左右子树只存在其一的情况
const node1  = {val: 1, left: {val: 2}}
function hasPathSumError( root ,  sum ) {
    // write code here
    if (!root) {
        return false;
    }
    let stack = [];
    let pathSum = [];
    let hasVisit = [];
    while (stack.length || root){
        while(root) {
            stack.push(root)
            root = root.left
        }
        if(stack.length) {
            root = stack[stack.length - 1];
            if (
                (!root.left && !root.right)
                || 
                ((root.left?.val ? hasVisit.includes(root.left?.val) : true) 
                    && (root.right?.val ? hasVisit.includes(root.right?.val) : true))) {
                root = stack.pop();
                if ((!root.left && !root.right) && !hasVisit.includes(root.val)) {
                    const sum = stack.reduce((acc, cur) => {
                        return cur ? acc + cur.val : acc;
                    }, 0);
                    pathSum.push(sum + root.val);
                }
                hasVisit.push(root.val)
            }
            root = root && root.right;
        }
    }
    // console.log(pathSum);
    return pathSum.includes(sum);
}
