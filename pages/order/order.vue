<template>
    <div class="">
        <div class="cate1 cate1--fixed">
            <scroll-view scroll-x>
                <a class="cate1__item" style="width: 16.666%; margin: 0" :class="item.select ? 'cate1__item--cur' : ''" v-for="(item, index) in cate1Arr" :key="index" @click="reloadOrder(item.type)">
                    <text>{{item.title}}</text>
                </a>
            </scroll-view>
        </div>
        <div class="" style="height: 35px;"></div>
        <orderList :orderArr="bottomLoad_data"></orderList>
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
            cate1Arr: [
                {
                    title: '全部',
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
                },
                {
                    title: '已完成',
                    type: 'done'
                },
                {
                    title: '退换货',
                    type: ' return'
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
        // console.log("order onShow")
        // let that = this
        // that.bottomLoad_reload()
    }
}
</script>
<style scoped>

</style>