// JZ86 在二叉树中找到两个节点的最近公共祖先
// 给定一棵二叉树(保证非空)以及这棵树上的两个节点对应的val值 o1 和 o2，请找到 o1 和 o2 的最近公共祖先节点。

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

function lowestCommonAncestor (root, o1, o2) {
    // write code here
    let res = {o1: null, o2: null};
    let queue = [[root,[root]]]
    while (queue.length && !(res.o1 && res.o2)) {
        const [root, paths] = queue.pop();
        console.log(paths)
        if (root.right) {
            queue.push([root.right, [...paths, root.right]])
            if (root.right.val === o1 && !res.o1) {
                res.o1 = [...paths, root.right];
            }
            if (root.right.val === o2 && !res.o2) {
                res.o2 = [...paths, root.right];
            }
        }
        if (root.left) {
            queue.push([root.left, [...paths, root.left]])
            if (root.left.val === o1 && !res.o1) {
                res.o1 = [...paths, root.left];
            }
            if (root.left.val === o2 && !res.o2) {
                res.o2 = [...paths, root.left];
            }
        }
    }
    if (!res.o1 || !res.o2) {
        return null;
    }
    // res.o1是遍历到o1的路径节点，res.o2是遍历到o2的路径节点
    // 解法2，也可以先找到 res.o1，然后看看 res.o1的路径上是否可以遍历到o1
    for (let i = res.o1.length -1; i>=0;i--){
        for (let j = res.o2.length - 1; j >= 0; j --){
            if (res.o1[i].val === res.o2[j].val) {
                return res.o1[i].val;
            }
        }
    }
    return null;
}