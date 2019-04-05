<template>
<tt-bottom-load :api="api" :params="postData" pagesize="20" ref="ttBottomLoad" @cartadd='reviceData'>
    <div class="pro">
        <div class="pro__item" v-for="(item, index) in data" :key="index" @click="jump(item.url)">
            <image class="pro__item-img" :src="item.logo" lazy-load="true" mode="aspectFill"></image>
            <text class="pro__item-tit">{{item.title}}</text>
            <div class="pro__item-price"><text class="pro__item-symbol">￥</text>{{item.marketPrice}}</div>
        </div>
    </div>
</tt-bottom-load>
</template>
<script>
import u from '@/common/util'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'

export default {
    components: {
        ttBottomLoad
    },
    data() {
        return {
            api: u.api.index,
            data: [],
            postData: {
                id: '123456'
            }
        }
    },
    onReachBottom: function (t) {
        console.log('触底执行')
        this.$refs.ttBottomLoad.load()
    },
    methods: {
        reviceData(data) {
            console.log(data)
            this.data = data
        },
        reload() {
            console.log('reload')
            this.$refs.ttBottomLoad.reload()
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
    }
}
</script>