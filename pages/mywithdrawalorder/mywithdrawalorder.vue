<template>
    <div class="">
        <orderList :orderArr="bottomLoad_data" readonly="true"></orderList>
        <tip :text="bottomLoad_tip" :none-icon="noneIcon"></tip>
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
            bottomLoad_api: u.api.teamorder,
            bottomLoad_params: {
                usertoken: ''
            }
        }
    },
    computed: {
        noneIcon () {
            let that = this
            return that.bottomLoad_data.length ? false : true
        }
    },
    methods: {
        // test() {
        //     console.log('text')
        //     this.bottomLoad_reload()
        // },
        reloadOrder(usertoken) {
            let that = this
            that.bottomLoad_params.usertoken = usertoken
            that.bottomLoad_reload()
        }
    },
    onLoad(event) {
        console.log("order onLoad")
        let that = this
        console.log(event)
        that.reloadOrder(event.usertoken)
        uni.setNavigationBarTitle({
            title: event.username + '的订单'
        })
    },
    onShow() {
        // console.log("order onShow")
        // let that = this
        // that.bottomLoad_reload()
    }
}
</script>
<style scoped>

</style>