<template>
    <div class="home">这是proxy页面，看控制台</div>
</template>

<script lang="ts">
export default {
    name: "Home",
    components: {},
    mounted() {
        const p = new Proxy(
            {},
            {
                get(target, key, args?) {
                    console.log(`${target}[${String(key)}] is undefined, no use`);
                },
                apply(target, key, args?) {
                    console.log(`${target}[${String(key)}] is not a function, no use`);
                }
            }
        );
        // console.log(p.b);
    }
};
</script>
