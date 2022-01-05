<script lang="ts">
export default {
    name: "index-animation",
    components: {},
    data: () => {
        return {
            bgImgs: [
                'https://tx2.a.kwimgs.com/kos/nlav10382/normal/banner1_1.07227d5acc1d92b4.jpg',
                'https://static.yximgs.com/udata/pkg/ks-ad-fe/image4.2b92c028.min.png',
                'https://static.yximgs.com/udata/pkg/ks-ad-fe/image2.f9423612.min.png',
                'https://static.yximgs.com/udata/pkg/ks-ad-fe/image.57109de7.min.png',
            ],
        };
    },
    mounted() {
        // 判断是否是IE，如果是ie浏览器，不要用 intersectionObserver
        const intersectionObserver = new IntersectionObserver(function(entries) {
        // If intersectionRatio is 0, the target is out of view
        // and we do not need to do anything.
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0 && !entry.target.classList.contains('fade-show')) {
                entry.target.classList.add('fade-show');
                return; // 没出现
            }
            entry.target.classList.remove('fade-show');
        });
        });
        const boxElList = document.querySelectorAll('.index-img');
        boxElList.forEach((el) => {
            intersectionObserver.observe(el);
        });
    }
};
</script>

<template>
    <div>
        <img v-for="img in bgImgs" :key="img" :src="img" class="fade-hide index-img">
    </div>
</template>
<style lang="stylus" scoped>
.fade-hide
    visibility hidden
.fade-show
    visibility visible
    animation-name fadeInUp
    animation-duration 1s
img
    width 400px
    height 400px
    display: block

@keyframes fadeInUp {
    0% {
        opacity 0
        transform translate3d(0, 50px, 0)
    }
    100% {
        opacity: 1;
        transform: none
    }
}
</style>
