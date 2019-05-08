<template>
    <div>
        <div class="cate1 cate1--fixed">
            <scroll-view scroll-x>
                <a class="cate1__item" style="width: 25%; margin: 0" :class="item.select ? 'cate1__item--cur' : ''" v-for="(item, index) in cate1Arr" :key="index" @click="reloadOrder(item.type)">
                    <text>{{item.title}}</text>
                </a>
            </scroll-view>
        </div>
        <div class="" style="height: 35px;"></div>
        <orderList :orderArr="bottomLoad_data"></orderList>

        <tip :text="bottomLoad_tip" :none-icon="false" v-if="bottomLoad_data.length!=0"></tip>

        <div style="padding: 100px 0;" v-if="bottomLoad_data.length==0">
            <tip :text="bottomLoad_tip" :none-icon="true"></tip>
        </div>

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
            cate1Arr: [
                {
                    title: '全部订单',
                    // select: true,
                    type: ''
                },
                {
                    title: '待付款',
                    type: 'payment'
                },
                {
                    title: '待发货',
                    type: 'delivery'
                },
                {
                    title: '待收货',
                    type: 'received'
                }
            ],
            bottomLoad_type: 'order',
            bottomLoad_api: u.api.orderlist,
            bottomLoad_params: {
                // 类型
                // 所有: ''
                // payment
                // delivery
                // received
                dataType: ''
            }
        }
    },
    methods: {
        // test() {
        //     console.log('text')
        //     this.bottomLoad_reload()
        // },
        reloadOrder(type) {
            let that = this
            let title = ''
            that.cate1Arr.forEach((item, i) => {
                if (type === item.type) {
                    item.select = true
                    title = item.title
                } else {
                    item.select = false
                }
            })
            that.bottomLoad_params.dataType = type
            uni.setNavigationBarTitle({
                title: title
            })
            that.bottomLoad_reload()
        }
    },
    onLoad(event) {
        console.log("order onLoad")
        let that = this
        console.log(event)
        that.reloadOrder(event.type)
    },
    onShow() {
        console.log("order onShow")
        let that = this
        that.bottomLoad_reload()
    }
}
</script>
<style scoped>

</style>