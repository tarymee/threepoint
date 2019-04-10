<template>
    <div class="checkbox" :class="isSelected ? 'checkbox--on' : ''"></div>
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
        isSelected: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        console.log('order-list mounted')
        let that = this
    },
    methods: {
        detail(id) {
            
        },
        pay(id) {
            
        },
        comfirm(id) {
            
        },
        express(id) {
            uni.navigateTo({
                url: '/pages/express/express?id=' + id
            })
        }
    }
}
</script>

<style scope>
@charset "UTF-8";
.checkbox{
    display: flex;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 1px solid #ccc;
    justify-content: center;
    align-items: center;
}
.checkbox--on::after{
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: #f60;
}
</style>