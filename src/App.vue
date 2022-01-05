<script lang="ts">
import LoadingBar from './views/components/loading-bar/loading-bar.vue';

export default {
    name: "app",
    components: {LoadingBar},
    mounted() {

    }
};
</script>
<template>
    <div id="app">
        <LoadingBar></LoadingBar>
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
