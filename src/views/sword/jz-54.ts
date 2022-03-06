// JZ54 二叉搜索树的第k个结点
// 给定一棵结点数为 n 二叉搜索树，请找出其中的第 k 小的TreeNode结点。
// 它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
// 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树
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

// 先序遍历，利用栈
function preOrder(pRoot) {
    if(!pRoot) {
        return null;
    }
    let res = [];
    let stack = [];
    while(pRoot || stack.length) {
        while(pRoot){
            res.push(pRoot.val);
            stack.push(pRoot);
            pRoot = pRoot.left;
        }
        if(stack.length) {
            pRoot = stack.pop();
            pRoot = pRoot.right;
        }
    }
    return res;
}
// 中序遍历，利用栈
function middleOrder(pRoot) {
    if(!pRoot) {
        return null;
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
// 后序遍历，利用栈
function lastOrder(pRoot) {
    if(!pRoot) {
        return null;
    }
    let res = [];
    let stack = [];
    let lastVisit = pRoot;
    while(pRoot || stack.length) {
        while(pRoot){
            stack.push(pRoot);
            pRoot = pRoot.left;
        }
        pRoot = stack[stack.length - 1];
        if(!pRoot.right || pRoot.right === lastVisit) {
            res.push(pRoot.val);
            lastVisit = stack.pop();
            pRoot = null;
        } else {
            pRoot= pRoot.right;
        }
    }
    return res;
}

function KthNode1(pRoot, k){
    if(!pRoot) {
        return null;
    }
    let queue = [pRoot];
    let values = [];
    while(queue.length) {
        const cur = queue.shift()
        values.push(+cur.val);
        cur.left ?  queue.push(cur.left): '';
        cur.right ? queue.push(cur.right) : '';
    }
    values.sort((a, b) => a - b); // sort() 方法会改变原始数组,默认情况下，sort() 方法将按字母和升序将值作为字符串进行排序
    let kVal = values[k-1];
    if(!kVal) {
        return null
    }
    queue = [pRoot];
    while(queue.length) {
        const cur = queue.shift()
        if(cur.val === kVal) {
            return cur;
        }
        cur.left ?  queue.push(cur.left): '';
        cur.right ? queue.push(cur.right) : '';
    }
    return null
}

// 既然题中的树是二叉搜索树，所以中序遍历顺序即为从小到大的访问顺序。这一点要直接反应过来！！！
// 知道是中序遍历后就采用递归或非递归两种方法都可以了
// 返回中序遍历第k个节点
function KthNode(pRoot, k){
    if(!pRoot) {
        return -1;
    }
    let stack = [];
    while(pRoot || stack.length) {
        while(pRoot){
            stack.push(pRoot);
            pRoot = pRoot.left;
        }
        if(stack.length) {
            pRoot = stack.pop();
            k--;
            if(k===0){
                return pRoot.val;
            }
            pRoot = pRoot.right;
        }
    }
    return -1;
}