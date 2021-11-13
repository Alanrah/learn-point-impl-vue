const fifthNode = {
    val: 4,
    next: {
        val: 4,
        next: {
            val: 5,
            next: null,
        },
    },
}
const fourthNode = {
    val: 3,
    next: fifthNode,
}
const thirdNode = {
    val: 3,
    next: fourthNode,
}
const secondNode = {
    val: 2,
    next: thirdNode,
}
export const firstNode = {
    val: 1,
    next: secondNode,
}

export function deleteDuplication (pHead = firstNode) {
    if (!pHead || !pHead.next) {
        return pHead;
    }
    const initNodeValue = Symbol('foo');
    let initNode = {
        val: initNodeValue,
        next: pHead,
    }
    // 重复的标记为0，未重复的标记为1
    const map = new Map();
    let p = pHead;
    while (p) {
        if (map.has(p.val)) {
            map.set(p.val, 0);
        } else {
            map.set(p.val, 1);
        }
        p = p.next;
    }
    // 难点在于第一个节点就是重复的，所以预设一个 initNode 节点
    p = initNode;
    while (p && p.next) {
        if (map.get(p.next.val) === 0) {
            p.next = p.next.next;
        } else {
            p = p.next;
        }
    }
    return initNode.next;
}