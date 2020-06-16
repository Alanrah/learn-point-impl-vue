<template>
    <div class="home">数组中的逆序对<br />
        <a href="https://www.nowcoder.com/practice/96bd6684e04a44eb80e6a68efc0ec6c5?tpId=13&&tqId=11188&rp=1&ru=/activity/oj&qru=/ta/coding-interviews/question-ranking">
            原题目链接
        </a>
        <p>在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P%1000000007</p>
        <p>考核的知识点：</p>
        <p>1、1000000007</p>
        <p>1、1000000007</p>
    </div>
</template>

<script lang="ts">
let cnt = 0;
function merge(a: number[], start: number, mid: number, end: number) {
    const copy = new Array(end - start + 1);
    let i = start;
    let j = mid + 1;
    let k = 0;
    while (i <= mid && j <= end) {
        if (a[i] <= a[j]) {
            copy[k++] = a[i++];
        } else {
            copy[k++] = a[j++];
            cnt += mid - i + 1;
        }
    }

    while (i <= mid) {
        copy[k++] = a[i++];
    }
    while (j <= end) {
        copy[k++] = a[j++];
    }
    for (k = 0; k < copy.length; k++) {
        a[start + k] = copy[k];
    }
}

function divide(arr: number[], start: number, end: number) {
    //递归的终止条件
    if (start >= end) {
        return;
    }

    //计算中间值，注意溢出
    const i = start;
    const j = end;
    const mid = i + Math.ceil((j - i) / 2);
    console.log(i, j, mid)

    //递归分
    divide(arr, i, mid);
    divide(arr, mid + 1, j);

    //治
    merge(arr, i, mid, j);
}

function InversePairs(data: number[]) {
    // 递归回溯
    if (!data.length) {
        return 0;
    }
    console.log(data.length - 1)
    divide(data, 0, data.length - 1);
    return cnt % 1000000007;

    // 归并排序，归并排序的基本思想是分治，在治的过程中有前后数字的大小对比，此时就是统计逆序对的最佳时机
    // 链接：https://www.nowcoder.com/questionTerminal/96bd6684e04a44eb80e6a68efc0ec6c5?f=discussion
    // 先把数组分割成子数组，先统计出子数组内部的逆序对的数目，然后再统计出两个相邻子数组之间的逆序对的数目。在统计逆序对的过程中，还需要对数组进行排序。如果对排序算法很熟悉，我们不难发现这个过程实际上就是归并排序。

    // 归并排序 时间复杂度o(nlog(n)),空间复杂度0（n）区间有序和无序结果是一样的

    // 最暴力的解法  时间复杂度为o（n^2）,空间复杂度o(1)
    // for (let i = 0; i < length; i++) {
    //     for (let j = i + 1; j < length; j++) {
    //         if (data[i] > data[j]) {
    //             p++;
    //         }
    //     }
    // }
}
export default {
    name: "offer-35",
    components: {},
    mounted: function () {
        // const a = InversePairs([1, 2, 3, 4, 6, 4, 5, 0]);
        console.log(a)
    }
};
</script>
<style lang="stylus" scoped>
a
    font-weight bold
    color #fff
a.router-link-exact-active
    color #42b983
</style>
