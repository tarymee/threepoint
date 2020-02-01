
<template>
<div class="">
    <div v-if="!order">
        <tip text="暂无订单" :none-icon="true"></tip>
    </div>
    <div class="" v-if="order">

        <div class="status">
            <div class="status__tit" v-if="order.pay_status.value===0">{{order.pay_status.text}}</div>
            <div class="status__tit" v-if="order.pay_status.value===1 && order.delivery_status.value===10">{{order.delivery_status.text}}</div>
            <div class="status__tit" v-if="order.pay_status.value===1 && order.delivery_status.value===20 && order.receipt_status.value===10">{{order.receipt_status.text}}</div>
            <div class="status__tit" v-if="order.order_status.value===30">{{order.order_status.text}}</div>
            <img src="/static/img/status-icon1.png" mode="aspectFit" class="status__icon" alt="" />
        </div>

        <!-- <div class="status">
            <div class="status__tit">已关闭</div>
            <div class="status__des">您的订单已关闭</div>
            <img src="/static/img/status-icon1.png" mode="aspectFit" class="status__icon" alt="" />
        </div> -->
        <div class="address">
            <div class="address__item">
                <div class="address__item-icon fa fa-map-marker"></div>
                <div class="address__item-info">
                    <div class="address__item-name">{{address.name}} {{address.phone}}</div>
                    <div class="address__item-detail">{{address.region[0]}} {{address.region[1]}} {{address.region[2]}} {{address.detail}}</div>
                </div>
            </div>
            <div class="address__letter"></div>
        </div>
        <div class="" style="height: 10px;background-color: #F9F9F9;"></div>
        <div class="order">
            <div class="order__item">
                <div class="order__item-con">
                    <div class="order__th">
                        <div class="order__th-tit">订单信息</div>
                    </div>
                    <div class="order__tb" v-for="(item1, index1) in order.detail" :key="index1">
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
                    <div class="order__tf">共 {{order.totalcount}} 件 合计： <span class="order__tf-price">¥{{order.order_pay_price}}</span> (含运费¥{{order.express_price}})</div>
                </div>
            </div>
        </div>
        <div class="" style="height: 10px;background-color: #F9F9F9;"></div>
        <div class="info">
            <div class="info__txt">订单编号：{{order.order_no}}</div>
            <div class="info__txt">下单时间：{{order.create_time}}</div>
            <div class="info__txt" v-if="order.pay_time">付款时间：{{order.pay_time}}</div>
            <div class="info__txt" v-if="order.delivery_time">发货时间：{{order.delivery_time}}</div>
            <div class="info__txt" v-if="order.receipt_time">确认收货时间：{{order.receipt_time}}</div>
        </div>
        <div class="" style="height: 10px;background-color: #F9F9F9;"></div>

        <div class="" style="height: 50px;"></div>
        <div class="detail-tf" v-if="order.pay_status.value===0 || (order.delivery_status.value===20 && order.receipt_status.value===10)">
            <div class="detail-tf__btn1" v-if="order.pay_status.value===0" @tap="cancel(order.order_id)">取消订单</div>
            <div class="detail-tf__btn2" v-if="order.pay_status.value===0" @tap="repay(order.order_id, order.order_pay_price)">立即付款</div>
            <div class="detail-tf__btn2" v-if="order.delivery_status.value===20 && order.receipt_status.value===10" @tap="receipt(order.order_id)">确认收货</div>
        </div>
    </div>
