<template>
    <div>
        <!-- <rich-text :nodes="htmlString"></rich-text> -->
        <div class="con">
            <image src="/static/img/about/01.jpg" mode="aspectFill" style="height: 788upx"></image>
            <image src="/static/img/about/02.jpg" mode="aspectFill" style="height: 1476upx"></image>
            <image src="/static/img/about/03.jpg" mode="aspectFill" style="height: 854upx"></image>
            <image src="/static/img/about/04.jpg" mode="aspectFill" style="height: 2264upx"></image>
            <image src="/static/img/about/05.jpg" mode="aspectFill" style="height: 300upx"></image>
        </div>
    </div>
</template>
<style scoped>
.con image {
    width: 750upx;
}
</style>

<script>
export default {
    components: {},
    data() {
        return {
            htmlString: ''
        }
    },
    methods: {
        test() {
            console.log('test')
        }
    },
    onLoad() {
        console.log('about onLoad')
        var that = this
        that.htmlString = '<p><img style="width:100%" src="/static/img/about/01.jpg" /></p><p><img style="width:100%" src="/static/img/about/02.jpg" /></p><p><img style="width:100%" src="/static/img/about/03.jpg" /></p><p><img style="width:100%" src="/static/img/about/04.jpg" /></p><p><img style="width:100%" src="/static/img/about/05.jpg" /></p>'
    }
}
</script>