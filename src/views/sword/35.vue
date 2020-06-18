<template>
    <div class="home">数组中的逆序对<br />
        <a href="https://www.nowcoder.com/practice/96bd6684e04a44eb80e6a68efc0ec6c5?tpId=13&&tqId=11188&rp=1&ru=/activity/oj&qru=/ta/coding-interviews/question-ranking">
            原题目链接
        </a>
        <p>考核的知识点：</p>
        <p>1、归并排序</p>
        <div>2、为什么要对1000000007取模？
            <p>在32位符号整数范围内，刚好相加不会爆int，相乘不会爆long long</p>
            <p>对质数取模的话，能尽可能地避免模数相同的数之间具备公因数，来达到减少冲突的目的。那么有个很大的且好记的质数1e9+7</p>
        </div>
    </div>
</template>

<script lang="ts">
let cnt = 0;
function merge(a: number[], start: number, mid: number, end: number) {
    // 这种小copy[] 和全局一个 copy[data.length-1]，差不多？？？
    const copy = new Array(end - start + 1);
    let i = start;
    let j = mid + 1;
    let k = 0;
    // 看到有人推荐从 i=mid-1 j=end开始向前遍历，其实效率一样……不懂为啥
    while (i <= mid && j <= end) {
        if (a[i] <= a[j]) {
            copy[k++] = a[i++];
        } else {
            copy[k++] = a[j++];
            cnt += mid - i + 1;
        }
    }
    // console.log(copy);

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
    if (start >= end) {
        return;
    }
    //计算中间值，注意溢出
    const mid = start + Math.floor((end - start) / 2);
    //递归分 分到最小长度为1或者2的数组，开始merge  所以merge后的每个数组都是有序的
    divide(arr, start, mid);
    divide(arr, mid + 1, end);
    //治
    merge(arr, start, mid, end);
}

function InversePairs(data: number[]) {
    // 递归回溯
    if (!data.length) {
        return 0;
    }
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
        const a = InversePairs([1, 2, 3, 4, 5, 6, 7, 0]);
        console.log(a)
    }
};
</script>
