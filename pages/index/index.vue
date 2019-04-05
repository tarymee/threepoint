<template>
<div>

    <div class="site" @click="jump()">
        <div class="site-l-img">
            <image src="http://fpoimg.com/100x100" mode="aspectFill"></image>
        </div>
        <div class="site-l-store">
            <div class="site-l-name">{{site.title}}</div>
            <div class="site-l-storename">{{site.address}}</div>
        </div>
        <div class="site-r" style="border-left: 1px solid #e9e9e9">
            <image src="/static/img/home-icon2.png" mode="aspectFill"></image>
            <div class="site-r-des">客服</div>
        </div>
        <div class="site-r" @click="phone(site.phone)">
            <image src="/static/img/home-icon1.png" mode="aspectFill"></image>
            <div class="site-r-des">电话</div>
        </div>
    </div>

    <swiper v-if="sliderArr.length > 0" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
        :duration="duration">
        <block v-for="(item, index) in sliderArr" :key="index">
            <swiper-item>
                <image lazy-load :src="item.img" mode="aspectFill" @click="jump(item.url)"></image>
            </swiper-item>
        </block>
    </swiper>

    <div class="cate">
        <a class="cate-item" href="/pages/cate/main">
            <image src="/static/img/home-cate1.png" mode="aspectFill"></image><text>竹木类</text>
        </a>
        <a class="cate-item" href="/pages/cate/main">
            <image src="/static/img/home-cate2.png" mode="aspectFill"></image><text>陶瓷类</text>
        </a>
        <a class="cate-item" href="/pages/cate/main">
            <image src="/static/img/home-cate3.png" mode="aspectFill"></image><text>玻璃类</text>
        </a>
        <a class="cate-item" href="/pages/cate/main">
            <image src="/static/img/home-cate4.png" mode="aspectFill"></image><text>不锈钢</text>
        </a>
        <a class="cate-item" href="/pages/cate/main">
            <image src="/static/img/home-cate5.png" mode="aspectFill"></image><text>装饰类</text>
        </a>
        <a class="cate-item" href="/pages/cate/main">
            <image src="/static/img/home-cate6.png" mode="aspectFill"></image><text>布料</text>
        </a>
    </div>

    <div class="title">新品推荐</div>
    <div class="pro1">
        <scroll-view scroll-x>
            <a class="pro1-item" v-for="(item, index) in newArr" :key="index" @click="jump()">
                <image :src="item.logo" mode="aspectFill"></image>
                <text class="pro1-item-tit">{{item.title}}</text>
                <div class="pro1-item-price"><text>￥</text>{{item.marketPrice}}</div>
            </a>
        </scroll-view>
    </div>

    <div class="more">
        <a class="more-btn" @click="jump()">查看更多</a>
    </div>

    <div class="title">精选商品</div>

    <div class="cate1">
        <scroll-view scroll-x>
            <a class="cate1-item" :class="item.select ? 'cur' : ''" v-for="(item, index) in cate1Arr" :key="index" @click="reloadCate(index, item.id)">
                <text>{{item.title}}</text>
            </a>
        </scroll-view>
    </div>
    <productList :data="bottomLoad_data"></productList>
    <tip :text="bottomLoad_tip" :none-icon="false"></tip>
    <!-- <div class="pro">
        <a class="pro-item" v-for="(item, index) in bottomLoad_data" :key="index" :href="item.url">
            <image :src="item.img" mode="aspectFill"></image>
            <text class="pro-item-tit">{{item.name}}</text>
            <div class="pro-item-price"><text>￥</text>{{item.price}}</div>
        </a>
    </div> -->

</div>
</template>

