<template>
    <swiper v-if="storeArr.length > 0" class="swiper" :indicator-dots="indicatorDots" vertical :interval="interval" :duration="duration">
        <swiper-item class="swiper__item" v-for="(item, index) in storeArr" :key="index">
            <image class="swiper__img" lazy-load :src="item.img" mode="aspectFit"  @click="applystore(item)" v-if="index != storeArr.length - 1"></image>
            <scroll-view scroll-y scroll-with-animation v-if="index == storeArr.length - 1">
                <image class="swiper__scroll" lazy-load :src="item.img" mode="widthFix"></image>
            </scroll-view>
        </swiper-item>
    </swiper>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            indicatorDots: false,
            interval: 5000,
            duration: 300,
            storeArr: [
                // {
                //     img: '/static/img/open/o1.jpg'
                // },
                // {
                //     img: '/static/img/open/o2.jpg'
                // },
                // {
                //     img: '/static/img/open/o3.jpg'
                // },
                // {
                //     img: '/static/img/open/o4.jpg'
                // },
                // {
                //     img: '/static/img/open/o5.jpg'
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
                    that.storeArr.push({
                        img: res.logo
                    })

                    // that.img = res.logo

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
/* 焦点图 */
.swiper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}
.swiper__item {
    background: url('~@/static/img/loading.gif') center center no-repeat;
}
.swiper__img {
    width: 100%;
    height: 100%;
}
.swiper scroll-view {
    width: 100%;
    height: 100%;
}
.swiper__scroll {
    width: 100%;
}
</style>
