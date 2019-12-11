<template>
    <a class="start">
        <image :src="img" mode="aspectFill" @click="index()"></image>
    </a>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            img: '/static/img/ad.png'
        }
    },
    methods: {
        index() {
            u.jump('/pages/index1/index1', true)
        }
    },
    onLoad() {
        console.log('start onLoad')
    },
    onShow() {
        console.log('start onShow')
    }
}
</script>

<style scoped>
.start {
    display: block;
    position: fixed;
    width: 750upx;
    height: 100%;
}
.start image {
    display: block;
    width: 750upx;
    height: 100%;
}
</style>
