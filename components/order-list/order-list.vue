<template>
    <div class="order">
        <div class="order__item" v-for="(item, index) in data" :key="index" @click="detail(item.id)">
            <div class="order__th">
                <div class="order__th-number">订单编号: {{item.id}}</div>
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
                    <div class="order__tb-m-select">{{item1.select}}</div>
                </div>
                <div class="order__tb-r">
                    <div class="order__tb-price">¥{{item1.price}}</div>
                    <div class="order__tb-number">x{{item1.count}}</div>
                </div>
            </div>
            <div class="order__tf">共 {{item.totalcount}} 件 合计： <span class="order__tf-price">¥{{item.totalprice}}</span></div>
            <div class="order__status" v-if="item.status === '3' || item.status === '5' || item.status === '6'">
                <div class="order__status-btn" @click="express(item.id)" v-if="item.status === '5' || item.status === '6'">查看物流</div>
                <div class="order__status-btn order__status-btn--1" @click="comfirm(item.id)" v-if="item.status === '6'">确认收获</div>
                <div class="order__status-btn order__status-btn--1" @click="pay(item.id)" v-if="item.status === '3'">立即付款</div>
            </div>
        </div>
        <!-- <div class="order__item">
            <div class="order__th">
                <div class="order__th-number">订单编号: 888888888888888888</div>
                <div class="order__th-status order__th-status--1">已关闭</div>
            </div>
            <div class="order__tb">
                <div class="order__tb-l"><img src="http://fpoimg.com/400x400" class="order__tb-img" alt="" /></div>
                <div class="order__tb-m">青花瓷20CM</div>
                <div class="order__tb-m">
                    <div class="order__tb-m-name">青花瓷20CM</div>
                    <div class="order__tb-m-select">天蓝色 S</div>
                </div>
                <div class="order__tb-r">
                    <div class="order__tb-price">¥109</div>
                    <div class="order__tb-number">x1</div>
                </div>
            </div>
            <div class="order__tf">共 1 件 合计： <span class="order__tf-price">¥109</span></div>
            <div class="order__status">
                <div class="order__status-btn">查看物流</div>
                <div class="order__status-btn order__status-btn--1">确认收获</div>
                <div class="order__status-btn order__status-btn--1">立即付款</div>
            </div>
        </div> -->
        <!-- <div class="order__item" v-for="(item, index) in data" :key="index" @click="jump(item.url)">
            <image class="order__item-img" :src="item.logo" lazy-load="true" mode="aspectFill"></image>
            <text class="order__item-tit">{{item.title}}</text>
            <div class="order__item-price"><text class="order__item-symbol">￥</text>{{item.marketPrice}}</div>
        </div> -->
    </div>
</template>
<script>
export default {
    name: "order-list",
    components: {},
    data() {
        return {
        }
    },
    props: {
        data: {
            type: Array,
            default: [
                {
                    id: '1234567890',
                    status: '1',
                    totalcount: '3',
                    totalprice: '300.00',
                    detail: [
                        {
                            img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            count: '1',
                            price: '100',
                            select: '天蓝色 S码',
                            name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                        }
                    ]
                },
                {
                    id: '1234567890',
                    status: '3',
                    totalcount: '1',
                    totalprice: '100.00',
                    detail: [
                        {
                            img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            count: '1',
                            price: '100',
                            select: '天蓝色 S码',
                            name: '日系复古短袖T恤'
                        },
                        {
                            img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            count: '2',
                            price: '100',
                            select: '天蓝色 S码',
                            name: '日系复古短袖T恤'
                        }
                    ]
                }
            ]
        }
    },
    mounted() {
        console.log('order-list mounted')
        let that = this
    },
    methods: {
        detail(id) {
            
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
@charset "UTF-8";
.order {
    background-color: #eee;
    overflow: hidden;
}
.order__item {
    margin-bottom: 10px;
    background-color: #fff;
    padding: 0 15px;
    color: #333;
}
.order__th {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
}
.order__th-status {
    color: #999;
}
.order__th-status--1 {
    color: #d1a178;
}
.order__tb {
    display: flex;
    line-height: 20px;
    padding: 10px 0px;
}
.order__tb-l {
    width: 60px;
    height: 60px;
    flex: none;
    margin-right: 10px;
}
.order__tb-img {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 3px;
}
.order__tb-m {
    flex: 1;
}
.order__tb-m-name {
    font-size: 12px;
    overflow: hidden;
    max-height: 40px;
}
.order__tb-m-select {
    font-size: 12px;
    color: #999;
}
.order__tb-r {
    flex: none;
    text-align: right;
    margin-left: 10px;
}
.order__tb-price {
    font-weight: bold;
    font-size: 16px;
}
.order__tb-number {
    font-size: 14px;
}
.order__tf {
    line-height: 25px;
    font-size: 14px;
    text-align: right;
    padding-bottom: 10px;
}
.order__tf-price {
    font-size: 16px;
    font-weight: bold;
}
.order__status {
    border-top: 1px solid #eee;
    display: flex;
    padding: 10px 0;
    justify-content: flex-end;
    align-items: center;
}
.order__status-btn {
    border: 1px solid #999;
    color: #999;
    padding: 0 10px;
    border-radius: 15px;
    font-size: 14px;
    line-height: 25px;
    margin-left: 10px;
}
.order__status-btn--1 {
    color: #d1a178;
    border: 1px solid #d1a178;
}
</style>