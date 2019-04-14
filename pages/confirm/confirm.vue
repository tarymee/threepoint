<template>
    <div class="">
        <div class="address">
            <div class="address__add" @click="addAddress" v-if="!address">点击填写收货地址</div>
            <div class="address__item" @click="selectAddress" v-if="address">
                <div class="address__item-info">{{address.name}} {{address.phone}}</div>
                <div class="address__item-detail">{{address.detail}}</div>
            </div>
            <div class="address__letter"></div>
        </div>
        <div class="confirm-tit">订单商品</div>
        <!-- 商品信息 -->
        <div class="pro" v-for="(item, index) in confirmArr" :key="index">
            <image :src="item.img" class="pro__img"></image>
            <div class="pro__info">
                <div class="pro__info-tit">{{item.name}}</div>
                <div class="pro__info-spec">{{item.spec}}</div>
                <div class="pro__info-tf">
                    <div class="pro__info-price">￥{{item.price}}</div>
                    <div class="pro__info-count">￥{{item.count}}</div>
                </div>
            </div>
        </div>

        <div class="confirm-list">
            <div class="confirm-list__item">
                <div class="confirm-list__item-l">商品金额</div>
                <div class="confirm-list__item-r">￥{{proPrice}}</div>
            </div>
            <div class="confirm-list__item">
                <div class="confirm-list__item-l">运费</div>
                <div class="confirm-list__item-r">￥{{expressPrice}}</div>
            </div>
        </div>

        <div class="" style="height: 40px;"></div>
        <div class="confirm-tf">
            <div class="confirm-tf__sum">实付金额: <span class="confirm-tf__sum-money">￥{{totalPrice}}</span></div>
            <div class="confirm-tf__set">
                <div class="confirm-tf__deal" @tap="pay">立即付款</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.address {
    /* padding: 15px 20px; */
    /* border-bottom: 5px solid #05a; */
    line-height: 1.5;
}
.address__letter {
    height: 3px;
    background: linear-gradient(45deg,#f25953 12.5%,#fbfaf5 12.5%,#fbfaf5 25%,#5590d6 25%,#5590d6 37.5%,#fbfaf5 37.5%,#fbfaf5 50%,#f25953 50%,#f25953 62.5%,#fbfaf5 62.5%,#fbfaf5 75%,#5590d6 75%,#5590d6 87.5%,#fbfaf5 87.5%,#fbfaf5 100%);
    background-size: 70px 70px;
}
.address__add {
    padding: 15px 20px;
    text-align: center;
    font-size: 16px;
    color: #777;
}
.address__item {
    padding: 15px 20px;
}
.address__item-info {
    font-size: 16px;
    color: #333;
}
.address__item-detail {
    font-size: 12px;
    color: #999;
}




.confirm-tit {
    line-height: 1.5;
    font-size: 18px;
    font-weight: bold;
    padding: 15px 15px 0;
}





.confirm-list {
    
}
.confirm-list__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1upx solid #eee;
    color: #333;
}
.confirm-list__item-l {
    font-size: 16px;
    font-weight: bold;
}
.confirm-list__item-r {
    font-size: 14px;
}
.confirm-tf {
    display: flex;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: 1upx solid #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.confirm-tf__sum {
    font-size: 14px;
}
.confirm-tf__sum-money {
    font-weight: bold;
}
.confirm-tf__set {
    display: flex;
}
.confirm-tf__deal {
    background-color: #d1a178;
    color: #fff;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 14px;
}


.pro {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eee;
}
.pro__img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    flex: none;
    margin-right: 10px;
}
.pro__info {
    overflow: hidden;
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
}

.pro__info-tit {
    font-size: 14px;
    line-height: 18px;
    max-height: 36px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.pro__info-spec {
    font-size: 10px;
    background-color: #eee;
    color: #999999;
    height: 16px;
    line-height: 16px;
    align-self: flex-start;
    padding: 0 5px;
    margin-top: 5px;
    border-radius: 8px;
}

.pro__info-tf {
    display: flex;
    justify-content: space-between;
    line-height: 20px;
}
.pro__info-price {
    font-size: 14px;
    font-weight: bold;
}
.pro__info-count {
    color: #999;
    font-size: 12px;
}



</style>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            confirmArr: [],
            proPrice: '0.00',
            expressPrice: '10.00',
            totalPrice: '0.00',
            address: null
        }
    },
    methods: {
        // 提交订单 付款
        pay() {
            let that = this
            // uni.navigateTo({
            //     url: '/pages/success/success?id=123456&price=95.36'
            // })
            u.request({
                url: u.api.test,
                method: 'POST',
                data: {
                    confirmArr: that.confirmArr,
                    proPrice: that.proPrice,
                    expressPrice: that.expressPrice,
                    totalPrice: that.totalPrice,
                    address: that.address,
                },
                isVerifyLogin: true,
                isShowLoading: true,
                isShowError: true,
                success(res) {
                    console.log(res)
                    res = {
                        id: '123456',
                        price: '68.25',
                    }
                    uni.navigateTo({
                        url: '/pages/success/success?id=' + res.id + '&price=' + res.price
                    })
                },
                fail(res) {
                    console.error(res)
                }
            })
        },
        selectAddress() {
            uni.navigateTo({
                url: '/pages/address/address?from=confirm'
            })
        },
        addAddress() {
            uni.navigateTo({
                url: '/pages/addressdetail/addressdetail?from=confirm'
            })
        }
    },
    // 监听选择地址回调
    onShow() {
        console.log('onShow')
        let that = this
        let address = uni.getStorageSync('confirmAddress')
        console.log('address', address)
        if (address) {
            that.address = address
            uni.removeStorageSync('confirmAddress')
        }
    },
    onLoad(event) {
        console.log("confirm onLoad")
        let that = this
        console.log(event)
        that.proPrice = event.proPrice
        let totalPrice = Number(that.proPrice) + Number(that.expressPrice)
        that.totalPrice = totalPrice.toFixed(2)

        // 目前在某些平台参数会被主动 decode，暂时这样处理。
        if (event.confirmArr) {
            try {
                that.confirmArr = JSON.parse(decodeURIComponent(event.confirmArr))
            } catch (error) {
                that.confirmArr = JSON.parse(event.confirmArr)
            }
        }

        that.confirmArr = [
            {
                id: 1,
                img: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                name: '商品标题商品标题商品标',
                spec: '规格 S码',
                price: 127.5,
                count: 1
            },
            {
                id: 2,
                img: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                name: '商品标商品标题商品标题商品标商品标题商品标题商品标商品标题商品标题',
                spec: '规格 S码',
                price: 127.5,
                count: 1
            }
        ]

        // 请求地址
        u.request({
            url: u.api.getAddress,
            method: 'POST',
            data: {},
            isVerifyLogin: true,
            isShowLoading: false,
            isShowError: false,
            success(res) {
                console.log(res)
                // 默认第一个地址
                res = [
                    {
                        name: '林多多',
                        phone: '15845454545',
                        detail: '广东省广州市天河区车陂文化大街27号'
                    }
                ]
                if (res.length) {
                    that.address = res[0]
                }
            },
            fail(res) {
                console.error(res)
            }
        })
    }
}
</script>