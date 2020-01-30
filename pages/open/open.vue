<template>
<div>
    <a class="store" @click="applystore(item)" v-for="(item, index) in storeArr" :key="index">
        <image :src="item.img" mode="aspectFill"></image>
        <div class="store__tit">{{item.title}}</div>
        <div class="store__price">
            <div class="store__price-price1">优选价: </div>
            <div class="store__price-price2">￥</div>
            <div class="store__price-price3">{{item.discountPrice}}</div>
        </div>
        <div class="store__del">原价: ￥{{item.marketPrice}}</div>
    </a>

    <div class="con">
        <image :src="img" mode="aspectFill" style="height: 8138upx"></image>
    </div>

</div>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            img: '',
            storeArr: [
                // {
                //     img: 'http://dummyimage.com/200x150',
                //     title: '三分联盟专卖店（工厂直供）',
                //     discountPrice: '386',
                //     marketPrice: '19999',
                //     phone: '13666666666'
                // }
            ]
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
        applystore(item) {
            uni.navigateTo({
                url: `/pages/applystore/applystore?title=${item.title}&price=${item.discountPrice}&storeid=${item.id}`
            })
        },
        load() {
            var that = this
            u.request({
                url: u.api.applylist,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {},
                isVerifyLogin: true,
                success(res) {
                    console.log(res)

                    that.storeArr = u.dataTransform(res.applyinfo, {
                        logo: 'img',
                        discountPrice: 'discountPrice',
                        marketPrice: 'marketPrice',
                        title: 'title',
                        phone: 'phone',
                    })

                    that.img = res.logo

                }
            })
        }
    },
    onLoad() {
        console.log('open onLoad')
        this.load()
    },
    onShow() {
        console.log('open onShow')
        this.load()
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
    width: 100%;
    height: 185px;
    border-radius: 5px;
    overflow: hidden;
}
.store__tit {
    color: #333;
    font-size: 15px;
    line-height: 30px;
}
.store__price {
    line-height: 20px;
    vertical-align: top;
}
.store__price-price1 {
    display: inline-block;
    font-size: 13px;
    color: #333;
    vertical-align: top;
}
.store__price-price2 {
    display: inline-block;
    font-size: 12px;
    color: #d1a178;
    vertical-align: top;
}
.store__price-price3 {
    display: inline-block;
    font-size: 20px;
    color: #d1a178;
    vertical-align: top;
}
.store__del {
    color: #999;
    font-size: 11px;
    text-decoration: line-through;
}

</style>
