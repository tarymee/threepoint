<template>
    <view>
        <!-- 商品列表 -->
        <view class="cart">
            <view class="cart__none" v-if="goodsList.length==0">购物车是空的哦~</view>
            <uni-swipe-action :options="options2" v-for="(row,index) in goodsList" :key="index" @click="deleteGoods(row.id)">
                <view class="cart___item">
                    <!-- checkbox -->
                    <view class="cart___item-checkbox" @tap="selected(index)">
                        <div class="checkbox" :class="row.selected ? 'checkbox--on' : ''"></div>
                    </view>
                    <!-- 商品信息 -->
                    <view class="pro" @tap="toGoods(row)">
                        <image :src="row.img" class="pro__img"></image>
                        <view class="pro__info">
                            <view class="pro__info-tit">{{row.name}}</view>
                            <view class="pro__info-spec">{{row.spec}}</view>
                            <view class="pro__info-tf">
                                <view class="pro__info-price">￥{{row.price}}</view>
                                <view class="pro__info-number">
                                    <view class="pro__info-number-sub" @tap.stop="sub(index)">
                                        <view>-</view>
                                    </view>
                                    <view class="pro__info-number-input" @tap.stop="discard">
                                        <input type="number" v-model="row.number" @input="sum" />
                                    </view>
                                    <view class="pro__info-number-add"  @tap.stop="add(index)">
                                        <view>+</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </uni-swipe-action>
            <!-- <view class="cart___item" v-for="(row,index) in goodsList" :key="index" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
                <div class="cart___item-menu" @tap.stop="deleteGoods(row.id)">
                    <view>删除</view>
                </div>
                <view class="cart___item-content" :class="[theIndex == index ? 'cart___item-content--open' : oldIndex == index ? 'cart___item-content--close' : '']">
                    <view class="checkbox-box" @tap="selected(index)">
                        <div class="checkbox" :class="row.selected ? 'checkbox--on' : ''"></div>
                    </view>
                    <view class="pro" @tap="toGoods(row)">
                        <view class="pro__img">
                            <image :src="row.img"></image>
                        </view>
                        <view class="pro__info">
                            <view class="pro__tit">{{row.name}}</view>
                            <view class="pro__spec">{{row.spec}}</view>
                            <view class="pro__price-number">
                                <view class="pro__price">￥{{row.price}}</view>
                                <view class="pro__number">
                                    <view class="pro__number-sub" @tap.stop="sub(index)">
                                        <view>-</view>
                                    </view>
                                    <view class="pro__number-input" @tap.stop="discard">
                                        <input type="number" v-model="row.number" @input="sum" />
                                    </view>
                                    <view class="pro__number-add"  @tap.stop="add(index)">
                                        <view>+</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view> -->
        </view>
        <!-- 脚部菜单 -->
        <view class="footer" :style="{bottom:footerbottom}">
            <view class="checkbox-box" @tap="allSelect">
                <view class="checkbox" :class="isAllselected ? 'checkbox--on' : ''"></view>
                <view class="text">全选</view>
            </view>
            <view class="delBtn" @tap="deleteList" v-if="selectedList.length>0">删除</view>
            <view class="settlement">
                <view class="sum">合计:<view class="money">￥{{sumPrice}}</view></view>
                <view class="btn" @tap="toConfirmation">结算({{selectedList.length}})</view>
            </view>
        </view>
    </view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
