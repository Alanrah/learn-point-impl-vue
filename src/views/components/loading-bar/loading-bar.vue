<script lang="ts">
import Vue from 'vue';
import eventBus from './event-bus';
export default {
    name: "loading-bar",
    components: {},
    data: () => {
        return {
            invisible: true,
            isEnd: true,
            isLoading: false,
        };
    },
    methods: {
        async start() {
            this.isEnd = false
            await this.reflow();
            this.invisible = false;
            await this.reflow();
            this.isLoading = true;
        },

        async reflow() {
            await this.$nextTick();
            document.body.scrollTop;
        },

        async end() {
            this.isLoading = false;
            this.isEnd = true;
            setTimeout(() => {
                this.invisible = true;
            }, 200);
        }
    },
    mounted() {
        eventBus.$on('set-loading', (isLoading: boolean) => {
            console.log(123,isLoading)
            if (isLoading) {
                this.start();
            } else {
                this.end();
            }
        });
    }

};
</script>

<template>
    <div
        class="loading"
        :class="{
            animate: isLoading,
            end: isEnd,
            invisible: invisible,
        }"
    ></div>
</template>
<style lang="stylus" scoped>
.loading
    position fixed
    z-index 1001
    top 0
    left 0
    height 2px
    background #326BFB
    opacity 1
    width 0
    transition width 2000ms
    &.animate
        width 80%
    &.end
        transition width 200ms, opacity 200ms
        width 100%
    &.invisible
        transition opacity 200ms
        opacity 0
</style>
