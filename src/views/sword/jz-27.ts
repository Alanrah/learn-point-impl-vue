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
function MirrorRecu( pRoot ) {
    // write code here
    if(!pRoot) {
        return null;
    }
    let temp = pRoot.left;
    pRoot.left = Mirror(pRoot.right);
    pRoot.right = Mirror(temp);
    return pRoot;
}

export function Mirror( pRoot = node ) {
    if(!pRoot) {
        return null;
    }
    let stack = [];
    let queue = [pRoot];
    let p ;
    let temp ;
    while(queue.length) {
        p = queue.shift();
        stack.push(p)
        p.left ?  queue.push(p.left): '';
        p.right ? queue.push(p.right) : '';
    }

    while(stack.length){
        p = stack.pop();
        temp = p.right;
        p.right = p.left;
        p.left = temp;
    }
    return pRoot;
}