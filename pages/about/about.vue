<template>
    <div>
        <rich-text :nodes="htmlString"></rich-text>
    </div>
</template>
<style scoped>

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
    mounted() {
        console.log('about mounted')
        var that = this
        that.htmlString = '<p><img style="width:100%" src="/static/img/about/01.jpg" /></p><p><img style="width:100%" src="/static/img/about/02.jpg" /></p><p><img style="width:100%" src="/static/img/about/03.jpg" /></p><p><img style="width:100%" src="/static/img/about/04.jpg" /></p><p><img style="width:100%" src="/static/img/about/05.jpg" /></p>'
    }
}
</script>