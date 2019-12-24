<template>
    <div class="start">
        <image class="start-image" :src="aaa.backLogo.logo" mode="aspectFill"></image>
        <div class="top">
            <div class="top-item" @click="jump(item.url)" v-for="(item, index) in aaa.header" :key="index"><image :src="item.logo" mode="aspectFill"></image></div>
        </div>

        <div class="pro">
            <div class="pro-item1" @click="jump(aaa.body[0].url)"><image :src="aaa.body[0].logo" mode="aspectFill"></image></div>
            <div class="pro-item1" @click="jump(aaa.body[1].url)"><image :src="aaa.body[1].logo" mode="aspectFill"></image></div>
            <div class="pro-item" @click="jump(aaa.body[2].url)"><image :src="aaa.body[2].logo" mode="aspectFill"></image></div>
            <div class="pro-item" @click="jump(aaa.body[3].url)"><image :src="aaa.body[3].logo" mode="aspectFill"></image></div>
        </div>

        <div class="nav">
            <div class="nav-item" @click="jump(item.url)" v-for="(item, index) in aaa.footer" :key="index"><image :src="item.logo" mode="aspectFill"></image></div>
        </div>
    </div>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            aaa: {}
        }
    },
    methods: {
        jump(url) {
            console.log(url)
            // u.jump(url)
            if (url.indexOf('index1') != -1 || url.indexOf('user') != -1 || url.indexOf('open') != -1 || url.indexOf('store') != -1 || url.indexOf('cart') != -1) {
                u.jump(url, true)
            } else {
                u.jump(url)
            }
        }
    },
    onLoad() {
        console.log('start onLoad')
        var that = this
        u.request({
            url: u.api.weapp,
            method: 'POST',
            data: {},
            isVerifyLogin: false,
            success(res) {
                console.log(res)
                that.aaa = res
            },
            fail(res) {
                console.error(res)
            }
        })
    },
    onShow() {
        console.log('start onShow')
    }
}
</script>

<style scoped>
page {
    background-color: #FDFAF3;
}
.start {
    display: block;
    /* position: fixed; */
    width: 750upx;
    min-height: 100vh;
    overflow: scroll;
    background-color: #FDFAF3;
    position: relative;
}
.start-image {
    display: block;
    width: 750upx;
    height: 1204upx;
}
.top {
    position: absolute;
    width: 700upx;
    top: 65upx;
    left: 40upx;
    text-align: center;
}
.top-item {
    display: inline-block;
    width: 125upx;
    height: 187upx;
}
.top-item image {
    display: block;
    width: 125upx;
    height: 187upx;
}

.pro {
    position: absolute;
    width: 750upx;
    top: 300upx;
    text-align: center;
    overflow: hidden;
}
.pro-item1 {
    display: inline-block;
    width: 145upx;
    height: 320upx;
}
.pro-item1 image {
    display: block;
    width: 145upx;
    height: 320upx;
}
.pro-item {
    display: inline-block;
    width: 200upx;
    height: 320upx;
}
.pro-item image {
    display: block;
    width: 200upx;
    height: 320upx;
}


.nav {
    position: absolute;
    width: 750upx;
    top: 930upx;
    text-align: center;
}
.nav-item {
    display: inline-block;
    width: 125upx;
    height: 225upx;
    margin: 0 5upx;
}
.nav-item image {
    display: block;
    width: 125upx;
    height: 225upx;
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
