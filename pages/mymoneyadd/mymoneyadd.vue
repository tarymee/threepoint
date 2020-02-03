<template>

    <div class="tt-form">
        <div class="wh">
            <div class="wh-l">充值到</div>
            <div class="wh-r">
                <uni-icon color="#f00" class="" size="20" type="email" />
                <span style="margin-left: 5px">我的余额</span>
            </div>
        </div>
        <div class="tt-form__item" style="border-bottom: none;">
            <div class="tt-form__item-l" style="width: 20px">￥</div>
            <div class="tt-form__item-r"><input type="number" v-model="money" placeholder="请输入充值金额" /></div>
        </div>
        <a class="tt-form__btn" @click="save">充值</a>
    </div>
</template>
<style scoped>
.wh {
    overflow: hidden;
    border-bottom: 1px solid #eee;
    line-height: 50px;
    margin-bottom: 15px;
}
.wh-l {
    float: left;
}
.wh-r {
    float: right;
}
</style>
<script>
import u from '@/common/util'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
    components: {
        uniIcon
    },
    computed: {

    },
    data() {
        return {
            money: '',
        }
    },
    methods: {
        save() {
            let that = this
            if (!that.money) {
                uni.showToast({
                    title: '请输入充值金额',
                    icon: 'none'
                })
                return false
            } else if (Number(that.money) <= 0) {
                uni.showToast({
                    title: '充值金额不能为0或负数',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.moneysave,
                data: {
                    money: that.money,
                    type: 2
                },
                isVerifyLogin: true,
                success(res) {
                    if (res.data && res.data.payment) {
                        u.wechatPay({
                            payment: res.data.payment,
                            success: function (paymentRes) {
                                uni.showModal({
                                    title: '操作成功',
                                    content: '充值金额已加入到您的余额！',
                                    showCancel: false,
                                    success: function () {
                                        that.back()
                                    }
                                })
                            },
                            fail: function () {
                                uni.showToast({
                                    title: '操作失败',
                                    mask: true,
                                    duration: 3000
                                })
                            }
                        })
                    }
                }
            })
        }
    },
    onLoad(event) {
        let that = this
        u.checkLogin()
    }
}
</script>