<template>
<div>
    <div class="store__po">
        <image src="/static/img/icon-address.png" mode="aspectFill"></image>
        您附近的门店
    </div>
    <div class="" style="position: relative;height: 500upx">
        <swiper v-if="sliderArr.length > 0" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <block v-for="(item, index) in sliderArr" :key="index">
                <swiper-item class="swiper__item">
                    <image class="swiper__img" lazy-load :src="item.img" mode="aspectFill" @click="jump(item.url)"></image>
                </swiper-item>
            </block>
        </swiper>

        <div class="store__img">
            <div class="store__po2">
                <picker mode="region" @change="bindRegionChange" :value="region">
                    <view class="tt-form__item-r-text" v-if="region.length">{{region[0]}} {{region[1]}} {{region[2]}}</view>
                    <view class="tt-form__item-r-text" v-else>门店所在地区</view>
                </picker>
                <view class="store__po2-r">请选择</view>
            </div>
        </div>

    </div>

    <a class="store" @click="showAddress(item)" v-for="(item, index) in storeArr" :key="index">
        <div class="store__tit">
            <div class="store__tit-l">{{item.title}}</div>
            <div class="store__tit-r" v-if="item.phone">{{item.phone}}</div>
        </div>
        <div class="store__address">
            <div class="store__address-l">{{item.address}}</div>
            <div class="store__address-r">{{item.type}}</div>
        </div>
    </a>
    <div class="" v-if="!storeArr.length">
        <tip text="很抱歉 该地区暂未开通" :none-icon="true"></tip>
    </div>

</div>
</template>

<script>
import u from '@/common/util'
import tip from '@/components/tip/tip.vue'
export default {
    components: {
        tip
    },
    data() {
        return {
            autoplay: true,
            indicatorDots: true,
            interval: 5000,
            duration: 300,
            sliderArr: [
                // {
                //     img: 'http://dummyimage.com/200x150',
                //     url: '/pages/product/product'
                // }
            ],
            region: [],
            latitude: null,
            longitude: null,
            storeArr: [
                // {
                //     phone: '10km',
                //     title: '三分联盟专卖店三分联盟专卖店三分联盟专卖店（工厂直供）',
                //     address: '广东省广州市天河区kkk街道',
                //     type: '直营店'
                // },
                // {
                //     phone: '20km',
                //     title: '三分联盟专卖店（工厂直供）',
                //     address: '广东省广州市天河区kkk街道广东省广州市天河区kkk街道广东省广州市天河区kkk街道',
                //     type: '直营店'
                // },
                // {
                //     phone: '30km',
                //     title: '三分联盟专卖店（工厂直供）',
                //     address: '广东省广州市天河区kkk街道',
                //     type: '直营店'
                // }
            ]
        }
    },
    methods: {
        bindRegionChange(e) {
            let that = this
            console.log(e)
            that.region = e.target.value
            that.load(1)
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
        // type0=经纬度 type1=地区
        load(type) {
            let that = this
            let postData = {}
            if (type == 0) {
                postData.latitude = that.latitude
                postData.longitude = that.longitude
            } else {
                postData.region = JSON.stringify(that.region)
            }

            u.request({
                url: u.api.sitelist,
                data: postData,
                isVerifyLogin: false,
                success(res) {
                    console.log(res)
                    if (res.code == 1 && res.data && res.data.length) {
                        that.storeArr = res.data.map((item, i) => {
                            return {
                                title: item.title,
                                type: item.name,
                                // 如果是直营店要显示手机号，如果是加盟点不显示手机号
                                // type 1直营2加盟
                                phone: item.type == 1 ? item.phone : null,
                                address: item.address + item.remark,
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }
                        })
                    } else {
                        that.storeArr = []
                    }
                    if (res.ppt) {
                        that.sliderArr = u.dataTransform(res.ppt, {
                            logo: 'img',
                            url: 'url',
                        })
                    }
                }
            })
            // uni.showModal({
            //     title: '测试弹窗',
            //     content: JSON.stringify(postData),
            //     showCancel: false,
            //     success: function () {

                    

            //     }
            // })
            
        }
    },
    onLoad() {
        console.log('store onLoad')
        var that = this

        // wx.getSetting({
        //     success (res) {
        //         console.log(res)
        //         uni.showModal({
        //             title: '测试弹窗',
        //             content: JSON.stringify(res),
        //             showCancel: false
        //         })
        //     }
        // })
        wx.getLocation({
            type: 'gcj02',
            success (res) {
                console.log(res)
                that.latitude = res.latitude
                that.longitude = res.longitude
                that.load(0)
            }
        })
        that.load(0)
    }
}
</script>

<style scoped>
.store__po {
    line-height: 45px;
    height: 45px;
    padding: 0 15px;
    overflow: hidden;
    vertical-align: top;
    font-size: 14px;
}
.store__po image {
    margin-top: 12px;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    vertical-align: top;
}


.store__img {
    width: 100%;
    position: absolute;
    top: 380upx;
}
.store__po2 {
    overflow: hidden;
    height: 100upx;
    line-height: 100upx;
    width: 630upx;
    margin: 0 30upx;
    padding: 0 30upx;
    background-color: #fff;
    border-radius: 3px;
    font-size: 14px;
    box-shadow: 0px 5px 10px #eee;
}
.store__po2-l {
    float: left;
}

.store__po2-r {
    position: absolute;
    right: 60upx;
    top: 0px;
    color: #999;
}

.store {
    margin: 0 15px;
    padding: 10px 0;
    border-bottom: 1upx solid #f1f1f1;
}
.store__tit {
    color: #333;
    overflow: hidden;
    line-height: 25px;
}
.store__tit-l {
    float: left;
    width: 70%;
    font-size: 14px;
    font-weight: bold;
}
.store__tit-r {
    float: right;
    font-size: 12px;
    color: #999;
}
.store__address {
    color: #333;
    overflow: hidden;
    line-height: 25px;
}
.store__address-l {
    float: left;
    width: 80%;
    font-size: 12px;
    color: #999;
}
.store__address-r {
    line-height: 20px;
    height: 20px;
    float: right;
    background-color: #55a5ff;
    color: #ffffff;
    padding: 0 3px;
    border-radius: 2px;
    font-size: 10px;
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
</style>
