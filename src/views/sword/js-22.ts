// JZ22 链表中倒数最后k个结点
/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param pHead ListNode类
 * @param k int整型
 * @return ListNode类
 */
 const fifthNode = {
    val: 5,
    next: null,
}
const fourthNode = {
    val: 4,
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

export function FindKthToTail( pHead = firstNode ,  k ) {
    if(k === 0) {
        return null
    }
    if(pHead === null)
        return null;
    let cur = pHead;
    let front = pHead;
    let i = 1;
    while(front.next !== null) {
        if(i >= k) {
            cur = cur.next;
        }
        front = front.next;
        i = i + 1;
    }
    console.log(i,k)
    if(i < k) // k 大于链表长度
        return null
    return cur;
}