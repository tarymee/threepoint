<template>
    <div class="order">
        <div class="order__item" v-for="(item, index) in orderArr" :key="index">
            <div class="order__item-graybg"></div>
            <div class="order__item-con">
                <div class="order__th" @click="jump(`/pages/orderdetail/orderdetail?order_id=${item.order_id}`)">
                    <div class="order__th-tit">订单编号: {{item.order_no}}</div>
                    <!-- <div class="order__th-status" v-if="item.status === '1'">已关闭</div>
                    <div class="order__th-status" v-if="item.status === '2'">已完成</div>
                    <div class="order__th-status order__th-status--1" v-if="item.status === '3'">待付款</div>
                    <div class="order__th-status order__th-status--1" v-if="item.status === '4'">待发货</div>
                    <div class="order__th-status order__th-status--1" v-if="item.status === '5'">已发货</div>
                    <div class="order__th-status order__th-status--1" v-if="item.status === '6'">待收货</div> -->

                    <div class="order__th-status" v-if="item.pay_status.value===0">{{item.pay_status.text}}</div>
                    <div class="order__th-status" v-if="item.pay_status.value===1 && item.delivery_status.value===10">{{item.delivery_status.text}}</div>
                    <div class="order__th-status" v-if="item.pay_status.value===1 && item.delivery_status.value===20 && item.receipt_status.value===10">{{item.receipt_status.text}}</div>
                    <div class="order__th-status" v-if="item.order_status.value===30">{{item.order_status.text}}</div>
                </div>
                <div class="order__tb" v-for="(item1, index1) in item.detail" :key="index1" @click="jump(`/pages/orderdetail/orderdetail?order_id=${item.order_id}`)">
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
                <div class="order__tf" @click="jump(`/pages/orderdetail/orderdetail?order_id=${item.order_id}`)">共 {{item.totalcount}} 件 合计： <span class="order__tf-price">¥{{item.order_pay_price}}</span> (含运费¥{{item.express_price}})</div>

                <!-- <div class="order__status">
                    <div class="order__status-btn" @tap="orderreturn(item.order_id)">退款</div>
                </div> -->

                <div class="order__status" v-if="item.pay_status.value===0 || (item.delivery_status.value===20 && item.receipt_status.value===10)">
                    <div class="order__status-btn" v-if="item.pay_status.value===0" @tap="cancel(item.order_id)">取消订单</div>
                    <div class="order__status-btn order__status-btn--1" v-if="item.pay_status.value===0" @tap="repay(item.order_id, item.order_pay_price)">立即付款</div>
                    <div class="order__status-btn order__status-btn--1" v-if="item.delivery_status.value===20 && item.receipt_status.value===10" @tap="receipt(item.order_id)">确认收货</div>
                </div>
            </div>
        </div>
        <div class="order__item-graybg"></div>
    </div>
</template>
<script>
import u from '@/common/util'
export default {
    name: "order-list",
    components: {},
    data() {
        return {
        }
    },
    props: {
        orderArr: {
            type: Array,
            default: []
        }
    },
    mounted() {
        console.log('order-list mounted')
        let that = this
    },
    methods: {
        repay(order_id, order_pay_price) {
            console.log('repay', order_id, order_pay_price)
            u.orderRepay(order_id, order_pay_price)
        },
        receipt(order_id) {
            console.log('receipt', order_id)
            u.receipt(order_id)
        },
        cancel(order_id) {
            console.log('cancel', order_id)
            u.cancel(order_id)
        },
        orderreturn(order_id) {
            this.jump('/pages/orderreturn/orderreturn?id=' + order_id)
        },
        express(order_id) {
            this.jump('/pages/express/express?id=' + order_id)
        }
    }
}
</script>

<style scope>

</style>