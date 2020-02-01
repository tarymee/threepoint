<template>
<div>

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
            <!-- <div class="site__r-item" style="border-right: 1px solid #e9e9e9" @tap="contact(site.phone)"> -->
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

    <swiper v-if="sliderArr.length > 0" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item, index) in sliderArr" :key="index">
            <swiper-item class="swiper__item">
                <image class="swiper__img" lazy-load :src="item.img" mode="aspectFill" @click="jump(item.url)"></image>
            </swiper-item>
        </block>
    </swiper>

    <div class="cate">
        <a class="cate-item" @click="jump(`/pages/cate/cate?id=${item.id}&title=${item.title}`)" v-for="(item, index) in cateArr" :key="index">
            <image :src="item.img" mode="aspectFill"></image><text>{{item.title}}</text>
        </a>
        <!-- <a class="cate-item" url="/pages/cate/cate?id=2&title=陶瓷类">
            <image src="/static/img/home/cate2.png" mode="aspectFill"></image><text>陶瓷类</text>
        </a>
        <a class="cate-item" url="/pages/cate/cate?id=3&title=玻璃类">
            <image src="/static/img/home/cate3.png" mode="aspectFill"></image><text>玻璃类</text>
        </a>
        <a class="cate-item" url="/pages/cate/cate?id=4&title=不锈钢">
            <image src="/static/img/home/cate4.png" mode="aspectFill"></image><text>不锈钢</text>
        </a>
        <a class="cate-item" url="/pages/cate/cate?id=5&title=装饰类">
            <image src="/static/img/home/cate5.png" mode="aspectFill"></image><text>装饰类</text>
        </a>
        <a class="cate-item" url="/pages/cate/cate?id=6&title=布料">
            <image src="/static/img/home/cate6.png" mode="aspectFill"></image><text>布料</text>
        </a> -->
    </div>

    <div class="title" v-if="newArr.length">
        <div class="title__tit">新品推荐</div>
        <div class="title__des">PRODUCTS</div>
    </div>
    <div class="pro1">
        <scroll-view scroll-x>
            <a class="pro1-item" @click="jump(`/pages/product/product?id=${item.id}&title=${item.name}&price=${item.price}&cover=${item.img}`)" v-for="(item, index) in newArr" :key="index">
                <image :src="item.img" mode="aspectFill"></image>
                <text class="pro1-item-new">NEW</text>
                <text class="pro1-item-tit">{{item.name}}</text>
                <div class="pro1-item-price"><text>￥</text>{{item.price}}</div>
            </a>
        </scroll-view>
    </div>
    <div class="more" v-if="newArr.length">
        <a class="more__btn" @click="jump('/pages/cate/cate?id=&title=最新产品&type=1')">查看更多</a>
    </div>

    <div class="title" v-if="false">
        <div class="title__tit">产品类目</div>
        <div class="title__des">CATEGORY</div>
    </div>
    <div class="catepro" v-if="false">
        <!-- <div class="catepro__item">
            <div class="catepro__item-tit">不<br>锈<br>钢</div>
            <div class="catepro__item-list">
                <a class="catepro__item-pro">
                    <image src="http://fpoimg.com/400x400" mode="aspectFill"></image>
                </a>
                <a class="catepro__item-pro">
                    <image src="http://fpoimg.com/400x400" mode="aspectFill"></image>
                </a>
                <a class="catepro__item-pro">
                    <image src="http://fpoimg.com/400x400" mode="aspectFill"></image>
                </a>
            </div>
        </div> -->
        <div class="catepro__item" v-for="(item, index) in proCateArr" :key="index">
            <div class="catepro__item-tit">{{item.title}}</div>
            <div class="catepro__item-list">
                <a class="catepro__item-pro" @click="jump(`/pages/cate/cate?id=${item2.id}&title=${item2.title}`)" v-for="(item2, index2) in item.subClassify" :key="index2">
                    <image :src="item2.logo" mode="aspectFill"></image>
                </a>
            </div>
        </div>
    </div>

    <div class="title">
        <div class="title__tit">推荐产品</div>
        <div class="title__des">PRODUCTS</div>
    </div>
    <!-- <div class="propic">
        <image src="http://fpoimg.com/400x400" mode="aspectFill"></image>
    </div>
    <productList :productArr="bottomLoad_data"></productList>
    <div class="more">
        <a class="more__btn" @click="jump('/pages/cate/cate?id=&title=最新产品&type=1')">查看更多</a>
    </div>
    <div class="spacegray"></div> -->

    <div class="" v-for="(item, index) in productsArr" :key="index">
        <div class="propic">
            <image :src="item.logo" mode="aspectFill"></image>
        </div>
        <productList :productArr="item.goods"></productList>
        <div class="more">
            <a class="more__btn" @click="jump(`/pages/cate/cate?id=${item.id}&title=${item.title}`)">查看更多</a>
        </div>
        <div class="spacegray"></div>
    </div>


    <div class="title">
        <div class="title__tit">所有产品</div>
        <div class="title__des">PRODUCTS</div>
    </div>
    <div class="cate1__place" :class="cate1Fixed ? 'cate1__place--holder' : ''"></div>
    <div class="cate1" :class="cate1Fixed ? 'cate1--fixed' : ''">
        <scroll-view scroll-x>
            <a class="cate1__item" :class="item.select ? 'cate1__item--cur' : ''" v-for="(item, index) in cate1Arr" :key="index" @click="reloadCate(item.id)">
                <text>{{item.title}}</text>
            </a>
        </scroll-view>
    </div>
    <productList :productArr="bottomLoad_data"></productList>
    <tip :text="bottomLoad_tip" :none-icon="noneIcon"></tip>
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
    computed: {
        noneIcon () {
            let that = this
            return that.bottomLoad_data.length ? false : true
        }
    },
    data() {
        return {
            autoplay: true,
            indicatorDots: true,
            interval: 5000,
            duration: 300,
            site: {
                // title: '三分陶瓷旗舰店',
                // img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                // address: '广东省广州市天河区车陂文化大街',
                // phone: '400-4895-8451',
            },
            sliderArr: [
                // {
                //     img: 'http://dummyimage.com/200x150',
                //     url: '/pages/product/product'
                // }
            ],
            proCateArr: [],
            productsArr: [],
            cateArr: [
                // {
                //     title: '青瓷',
                //     img: '/static/img/home/cate1.png',
                //     id: '1'
                // },
                // {
                //     title: '白瓷',
                //     img: '/static/img/home/cate2.png',
                //     id: '2'
                // },
                // {
                //     title: '对帖',
                //     img: '/static/img/home/cate3.png',
                //     id: '3'
                // },
                // {
                //     title: '荷花',
                //     img: '/static/img/home/cate4.png',
                //     id: '4'
                // },
                // {
                //     title: '印花',
                //     img: '/static/img/home/cate5.png',
                //     id: '5'
                // },
                // {
                //     title: '玻璃',
                //     img: '/static/img/home/cate6.png',
                //     id: '6'
                // }
            ],
            newArr: [
                // {
                //   img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                //   name: '青花瓷功夫茶杯',
                //   price: '386',
                //   url: '/pages/product/product'
                // },
                // {
                //   img: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                //   name: '青花瓷功夫茶杯',
                //   price: '386',
                //   url: '/pages/product/product'
                // },
                // {
                //   img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                //   name: '青花瓷功夫茶杯',
                //   price: '386',
                //   url: '/pages/product/product'
                // },
                // {
                //   img: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                //   name: '青花瓷功夫茶杯',
                //   price: '386',
                //   url: '/pages/product/product'
                // }
            ],
            cate1Arr: [
                // {
                //     title: '青瓷',
                //     select: true,
                //     id: '1'
                // },
                // {
                //     title: '白瓷',
                //     id: '2'
                // },
                // {
                //     title: '对帖',
                //     id: '3'
                // },
                // {
                //     title: '荷花',
                //     id: '4'
                // },
                // {
                //     title: '印花',
                //     id: '5'
                // },
                // {
                //     title: '玻璃',
                //     id: '6'
                // },
                // {
                //     title: '布料',
                //     id: '7'
                // }
            ],
            cate1Fixed: false,
            bottomLoad_data: [],
            bottomLoad_api: u.api.list,
            bottomLoad_params: {
                // category_id: '1'
            }
        }
    },
    methods: {
        aaa(info) {
            console.log(info)
        },
        showAddress(info) {
            wx.openLocation({
                // latitude: 23.13171,
                // longitude: 113.26627,
                latitude: Number(info.latitude),
                longitude: Number(info.longitude),
                name: info.title,
                address: info.address,
                scale: 18
            })
        },
        phone(number) {
            uni.makePhoneCall({
                phoneNumber: number
            })
        },
        handleContact(e) {
            console.log(e)
        },
        contact: function (wechat) {
            uni.showModal({
                title: '请添加微信 联系客服',
                content: '微信号：' + wechat,
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        reloadCate(id) {
            let that = this
            that.cate1Arr.forEach((item, i) => {
                if (id === item.id) {
                    item.select = true
                } else {
                    item.select = false
                }
            })
            that.bottomLoad_params.category_id = id
            that.bottomLoad_reload()
        }
    },
    onPageScroll(e) {
        // console.log(e)
        let that = this
        let view = uni.createSelectorQuery().select(".cate1__place")
        view.boundingClientRect(data => {
            // console.log("得到布局位置信息" + JSON.stringify(data))
            // console.log("节点离页面顶部的距离为" + data.top)
            if (data.top <= 0) {
                that.cate1Fixed = true
            } else {
                that.cate1Fixed = false
            }
        }).exec()
    },
    onLoad() {
        console.log('index onLoad')
        var that = this
        u.request({
            url: u.api.index,
            data: {},
            isVerifyLogin: false,
            success(res) {
                console.log(res)
                that.site = u.dataTransform(res.site, {
                    logo: 'img',
                    address: 'address',
                    title: 'title',
                    phone: 'phone',
                })

                that.sliderArr = u.dataTransform(res.ppt, {
                    logo: 'img',
                    url: 'url',
                })

                that.newArr = u.dataTransform(res.newest, {
                    logo: 'img',
                    title: 'name',
                    vipPrice: 'price',
                })

                that.cateArr = u.dataTransform(res.classify, {
                    logo: 'img',
                    title: 'title',
                    id: 'id',
                })
                // res.classify4 = [
                //     {
                //         "flag": 2,
                //         "id": 35,
                //         "logo": "https://www.3ftc.com/uploads/20190514151044塑料.JPG",
                //         "pid": 0,
                //         "remark": "塑料类",
                //         "sort": 1,
                //         "subClassify": [
                //             {
                //                 "flag": 3,
                //                 "id": 91,
                //                 "logo": "https://www.3ftc.com/uploads/20190527110216筷子1.png",
                //                 "pid": 35,
                //                 "sort": 1,
                //                 "title": "合金筷",
                //                 "type": 2
                //             },
                //             {
                //                 "flag": 0,
                //                 "id": 92,
                //                 "logo": "https://www.3ftc.com/theme/layui/images/defaultpic.gif",
                //                 "pid": 35,
                //                 "sort": 2,
                //                 "title": "冰盘",
                //                 "type": 2
                //             },
                //             {
                //                 "flag": 0,
                //                 "id": 95,
                //                 "logo": "https://www.3ftc.com/theme/layui/images/defaultpic.gif",
                //                 "pid": 35,
                //                 "sort": 3,
                //                 "title": "餐垫",
                //                 "type": 2
                //             }
                //         ],
                //         "title": "塑料类",
                //         "type": 2
                //     },
                //     {
                //         "flag": 2,
                //         "id": 34,
                //         "logo": "https://www.3ftc.com/uploads/20190527110047陶瓷.png",
                //         "pid": 0,
                //         "sort": 10,
                //         "subClassify": [
                //             {
                //                 "flag": 0,
                //                 "id": 65,
                //                 "logo": "https://www.3ftc.com/uploads/20190422145909特价陶瓷.png",
                //                 "pid": 34,
                //                 "sort": 1,
                //                 "title": "特价陶瓷",
                //                 "type": 2
                //             },
                //             {
                //                 "flag": 0,
                //                 "id": 66,
                //                 "logo": "https://www.3ftc.com/uploads/20190422152807停产陶瓷.png",
                //                 "pid": 34,
                //                 "sort": 2,
                //                 "title": "停产陶瓷",
                //                 "type": 2
                //             }
                //         ],
                //         "title": "陶瓷类",
                //         "type": 2
                //     }
                // ]
                // res.classify4.forEach((item, i) => {
                //     item.title = item.title.split('').join('<br />')
                // })
                console.log(res.classify4)
                that.proCateArr = res.classify4

                // res.products = [
                //     {
                //         "flag": 3,
                //         "id": 91,
                //         "logo": "https://www.3ftc.com/uploads/20190527110216筷子1.png",
                //         "pid": 35,
                //         "sort": 1,
                //         "title": "合金筷",
                //         "type": 2,
                //         "goods": [
                //             {
                //                 "id": 48,
                //                 "logo": "https://www.3ftc.com/uploads/20190524114048六角筷子1.jpg",
                //                 "marketPrice": 1,
                //                 "title": "合金筷塑料筷22-24cm",
                //                 "vipPrice": 1
                //             },
                //             {
                //                 "id": 48,
                //                 "logo": "https://www.3ftc.com/uploads/20190524114048六角筷子1.jpg",
                //                 "marketPrice": 1,
                //                 "title": "合金筷塑料筷22-24cm",
                //                 "vipPrice": 1
                //             },
                //             {
                //                 "id": 48,
                //                 "logo": "https://www.3ftc.com/uploads/20190524114048六角筷子1.jpg",
                //                 "marketPrice": 1,
                //                 "title": "合金筷塑料筷22-24cm",
                //                 "vipPrice": 1
                //             },
                //             {
                //                 "id": 48,
                //                 "logo": "https://www.3ftc.com/uploads/20190524114048六角筷子1.jpg",
                //                 "marketPrice": 1,
                //                 "title": "合金筷塑料筷22-24cm",
                //                 "vipPrice": 1
                //             }
                //         ]
                //     },
                //     {
                //         "flag": 3,
                //         "id": 91,
                //         "logo": "https://www.3ftc.com/uploads/20190527110216筷子1.png",
                //         "pid": 35,
                //         "sort": 1,
                //         "title": "合金筷",
                //         "type": 2,
                //         "goods": []
                //     }
                // ]
                that.productsArr = res.products

                res.classify2 = [{
                    id: '',
                    title: '所有'
                }].concat(res.classify2)

                that.cate1Arr = u.dataTransform(res.classify2, {
                    title: 'title',
                    id: 'id',
                })
                that.reloadCate(that.cate1Arr[0].id)
            }
        })

    }
}
</script>

<style scoped>
/* 门店 */
.site {
    overflow: hidden;
    margin: 15px;
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
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
}
.site__store-info {
    
}
.site__store-info-tit {
    line-height: 25px;
    font-size: 16px;
    color: #333;
    height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.site__store-info-address {
    line-height: 20px;
    font-size: 12px;
    color: #999;
    height: 20px;
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
    width: 45px;
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
    width: 25px;
    height: 25px;
    margin: 0px auto;
}
.site__r-item-tit {
    font-size: 12px;
    line-height: 20px;
    color: #999;
}


/* 焦点图 */
.swiper {
    overflow: hidden;
    height: 400upx;
}
.swiper__item {
    background: url('~@/static/img/loading.gif') center center no-repeat;
}
.swiper__img {
    width: 100%;
    height: 400upx;
}


/* 分类 */
.cate {
    margin: 15px;
    overflow: hidden;
}
.cate-item {
    width: 25%;
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

/* 标题 */
.title {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    background-image: -webkit-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
    background-image: -o-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
    background-image: -moz-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
    background-image: linear-gradient(to bottom, #eee, #fff, #fff, #fff, #fff);
}
.title__tit {
    line-height: 50upx;
    font-size: 42upx;
    font-weight: bold;
}
.title__des {
    display: inline-block;
    border-top: 1upx solid #d1a178;
    line-height: 40upx;
    color: #ccc;
    font-size: 28upx;
}



.catepro {

}
.catepro__item {
    overflow: hidden;
}
.catepro__item-tit {
    float: left;
    width: 90upx;
    padding: 0 20upx;
    text-align: center;
    line-height: 40upx;
    font-size: 16px;
    border-right: 1px solid #d1a178;
    margin-top: 50upx;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.catepro__item-list {
    overflow: hidden;
}
.catepro__item-pro {
    float: left;
    width: 160upx;
    height: 160upx;
    margin: 30upx;
}
.catepro__item-pro image {
    display: block;
    width: 160upx;
    height: 160upx;
}

.propic {
    margin: 15upx 30upx;
    border-radius: 5upx;
    overflow: hidden;
}
.propic image{
    display: block;
    width: 100%;
    border-radius: 5upx;
    height: 300upx;
}

.spacegray {
    height: 20upx;
    background-color: rgb(239,239,239);;
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
    font-size: 16px;
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
    border: 1upx solid #d1a178;
    border-radius: 15px;
    padding: 0 25px;
    font-size: 14px;
    text-align: center;
    color: #d1a178;
}



</style>
