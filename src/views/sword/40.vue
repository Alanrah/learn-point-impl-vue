<template>
    <div class="home">数组中只出现一次的数字<br /></div>
</template>

<script>
// 哈希法
function FindNumsAppearOnce(data) {
    const map = new Map();
    for (const e of data) {
        if (map.get(e)) {
            let cnt = map.get(e);
            map.set(e, ++cnt);
        } else {
            map.set(e, 1);
        }
    }
    const res = [];
    for (const [key, value] of map.entries()) {
        if (value === 1) {
            res.push(key);
        }
    }
    return res;
}

// 位运算法 异或运算：如果a、b两个值不相同，则异或结果为1。如果a、b两个值相同，异或结果为0

// 排序法  遍历一次找到这两个数

export default {
    name: "offer-40",
    components: {},
    mounted: function () {
        console.log(FindNumsAppearOnce());
    }
};
</script>
