<template>
  <div>
    <swiper v-if="swiperArr.length > 0" class="proswiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="(item, index) in swiperArr" :key="index" class="proswiper__item">
            <image lazy-load :src="item.img" mode="aspectFill" class="proswiper__img"></image>
        </swiper-item>
    </swiper>

    <div class="product__price">¥{{price}}</div>
    <div class="product__title">{{title}}</div>

    <div class="product__sel" @click="openSelect" data-position="bottom">
        <div class="product__sel-tit">选择</div>
        <div class="product__sel-des">{{selectText}}</div>
    </div>

    <div style="height: 10px; background: #eee;"></div>

    <uni-popup :show="popupType === 'select'" position="bottom" @hidePopup="togglePopup('')">
        <div class="product__selcon">
            <div class="product__selcon-close" @click="togglePopup('')">X</div>

            <div v-for="(item, index) in categoryArr" :key="index">
                <div class="product__selcon-tit">{{ item.title }}</div>
                <div class="product__selcon-list">
                    <div v-for="(item2, index2) in item.items" :key="index2">
                        <div class="product__selcon-item" :class="item.items[item.select].id === item2.id ? 'product__selcon-item--cur' : ''" @click="selItem(index, index2)">{{ item2.text }}</div>
                    </div>
                </div>
            </div>

            <div class="product__selcon-tit">购买数量</div>
            <div class="product__selcon-num">
                <uni-number-box :min="1" :max="1000" :value="count"></uni-number-box>
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
        <div class="product-tf__item" @click="togglePopup('share')" data-position="bottom">
            <div class="product-tf__item-icon"></div>
            <div class="product-tf__item-tit">分享</div>
        </div>
        <div class="product-tf__item">
            <div class="product-tf__item-icon"></div>
            <div class="product-tf__item-tit">客服</div>
        </div>
        <div class="product-tf__item" style="margin-right: 15px">
            <div class="product-tf__item-icon"></div>
            <div class="product-tf__item-tit">购物车</div>
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
            htmlString: "",
            swiperArr: [],
            // 产品分类数据
            categoryArr: [],
            count: 1,
            // 弹出框类型 share: 分享, select： 选择产品颜色大小等
            popupType: '',
            // 产品分类框是由哪里打开的
            // 1 如果是标题下面的选择打开则显示立即购买和加入购物车
            // 2 如果是通过底部的立即购买和加入购物车打开的 则显示确定按钮
            selectPopupFrom: 1,
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
        selectText () {
            let that = this
            return that.checkSelect().selectText
        }
    },
    // 干嘛用？
    onBackPress() {
        if (this.popupType !== '') {
            this.popupType = ''
            return true
        }
    },
    methods: {
        togglePopup(popupType) {
            this.popupType = popupType
        },
        selItem(index, index2) {
            if (this.categoryArr[index].select != index2) {
                this.categoryArr[index].select = index2
            } else {
                this.categoryArr[index].select = null
            }
        },
        // 检测是否选择尺码颜色了
        checkSelect() {
            let that = this
            let isNeedSelect = that.categoryArr.length ? true : false
            let isSelect = true
            let selectArr = []
            let noSelectArr = []
            for (let i = 0, len = that.categoryArr.length; i < len; i++) {
                if (that.categoryArr[i].select === null) {
                    isSelect = false
                    noSelectArr.push(that.categoryArr[i].title)
                } else {
                    selectArr.push(`"${that.categoryArr[i].items[that.categoryArr[i].select].text}"`)
                }
            }

            return {
                isNeedSelect,
                isSelect,
                selectArr,
                selectText: isSelect ? `已选择${selectArr.join(' ')}` : `请选择${noSelectArr.join(' ')}`,
                noSelectArr,
            }
        },
        // 整合数据
        dealData() {
            let that = this
            let postData = {
                count: that.count,
                categoryArr: that.categoryArr
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
        },
        addcart() {
            let that = this
            // 打开选择框
            that.togglePopup('select')
            that.selectPopupFrom = 2
        },
        popupBuy() {
            let that = this
            let a = that.checkSelect()
            if (a.isSelect) {
                // 跳去订单确认页
            } else {
                // 弹出提示
                uni.showToast({
                    title: a.selectText,
                    icon: 'none'
                })
            }
        },
        popupAddcart() {
            let that = this
            if (that.checkSelect().isSelect) {
                // 跳去订单确认页
            } else {
                // 弹出提示
                uni.showToast({
                    title: a.selectText,
                    icon: 'none'
                })
            }
        },
        popupComfirm() {
            let that = this
            if (that.checkSelect().isSelect) {
                // 跳去订单确认页
            } else {
                // 弹出提示
                uni.showToast({
                    title: a.selectText,
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
        return {
            title: this.title,
            path: `/pages/product/product/?id=${that.id}&title=${that.title}&price=${that.price}`
        }
    },
    onLoad(event) {
        console.log("product onLoad")
        let that = this
        console.log(event)
        that.title = event.title
        that.id = event.id
        that.price = event.price
        that.swiperArr = [{
            img: event.cover
        }]
        uni.setNavigationBarTitle({
            title: that.title
        })

        // u.request({
        //     url: `https://unidemo.dcloud.net.cn/api/news/36kr/${that.id}`,
        //     method: 'GET',
        //     data: {},
        //     isVerifyLogin: false,
        //     success(res) {
        //         console.log(res)
        //     },
        //     fail(res) {
        //         console.error(res)
        //     }
        // })

        let res = {
            'id': '5188314',
            'title': '青花瓷22CM',
            'swiperArr': [
                {
                    img: 'https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading',
                },
                {
                    img: 'https://pic.36krcnd.com/avatar/201903/25001720/s4nf1w16zgl4d4sd.png!heading',
                }
            ],
            'content': '<p>编者按：本文来自36氪战略合作区块链媒体“Odaily星球日报”（公众号ID：o-daily，APP下载）</p><p><img style="max-width:100%" src="/static/img/open-art4.jpg" /></p><p><img style="max-width:100%" src="https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading" /></p><p>本周 BTC 价格本周比特币价格高低起伏明显，高点低点均出现在 3 月 22 日。美元和日元比特币交易市场份额较上周减少，占 83.71%；各家矿池份额占比较上周差距明显；闪电实验室发布比特币支付渠道新功能“闪电环”。</p>',
            'categoryArr': [
                {
                    'title': '尺码',
                    'id': '112233',
                    'select': null,
                    'items': [
                        {
                            'id': '111111',
                            'text': 'S'
                        },
                        {
                            'id': '222222',
                            'text': 'M'
                        }
                    ]
                },
                {
                    'title': '颜色',
                    'id': '445566',
                    'select': null,
                    'items': [
                        {
                            'id': '444444',
                            'text': '黑色'
                        },
                        {
                            'id': '555555',
                            'text': '红色'
                        }
                    ]
                }
            ]
        }
        if (res) {
            // that.htmlString = res.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"")
            that.htmlString = res.content
            that.swiperArr = res.swiperArr
            that.categoryArr = res.categoryArr
            that.title = res.title
            uni.setNavigationBarTitle({
                title: that.title
            })
        }

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
        color: #f60;
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
        color: #f60;
        border: 1px solid #f60;
    }
    .product__selcon-num {
        overflow: hidden;
        /* margin-top: 5px; */
    }
    .product__selcon-btns {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        border: 1px solid #f60;
        border-radius: 20px;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
        margin: 15px 0;
    }
    .product__selcon-btns-buy {
        float: left;
        width: 50%;
        color: #f60;
    }
    .product__selcon-btns-add {
        background-color: #f60;
        color: #ffffff;
        float: left;
        width: 50%;
    }
    .product__selcon-btns-confirm {
        background-color: #f60;
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
    }
    .product-tf__item-icon {
        width: 25px;
        height: 25px;
        margin: 5px auto 0;
        background-color: #05a;
    }
    .product-tf__item-tit {
        text-align: center;
        font-size: 10px;
        line-height: 15px;
        color: #999;
    }
    .product-tf__btns {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        margin-top: 9px;
        border: 1px solid #f60;
        border-radius: 20px;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
    }
    .product-tf__btns-buy {
        float: left;
        width: 50%;
        color: #f60;
    }
    .product-tf__btns-add {
        background-color: #f60;
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