</div>
</template>
<script>
import u from '@/common/util'
import tip from '@/components/tip/tip.vue'
export default {
    components: {
        tip
    },
    data() {
        return {
            address: null,
            order: null
        }
    },
    methods: {
        test() {
            console.log('text')
        },
        repay(order_id, order_pay_price) {
            console.log('repay', order_id, order_pay_price)
            u.repay(order_id, order_pay_price)
        },
        receipt(order_id) {
            console.log('receipt', order_id)
            u.receipt(order_id)
        },
        cancel(order_id) {
            console.log('cancel', order_id)
            u.cancel(order_id)
        },
        express(order_id) {
            uni.navigateTo({
                url: '/pages/express/express?id=' + order_id
            })
        }
    },
    onLoad(event) {
        console.log("orderdetail onLoad")
        let that = this
        console.log(event)
        that.order_id = event.order_id

        u.request({
            url: u.api.orderdetail,
            data: {
                order_id: that.order_id
            },
            isVerifyLogin: true,
            isShowLoading: true,
            isShowError: true,
            success(res) {
                console.log(res)
                if (res && res.code == 1 && res.data && res.data.order) {
                    res = res.data.order
                    that.address = {
                        name: res.address.name,
                        phone: res.address.phone,
                        region: res.address.region,
                        detail: res.address.detail,
                    }

                    let order = {
                        order_id: res.order_id,
                        order_no: res.order_no,
                        create_time: res.create_time,
                        pay_time: res.pay_time,
                        delivery_time: res.delivery_time,
                        receipt_time: res.receipt_time,
                        status: res.status,
                        order_total_price: res.total_price,
                        express_price: res.express_price,
                        order_pay_price: res.pay_price,
                        totalcount: res.goods.length,
                        pay_status: res.pay_status,
                        delivery_status: res.delivery_status,
                        receipt_status: res.receipt_status,
                        order_status: res.order_status,
                        detail: []
                    }
                    res.goods.forEach((item, i) => {
                        order.detail.push({
                            goods_id: item.goods_id,
                            img: item.image.file_path,
                            count: item.total_num,
                            price: item.goods_price,
                            specTip: item.goods_attr,
                            name: item.goods_name
                        })
                    })


                    that.order = order
                } else {

                    return false
                    that.address = {
                        name: '李先生',
                        phone: '15845454545',
                        region: ['广东省', '广州市', '天河区'],
                        detail: '黄埔大道车陂文化大街1号15乡6号楼7层105室',
                        isDefault: true
                    }
                    that.order = {
                        order_id: '12345679590',
                        create_time: '2019-02-01 12:55:00',
                        pay_time: '2019-02-01 12:55:00',
                        delivery_time: '2019-02-01 12:55:00',
                        receipt_time: '2019-02-01 12:55:00',
                        status: '3',
                        order_total_price: '100.00',
                        express_price: '10.00',
                        order_pay_price: '110.00',
                        totalcount: '1',
                        pay_status: {
                            text: '已付款',
                            value: 1
                        },
                        delivery_status: {
                            text: '待发货',
                            value: 10
                        },
                        receipt_status: {
                            text: '待收货',
                            value: 10
                        },
                        order_status: {
                            text: '进行中',
                            value: 10
                        },
                        detail: [
                            {
                                goods_id: '1',
                                img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                                count: '1',
                                price: '100',
                                specTip: '规格: 天蓝色 S码',
                                name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                            }
                        ]
                    }
                }
            },
            fail(res) {
                console.error(res)
            }
        })




    }
}
</script>
<style scoped>
.status {
    background-color: #d1a178;
    color: #ffffff;
    padding: 30px 15px;
    height: 40px;
    position: relative;
}
.status__tit {
    font-size: 16px;
    font-weight: bold;
}
.status__des {
    font-size: 12px;
}
.status__icon {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    top: 30px;
    right: 20px;
}


.info {
    padding: 15px;
    font-size: 12px;
    line-height: 25px;
}


.detail-tf {
    display: flex;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    background-color: #fff;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: 1upx solid #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.detail-tf__btn1 {
    background-color: #d1a178;
    color: #fff;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 14px;
    margin-left: 10px;
}
.detail-tf__btn2 {
    border: 1upx solid #d1a178;
    color: #d1a178;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 14px;
    margin-left: 10px;
}



</style>