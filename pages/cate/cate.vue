<template>
    <div>
        <productList :data="bottomLoad_data"></productList>
        <tip :text="bottomLoad_tip" :none-icon="false"></tip>
    </div>
</template>
<script>
import u from '@/common/util'
import bottomLoad from '@/mixins/bottom-load.js'
import tip from '@/components/tip/tip.vue'
import productList from '@/components/product-list/product-list.vue'
export default {
    components: {
        tip,
        productList
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

</style>