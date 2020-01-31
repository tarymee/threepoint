<template>
    <div class="start">
        <image class="start-image" :src="aaa.backLogo.logo" mode="aspectFill"></image>
        <!-- <image class="start-image" src="/static/img/index.jpg" mode="aspectFill"></image> -->

        <div class="top">
            <div class="top-item" @click="jump(item.url)" v-for="(item, index) in aaa.header" :key="index"><image :src="item.logo" mode="aspectFill" lazy-load></image></div>
        </div>

        <div class="pro">
            <div class="pro-item1" @click="jump(aaa.body[0].url)"><image :src="aaa.body[0].logo" lazy-load mode="aspectFill"></image></div>
            <div class="pro-item1" @click="jump(aaa.body[1].url)"><image :src="aaa.body[1].logo" lazy-load mode="aspectFill"></image></div>
            <div class="pro-item" @click="jump(aaa.body[2].url)"><image :src="aaa.body[2].logo" lazy-load mode="aspectFill"></image></div>
            <div class="pro-item" @click="jump(aaa.body[3].url)"><image :src="aaa.body[3].logo" lazy-load mode="aspectFill"></image></div>
        </div>

        <div class="nav">
            <div class="nav-item" @click="jump(item.url)" v-for="(item, index) in aaa.footer" :key="index"><image :src="item.logo" lazy-load mode="aspectFill"></image></div>
        </div>

        <div class="" v-for="(item, index) in navList" :key="index">
            <div class="propic" @click="jump(item.wh.url)">
                <image :src="item.wh.logo" lazy-load mode="aspectFill"></image>
            </div>

            <div class="pro1" v-for="(item2, index2) in item.arrgood" :key="index2">
                <scroll-view scroll-x>
                    <a class="pro1-item" @click="jump(`/pages/product/product?id=${item3.id}&title=${item3.title}`)" v-for="(item3, index3) in item2" :key="index3">
                        <image :src="item3.logo" lazy-load mode="aspectFill"></image>
                        <text class="pro1-item-tit">{{item3.title}}</text>
                        <div class="pro1-item-price"><text>￥</text>{{item3.vipPrice}}</div>
                    </a>
                </scroll-view>
            </div>

            <div class="more">
                <a class="more__btn" @click="jump(item.wh.url)">查看更多</a>
            </div>
        </div>

        <!-- <div class="pro1">
            <scroll-view scroll-x>
                <a class="pro1-item" @click="">
                    <image src="http://fpoimg.com/100x100" mode="aspectFill"></image>
                    <text class="pro1-item-tit">十器良品陶瓷竞品</text>
                    <div class="pro1-item-price"><text>￥</text>654654</div>
                </a>
                <a class="pro1-item" @click="">
                    <image src="http://fpoimg.com/100x100" mode="aspectFill"></image>
                    <text class="pro1-item-tit">十器良品陶瓷竞品</text>
                    <div class="pro1-item-price"><text>￥</text>654654</div>
                </a>
                <a class="pro1-item" @click="">
                    <image src="http://fpoimg.com/100x100" mode="aspectFill"></image>
                    <text class="pro1-item-tit">十器良品陶瓷竞品</text>
                    <div class="pro1-item-price"><text>￥</text>654654</div>
                </a>
                <a class="pro1-item" @click="">
                    <image src="http://fpoimg.com/100x100" mode="aspectFill"></image>
                    <text class="pro1-item-tit">十器良品陶瓷竞品</text>
                    <div class="pro1-item-price"><text>￥</text>654654</div>
                </a>
            </scroll-view>
        </div>
        <div class="more">
            <a class="more__btn" @click="jump('/pages/cate/cate?id=&title=最新产品&type=1')">查看更多</a>
        </div> -->

    </div>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            aaa: {},
            navList: [],
        }
    },
    methods: {
        jump(url) {
            u.jump(url)
        }
    },
    onShareAppMessage() {
        let that = this
        let obj = {
            title: '三分联盟商城',
            path: `/pages/index/index`
        }
        return obj
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
                that.navList = res.navList
                // that.navList[0].goods.push({})
                that.navList.forEach((item, i) => {
                    item.arrgood = []
                    var arr = []
                    item.goods.forEach((item2, j) => {
                        arr.push(item2)
                        if (arr.length >= 8) {
                            item.arrgood.push(JSON.parse(JSON.stringify(arr)))
                            arr = []
                        } else if (arr.length < 8 && j == item.goods.length - 1) {
                            item.arrgood.push(JSON.parse(JSON.stringify(arr)))
                            arr = []
                        }
                    })
                })
                console.log(that.navList)
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
.start {
    display: block;
    width: 750upx;
    min-height: 100vh;
    overflow: scroll;
    background-color: #FDFAF3;
    /* position: relative; */
}

.start-image {
    display: block;
    width: 750upx;
    height: 1312upx;
}
.top {
    width: 700upx;
    position: absolute;
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



.propic {
    margin: 15upx 0upx;
    overflow: hidden;
}
.propic image{
    display: block;
    width: 750upx;
    height: 375upx;
}

/* 新品推荐 */
.pro1 {
    margin: 15px 0 15px 15px;
}
.pro1 scroll-view {
    white-space: nowrap;
}
.pro1-item {
    display: inline-block;
    width: 125px;
    margin-right: 10px;
    position: relative;
}
.pro1-item image {
    display: block;
    width: 125px;
    height: 125px;
}
.pro1-item-new {
    display: block;
    font-size: 12px;
    color: #333;
    line-height: 30upx;
    padding: 0 8upx;
    background-color: rgb(244,176,170);
    border: 1upx solid rgb(200,136,130);
    position: absolute;
    top: 0px;
    left: 0px;
}
.pro1-item-tit {
    display: block;
    font-size: 13px;
    color: #333;
    line-height: 25px;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
}
.pro1-item-price {
    display: block;
    font-size: 15px;
    color: #333;
    font-weight: bold;
    line-height: 20px;
}
.pro1-item-price text {
    font-size: 12px;
}


/* 更多 */
.more {
    margin: 15px 0px;
    text-align: center;
}
.more__btn {
    display: inline-block;
    line-height: 30px;
    height: 30px;
    border: 1upx solid #9fc2b4;
    border-radius: 15px;
    padding: 0 25px;
    font-size: 14px;
    text-align: center;
    color: #9fc2b4;
}
</style>
