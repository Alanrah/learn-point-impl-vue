<template>
    <div class="home">输出所有和为S的连续正数序列。序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序<br /></div>
</template>

<script>
function continueSum(start, len, sum) {
    let subSum = 0;
    const arr = [];
    for (let i = 0; i < len; i++) {
        subSum += start;
        arr.push(start);
        start++;
    }
    if (subSum === sum) {
        return arr;
    }
    return [];
}
// 穷举
function FindContinuousSequence(sum) {
    let len = 2;
    const res = [];
    while (Math.floor(sum / len) - Math.floor(len / 2) > 0) {
        const start = Math.floor(sum / len) - Math.floor(len / 2);
        const subSumArr = continueSum(start, len, sum);
        if (subSumArr.length !== 0) {
            res.push(subSumArr);
        }
        len++;
    }
    len = 2;
    while (Math.ceil(sum / len) - Math.ceil(len / 2) > 0) {
        const start = Math.ceil(sum / len) - Math.ceil(len / 2);
        const subSumArr = continueSum(start, len, sum);
        if (subSumArr.length !== 0) {
            res.push(subSumArr);
        }
        len++;
    }
    res.sort((a, b) => {
        return b.length - a.length;
    });
    return res;
}

export default {
    name: "offer-41",
    components: {},
    mounted: function () {
        console.log(FindContinuousSequence(100));
    }
};
</script>
