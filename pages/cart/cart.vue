<template>
    <view>
        <!-- 商品列表 -->
        <view class="cart">
            <div class="cart__none" v-if="proArr.length==0">
                <tip text="亲 购物车还没有商品哦" :none-icon="true"></tip>
                <a class="cart__none-btn" @click="jump('/pages/index/index', true)">去逛逛</a>
            </div>
            <uni-swipe-action :options="saOption" v-for="(item,index) in proArr" :key="index" @click="delPro(index)">
                <view class="cart___item">
                    <!-- checkbox -->
                    <view class="cart___item-sel" @tap="selPro(index)">
                        <tt-checkbox :checked="item.select">/</tt-checkbox>
                    </view>
                    <!-- 商品信息 -->
                    <view class="pro" @tap="jump(`/pages/product/product?id=${item.id}&title=${item.name}&price=${item.price}&cover=${item.img}`)">
                        <image :src="item.img" class="pro__img"></image>
                        <view class="pro__info">
                            <view class="pro__info-tit">{{item.name}}</view>
                            <view class="pro__info-spec"><div class="pro__info-spec-tip" v-if="item.specTip">{{item.specTip}}</div></view>
                            <view class="pro__info-tf">
                                <view class="pro__info-price">￥{{item.price}}</view>
                                <view class="pro__info-count">
                                    <view class="pro__info-count-sub" @tap.stop="subCount(index)">
                                        <view>-</view>
                                    </view>
                                    <view class="pro__info-count-input" @tap.stop="discard">
                                        <input type="number" v-model="item.count" @input="changeCount" />
                                    </view>
                                    <view class="pro__info-count-add"  @tap.stop="addCount(index)">
                                        <view>+</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </uni-swipe-action>
        </view>

        <div class="cart-th">
            <div class="cart-th__sel" @tap="allSelect">
                <tt-checkbox :checked="isAllSel">/</tt-checkbox>
                <span class="cart-th__sel-txt">全选</span>
            </div>
            <div class="cart-th__edit" @tap="edit">{{isEdit ? '完成' : '编辑'}}</div>
        </div>

        <!-- 脚部菜单 -->
        <div class="cart-tf">
            <div class="cart-tf__sum">合计:<span class="cart-tf__sum-money">￥{{sumPrice}}</span></div>
            <div class="cart-tf__set">
                <div class="cart-tf__del" @tap="delSelPros" v-if="isEdit">删除</div>
                <div class="cart-tf__deal" @tap="toConfirm" v-if="!isEdit">结算({{selProCount}})</div>
            </div>
        </div>
    </view>
</template>

