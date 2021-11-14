// JZ27 二叉树的镜像
// 操作给定的二叉树，将其变换为源二叉树的镜像。
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
function middleOrder(pRoot) {
    if(!pRoot) {
        return [];
    }
    let res = [];
    let stack = [];
    while(pRoot || stack.length) {
        while(pRoot){
            stack.push(pRoot);
            pRoot = pRoot.left;
        }
        if(stack.length) {
            pRoot = stack.pop();
            res.push(pRoot.val);
            pRoot = pRoot.right;
        }
    }
    return res;
}
// 给定一棵二叉树，判断其是否是自身的镜像（即：是否对称）
function isSymmetricalError(pRoot){
    if(!pRoot) {
        return true;
    }
    // 中序遍历的结果，互为reverse , 这是错误解法，不一定，比如 {1,2,3,3,#,2,#}
    const left = middleOrder(pRoot.left);
    let right = middleOrder(pRoot.right);
    if(left.length !== right.length) {
        return false;
    }
    let len =left.length;
    right = right.reverse();
    while(len) {
        if(left[len -1] !== right[len-1])
            return false;
        len--;
    }
    return true;
}
function isSame(root1, root2) {
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;
    return root1.val == root2.val &&
        isSame(root1.left, root2.right) &&
        isSame(root1.right, root2.left);
}

function isSymmetrical(pRoot) {
    if(!pRoot) {
        return true;
    }
    return isSame(pRoot.right, pRoot.left);
}