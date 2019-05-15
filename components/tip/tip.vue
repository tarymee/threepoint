<template>
    <div class="tip" :class="noneIcon ? 'tip--noneicon' : ''" @click="onClick">
        <img src="/static/img/none.png" class="tip__img" v-if="noneIcon" />
        <div class="tip__text">{{text}}</div>
    </div>
    <!--  :class="noneicon === 'true' ? 'tip--noneicon' : ''" -->
    <!-- <div class="tip" :class="noneicon === 'true' ? 'tip--noneicon' : ''" @click="onClick">
        <img src="/static/img/none.png" class="tip__img" v-if="noneicon === 'true'" />
        <div class="tip__text">{{text}}</div>
    </div> -->
</template>

<script>
export default {
    name: "tip",
    components: {},
    data() {
        return {}
    },
    watch: {
        noneIcon (val) {
            console.log('wartch noneIcon', val)
        },
        text(val) {
            console.log('wartch text9999', val)
        },
        noneicon(val) {
            console.log('wartch noneicon', val)
        }
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        noneicon: {
            type: String,
            default: 'false'
        },
        noneIcon: {
            type: Boolean,
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
.tip--noneicon {
    padding: 100px 0;
}
.tip__img {
    display: block;
    width: 80px;
    height: 80px;
    margin: 0px auto;
}
.tip__text {
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 1.5;
}
</style>