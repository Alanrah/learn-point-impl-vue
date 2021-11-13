<template>
    <div class="home">
    </div>
</template>

<script>
import{ firstNode, FindKthToTail } from './js-22'; // jz-22
import{ jz76Node, deleteDuplication } from './jz-76'; // jz-22
export default {
    name: "offer-all",
    components: {},
    mounted: function () {
        // console.log(FindKthToTail(firstNode, 6));
        console.log(deleteDuplication(jz76Node));
    }
};
</script>
