<template>
    <div class="home">剑指offer 35-67 刷题<br />
        <router-link to="/offer/35">35</router-link>
        <router-link to="/offer/36">36</router-link>
        <router-link to="/offer/37">37</router-link>
        <router-link to="/offer/38">38</router-link>
        <router-link to="/offer/39">39</router-link>
        <router-link to="/offer/40">40</router-link>
        <router-link to="/offer/41">41</router-link>
        <router-link to="/offer/42">42</router-link>
        <router-link to="/offer/43">43</router-link>
        <router-link to="/offer/44">44</router-link>
        <router-view class="offer-view"></router-view>
        <router-link to="/offer/JZ-23"> JZ-23 </router-link>
        <router-link to="/offer/all"> all </router-link>
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
    text-align left
</style>
