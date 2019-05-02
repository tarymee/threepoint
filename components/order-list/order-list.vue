<template>
    <div class="order">
        <div class="order__item" v-for="(item, index) in orderArr" :key="index" @click="jump(`/pages/orderdetail/orderdetail?id=${item.order_id}`)">
            <div class="order__th">
                <div class="order__th-number">订单编号: {{item.order_id}}</div>
                <div class="order__th-status" v-if="item.status === '1'">已关闭</div>
                <div class="order__th-status" v-if="item.status === '2'">已完成</div>
                <div class="order__th-status order__th-status--1" v-if="item.status === '3'">待付款</div>
                <div class="order__th-status order__th-status--1" v-if="item.status === '4'">待发货</div>
                <div class="order__th-status order__th-status--1" v-if="item.status === '5'">已发货</div>
                <div class="order__th-status order__th-status--1" v-if="item.status === '6'">待收货</div>
            </div>
            <div class="order__tb" v-for="(item1, index1) in item.detail" :key="index1">
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
            <div class="order__tf">共 {{item.totalcount}} 件 合计： <span class="order__tf-price">¥{{item.order_pay_price}}</span></div>
            <div class="order__status" v-if="item.status === '3' || item.status === '5' || item.status === '6'">
                <div class="order__status-btn" @click="express(item.id)" v-if="item.status === '5' || item.status === '6'">查看物流</div>
                <div class="order__status-btn order__status-btn--1" @click="comfirm(item.id)" v-if="item.status === '6'">确认收获</div>
                <div class="order__status-btn order__status-btn--1" @click="pay(item.id)" v-if="item.status === '3'">立即付款</div>
            </div>
        </div>
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
        jump(url) {
            u.jump(url)
        },
        pay(id) {
            
        },
        comfirm(id) {
            
        },
        express(id) {
            uni.navigateTo({
                url: '/pages/express/express?id=' + id
            })
        }
    }
}
</script>

<style scope>

</style>