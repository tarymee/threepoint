<template>
    <div class="success">
        <div class="fa fa-check-circle success__icon"></div>
        <div class="success__tit">支付成功</div>
        <div class="success__tip">支付金额: <span class="success__tip-price">￥{{price}}</span></div>
        <div class="success__btnbox">
            <a class="success__btnbox-btn" @click="jump(`/pages/index/index`)">回到首页</a>
            <a class="success__btnbox-btn" @click="jump(`/pages/orderdetail/orderdetail?order_id=${order_id}`)">查看订单</a>
        </div>
    </div>
</template>
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
<style scoped>
.success {
    text-align: center;
    padding-top: 60px;
}
.success__icon {
    color: #d1a178;
    font-size: 60px;
    line-height: 60px;
    text-align: center;
}
.success__tit {
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
}
.success__tip {
    font-size: 14px;
    line-height: 25px;
    color: #999;
}
.success__tip-price {
    color: #d1a178;
    font-size: 16px;
    font-weight: bold;
}
.success__btnbox {
    margin: 15px 0;
    display: flex;
    justify-content: center;
}
.success__btnbox-btn {
    font-size: 14px;
    border: 1upx solid #ccc;
    padding: 0 20px;
    line-height: 30px;
    height: 30px;
    color: #333;
    border-radius: 15px;
    margin: 0 15px;
}

</style>