<template>
    <div>
        <productList :productArr="bottomLoad_data"></productList>
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
            bottomLoad_api: u.api.list,
            bottomLoad_params: {
                category_id: '',
                type: '',
                search: '',
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
        that.bottomLoad_params.category_id = event.id
        that.bottomLoad_params.type = event.type
        that.bottomLoad_params.search = event.search
        uni.setNavigationBarTitle({
            title: event.title
        })
        that.bottomLoad_reload()
    }
}
</script>
<style scoped>

</style>