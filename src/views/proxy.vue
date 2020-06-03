<template>
    <div class="home">这是proxy页面，看控制台</div>
</template>

<script lang="ts">
export default {
    name: "Proxy",
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
        // 因为编译报错  所以注释掉
        // console.log(p.b);
    }
};
</script>
