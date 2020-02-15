<template>
    <div class="start">
        <div class="search">
            <a class="search-input" @tap="jump(`/pages/search/search`)">
                搜索您喜欢的产品
                <uni-icon color="#999999" class="" size="18" type="search" style="float:right" />
            </a>
        </div>
        <div class="search-space"></div>
        <div class="site">
            <div class="site__store" @click="showAddress(site)">
                <image :src="site.img" mode="aspectFill" class="site__store-img"></image>
                <div class="site__store-info">
                    <div class="site__store-info-tit">{{site.title}}</div>
                    <div class="site__store-info-address">{{site.address}}</div>
                </div>
            </div>
            <div class="site__r">
                <div class="site__r-item" style="border-right: 1px solid #e9e9e9">
                    <image src="/static/img/home/icon2.png" mode="aspectFill" class="site__r-item-img"></image>
                    <div class="site__r-item-tit">客服</div>
                    <button open-type="contact" @contact="handleContact">客服</button>
                </div>
                <div class="site__r-item" @click="phone(site.phone)">
                    <image src="/static/img/home/icon1.png" mode="aspectFill" class="site__r-item-img"></image>
                    <div class="site__r-item-tit">电话</div>
                </div>
            </div>
        </div>

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
                <image :src="item.wh.logo" lazy-load mode="widthFix"></image>
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
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    components: {
        uniIcon
    },
    data() {
        return {
            aaa: {},
            site: {
                title: '⊠⊠⊠⊠',
                img: '',
                address: '⊠⊠⊠⊠⊠⊠⊠⊠⊠⊠⊠⊠',
                phone: '000-000-000-000',
            },
            navList: [],
        }
    },
    methods: {
        phone(number) {
            uni.makePhoneCall({
                phoneNumber: number
            })
        },
        handleContact(e) {
            console.log(e)
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
    onLoad(e) {
        console.log('index onLoad')
        // 记录通过二维码打开传递的分销信息
        console.log(e)
        if (e.scene) {
            uni.setStorageSync('scene', e.scene)
        }
        var that = this
        u.request({
            url: u.api.weapp,
            data: {},
            isVerifyLogin: false,
            success(res) {
                console.log(res)

                that.site = u.dataTransform(res.site, {
                    logo: 'img',
                    remark: 'address',
                    title: 'title',
                    phone: 'phone',
                })

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
            }
        })
    },
    onShow() {
        console.log('start onShow')
    }
}
</script>

<style scoped>
.search {
    background-color: #800019;
    padding: 20upx;
    width: 710upx;
    height: 50upx;
    line-height: 50upx;
    overflow: hidden;
    vertical-align: top;
    font-size: 14px;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 1;
}
.search-input {
    overflow: hidden;
    height: 50upxpx;
    border-radius: 25upx;
    background-color: #fff;
    color: #777;
    font-size: 14px;
    padding: 0 20upx;
}
.search-space {
    height: 90upx;
}


/* 门店 */
.site {
    overflow: hidden;
    margin: 30upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.site__store {
    display: flex;
    align-items: center;
}
.site__store-img {
    flex: none;
    display: block;
    width: 100upx;
    height: 100upx;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 20upx;
    background-color: #eee;
}
.site__store-info {
    
}
.site__store-info-tit {
    line-height: 50upx;
    font-size: 16px;
    color: #333;
    height: 50upx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.site__store-info-address {
    line-height: 40upx;
    font-size: 12px;
    color: #999;
    height: 40upx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.site__r {
    display: flex;
    flex: none;
}
.site__r-item {
    width: 90upx;
    text-align: center;
    position: relative;
}
.site__r-item button {
    opacity: 0;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}
.site__r-item-img {
    display: block;
    width: 50upx;
    height: 50upx;
    margin: 0px auto;
}
.site__r-item-tit {
    font-size: 12px;
    line-height: 40upx;
    color: #999;
}




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
    top: 315upx;
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
    top: 550upx;
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
    top: 1180upx;
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
    top: 1200upx;
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
}

/* 新品推荐 */
.pro1 {
    margin: 15px 15px 15px 15px;
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
