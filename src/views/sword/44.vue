<template>
    <div class="home">
        <!-- <div class="a" v-for="(item, index) in getN(10)" :key="index">
            <div class="b" v-for="(i, index) in item" :key="index"> {{ i }} </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "@vue/composition-api";

export default defineComponent({
    name: "offer-44",
    setup() {
        const state = reactive({
            test: 'test',
        });

        // 给二姐出的一个for循环的题目
        function getN(num: number) {
            const a = new Array(num).fill([]);
            a.forEach((e, index) => {
                a[index] = new Array(num - index).fill('+');
            });
            return a;
        }

        return {
            state,
            getN
        };
    }
});
</script>
<style lang="stylus" scoped>
.a
    width 200px
    display flex
    align-items center
    justify-content center
    .b
        display flex
        align-items center
        justify-content center
</style>
