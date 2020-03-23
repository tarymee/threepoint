<template>
    <div class="meswrap">
        <div class="mes">
            <div class="mes-item" :class="item.fromuser === mytoken ? 'mes-item-r' : ''" v-for="(item, index) in bottomLoad_data" :key="index" v-if="item.text">
                <image class="mes-item-img" :src="item.fromuserLogo" mode="aspectFill"></image>
                <div class="mes-item-con">{{item.text}}</div>
            </div>
        </div>
        <tip :text="bottomLoad_tip"></tip>
    </div>
</template>
<script>
import u from '@/common/util'
import bottomLoad from '@/mixins/bottom-load.js'
import tip from '@/components/tip/tip.vue'
export default {
    components: {
        tip
    },
    mixins: [bottomLoad],
    data() {
        return {
            mytoken: '',
            bottomLoad_api: u.api.msghistory,
            bottomLoad_params: {}
        }
    },
    computed: {
        // noneIcon () {
        //     let that = this
        //     return that.bottomLoad_data.length ? false : true
        // }
    },
    methods: {
        test() {
            console.log('text')
            this.bottomLoad_reload()
        }
    },
    onLoad(event) {
        let that = this

        this.mytoken = uni.getStorageSync('token')
        console.log(event.usertoken)
        that.bottomLoad_params.usertoken = event.usertoken
        that.bottomLoad_reload()
        uni.setNavigationBarTitle({
            title: event.username + '的聊天消息'
        })
    }
}
</script>
<style scoped>
.meswrap {
    background-color: #e8e9e8;
    min-height: 100vh;
}
.mes {
    padding: 10px 0;
}
.mes-item {
    padding: 10px 70px 10px 15px;
    overflow: hidden;
}
.mes-item-img {
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    margin: 0 15px 0 0;
}
.mes-item-con {
    float: left;
    overflow: hidden;
    line-height: 25px;
    font-size: 14px;
    border-radius: 3px;
    padding: 5px 10px;
    background-color: #fff;
}

.mes-item-r {
    padding: 10px 15px 10px 70px;
    overflow: hidden;
}
.mes-item-r .mes-item-img {
    float: right;
    margin: 0 0 0 15px;
    margin-left: 15px;
}
.mes-item-r .mes-item-con {
    float: right;
    background-color: #88ee57;
}

</style>