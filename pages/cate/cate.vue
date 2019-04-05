<template>
    <div>
        <div class="pro">
            <div class="pro__item" v-for="(item, index) in bottomLoad_data" :key="index" @click="jump(item.url)">
                <image class="pro__item-img" :src="item.logo" lazy-load="true" mode="aspectFill"></image>
                <text class="pro__item-tit">{{item.title}}</text>
                <div class="pro__item-price"><text class="pro__item-symbol">￥</text>{{item.marketPrice}}</div>
            </div>
        </div>
        <tip :text="bottomLoad_tip" :none-icon="false"></tip>
    </div>
</template>
<script>
import u from '@/common/util'
import bottomLoad from '@/mixins/bottom-load.js'
import tip from '@/components/tip/tip.vue'
export default {
    components: {
        tip
    },
    mixins: [bottomLoad],
    data() {
        return {
            bottomLoad_api: u.api.index,
            bottomLoad_pagesize: 20,
            bottomLoad_params: {
                id: '123456'
            }
        }
    },
    methods: {
        reload() {
            console.log('reload')
            this.bottomLoad_reload()
        },
        jump(url) {
            if (url) {
                uni.navigateTo({
                    url: url
                })
            } else {
                console.log('没有url')
            }
        }
    },
    onLoad(event) {
        console.log("cate onLoad")
        let that = this
        console.log(event)
        that.bottomLoad_params.id = event.id
        uni.setNavigationBarTitle({
            title: event.title
        })
    }
}
</script>
<style scoped>
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