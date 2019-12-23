<template>
    <div class="start">
        <image class="start-bg" :src="img" mode="aspectFill"></image>
        <div class="top link1" @click="jump()"><image src="/static/img/top1.png" mode="aspectFill"></image></div>
        <div class="top link2" @click="jump()"><image src="/static/img/top2.png" mode="aspectFill"></image></div>
        <div class="top link3" @click="jump()"><image src="/static/img/top3.png" mode="aspectFill"></image></div>
        <div class="top link4" @click="jump()"><image src="/static/img/top4.png" mode="aspectFill"></image></div>
        <div class="top link5" @click="jump()"><image src="/static/img/top5.png" mode="aspectFill"></image></div>

        <div class="mid link1" @click="jump()"><image src="/static/img/pro.png" mode="aspectFill"></image></div>
        <div class="mid link2" @click="jump()"><image src="/static/img/pro2.png" mode="aspectFill"></image></div>

        <div class="bot">
            <div class="bot-item" @click="jump()"><image src="/static/img/nav1.png" mode="aspectFill"></image></div>
            <div class="bot-item" @click="jump()"><image src="/static/img/nav2.png" mode="aspectFill"></image></div>
            <div class="bot-item" @click="jump()"><image src="/static/img/nav3.png" mode="aspectFill"></image></div>
            <div class="bot-item" @click="jump()"><image src="/static/img/nav4.png" mode="aspectFill"></image></div>
            <div class="bot-item" @click="jump()"><image src="/static/img/nav5.png" mode="aspectFill"></image></div>
        </div>
    </div>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            img: '/static/img/index.png'
        }
    },
    methods: {
        jump(url) {
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
    background-color: rgba(253,250,244);
}
.start-bg {
    display: block;
    width: 750upx;
    height: 1204upx;
}

.top {
    position: absolute;
    width: 120upx;
    height: 180upx;
    top: 75upx;
}
.top image {
    display: block;
    width: 120upx;
    height: 180upx;
}
.top.link1 {
    left: 70upx;
}

.top.link2 {
    left: 200upx;
}

.top.link3 {
    left: 330upx;
}

.top.link4 {
    left: 460upx;
}

.top.link5 {
    left: 580upx;
}



.mid {
    position: absolute;
    width: 180upx;
    height: 300upx;
    /* background-color: rgba(000,000,000,0.8); */
    top: 300upx;
}
.mid.link1 {
    left: 335upx;
}
.mid.link2 {
    left: 535upx;
}
.mid image {
    display: block;
    width: 180upx;
    height: 300upx;
}

.bot {
    position: absolute;
    width: 750upx;
    top: 950upx;
    text-align: center;
}
.bot-item {
    display: inline-block;
    width: 125upx;
    height: 225upx;
    /* background-color: rgba(000,000,000,0.8); */
}
.bot image {
    display: block;
    width: 125upx;
    height: 225upx;
}

</style>
