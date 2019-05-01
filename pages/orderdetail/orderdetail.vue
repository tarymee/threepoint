<template>
    <div class="order">
        <div class="order__item" @click="detail(orderObj.id)">
            <div class="order__th">
                <div class="order__th-number">订单编号: {{orderObj.id}}</div>
                <div class="order__th-status" v-if="orderObj.status === '1'">已关闭</div>
                <div class="order__th-status" v-if="orderObj.status === '2'">已完成</div>
                <div class="order__th-status order__th-status--1" v-if="orderObj.status === '3'">待付款</div>
                <div class="order__th-status order__th-status--1" v-if="orderObj.status === '4'">待发货</div>
                <div class="order__th-status order__th-status--1" v-if="orderObj.status === '5'">已发货</div>
                <div class="order__th-status order__th-status--1" v-if="orderObj.status === '6'">待收货</div>
            </div>
            <div class="order__tb" v-for="(item1, index1) in orderObj.detail" :key="index1">
                <div class="order__tb-l"><img :src="item1.img" mode="aspectFill" class="order__tb-img" alt="" /></div>
                <div class="order__tb-m">
                    <div class="order__tb-m-name">{{item1.name}}</div>
                    <div class="order__tb-m-select">{{item1.specTip}}</div>
                </div>
                <div class="order__tb-r">
                    <div class="order__tb-price">¥{{item1.price}}</div>
                    <div class="order__tb-number">x{{item1.count}}</div>
                </div>
            </div>
            <div class="order__tf">共 {{orderObj.totalcount}} 件 合计： <span class="order__tf-price">¥{{orderObj.totalprice}}</span></div>
            <div class="order__status" v-if="orderObj.status === '3' || orderObj.status === '5' || orderObj.status === '6'">
                <div class="order__status-btn" @click="express(orderObj.id)" v-if="orderObj.status === '5' || orderObj.status === '6'">查看物流</div>
                <div class="order__status-btn order__status-btn--1" @click="comfirm(orderObj.id)" v-if="orderObj.status === '6'">确认收获</div>
                <div class="order__status-btn order__status-btn--1" @click="pay(orderObj.id)" v-if="orderObj.status === '3'">立即付款</div>
            </div>
        </div>
    </div>
</template>
<script>
import u from '@/common/util'
export default {
    components: {
    },
    data() {
        return {
            orderObj: {
                id: '12345678790',
                status: '6',
                totalcount: '1',
                totalprice: '100.00',
                detail: [
                    {
                        img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                        count: '1',
                        price: '100',
                        specTip: '规格: 天蓝色 S码',
                        name: '日系复古短袖T恤'
                    }
                ]
            }
        }
    },
    methods: {
        test() {
            console.log('text')
        }
    },
    onLoad(event) {
        console.log("orderdetail onLoad")
        let that = this
        console.log(event)
        that.order_id = event.id
    }
}
</script>
<style scoped>

</style>