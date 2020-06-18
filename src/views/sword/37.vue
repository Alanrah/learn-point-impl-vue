<template>
    <div class="home">统计一个数字在排序数组中出现的次数<br />
    </div>
</template>

<script>
function GetNumberOfK(data, k) {
    const map = new Map();
    for (const e of data) {
        if (map.get(e)) {
            let cnt = map.get(e);
            map.set(e, ++cnt);
        } else {
            map.set(e, 1);
        }
    }
    if(map.get(k)){
        return map.get(k);
    }
    return 0;
}

export default {
    name: "offer-36",
    components: {},
    mounted: function () {
        console.log(GetNumberOfK([1,2,3,4,5,6,7,8,9,5,4,5,5,5], 5));
    }
};
</script>
