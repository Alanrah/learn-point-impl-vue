<template>
    <div class="home">剑指offer 35-67 刷题<br />
        <router-link to="/offer/35">35 </router-link>
        <router-view to="/offer/36">36</router-view>
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
