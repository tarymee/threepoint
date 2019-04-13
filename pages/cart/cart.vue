<template>
    <view>
        <!-- 商品列表 -->
        <view class="cart">
            <view class="cart__none" v-if="proArr.length==0">购物车是空的哦~</view>
            <uni-swipe-action :options="options2" v-for="(item,index) in proArr" :key="index" @click="deleteGoods(item.id)">
                <view class="cart___item">
                    <!-- checkbox -->
                    <view class="cart___item-sel" @tap="selected(index)">
                        <tt-checkbox :checked="item.selected">/</tt-checkbox>
                    </view>
                    <!-- 商品信息 -->
                    <view class="pro" @tap="toGoods(item)">
                        <image :src="item.img" class="pro__img"></image>
                        <view class="pro__info">
                            <view class="pro__info-tit">{{item.name}}</view>
                            <view class="pro__info-spec">{{item.spec}}</view>
                            <view class="pro__info-tf">
                                <view class="pro__info-price">￥{{item.price}}</view>
                                <view class="pro__info-count">
                                    <view class="pro__info-count-sub" @tap.stop="sub(index)">
                                        <view>-</view>
                                    </view>
                                    <view class="pro__info-count-input" @tap.stop="discard">
                                        <input type="number" v-model="item.count" @input="sum" />
                                    </view>
                                    <view class="pro__info-count-add"  @tap.stop="add(index)">
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
                <tt-checkbox :checked="isAllselected">/</tt-checkbox>
                <span class="cart-th__sel-txt">全选</span>
            </div>
            <div class="cart-th__edit" @tap="edit">{{isEdit ? '完成' : '编辑'}}</div>
        </div>

        <!-- 脚部菜单 -->
        <div class="cart-tf">
            <div class="cart-tf__sum">合计:<span class="cart-tf__sum-money">￥{{sumPrice}}</span></div>
            <div class="cart-tf__set">
                <div class="cart-tf__del" @tap="deleteList" v-if="isEdit">删除</div>
                <div class="cart-tf__deal" @tap="toConfirm" v-if="!isEdit">结算({{selectedList.length}})</div>
            </div>
        </div>
    </view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import ttCheckbox from '@/components/tt-checkbox/tt-checkbox.vue'
export default {
    components: {
        uniSwipeAction,
        uniNumberBox,
        ttCheckbox
    },
    data() {
        return {
            sumPrice: '0.00',
            selectedList: [],
            isAllselected: false,
            isEdit: false,
            options2: [
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#f60'
                    }
                }
            ],
            proArr: [
                {
                    id: 1,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标',
                    spec: '规格 S码',
                    price: 127.5,
                    count: 1,
                    selected: false
                },
                {
                    id: 2,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    count: 1,
                    selected: false
                },
                {
                    id: 3,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    count: 1,
                    selected: false
                },
                {
                    id: 4,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    count: 1,
                    selected: false
                },
                {
                    id: 4,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    count: 1,
                    selected: false
                },
                {
                    id: 4,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    count: 1,
                    selected: false
                }
            ]
        }
    },
    //下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
    onPullDownRefresh() {
        setTimeout(function () {
            uni.stopPullDownRefresh()
        }, 1000)
    },
    onLoad() {

    },
    methods: {
        edit() {
            this.isEdit = !this.isEdit
        },
        // 商品跳转
        toGoods(e) {
            // uni.showToast({title: '商品'+e.id,icon:"none"})
            // uni.navigateTo({
            //     url: '/pages/product/product'
            // })
        },
        // 跳转确认订单页面
        toConfirm() {
            let that = this
            let confirmArr = []
            that.proArr.forEach((item, i) => {
                if (item.selected) {
                    confirmArr.push(item)
                }
            })
            console.log(confirmArr)
            if (confirmArr.length) {
                uni.navigateTo({
                    url: '/pages/confirm/confirm?confirmArr=' + encodeURIComponent(JSON.stringify(confirmArr)) + '&proPrice=' + that.sumPrice
                })
            } else {
                uni.showModal({
                    title: '提示',
                    content: '请先选择产品',
                    showCancel: false
                })
            }


            // uni.setStorage({
            //     key: 'buylist',
            //     data: tmpList,
            //     success: () => {
            //         uni.navigateTo({
            //             url: '../order/confirmation'
            //         })
            //     }
            // })
        },
        // 删除商品
        deleteGoods(id) {
            let len = this.proArr.length
            for (let i = 0; i < len; i++) {
                if (id == this.proArr[i].id) {
                    this.proArr.splice(i, 1)
                    break
                }
            }
            this.sum()
        },
        // 删除商品
        deleteList() {
            let that = this
            that.selectedList.forEach((item, i) => {
                that.deleteGoods(item)
            })
            that.selectedList = []
            that.isAllselected = that.selectedList.length == that.proArr.length && that.proArr.length > 0
            that.sum()
        },
        // 选中商品
        selected(index) {
            this.proArr[index].selected = this.proArr[index].selected ? false : true
            let i = this.selectedList.indexOf(this.proArr[index].id)
            i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.proArr[index].id)
            this.isAllselected = this.selectedList.length == this.proArr.length
            this.sum()
        },
        // 全选
        allSelect() {
            let that = this
            let arr = []
            that.proArr.forEach((item, i) => {
                item.selected = that.isAllselected ? false : true
                arr.push(item.id)
            })
            that.selectedList = that.isAllselected ? [] : arr
            that.isAllselected = that.isAllselected || that.proArr.length == 0 ? false : true
            that.sum()
        },
        // 减少数量
        sub(index) {
            if (this.proArr[index].count <= 1) {
                return
            }
            this.proArr[index].count--
            this.sum()
        },
        // 增加数量
        add(index) {
            this.proArr[index].count++
            this.sum()
        },
        // 合计
        sum() {
            let sumPrice = 0
            let len = this.proArr.length
            for (let i = 0, len = this.proArr.length; i < len; i++) {
                if (this.proArr[i].selected) {
                    sumPrice = sumPrice + (this.proArr[i].count * this.proArr[i].price)
                }
            }
            this.sumPrice = sumPrice.toFixed(2)
        },
        discard() {
            //丢弃
        }
    }
}
</script>
<style scoped>
.cart-tf{
    display: flex;
    width: 100%;
    padding: 0 15px;
    height: 40px;
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
    background-color: #d1a178;
    color: #fff;
    padding: 0 15px;
    height: 25px;
    line-height: 25px;
    border-radius: 15px;
    font-size: 14px;
}
.cart-tf__del {
    border: 1upx solid #d1a178;
    color: #d1a178;
    padding: 0 15px;
    height: 25px;
    line-height: 25px;
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















.cart__none{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}



.cart{
    width: 100%;
    margin: 40px 0;
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