<script>
import u from "@/common/util"
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import ttCheckbox from '@/components/tt-checkbox/tt-checkbox.vue'
import tip from '@/components/tip/tip.vue'
export default {
    components: {
        uniSwipeAction,
        ttCheckbox,
        tip
    },
    data() {
        return {
            sumPrice: '0.00',
            selProCount: 0,
            isAllSel: false,
            isEdit: false,
            saOption: [
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#f00'
                    }
                }
            ],
            proArr: []
        }
    },
    computed: {},
    methods: {
        edit() {
            this.isEdit = !this.isEdit
        },
        // 滑动删除商品
        delPro(index) {
            let that = this
            let leftProArr = []
            that.proArr.forEach((item, i) => {
                if (i != index) {
                    leftProArr.push(item)
                }
            })
            that.proArr = leftProArr
            that.sum()
            that.updateCart()
        },
        // 按钮删除商品
        delSelPros() {
            let that = this
            if (that.proArr.length) {
                let leftProArr = []
                that.proArr.forEach((item, i) => {
                    if (!item.select) {
                        leftProArr.push(item)
                    }
                })
                that.proArr = leftProArr
                that.sum()
                that.updateCart()
            } else {
                that.isEdit = false
            }
        },
        // 选中商品
        selPro(index) {
            let that = this
            that.proArr[index].select = !that.proArr[index].select
            that.sum()
        },
        // 全选
        allSelect() {
            let that = this
            that.proArr.forEach((item, i) => {
                item.select = !that.isAllSel
            })
            that.sum()
        },
        // 减少数量
        subCount(index) {
            let that = this
            if (that.proArr[index].count <= 1) {
                return
            }
            that.proArr[index].count--
            that.sum()

            u.request({
                url: u.api.cartchangenum,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    goods_id: that.proArr[index].id,
                    goods_num: that.proArr[index].count
                },
                isVerifyLogin: true,
                isShowLoading: false,
                isShowError: false,
                success(res) {
                    console.log(res)
                },
                fail(res) {
                    console.error(res)
                }
            })


            that.updateCart()
        },
        // 增加数量
        addCount(index) {
            let that = this
            that.proArr[index].count++
            that.sum()
            that.updateCart()
        },
        // input改变数量
        changeCount() {
            let that = this
            that.sum()
            that.updateCart()
        },
        // 合计
        sum() {
            let that = this
            let sumPrice = 0
            let selProCount = 0
            that.proArr.forEach((item, i) => {
                if (item.select) {
                    selProCount++
                    sumPrice = sumPrice + u.math.multimul(item.count, item.price)
                }
            })
            that.selProCount = selProCount
            if (selProCount === 0) {
                that.isAllSel = false
            } else {
                that.isAllSel = (selProCount === that.proArr.length)
            }
            that.sumPrice = sumPrice.toFixed(2)
        },
        discard() {
            //丢弃
        },
        jump(url, isSwitchTab) {
            u.jump(url, isSwitchTab)
        },
        // 跳转确认订单页面
        toConfirm() {
            let that = this
            let confirmArr = []
            let cartidArr = []
            that.proArr.forEach((item, i) => {
                if (item.select) {
                    confirmArr.push(item)
                    cartidArr.push(item.cartid)
                }
            })
            console.log(confirmArr)
            console.log(cartidArr)
            if (cartidArr.length) {
                u.checkLogin(function () {
                    u.request({
                        url: u.api.cartsave,
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            cartid: JSON.stringify(cartidArr)
                        },
                        isVerifyLogin: true,
                        isShowLoading: false,
                        isShowError: false,
                        success(res) {
                            console.log(res)
                            if (res.code == 1) {
                                console.log('跳去订单确认页')
                                uni.navigateTo({
                                    url: '/pages/confirm/confirm?confirmData=' + encodeURIComponent(JSON.stringify(res.data))
                                    // url: '/pages/confirm/confirm?confirmArr=' + encodeURIComponent(JSON.stringify(confirmArr)) + '&proPrice=' + that.sumPrice
                                })
                            } else {
                                console.error('提交订单失败')
                            }




                        },
                        fail(res) {
                            console.error(res)
                        }
                    })

                    return false


                })
            } else {
                uni.showToast({
                    title: '请先选择产品',
                    mask: true,
                    icon: 'none',
                })
            }
        },
        // 更新购物车商品数量
        updateCount() {

        },
        // 更新购物车列表
        updateCart() {
            return false
            console.log('更新购物车列表')
            let that = this
            u.checkLogin(function () {
                let newArr = []
                that.proArr.forEach((item, i) => {
                    newArr.push(item)
                })
                u.request({
                    url: u.api.cartupdate,
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        cartlist: newArr
                    },
                    isVerifyLogin: true,
                    isShowLoading: false,
                    isShowError: false,
                    success(res) {
                        console.log(res)
                    },
                    fail(res) {
                        console.error(res)
                    }
                })
            })
        }
    },
    onShow() {
        let that = this

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
                if (res && res.code == 1 && res.data) {
                    // that.proArr = res.data

                    that.proArr = u.dataTransform(res.data, {
                        goodsId: 'id',
                        id: 'cartid',
                        goodsPrice: 'price',
                        price: 'totalprice',
                    })
                    console.log(that.proArr)
                    that.sum()
                }
            },
            fail(res) {
                console.error(res)
            }
        })
        return false

        let res = {
            data: [
                {
                    id: '15646',
                    cartid: '554',
                    img: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                    name: '青花瓷 89*99 CM',
                    spec: [
                        {
                            id: '123656',
                            title: '尺码',
                            selid: '165465',
                            seltitle: 'S码',
                        },
                        {
                            id: '12386',
                            title: '颜色',
                            selid: '44',
                            seltitle: '红色',
                        }
                    ],
                    specTip: '规格 S码 黑色',
                    price: 10.5,
                    totalprice: 10.5,
                    count: 1
                },
                {
                    id: '249816',
                    cartid: '7232',
                    img: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                    name: '清朝陶瓷碗 89*99 CM',
                    spec: {
                        '112233': '111',
                        '334455': '345',
                    },
                    specTip: '规格 S码 黑色',
                    price: 20.5,
                    totalprice: 20.5,
                    count: 1
                }
            ]
        }
        if (res && res.data) {
            that.proArr = res.data
            that.sum()
        }
    }
}
</script>
<style scoped>
.cart-tf{
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
.cart-tf__sum{
    font-size: 14px;
}
.cart-tf__sum-money{
    font-weight: bold;
}
.cart-tf__set {
    display: flex;
}
.cart-tf__deal {
    border: 1upx solid #d1a178;
    background-color: #d1a178;
    color: #fff;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 14px;
}
.cart-tf__del {
    border: 1upx solid #d1a178;
    color: #d1a178;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 14px;
}







.cart-th{
    display: flex;
    width: 100%;
    padding: 0 15px;
    height: 40px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    border-bottom: 1upx solid #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.cart-th__sel {
    display: flex;
    align-items: center;
}
.cart-th__sel-txt {
    font-size: 14px;
    margin-left: 10px;
}
.cart-th__edit{
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #333;
}



.cart{
    width: 100%;
    margin: 40px 0 50px;
}
.cart__none {
    padding: 50px 0;
    text-align: center;
}
.cart__none-btn {
    display: inline-block;
    line-height: 30px;
    height: 30px;
    border: 1upx solid #ccc;
    border-radius: 15px;
    padding: 0 25px;
    font-size: 12px;
    text-align: center;
    color: #777;
}
.cart___item{
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eee;
}


.cart___item-sel {
    display: flex;
    align-items: center;
    margin-right: 10px;
}


.pro {
    display: flex;
    flex: 1;
}
.pro__img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    flex: none;
    margin-right: 10px;
}



.pro__info{
    overflow: hidden;
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
}

.pro__info-tit{
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
    align-items: center;
}
.pro__info-price{
    font-size: 14px;
    font-weight: bold;
}
.pro__info-count{
    display: flex;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 13px;
    height: 24px;
}
.pro__info-count-input{
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}
.pro__info-count-input input {
    display: block;
    width: 30px;
    height: 24px;
    line-height: 24px;
    min-height: 24px;
    padding: 0px;
    margin: 0px;
    text-align: center;
    font-size: 12px;
}
.pro__info-count-sub ,.pro__info-count-add{
    width: 24px;
    height: 24px;
    line-height: 20px;
    font-size: 16px;
    text-align: center;
}

</style>
