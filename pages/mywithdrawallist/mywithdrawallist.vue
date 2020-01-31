<template>
    <div>
        <div class="withdrawal">
            <div class="withdrawal-item" v-for="(item, index) in bottomLoad_data" :key="index">
                <div class="withdrawal-item-con">
                    <div class="withdrawal-item-name">{{item.yuan}}</div>
                    <div class="withdrawal-item-time">{{item.createTime}}</div>
                </div>
                <div class="withdrawal-item-st">{{item.status == 0 ? '未审核' : '已审核'}}</div>
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
            bottomLoad_api: u.api.profitlog,
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
.withdrawal-item {
    padding: 10px 15px;
    overflow: hidden;
    border-bottom: 1upx solid #eee;
}
.withdrawal-item-con {
    float: left;
}
.withdrawal-item-name {
    line-height: 25px;
    font-size: 14px;
}
.withdrawal-item-time {
    line-height: 15px;
    color: #999;
    font-size: 12px;
}
.withdrawal-item-st {
    float: right;
    line-height: 40px;
    font-size: 14px;
    color: #f60;
}
</style>