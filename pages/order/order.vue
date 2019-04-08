<template>
    <div>
        <orderList></orderList>
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
            bottomLoad_api: u.api.index,
            bottomLoad_params: {
                id: '123456'
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
        that.bottomLoad_params.id = event.id
        uni.setNavigationBarTitle({
            title: event.title
        })
    }
}
</script>
<style scoped>

</style>