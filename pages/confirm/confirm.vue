<template>
    <div class="">
        <div class="address">
            <div class="address__add" @click="addAddress" v-if="!address">
                <div class="fa fa-map-marker address__add-icon"></div>
                <div class="address__add-tip">点击填写收货地址</div>
                </div>
            <div class="address__item" @click="selectAddress" v-if="address">
                <div class="address__item-icon fa fa-map-marker"></div>
                <div class="address__item-info">
                    <div class="address__item-name">{{address.name}} {{address.phone}}</div>
                    <div class="address__item-detail">{{address.region[0]}} {{address.region[1]}} {{address.region[2]}} {{address.detail}}</div>
                </div>
            </div>
            <div class="address__letter"></div>
        </div>
        <div class="confirm-tit">订单商品</div>
        <!-- 商品信息 -->
        <div class="pro" v-for="(item, index) in confirmArr" :key="index">
            <image :src="item.img" lazy-load class="pro__img"></image>
            <div class="pro__info">
                <div class="pro__info-tit">{{item.name}}</div>
                <div class="pro__info-spec">
                    <div class="pro__info-spec-tip" v-if="item.specTip">{{item.specTip}}</div>
                </div>
                <div class="pro__info-tf">
                    <div class="pro__info-price">￥{{item.price}}</div>
                    <div class="pro__info-count">X{{item.count}}</div>
                </div>
            </div>
        </div>

        <div class="confirm-list">
            <div class="confirm-list__item">
                <div class="confirm-list__item-l">商品金额</div>
                <div class="confirm-list__item-r">￥{{order_total_price}}</div>
            </div>
            <div class="confirm-list__item">
                <div class="confirm-list__item-l">运费</div>
                <div class="confirm-list__item-r">￥{{express_price}}</div>
            </div>
        </div>

        <div class="" style="height: 50px;"></div>
        <div class="confirm-tf">
            <div class="confirm-tf__sum">实付金额: <span class="confirm-tf__sum-money">￥{{order_pay_price}}</span></div>
            <div class="confirm-tf__set">
                <div class="confirm-tf__deal" @tap="pay">立即付款</div>
            </div>
        </div>
    </div>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            // 下单类型
            // 立即购买 type = buynow
            // 购物车下单 type = ''
            type: '',
            buynowData: null,
            confirmArr: [],
            order_total_price: '0.00',
            express_price: '0.00',
            order_pay_price: '0.00',
            address: null,
            cartid: null,
        }
    },
    methods: {
        // 提交订单 付款
        pay() {
            let that = this

            if (that.type == 'buynow') {
                u.request({
                    url: u.api.orderbuynow,
                    data: {
                        address_id: that.address.address_id,
                        ...that.buynowData
                    },
                    isVerifyLogin: true,
                    success(res) {
                        console.log(res)
                        if (res.code == 1) {
                            // 发起微信支付
                            u.pay(res.data.payment, res.data.order_id, that.order_pay_price)
                        }
                    }
                })
            } else {
                u.request({
                    url: u.api.ordercart,
                    data: {
                        address_id: that.address.address_id,
                        cartid: that.cartid
                    },
                    isVerifyLogin: true,
                    success(res) {
                        console.log(res)
                        if (res.code == 1) {
                            // 发起微信支付
                            u.pay(res.data.payment, res.data.order_id, that.order_pay_price)
                        }
                    }
                })
            }
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
        that.type = event.type
        if (event.buynowData) {
            try {
                that.buynowData = JSON.parse(decodeURIComponent(event.buynowData))
            } catch (error) {
                that.buynowData = JSON.parse(event.buynowData)
            }
        }

        if (event.confirmData) {
            let confirmData
            try {
                confirmData = JSON.parse(decodeURIComponent(event.confirmData))
            } catch (error) {
                confirmData = JSON.parse(event.confirmData)
            }
            that.order_total_price = confirmData.order_total_price
            that.express_price = confirmData.express_price
            that.order_pay_price = confirmData.order_pay_price
            that.order_total_num = confirmData.order_total_num

            confirmData.goods_list.forEach((item, i) => {
                item.goods_id = item.goods_id
                item.name = item.goods_name
                item.img = item.image[0].file_path
                item.specTip = item.goods_sku.goods_attr
                item.price = item.goods_price
                item.count = item.total_num
            })
            that.confirmArr = confirmData.goods_list
        }

        if (event.cartid) {
            that.cartid = event.cartid
        }



        // 请求默认地址
        u.request({
            url: u.api.addresslist,
            data: {},
            isVerifyLogin: true,
            success(res) {
                console.log(res)
                if (res.code == 1 && res.data && res.data.length) {
                    let defaultIndex = 0
                    res.data.forEach((item, i) => {
                        if (item.isDefault) {
                            defaultIndex = i
                        }
                    })
                    that.address = res.data[defaultIndex]
                }
                // return false
                // res = [
                //     {
                //         id: '18887',
                //         name: '林多多',
                //         phone: '15845454545',
                //         region: ['北京市', '北京市', '东城区'],
                //         detail: '车陂文化大街1号',
                //         isDefault: false
                //     },
                //     {
                //         id: '1886547',
                //         name: '李先生',
                //         phone: '15845454545',
                //         region: ['广东省', '广州市', '天河区'],
                //         detail: '黄埔大道车陂文化大街1号15乡6号楼7层105室',
                //         isDefault: true
                //     }
                // ]
                // if (res && res.length) {
                //     let defaultIndex = 0
                //     res.forEach((item, i) => {
                //         if (item.isDefault) {
                //             defaultIndex = i
                //         }
                //     })
                //     that.address = res[defaultIndex]
                // }
            }
        })



        return false
        that.order_total_price = event.order_total_price
        let order_pay_price = Number(that.order_total_price) + Number(that.express_price)
        that.order_pay_price = order_pay_price.toFixed(2)

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
                goods_id: 1,
                img: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                name: '商品标题商品标题商品标',
                specTip: '规格: S码 黑色',
                price: 127.5,
                count: 1
            },
            {
                goods_id: 2,
                img: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                name: '商品标商品标题商品标题商品标商品标题商品标题商品标商品标题商品标题',
                specTip: '规格: S码 黑色',
                price: 127.5,
                count: 1
            }
        ]

    }
}
</script>


<style scoped>


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
.pro__info-spec{
    height: 16px;
    line-height: 16px;
    align-self: flex-start;
    margin-top: 5px;
}
.pro__info-spec-tip {
    font-size: 10px;
    background-color: #eee;
    color: #999999;
    height: 16px;
    line-height: 16px;
    padding: 0 5px;
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