export default {
    components: {
        uniSwipeAction,
        uniNumberBox
    },
    data() {
        return {
            sumPrice: '0.00',
            selectedList: [],
            isAllselected: false,
            options2: [
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#007aff'
                    }
                }
            ],
            goodsList: [
                {
                    id: 1,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标',
                    spec: '规格 S码',
                    price: 127.5,
                    number: 1,
                    selected: false
                },
                {
                    id: 2,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    number: 1,
                    selected: false
                },
                {
                    id: 3,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    number: 1,
                    selected: false
                },
                {
                    id: 4,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    number: 1,
                    selected: false
                },
                {
                    id: 4,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    number: 1,
                    selected: false
                },
                {
                    id: 4,
                    img: 'http://fpoimg.com/100x100',
                    name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
                    spec: '规格 S码',
                    price: 127.5,
                    number: 1,
                    selected: false
                }
            ],
            //控制滑动效果
            theIndex: null,
            oldIndex: null,
            isStop: false
        }
    },
    onPageScroll(e) {
        //兼容iOS端下拉时顶部漂移
        // if(e.scrollTop>=0){
        //     this.headerPosition = "fixed"
        // }else{
        //     this.headerPosition = "absolute"
        // }
    },
    //下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
    onPullDownRefresh() {
        setTimeout(function () {
            uni.stopPullDownRefresh()
        }, 1000)
    },
    onLoad() {
        //兼容H5下结算条位置
        // #ifdef H5
        this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + 'px'
        // #endif
    },
    methods: {
        //控制左滑删除效果-begin
        touchStart(index, event) {
            //多点触控不触发
            if (event.touches.length > 1) {
                this.isStop = true
                return
            }
            this.oldIndex = this.theIndex
            this.theIndex = null
            //初始坐标
            this.initXY = [event.touches[0].pageX, event.touches[0].pageY]
        },
        touchMove(index, event) {
            //多点触控不触发
            if (event.touches.length > 1) {
                this.isStop = true
                return
            }
            let moveX = event.touches[0].pageX - this.initXY[0]
            let moveY = event.touches[0].pageY - this.initXY[1]

            if (this.isStop || Math.abs(moveX) < 5) {
                return
            }
            if (Math.abs(moveY) > Math.abs(moveX)) {
                // 竖向滑动-不触发左滑效果
                this.isStop = true
                return
            }

            if (moveX < 0) {
                this.theIndex = index
                this.isStop = true
            } else if (moveX > 0) {
                if (this.theIndex != null && this.oldIndex == this.theIndex) {
                    this.oldIndex = index
                    this.theIndex = null
                    this.isStop = true
                    setTimeout(() => {
                        this.oldIndex = null
                    }, 150)
                }
            }
        },
        touchEnd(index, $event) {
            //结束禁止触发效果
            this.isStop = false
        },
        //控制左滑删除效果-end


        //商品跳转
        toGoods(e) {
            // uni.showToast({title: '商品'+e.id,icon:"none"})
            // uni.navigateTo({
            //     url: '/pages/product/product'
            // })
        },
        //跳转确认订单页面
        toConfirmation() {
            let tmpList = []
            let len = this.goodsList.length
            for (let i = 0; i < len; i++) {
                if (this.goodsList[i].selected) {
                    tmpList.push(this.goodsList[i])
                }
            }
            uni.setStorage({
                key: 'buylist',
                data: tmpList,
                success: () => {
                    uni.navigateTo({
                        url: '../order/confirmation'
                    })
                }
            })
        },
        //删除商品
        deleteGoods(id) {
            let len = this.goodsList.length
            for (let i = 0; i < len; i++) {
                if (id == this.goodsList[i].id) {
                    this.goodsList.splice(i, 1)
                    break
                }
            }
            this.sum()
        },
        // 删除商品s
        deleteList() {
            let len = this.selectedList.length
            for (let i = 0; i < len; i++) {
                this.deleteGoods(this.selectedList[i])
            }
            this.selectedList = []
            this.isAllselected = this.selectedList.length == this.goodsList.length && this.goodsList.length > 0
            this.sum()
        },
        // 选中商品
        selected(index) {
            this.goodsList[index].selected = this.goodsList[index].selected ? false : true
            let i = this.selectedList.indexOf(this.goodsList[index].id)
            i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.goodsList[index].id)
            this.isAllselected = this.selectedList.length == this.goodsList.length
            this.sum()
        },
        //全选
        allSelect() {
            let len = this.goodsList.length
            let arr = []
            for (let i = 0; i < len; i++) {
                this.goodsList[i].selected = this.isAllselected ? false : true
                arr.push(this.goodsList[i].id)
            }
            this.selectedList = this.isAllselected ? [] : arr
            this.isAllselected = this.isAllselected || this.goodsList.length == 0 ? false : true
            this.sum()
        },
        // 减少数量
        sub(index) {
            if (this.goodsList[index].number <= 1) {
                return
            }
            this.goodsList[index].number--
            this.sum()
        },
        // 增加数量
        add(index) {
            this.goodsList[index].number++
            this.sum()
        },
        // 合计
        sum() {
            let sumPrice = 0
            let len = this.goodsList.length
            for (let i = 0, len = this.goodsList.length; i < len; i++) {
                if (this.goodsList[i].selected) {
                    sumPrice = sumPrice + (this.goodsList[i].number * this.goodsList[i].price)
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
<style lang="scss">
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
    padding-bottom: 60px;
}
.cart___item{
    display: flex;
    padding: 15px 0;
    margin: 0 15px;
    border-bottom: 1px solid #eee;
}


.cart___item-checkbox {
    display: flex;
    align-items: center;
    padding: 0 10px;
}


.checkbox{
    display: flex;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 1px solid #ccc;
    justify-content: center;
    align-items: center;
}
.checkbox--on::after{
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: $uni-color-primary;
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
.pro__info-number{
    display: flex;
    justify-content: center;
    // align-items: center;
    border: 1px solid #ccc;
    border-radius: 13px;
    height: 24px;
}
.pro__info-number-input{
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}
.pro__info-number-input input {
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
.pro__info-number-sub ,.pro__info-number-add{
    width: 24px;
    height: 24px;
    line-height: 20px;
    font-size: 16px;
    text-align: center;
}













@keyframes showMenu {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-30%);
    }
}
@keyframes closeMenu {
    0% {
        transform: translateX(-30%);
    }
    100% {
        transform: translateX(0);
    }
}













.footer{
    width: 92%;
    padding: 0 4%;
    background-color: #fff;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    position: fixed;
    bottom: 0;
    z-index: 5;
}

.delBtn{
    border: solid 1px #f06c7a;
    color: #f06c7a;
    padding: 0 15px;
    height: 25px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.settlement{
    width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

}
.settlement .sum{
    width: 50%;
    font-size: 14px;
    margin-right: 5px;
    display: flex;
    justify-content: flex-end;

}
.settlement .sum .money{
    font-weight: 600;
}
.settlement .btn{
    padding: 0 15px;
    height: 25px;
    background-color: #f06c7a;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
}







</style>
