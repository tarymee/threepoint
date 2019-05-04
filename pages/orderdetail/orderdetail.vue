
<template>
<div class="">
    <div class="status">
        <div class="status__tit" v-if="orderObj.status === '1'">已关闭</div>
        <div class="status__tit" v-if="orderObj.status === '2'">已完成</div>
        <div class="status__tit" v-if="orderObj.status === '3'">待付款</div>
        <div class="status__tit" v-if="orderObj.status === '4'">待发货</div>
        <div class="status__tit" v-if="orderObj.status === '5'">已发货</div>
        <div class="status__tit" v-if="orderObj.status === '6'">待收货</div>
        <div class="status__des" v-if="orderObj.status === '1'">您的订单已关闭</div>
        <div class="status__des" v-if="orderObj.status === '2'">您的订单已经完成</div>
        <div class="status__des" v-if="orderObj.status === '3'">您的订单未付款</div>
        <div class="status__des" v-if="orderObj.status === '4'">您的订单正在准备发货中</div>
        <div class="status__des" v-if="orderObj.status === '5'">您的订单已经发货</div>
        <div class="status__des" v-if="orderObj.status === '6'">您的订单已签收 请确认收货</div>
        <img src="/static/img/status-icon1.png" mode="aspectFit" class="status__icon" alt="" />
    </div>
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
        <!-- <div class="address__letter"></div> -->
    </div>
    <div class="" style="height: 10px;background-color: #F9F9F9;"></div>
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
    <div class="" style="height: 10px;background-color: #F9F9F9;"></div>
    <div class="info">
        <div class="info__txt">订单编号：65465465465465464</div>
        <div class="info__txt">下单时间：2019-02-01 12:55:00</div>
        <div class="info__txt">付款时间：2019-02-01 12:55:00</div>
    </div>
    <div class="" style="height: 10px;background-color: #F9F9F9;"></div>

    <div class="" style="height: 50px;"></div>
    <div class="detail-tf">
        <div class="detail-tf__btn1" @tap="pay">立即付款</div>
        <div class="detail-tf__btn2" @tap="pay">申请</div>
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
            address: {
                id: '1886547',
                name: '李先生',
                phone: '15845454545',
                region: ['广东省', '广州市', '天河区'],
                detail: '黄埔大道车陂文化大街1号15乡6号楼7层105室',
                isDefault: true
            },
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
                        name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
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
.status {
    background-color: #d1a178;
    color: #ffffff;
    padding: 30px 15px;
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
    font-size: 14px;
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