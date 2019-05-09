<template>
  <div>
    <swiper v-if="swiperArr.length > 0" class="proswiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="(item, index) in swiperArr" :key="index" class="proswiper__item">
            <image lazy-load :src="item.img" mode="aspectFill" class="proswiper__img"></image>
        </swiper-item>
    </swiper>

    <div class="product__price">¥{{price}}</div>
    <div class="product__title">{{title}}</div>

    <div class="product__sel" @click="openSelect">
        <div class="product__sel-tit">选择</div>
        <div class="product__sel-des">{{specTip}}</div>
    </div>

    <div style="height: 10px; background: #eee;"></div>


    <uni-popup :show="popupType === 'select'" position="bottom" @hidePopup="togglePopup('')">
        <div class="product__selcon">
            <div class="product__selcon-close" @click="togglePopup('')">X</div>

            <div v-for="(item, index) in specArr" :key="index">
                <div class="product__selcon-tit">{{ item.title }}</div>
                <div class="product__selcon-list">
                    <div v-for="(item2, index2) in item.specs" :key="index2">
                        <div class="product__selcon-item" :class="item.specs[item.select].id === item2.id ? 'product__selcon-item--cur' : ''" @click="selItem(index, index2)">{{ item2.title }}</div>
                    </div>
                </div>
            </div>

            <div class="product__selcon-tit">购买数量</div>
            <div class="product__selcon-num">
                <uni-number-box :min="1" :max="1000" :value="count" @change="watchCountChange"></uni-number-box>
            </div>
            <div class="product__selcon-btns" v-if="selectPopupFrom === 1">
                <div class="product__selcon-btns-buy" @click="popupBuy">立即购买</div>
                <div class="product__selcon-btns-add" @click="popupAddcart">加入购物车</div>
            </div>
            <div class="product__selcon-btns" v-if="selectPopupFrom === 2">
                <div class="product__selcon-btns-confirm" @click="popupComfirm">确定</div>
            </div>
        </div>
    </uni-popup>


    <uni-popup :show="popupType === 'share'" position="bottom" @hidePopup="togglePopup('')">
        <view class="share__tit">分享到</view>
        <view class="share__con">
            <view class="share__con-item" v-for="(item, index) in shareData" :key="index" @click="test">
                <view class="share__item-img" :class="item.name">
                    <text class="share__item-icon">{{ item.icon }}</text>
                </view>
                <view class="share__item-txt">{{ item.text }}</view>
            </view>
        </view>
        <view class="share__btn" @click="togglePopup('')">取消分享</view>
    </uni-popup>

    <div class="product-con">
        <rich-text :nodes="htmlString"></rich-text>
    </div>

    <div class="product-tf">
        <!-- <div class="product-tf__item" @click="togglePopup('share')"> -->
        <div class="product-tf__item" @click="share()">
            <div class="fa fa-share-alt product-tf__item-icon"></div>
            <div class="product-tf__item-tit">分享</div>
            <button open-type="share">转发</button>
        </div>
        <div class="product-tf__item">
            <div class="fa fa-commenting product-tf__item-icon"></div>
            <div class="product-tf__item-tit">客服</div>
            <button open-type="contact" @contact="handleContact">客服</button>
        </div>
        <div class="product-tf__item" style="margin-right: 15px" @tap="jump('/pages/cart/cart', true)">
            <div class="fa fa-shopping-cart product-tf__item-icon"></div>
            <div class="product-tf__item-tit">购物车</div>
            <div class="product-tf__item-count" v-if="cartCount">{{cartCount}}</div>
        </div>
        <div class="product-tf__btns">
            <div class="product-tf__btns-buy" @click="buy">立即购买</div>
            <div class="product-tf__btns-add" @click="addcart">加入购物车</div>
        </div>
    </div>
  </div>
</template>


<script>
import u from "@/common/util"
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'

