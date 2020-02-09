<template>
    <div class="do">
        <div class="do-tit">{{title}}</div>
        <div class="do-con">
            <rich-text :nodes="htmlString"></rich-text>
        </div>
    </div>
</template>
<style scoped>
.do{
    padding: 15px;
}
.do-tit {
    font-size: 16px;
    font-weight: bold;
}
.do-con {
    line-height: 1.6;
    padding: 15px 0;
    overflow: hidden;
    font-size: 14px;
    color: #333;
}
.do-con rich-text {
    overflow: hidden;
    width: 100%;
}
</style>

<script>
import u from "@/common/util"
export default {
    components: {},
    data() {
        return {
            title: '',
            id: '',
            htmlString: ''
        }
    },
    methods: {
        test() {
            console.log('test')
        }
    },
    onLoad(event) {
        var that = this

        that.title = event.title
        that.id = event.id

        uni.setNavigationBarTitle({
            title: that.title
        })

        u.request({
            url: u.api.dolistdetail + that.id,
            data: {},
            isVerifyLogin: true,
            success(res) {
                console.log(res)
                if (res && res.data) {
                    that.title = res.data.title
                    uni.setNavigationBarTitle({
                        title: that.title
                    })
                    that.htmlString = res.data.content.replace(/<img/g, "<img width=\"100%;\" style=\"max-width:100%;height:auto\"")
                }
            }
        })
    }
}
</script>