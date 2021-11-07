<template>
    <div class="home">
        给一个长度为n链表，若其中包含环，请找出该链表的环的入口结点，否则，返回null。<br>
        数据范围： n\le10000n≤10000<br>
        节点值范围：[1,10000]<br>
        要求：空间复杂度 O(1)O(1)，时间复杂度 O(n)O(n)<br>
    </div>
</template>

<script>
// 解法1
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
/* 快慢指针，以题目里面的图为例 {1, 2}, {3, 4, 5}
慢指针走一步，快指针走两步,1为起点
        慢指针  快指针
步数1   2       3
步数2   3       5
步数3   4       4   相遇
步数4   5       3
步数5   3       5
步数6   4       4   相遇
可以看到，如果链表有环，快慢指针一定会相遇在某个节点；
如果没有环，快指针会先遍历到null节点
我们假定链表头到环入口的距离是len，环入口到slow和fast交汇点的距离为x，环的长度为R。slow和fast第一次交汇时，设slow走的长度为：d = len + x，而fast走的长度为：2d = len + nR + x，(n >= 1)，从而我们可以得知：2len + 2x = len + nR + x，即len = nR - x，(n >= 1)，于是我们可以得到这样的算法。
使用一个cur指针指向链表头节点，一个inter指针指向第一次的交汇点，cur指针和inter指针一起往后遍历。cur指针和inter指针相等时，cur和inter指针指向的就是环的入口节点

链接：https://www.jianshu.com/p/ef71e04241e4
*/

function EntryNodeOfLoop1(pHead)
{
    if(pHead === null)
        return null;
    let slow = pHead;
    let fast = pHead;
    let intersection;
    while(fast.next !== null) {
        slow = slow.next;
        fast = fast.next && fast.next.next;
        if(fast.next === null) {
            return null;
        }
        if(slow.val === fast.val) {
            intersection = slow;
            break;
        }
    }
    // 其实可以 slow = pHead, 这时候 fast 节点已经是 intersection了
    let cur = pHead;
    while(cur.val !== intersection.val) {
        cur = cur.next;
        intersection = intersection.next;
    }
    return cur; // 返回链表的环的入口结点即可
}

// 解法2
function EntryNodeOfLoop2(pHead){
    // 遍历一个链表，同一节点出现两次，该节点就是入口节点
    if(pHead === null)
        return null;
    const mySet = new Set();
    let node = pHead;
    mySet.add(node);
    while(node.next !== null) {
        node = node.next;
        if(node.next === null) {
            return null;
        }
        if(mySet.has(node)) {
            return node;
        }
        mySet.add(node);
    }
}
export default {
    name: "offer-jz-23",
    components: {},
    mounted: function () {
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
        const firstNode = {
            val: 1,
            next: secondNode,
        }
        fifthNode.next = thirdNode;
        // console.log(firstNode)
        console.log(EntryNodeOfLoop2(firstNode));  //3
    }
};
</script>
