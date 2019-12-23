<template>
    <a class="start">
        <image :src="img" mode="aspectFill" @click="index()"></image>
        <div class="link1"></div>
        <div class="link2"></div>
        <div class="link3"></div>
        <div class="link4"></div>
        <div class="link5"></div>

        <div class="link6"></div>
        <div class="link7"></div>
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
        // u.request({
        //     url: u.api.weapp,
        //     method: 'POST',
        //     data: {},
        //     isVerifyLogin: false,
        //     success(res) {
        //         console.log(res)

        //     },
        //     fail(res) {
        //         console.error('错误')
        //         console.error(res)
        //     }
        // })
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
.start .link1 {
    position: absolute;
    width: 120upx;
    height: 200upx;
    background-color: rgba(000,000,000,0.8);
    top: 50upx;
    left: 70upx;
}

.start .link2 {
    position: absolute;
    width: 120upx;
    height: 200upx;
    background-color: rgba(000,000,000,0.8);
    top: 60upx;
    left: 200upx;
}

.start .link3 {
    position: absolute;
    width: 120upx;
    height: 200upx;
    background-color: rgba(000,000,000,0.8);
    top: 60upx;
    left: 330upx;
}

.start .link4 {
    position: absolute;
    width: 120upx;
    height: 200upx;
    background-color: rgba(000,000,000,0.8);
    top: 60upx;
    left: 460upx;
}

.start .link5 {
    position: absolute;
    width: 120upx;
    height: 200upx;
    background-color: rgba(000,000,000,0.8);
    top: 60upx;
    left: 580upx;
}



.start .link6 {
    position: absolute;
    width: 180upx;
    height: 300upx;
    background-color: rgba(000,000,000,0.8);
    top: 300upx;
    left: 340upx;
}

.start .link7 {
    position: absolute;
    width: 180upx;
    height: 300upx;
    background-color: rgba(000,000,000,0.8);
    top: 300upx;
    left: 540upx;
}
</style>
