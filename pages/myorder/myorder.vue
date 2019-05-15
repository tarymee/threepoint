<template>
    <!-- 此页面废弃 -->
    <div>
        <orderList :orderArr="bottomLoad_data"></orderList>
        <tip :text="bottomLoad_tip" :none-icon="false"></tip>
    </div>
</template>
<script>
import u from '@/common/util'
import bottomLoad from '@/mixins/bottom-load.js'
import tip from '@/components/tip/tip.vue'
import orderList from '@/components/order-list/order-list.vue'
export default {
    components: {
        tip,
        orderList
    },
    mixins: [bottomLoad],
    data() {
        return {
            bottomLoad_type: 'order',
            bottomLoad_api: u.api.myorder,
            bottomLoad_params: {
                type: 'all'
            }
        }
    },
    methods: {
        test() {
            console.log('text')
            this.bottomLoad_reload()
        }
    },
    onLoad(event) {
        console.log("order onLoad")
        let that = this
        console.log(event)
        that.bottomLoad_params.type = event.type
        uni.setNavigationBarTitle({
            title: event.title
        })
        that.bottomLoad_reload()
    }
}
</script>
<style scoped>

</style>