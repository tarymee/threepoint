<template>
    <div>
        <div class="cus">
            <div class="cus-item" v-for="(item, index) in bottomLoad_data" :key="index" @tap="jump(`/pages/dolistdetail/dolistdetail?id=${item.id}&title=${item.title}`)">
                <div class="cus-item-con">
                    <div class="cus-item-name">{{item.title}}</div>
                    <!-- <div class="cus-item-time">加入时间：{{item.updateTime}}</div> -->
                </div>
            </div>
        </div>
        <tip :text="bottomLoad_tip" :none-icon="noneIcon"></tip>
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
            bottomLoad_api: u.api.dolist,
            bottomLoad_params: {}
        }
    },
    computed: {
        noneIcon () {
            let that = this
            return that.bottomLoad_data.length ? false : true
        }
    },
    methods: {
        test() {
            console.log('text')
            this.bottomLoad_reload()
        }
    },
    onLoad(event) {
        let that = this
        that.bottomLoad_reload()
        // console.log(u.dateFormat(new Date(1580468563000)))
    }
}
</script>
<style scoped>
.cus-item {
    padding: 10px 15px;
    overflow: hidden;
    border-bottom: 1upx solid #eee;
}
.cus-item-con {
    overflow: visible;
}
.cus-item-name {
    line-height: 25px;
    font-size: 14px;
}
.cus-item-time {
    line-height: 15px;
    color: #999;
    font-size: 12px;
}
</style>