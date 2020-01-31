<template>
    
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            storeArr: []
        }
    },
    methods: {
        load() {
            var that = this
            u.request({
                url: u.api.applylist,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {},
                isVerifyLogin: true,
                success(res) {
                    console.log(res)

                    that.storeArr = u.dataTransform(res.applyinfo, {
                        logo: 'img',
                        discountPrice: 'discountPrice',
                        marketPrice: 'marketPrice',
                        title: 'title',
                        phone: 'phone',
                    })
                    that.storeArr.push({
                        img: res.logo
                    })

                    // that.img = res.logo

                }
            })
        }
    },
    onLoad() {
        this.load()
    }
}
</script>

<style scoped>


</style>
