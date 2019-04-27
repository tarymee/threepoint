<template>
<div>
    <a class="store" @click="contact(item.phone)" v-for="(item, index) in storeArr" :key="index">
        <image :src="item.img" mode="aspectFill"></image>
        <div class="store-tit">{{item.title}}</div>
        <div class="store-price">
            <div class="store-price-price1">优选价: </div>
            <div class="store-price-price2">￥</div>
            <div class="store-price-price3">{{item.discountPrice}}</div>
        </div>
        <div class="store-del">原价：￥{{item.marketPrice}}</div>
    </a>


    <!-- <rich-text :nodes="htmlString"></rich-text> -->

    <div class="con" @click="applystore">
      <image src="/static/img/open-art1.jpg" mode="aspectFill" style="height: 430px"></image>
      <image src="/static/img/open-art2.jpg" mode="aspectFill" style="height: 314px"></image>
      <image src="/static/img/open-art3.jpg" mode="aspectFill" style="height: 515px"></image>
      <image src="/static/img/open-art4.jpg" mode="aspectFill" style="height: 441px"></image>
    </div>

</div>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            storeArr: [
                {
                  img: '/static/img/open-item1.jpg',
                  name: '三分联盟专卖店（工厂直供）',
                  discountPrice: '386',
                  marketPrice: '19999',
                  phone: '13666666666'
                },
                {
                  img: '/static/img/open-item2.jpg',
                  name: '三分联盟专卖店（工厂直供）',
                  discountPrice: '386',
                  marketPrice: '19999',
                  phone: '13666666666'
                },
                {
                  img: '/static/img/open-item3.jpg',
                  name: '三分联盟专卖店（工厂直供）',
                  discountPrice: '386',
                  marketPrice: '19999',
                  phone: '13666666666'
                }
            ],
            htmlString: ''
        }
    },
    methods: {
        contact(number) {
            uni.showModal({
                title: '提示',
                content: '请与店主联系',
                success() {
                    uni.makePhoneCall({
                        phoneNumber: number
                    })
                },
                showCancel: false
            })
        },
        applystore() {
            uni.navigateTo({
                url: '/pages/applystore/applystore'
            })
        }
    },
    onLoad() {
        console.log('open onLoad')
        var that = this
        // u.request({
        //     url: u.api.open,
        //     method: 'POST',
        //     isVerifyLogin: false,
        //     success(res) {
        //         console.log(res)
        //         that.storeArr = res.applyinfo
        //     }
        // })

        that.htmlString = '<p><img style="width:100%" src="/static/img/open-art1.jpg" /></p><p><img style="width:100%" src="/static/img/open-art2.jpg" /></p><p><img style="width:100%" src="/static/img/open-art3.jpg" /></p><p><img style="width:100%" src="/static/img/open-art4.jpg" /></p>'
    }
}
</script>

<style scoped>
.con image {
    width: 750upx;
}
.store {
    margin: 15px;
}
.store image {
    display: block;
    width: 345px;
    height: 185px;
    border-radius: 5px;
    overflow: hidden;
}
.store-tit {
    color: #333;
    font-size: 15px;
    line-height: 30px;
}
.store-price {
    line-height: 20px;
    vertical-align: top;
}
.store-price-price1 {
    display: inline-block;
    font-size: 13px;
    color: #333;
    vertical-align: top;
}
.store-price-price2 {
    display: inline-block;
    font-size: 12px;
    color: #d1a178;
    vertical-align: top;
}
.store-price-price3 {
    display: inline-block;
    font-size: 20px;
    color: #d1a178;
    vertical-align: top;
}
.store-del {
    color: #999;
    font-size: 11px;
    text-decoration: line-through;
}

</style>
