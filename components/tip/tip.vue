<template>
    <div class="tip" @click="onClick">
        <img src="/static/img/none.png" class="tip__img" v-if="noneIcon === 'true' || noneIcon === true" />
        <div class="tip__text">{{text}}</div>
    </div>
</template>

<script>
export default {
    name: "tip",
    components: {},
    data() {
        return {}
    },
    props: {
        text: {
            type: String,
            default: '暂无数据'
        },
        noneIcon: {
            type: [Boolean, String],
            default: false
        }
    },
    mounted() {
        console.log('tip mounted')
        let that = this
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>

<style scope>
@charset "UTF-8";
.tip {
    padding: 15px 0;
}
.tip__img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0px auto;
}
.tip__text {
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 1.5;
}
</style>