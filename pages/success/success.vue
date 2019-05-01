<template>
    <div class="success">
        <div class="success__icon"></div>
        <div class="success__tit">支付成功</div>
        <div class="success__price">支付金额: ￥{{price}}</div>
        <div class="success__btnbox">
            <a class="success__btnbox-btn" @click="jumpIndex">回到首页</a>
            <a class="success__btnbox-btn" @click="jumpOrderdetail">查看订单</a>
        </div>
    </div>
</template>
<style scoped>
.success {
    text-align: center;
}
.success__icon {
    border-radius: 50%;
    background-color: #d1a178;
    width: 50px;
    height: 50px;
    margin: 60px auto 20px;
}
.success__tit {
    font-size: 18px;
    font-weight: bold;
}
.success__price {
    font-size: 14px;
    color: #999;
}
.success__btnbox {
    margin: 15px 0;
    display: flex;
    justify-content: center;
}
.success__btnbox-btn {
    font-size: 14px;
    border: 1upx solid #eee;
    padding: 0 20px;
    line-height: 30px;
    height: 30px;
    color: #333;
    border-radius: 15px;
    margin: 0 15px;
}

</style>

<script>
import u from '@/common/util'

export default {
    components: {},
    data() {
        return {
            price: '0.00',
            order_id: ''
        }
    },
    methods: {
        // 提交订单 付款
        jumpIndex() {
            uni.switchTab({
                url: '/pages/index/index'
            })
        },
        jumpOrderdetail() {
            uni.navigateTo({
                url: '/pages/orderdetail/orderdetail?id=' + this.order_id
            })
        }
    },
    onLoad(event) {
        console.log("success onLoad")
        let that = this
        console.log(event)
        that.order_id = event.order_id
        that.price = event.price
    }
}
</script>