export default {
    components: {
        uniNumberBox,
        uniPopup
    },
    data() {
        return {
            autoplay: true,
            indicatorDots: true,
            interval: 5000,
            duration: 300,
            id: '',
            price: 0,
            title: '',
            img: '',
            htmlString: "",
            swiperArr: [],
            // 规格数据
            specArr: [],
            count: 1,
            cartCount: 0,
            // 弹出框类型 share: 分享, select： 选择产品颜色大小等
            popupType: '',
            // 产品分类框是由哪里打开的
            // 1 如果是标题下面的选择打开则显示立即购买和加入购物车
            // 2 如果是通过底部的立即购买和加入购物车打开的 则显示确定按钮
            selectPopupFrom: 1,
            isAddCart: true,
            shareData: [{
                    text: '微信',
                    icon: '\ue6a4',
                    name: 'wx'
                },
                {
                    text: '朋友圈',
                    icon: '\ue646',
                    name: 'wx'
                },
                {
                    text: 'QQ',
                    icon: '\ue66b',
                    name: 'qq'
                },
                {
                    text: '新浪',
                    icon: '\ue600',
                    name: 'sina'
                },
                {
                    text: '复制',
                    icon: '\ue632',
                    name: 'copy'
                },
                {
                    text: '更多',
                    icon: '\ue618',
                    name: 'more'
                }
            ]
        }
    },
    computed: {
        specTip () {
            let that = this
            return that.checkSpec().specTip
        }
    },
    methods: {
        watchCountChange(val) {
            this.count = val
            console.log(val)
        },
        share() {
            // uni.showShareMenu({
            //     withShareTicket: true
            // })
        },
        handleContact(e) {
            console.log(e)
        },
        jump(url, isSwitchTab) {
            u.jump(url, isSwitchTab)
        },
        togglePopup(popupType) {
            this.popupType = popupType
        },
        selItem(index, index2) {
            if (this.specArr[index].select != index2) {
                this.specArr[index].select = index2
            } else {
                this.specArr[index].select = null
            }
        },
        // 检测规格
        checkSpec() {
            let that = this
            let isNeedSpec = that.specArr.length ? true : false
            let isSelAllSpec = true
            let selSpecArr = []
            let noSelSpecArr = []
            for (let i = 0, len = that.specArr.length; i < len; i++) {
                if (that.specArr[i].select === null) {
                    isSelAllSpec = false
                    noSelSpecArr.push(that.specArr[i])
                } else {
                    selSpecArr.push(that.specArr[i])
                }
            }
            let specTip = ''
            if (isNeedSpec) {
                if (isSelAllSpec) {
                    let tipArr = []
                    selSpecArr.forEach((item, i) => {
                        tipArr.push(item.specs[item.select].title)
                    })
                    specTip = `规格: ${tipArr.join(' ')}`
                } else {
                    let tipArr = []
                    noSelSpecArr.forEach((item, i) => {
                        tipArr.push(item.title)
                    })
                    specTip = `请选择 ${tipArr.join(' ')}`
                }
            }

            return {
                isNeedSpec,
                isSelAllSpec,
                selSpecArr,
                specTip,
                noSelSpecArr,
            }
        },
        // 整合数据
        dealData() {
            let that = this
            let a = that.checkSpec()
            console.log(a)
            let spec = []
            if (a.isSelAllSpec) {
                a.selSpecArr.forEach((item, i) => {
                    spec.push({
                        'id': item.id,
                        'title': item.title,
                        'selid': item.specs[item.select].id,
                        'seltitle': item.specs[item.select].title,
                    })
                })
            } else {
                uni.showToast({
                    title: a.specTip,
                    icon: 'none'
                })
            }

            let postData = {
                // name: that.title,
                // img: that.img,
                goods_id: that.id,
                // price: that.price,
                goods_num: that.count,
                spec: JSON.stringify(spec),
                // specTip: a.specTip,
            }
            return postData
        },
        openSelect() {
            let that = this
            that.togglePopup('select')
            that.selectPopupFrom = 1
        },
        buy() {
            let that = this
            // 打开选择框
            that.togglePopup('select')
            that.selectPopupFrom = 2
            that.isAddCart = false
        },
        addcart() {
            let that = this
            // 打开选择框
            that.togglePopup('select')
            that.selectPopupFrom = 2
            that.isAddCart = true
        },
        popupBuy() {
            let that = this
            that.isAddCart = false
            that.popupComfirm()
        },
        popupAddcart() {
            let that = this
            that.isAddCart = true
            that.popupComfirm()
        },
        popupComfirm() {
            let that = this
            let a = that.checkSpec()
            console.log('checkSpec', a)
            if (a.isSelAllSpec) {
                let postData = that.dealData()
                console.log('postData', postData)
                if (that.isAddCart) {
                    u.checkLogin(function () {
                        u.request({
                            url: u.api.cartadd,
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            data: postData,
                            isVerifyLogin: true,
                            success(res) {
                                console.log(res)
                                if (res.code == 1) {
                                    uni.showToast({
                                        title: '添加成功 在购物车等亲',
                                        icon: 'none'
                                    })
                                    that.cartCount++
                                    that.togglePopup('')
                                } else {
                                    uni.showToast({
                                        title: res.msg,
                                        icon: 'none'
                                    })
                                }
                            },
                            fail(res) {
                                console.error(res)
                            }
                        })
                    })
                } else {
                    // 立即购买
                    u.checkLogin(function () {
                        u.request({
                            url: u.api.orderbuynow,
                            method: 'GET',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            data: postData,
                            isVerifyLogin: true,
                            isShowLoading: true,
                            isShowError: true,
                            success(res) {
                                console.log(res)
                                if (res.code == 1) {
                                    console.log('跳去订单确认页')
                                    uni.navigateTo({
                                        url: '/pages/confirm/confirm?confirmData=' + encodeURIComponent(JSON.stringify(res.data)) + '&type=buynow&buynowData=' + encodeURIComponent(JSON.stringify(postData))
                                    })
                                } else {
                                    console.error('提交订单失败')
                                }
                            },
                            fail(res) {
                                console.error(res)
                            }
                        })

                        // let confirmArr = [postData]
                        // let proPrice = u.math.multimul(confirmArr[0].price, confirmArr[0].count)
                        // uni.navigateTo({
                        //     url: '/pages/confirm/confirm?confirmArr=' + encodeURIComponent(JSON.stringify(confirmArr)) + '&proPrice=' + proPrice
                        // })
                    })
                }
            } else {
                uni.showToast({
                    title: a.specTip,
                    icon: 'none'
                })
            }
        },
        test() {
            let that = this
            console.log(888)
        }
    },
    onShareAppMessage() {
        let that = this
        let obj = {
            title: this.title,
            path: `/pages/product/product/?id=${that.id}&title=${that.title}&price=${that.price}`
        }
        console.log('分享')
        console.log(obj)
        return obj
    },
    onLoad(event) {
        console.log("product onLoad")
        let that = this
        console.log(event)
        that.title = event.title
        that.id = event.id
        that.price = event.price
        that.swiperArr = [event.cover]
        uni.setNavigationBarTitle({
            title: that.title
        })

        u.request({
            url: u.api.goods + that.id,
            // url: u.api.goods + '27',
            method: 'POST',
            data: {},
            isVerifyLogin: false,
            success(res) {
                console.log(res)
                if (res && res.goods) {
                    res = res.goods

                    that.title = res.title
                    uni.setNavigationBarTitle({
                        title: that.title
                    })
                    that.price = res.vipPrice
                    that.img = res.logo
                    that.swiperArr = u.dataTransform(res.pics, {
                        path: 'img',
                    })
                    let dealSpecArr = []
                    res.spec.forEach((item, i) => {
                        item.select = null
                        if (item.specs && item.specs.length) {
                            dealSpecArr.push(item)
                        }
                    })
                    that.specArr = dealSpecArr
                    that.htmlString = res.remark
                }
            },
            fail(res) {
                console.error(res)
            }
        })

        return false
        let res = {
            'id': '5188314',
            'title': '青花瓷30CM',
            'price': '8',
            'swiperArr': [
                {
                    img: 'https://cbu01.alicdn.com/img/ibank/2018/317/567/9509765713_1899654620.400x400.jpg'
                },
                {
                    img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg'
                }
            ],
            'img': 'https://cbu01.alicdn.com/img/ibank/2018/317/567/9509765713_1899654620.400x400.jpg',
            'content': '<p>青花瓷30CM</p><p><img style="max-width:100%" src="https://cbu01.alicdn.com/img/ibank/2018/553/678/9509876355_1899654620.jpg" /></p><p><img style="max-width:100%" src="https://cbu01.alicdn.com/img/ibank/2018/929/343/9464343929_1899654620.jpg" /></p><p><img style="max-width:100%" src="https://cbu01.alicdn.com/img/ibank/2018/568/071/9488170865_1899654620.jpg" /></p>',
            'spec': [
                {
                    'title': '尺码',
                    'id': '112233',
                    'specs': [
                        {
                            'id': '111',
                            'title': '30CM'
                        },
                        {
                            'id': '222',
                            'title': '60CM'
                        },
                        {
                            'id': '333',
                            'title': '90CM'
                        }
                    ]
                },
                {
                    'title': '颜色',
                    'id': '445566',
                    'specs': [
                        {
                            'id': '444',
                            'title': '魔法黑'
                        },
                        {
                            'id': '555',
                            'title': '青花素'
                        },
                        {
                            'id': '666',
                            'title': '陶瓷白'
                        }
                    ]
                }
            ]
        }
        if (res) {
            that.title = res.title
            uni.setNavigationBarTitle({
                title: that.title
            })
            that.price = res.price
            that.img = res.img
            that.swiperArr = res.swiperArr
            let dealSpecArr = []
            res.spec.forEach((item, i) => {
                item.select = null
                if (item.specs && item.specs.length) {
                    dealSpecArr.push(item)
                }
            })
            that.specArr = res.specArr
            that.htmlString = res.content
            // that.htmlString = res.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"")
        }

    },
    onShow() {
        let that = this
        u.checkLogin(function (token, userid, userInfo) {
            u.request({
                url: u.api.cartlist,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {},
                isVerifyLogin: true,
                isShowLoading: false,
                isShowError: false,
                success(res) {
                    console.log(res)
                    if (res && res.code == 1 && res.data && res.data.length) {
                        that.cartCount = res.data.length
                    }
                },
                fail(res) {
                    console.error(res)
                }
            })
        }, null, false)
    }
}
</script>




