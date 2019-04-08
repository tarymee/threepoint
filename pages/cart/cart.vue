<template>
    <div>
        <uni-number-box :min="1" :max="10000000000" :value="count"></uni-number-box>

    </div>
</template>
<style scoped>

</style>

<script>
import u from '@/common/util'
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
export default {
    components: {
        uniNumberBox
    },
    data() {
        return {
            count: 1000000
        }
    },
    methods: {
        test() {
            console.log('test')
        }
    },
    mounted() {
        var that = this

    },
    onLoad() {

    }
}
</script>