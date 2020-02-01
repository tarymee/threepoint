<template>

    <div class="tt-form">
        <div class="wh">
            <div class="wh-l">提现到</div>
            <div class="wh-r">
                <uni-icon color="#3baf33" class="" size="20" type="weixin" />
                <span style="margin-left: 5px">微信钱包</span>
            </div>
        </div>
        <div class="tt-form__item" style="border-bottom: none;">
            <div class="tt-form__item-l" style="width: 20px">￥</div>
            <div class="tt-form__item-r"><input type="number" v-model="getmoney" :placeholder="placeholder" /></div>
            <div class="tt-form__item-btn" @tap="allget()" style="color: #05a; background: #fff">全部提现</div>
        </div>
        <a class="tt-form__btn" @click="save">提现</a>
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
        placeholder() {
            return `可提现${this.leftmoney}元`
        }
    },
    data() {
        return {
            getmoney: '',
            leftmoney: '0'
        }
    },
    methods: {
        allget() {
            this.getmoney = this.leftmoney
        },
        save() {
            let that = this
            if (!that.getmoney) {
                uni.showToast({
                    title: '请输入提现金额',
                    icon: 'none'
                })
                return false
            } else if (Number(that.getmoney) <= 0) {
                uni.showToast({
                    title: '提现金额不能为0或负数',
                    icon: 'none'
                })
                return false
            } else if (Number(that.getmoney) > Number(that.leftmoney)) {
                uni.showToast({
                    title: '不能大于可提现金额',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.profitsave,
                data: {
                    money: that.getmoney
                },
                isVerifyLogin: true,
                success(res) {
                    if (res.code === 0) {
                        uni.showModal({
                            title: '操作成功',
                            // content: '提现金额已存入您的微信钱包',
                            content: '提现金额已进入后台审核',
                            showCancel: false,
                            success: function () {
                                that.back()
                            }
                        })
                    } else {
                        uni.showModal({
                            title: '操作失败',
                            content: '请重新提现',
                            showCancel: false,
                            success: function () {
                                // that.back()
                            }
                        })
                    }
                },
                fail(res) {
                    console.error(res)
                    uni.showModal({
                        title: '操作失败',
                        content: '请重新提现',
                        showCancel: false,
                        success: function () {
                            // that.back()
                        }
                    })
                }
            })
        },
        load() {
            var that = this
            u.request({
                url: u.api.profitincome,
                data: {},
                isVerifyLogin: true,
                success(res) {
                    console.log(res)
                    that.leftmoney = res.data.leftMoneyYan
                }
            })
        }
    },
    onLoad(event) {
        let that = this
        u.checkLogin()
        that.load()
    }
}
</script>