<script>
import u from '@/common/util'
import bottomLoad from '@/mixins/bottom-load.js'
import tip from '@/components/tip/tip.vue'
import productList from '@/components/product-list/product-list.vue'
export default {
    components: {
        tip,
        productList
    },
    mixins: [bottomLoad],
    data() {
        return {
            autoplay: true,
            indicatorDots: true,
            interval: 5000,
            duration: 300,
            site: {},
            sliderArr: [
                {
                    img: '/static/img/home-slider.jpg',
                    url: '/pages/product/product'
                },
                {
                    img: '/static/img/home-slider.jpg',
                    url: '/pages/product/product'
                },
                {
                    img: '/static/img/home-slider.jpg',
                    url: '/pages/product/product'
                }
            ],
            newArr: [
                // {
                //   img: 'http://fpoimg.com/400x400',
                //   name: '青花瓷功夫茶杯',
                //   price: '386',
                //   url: '/pages/logs/main'
                // },
                // {
                //   img: 'http://fpoimg.com/400x400',
                //   name: '青花瓷功夫茶杯',
                //   price: '386',
                //   url: '/pages/logs/main'
                // },
                // {
                //   img: 'http://fpoimg.com/400x400',
                //   name: '青花瓷功夫茶杯',
                //   price: '386',
                //   url: '/pages/logs/main'
                // },
                // {
                //   img: 'http://fpoimg.com/400x400',
                //   name: '青花瓷功夫茶杯',
                //   price: '386',
                //   url: '/pages/logs/main'
                // }
            ],
            cate1Arr: [
                {
                    title: '青瓷',
                    select: true,
                    id: '1'
                },
                {
                    title: '白瓷',
                    id: '2'
                },
                {
                    title: '对帖',
                    id: '3'
                },
                {
                    title: '荷花',
                    id: '4'
                },
                {
                    title: '印花',
                    id: '5'
                },
                {
                    title: '玻璃',
                    id: '6'
                },
                {
                    title: '布料',
                    id: '7'
                }
            ],
            bottomLoad_data: [],
            bottomLoad_api: u.api.index,
            bottomLoad_params: {
                id: '1'
            }
        }
    },
    methods: {
        phone(number) {
            u.phone(number)
        },
        jump(url) {
            u.jump(url)
        },
        reloadCate(index, id) {
            let that = this
            that.cate1Arr.forEach((item, i) => {
                if (index === i) {
                    item.select = true
                } else {
                    item.select = false
                }
            })
            that.bottomLoad_params.id = id
            that.bottomLoad_reload()
        }
    },
    mounted() {
        console.log('index mounted')
        var that = this
        u.request({
            url: u.api.index,
            method: 'POST',
            isVerifyLogin: false,
            success(res) {
                console.log(res)
                that.site = res.site
                that.newArr = res.newest
                that.site = res.site
            }
        })

        // uni.navigateTo({
        //     url: '/pages/cate/main'
        // })
        // uni.switchTab({
        //   url: '/pages/user/main'
        // })

        // let app = getApp()
        // console.log(app)
        // console.log(this)
        // console.log(u)
        // u.wxLogin()
        // u.request({
        //   url: u.api.test,
        //   method: 'GET',
        //   data: {},
        //   success(res) {
        //     console.log(res)
        //   }
        // })
    }
}
</script>

<style scoped>
/* 门店 */
.site {
    overflow: hidden;
    margin: 15px;
}

.site-l-img {
    float: left;

}

.site-l-img image {
    display: block;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
}

.site-l-store {
    margin-left: 10px;
    float: left;
}

.site-l-name {
    line-height: 25px;
    font-size: 16px;
    color: #333;
}

.site-l-storename {
    line-height: 20px;
    font-size: 12px;
    color: #999;
}

.site-r {
    float: right;
    padding-left: 15px;
    margin-top: 5px;
    margin-left: 15px;
}

.site-r image {
    display: block;
    width: 25px;
    height: 25px;
}

.site-r-des {
    font-size: 12px;
    line-height: 15px;
    color: #999;
    line-height: 12px;
}

/* 焦点图 */
.swiper {
    width: 345px;
    border-radius: 5px;
    overflow: hidden;
    margin: 0 15px 0 15px;
    height: 150px;
}

.swiper swiper-item {
    background: #eee;
}

.swiper image {
    width: 100%;
    height: 150px;
}

/* 分类 */
.cate {
    margin: 15px;
    overflow: hidden;
}

.cate-item {
    width: 115px;
    padding: 5px 0;
    float: left;
}

.cate-item image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    margin: 0px auto;
}

.cate-item text {
    display: block;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #333;
}

.title {
    height: 50px;
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    background-image: -webkit-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
    background-image: -o-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
    background-image: -moz-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
    background-image: linear-gradient(to bottom, #eee, #fff, #fff, #fff, #fff);
}

/* 新品推荐 */
.pro1 {
    margin: 5px 0 15px 15px;
}

.pro1 scroll-view {
    white-space: nowrap;
}

.pro1-item {
    display: inline-block;
    margin-right: 10px;
}

.pro1-item image {
    display: block;
    width: 125px;
    height: 125px;
}

.pro1-item-tit {
    display: block;
    font-size: 13px;
    color: #333;
    line-height: 25px;
}

.pro1-item-price {
    display: block;
    font-size: 16px;
    color: #d1a178;
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

.more-btn {
    display: inline-block;
    line-height: 30px;
    height: 30px;
    border: 1upx solid #d1a178;
    border-radius: 15px;
    padding: 0 25px;
    font-size: 14px;
    text-align: center;
    color: #d1a178;
}


/* 精选下面的分类 */
.cate1 {
    margin: 5px 0 15px 15px;
}

.cate1 scroll-view {
    white-space: nowrap;
}

.cate1-item {
    display: inline-block;
    margin-right: 30px;
}

.cate1-item text {
    display: block;
    font-size: 14px;
    color: #333;
    line-height: 25px;
    border-bottom: 3px solid #fff;
}

.cate1-item.cur text {
    display: block;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 3px solid #d1a178;
}
</style>
