<template>
    <div class="home">两个链表的第一个公共结点<br />
    </div>
</template>

<script>
const pHead1 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: null
        }
    }
};
const pHead2 = {
    val: 0,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 2,
                next: {
                    val: 3,
                    next: null
                }
            }
        }
    }
};

function FindFirstCommonNode() {
    // write code here
    let h1 = pHead1;
    let h2 = pHead2;
    while (h1 !== h2) { // 但是我本地浏览器是 while (h1.val !== h2.val)  和牛客的js v8.6不一样
        // console.log(h1);
        h1 = h1 === null ? pHead2 : h1.next;
        h2 = h2 === null ? pHead1 : h2.next;
    }
    return h1;
}

export default {
    name: "offer-36",
    components: {},
    mounted: function () {
        console.log(FindFirstCommonNode());
    }
};
</script>
