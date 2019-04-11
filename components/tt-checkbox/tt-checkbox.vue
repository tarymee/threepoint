<template>
    <div class="tt-checkbox" :class="checked ? 'tt-checkbox--on' : ''"></div>
    <!-- <div class="tt-checkbox" :class="checked ? 'tt-checkbox--on' : ''" @click="onClick"></div> -->
</template>
<script>
export default {
    name: "tt-checkbox",
    components: {},
    data() {
        return {
        }
    },
    props: {
        checked: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        console.log('tt-checkbox mounted')
        let that = this
    },
    methods: {
        onClick() {
            this.checked = !this.checked
            this.$emit('click', this.checked)
        }
    }
}
</script>

<style scope>
@charset "UTF-8";
.tt-checkbox{
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 1px solid #333;
    overflow: hidden;
}
.tt-checkbox--on::after{
    content: "";
    display: block;
    margin: 3px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: #f60;
}
</style>