<template>
    <div class="home">
        输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，<br />
        如果有多对数字的和等于S，输出两个数的乘积最小的。<br />
        对应每个测试案例，输出两个数，小的先输出。
    </div>
</template>

<script>
// 不知道为毛这种方法  牛客就是不给通过
function FindNumbersWithSum1(array, sum) {
    if (!array || !array.length) {
        return [];
    }

    const map = new Map(array.map(value => [value, value]));
    for (const e of array.values()) {
        if (map.has(sum - e)) {
            return [e, sum - e];
        }
    }
    return [];
}

function FindNumbersWithSum(array, sum) {
    if (!array || !array.length) {
        return [];
    }
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        const s = array[left] + array[right];
        if (s > sum) {
            right--;
        } else if (s < sum) {
            left++;
        } else {
            return [array[left], array[right]];
        }
    }
    return [];
}

export default {
    name: "offer-42",
    components: {},
    mounted: function () {
        console.log(FindNumbersWithSum([1,2,3,4,5], 6));
    }
};
</script>
