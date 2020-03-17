<template>
    <div>
        <div class="cus">
            <div class="cus-item" v-for="(item, index) in bottomLoad_data" :key="index">
                <image class="cus-item-img" :src="item.avatarUrl" mode="aspectFill"></image>
                <div class="cus-item-con">
                    <div class="cus-item-name">
                        {{item.nickName}}
                        <div class="cus-item-time">
                            {{item.createTime}}
                        </div>
                    </div>
                    <div class="cus-item-btnwrap">
                        <div class="cus-item-btn" @click="jump(`/pages/mywithdrawalorder/mywithdrawalorder?usertoken=${item.openid}&username=${item.nickName}`)">订单记录</div>
                        <div class="cus-item-btn" style="background-color:#16a656;" @click="jump(`/pages/mywithdrawamessage/mywithdrawamessage?usertoken=${item.openid}&username=${item.nickName}`)">聊天消息</div>
                    </div>
                </div>
            </div>
        </div>
        <tip :text="bottomLoad_tip" :none-icon="noneIcon"></tip>
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
            bottomLoad_api: u.api.team,
            bottomLoad_params: {}
        }
    },
    computed: {
        noneIcon () {
            let that = this
            return that.bottomLoad_data.length ? false : true
        }
    },
    methods: {
        test() {
            console.log('text')
            this.bottomLoad_reload()
        }
    },
    onLoad(event) {
        let that = this
        that.bottomLoad_reload()
        // console.log(u.dateFormat(new Date(1580468563000)))
    }
}
</script>
<style scoped>
.cus-item {
    padding: 10px 15px;
    overflow: hidden;
    border-bottom: 1upx solid #eee;
}
.cus-item-img {
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
}
.cus-item-con {
    overflow: visible;
}
.cus-item-name {
    line-height: 25px;
    font-size: 14px;
    overflow: hidden;
    float: left;
}
.cus-item-time {
    line-height: 15px;
    color: #999;
    font-size: 12px;
    overflow: hidden;
}
.cus-item-btnwrap {
    float: right;
}
.cus-item-btn {
    float: right;
    color: #ffffff;
    background-color: #ff5d5d;
    border-radius: 13px;
    padding: 0 8px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    margin-left: 10px;
    margin-top: 7px;
}


</style>