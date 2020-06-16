<template>
    <div class="home">TypeScript<br />
        <router-link to="/ts/infer">infer</router-link>
        <router-view class="offer-view"></router-view>
    </div>

</template>

<script lang="ts">
export default {
    name: "offer-35",
    components: {},
    mounted() {
        // console.log('cdcsdcsadc')
    }
};
</script>
<style lang="stylus" scoped>
.offer-view
    height 100vh
    background rgba(0, 0, 0, 0.8)
    color rgba(255, 255, 255, 0.9)
</style>
