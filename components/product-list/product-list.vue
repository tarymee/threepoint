<template>
    <div class="pro">
        <div class="pro__item" v-for="(item, index) in data" :key="index" @click="jump(item.url)">
            <image class="pro__item-img" :src="item.logo" lazy-load="true" mode="aspectFill"></image>
            <text class="pro__item-tit">{{item.title}}</text>
            <div class="pro__item-price"><text class="pro__item-symbol">￥</text>{{item.marketPrice}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "product-list",
    components: {},
    data() {
        return {}
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    mounted() {
        console.log('product-list mounted')
        let that = this
    },
    methods: {
        jump(url) {
            if (url) {
                uni.navigateTo({
                    url: url
                })
            } else {
                console.log('没有url')
            }
        }
    }
}
</script>

<style scope>
@charset "UTF-8";
/* 商品 */
.pro {
    overflow: hidden;
    margin: 15upx 15upx 0;
}

.pro__item {
    float: left;
    margin: 15upx;
}

.pro__item-img {
    display: block;
    width: 330upx;
    height: 330upx;
    background: url('~@/static/img/loading.gif') center center no-repeat;
}
.pro__item-tit {
    display: block;
    font-size: 28upx;
    color: #333;
    line-height: 50upx;
}

.pro__item-price {
    display: block;
    font-size: 32upx;
    color: #d1a178;
    font-weight: bold;
    line-height: 40upx;
}

.pro__item-symbol {
    font-size: 24upx;
}
</style>