<style scoped>
    /* 焦点图 */
    .proswiper {
        overflow: hidden;
        height: 300px;
    }
    .proswiper__item {
        background: url('~@/static/img/loading.gif') center center no-repeat;
    }
    .proswiper__img {
        width: 100%;
        height: 300px;
    }

    /* 图文详情 */
    .product-con {
        line-height: 1.6;
        padding: 15px 15px 65px;
        overflow: hidden;
        font-size: 14px;
        color: #333;
    }



    .product__price {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        padding-top: 15px;
        color: #d1a178;
        font-weight: bold;
    }
    .product__title {
        padding: 0 15px 15px;
        font-size: 14px;
        text-align: center;
    }

    /* 选择 */
    .product__sel {
        border-top: 1px solid #eee;
        padding: 10px 15px;
        overflow: hidden;
    }
    .product__sel-tit {
        font-size: 16px;
        float: left;
    }
    .product__sel-des {
        float: right;
        font-size: 12px;
        color: #999;
    }



    /* 选择pop */
    .product__selcon {
        background-color: #fff;
        padding: 15px;
        position: relative;
        text-align: left;
    }
    .product__selcon-close{
        width: 25px;
        height: 25px;
        border: 1px solid #999;
        border-radius: 15px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        position: absolute;
        right: 15px;
        top: 15px;
    }
    .product__selcon-tit {
        font-size: 15px;
        line-height: 40px;
    }
    .product__selcon-list {
        overflow: hidden;
        /* margin-bottom: 10px; */
        vertical-align: top;
    }
    .product__selcon-item {
        /* display: inline-block; */
        float: left;
        height: 25px;
        line-height: 25px;
        background-color: #ddd;
        border: 1px solid #ddd;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 12px;
        vertical-align: top;
    }
    .product__selcon-item--cur {
        color: #f00;
        border: 1px solid #f00;
    }
    .product__selcon-num {
        overflow: hidden;
        /* margin-top: 5px; */
    }
    .product__selcon-btns {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        border: 1px solid #d1a178;
        border-radius: 20px;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
        margin: 15px 0;
    }
    .product__selcon-btns-buy {
        float: left;
        width: 50%;
        color: #d1a178;
    }
    .product__selcon-btns-add {
        background-color: #d1a178;
        color: #ffffff;
        float: left;
        width: 50%;
    }
    .product__selcon-btns-confirm {
        background-color: #d1a178;
        color: #ffffff;
        width: 100%;
    }


    /* 底部 */
    .product-tf {
        background-color: #fff;
        border-top: 1px solid #eee;
        height: 50px;
        overflow: hidden;
        width: 100%;
        padding: 0 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: fixed;
        bottom: 0px;
        left: 0px;
    }
    .product-tf__item {
        float: left;
        width: 40px;
        height: 50px;
        position: relative;
    }
    .product-tf__item button {
        opacity: 0;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .product-tf__item-icon {
        display: block;
        width: 25px;
        height: 25px;
        line-height: 25px;
        margin: 5px auto 0;
        text-align: center;
        color: #333;
        font-size: 20px;
    }
    .product-tf__item-tit {
        text-align: center;
        font-size: 10px;
        line-height: 15px;
        color: #777;
    }
    .product-tf__item-count {
        background-color: #f00;
        line-height: 15px;
        height: 15px;
        padding: 0 5px;
        border-radius: 8px;
        color: #ffffff;
        position: absolute;
        top: 2px;
        right: 0px;
        font-size: 12px;
    }
    .product-tf__btns {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        margin-top: 9px;
        border: 1px solid #d1a178;
        border-radius: 20px;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
    }
    .product-tf__btns-buy {
        float: left;
        width: 50%;
        color: #d1a178;
    }
    .product-tf__btns-add {
        background-color: #d1a178;
        color: #ffffff;
        float: left;
        width: 50%;
    }



    /* 分享popup */
    .share__tit {
        line-height: 50px;
        font-size: 12px;
    }
    .share__con {
        display: flex;
        flex-wrap: wrap;
        padding: 0 15px;
    }
    .share__con-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    .share__item-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 45px;
        overflow: hidden;
        background: #007aff;
        border-radius: 5px;
    }
    .share__item-txt {
        font-size: 12px;
        color: #333;
        line-height: 20px;
    }
    .share__item-img.wx {
        background: #00ce47;
    }
    .share__item-img.qq {
        background: #00b6f6;
    }
    .share__item-img.sina {
        background: #ff766a;
    }
    .share__item-img.copy {
        background: #07ccd0;
    }
    .share__item-icon {
        font-family: 'iconfont';
        font-size: 20px;
        color: #fff;
    }
    .share__btn {
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        border-top: 1px #eee solid;
    }


</style>