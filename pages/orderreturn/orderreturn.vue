<template>


        <div class="tt-form">
            <div class="tt-form__tit">退货/退款</div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">订单编码</div>
                <div class="tt-form__item-r"><input type="text" v-model="order_no" placeholder="订单编码" disabled /></div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">退款原因</div>
                <div class="tt-form__item-r">
                    <picker @change="bindPickerChange" v-model="reasonindex" :range="returntypeArr">
                        <view class="tt-form__item-r-text" v-if="reasonindex">{{returntypeArr[reasonindex]}}</view>
                        <view class="tt-form__item-r-text--placeholder" v-if="!reasonindex">请选择</view>
                    </picker>
                </div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">退款金额</div>
                <div class="tt-form__item-r"><input type="text" v-model="price" placeholder="退款金额" disabled /></div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">退款说明</div>
                <div class="tt-form__item-r"><input type="text" v-model="desc" placeholder="退款说明" /></div>
            </div>
            <a class="tt-form__tf" @click="save">提交申请</a>
        </div>

</template>


<script>
import u from '@/common/util'

export default {
    components: {},
    data() {
        return {
            order_id: '',
            order_no: '',
            reasonindex: '',
            reason: '',
            price: '',
            desc: '',
            returntypeArr: ['拍错/多拍/不想要', '协商一致退款', '其他'],
            returntypeObj: [
                {
                    key: '拍错/多拍/不想要',
                    text: '拍错/多拍/不想要'
                },
                {
                    key: '协商一致退款',
                    text: '协商一致退款'
                },
                {
                    key: '其他',
                    text: '其他'
                },
            ]
        }
    },
    methods: {
        bindPickerChange(e) {
            console.log(e)
            this.reasonindex = e.target.value
            this.reason = this.returntypeObj[this.reasonindex].key
            console.log(this.reason)
        },
        save() {
            let that = this
            if (!that.reason) {
                uni.showToast({
                    title: '请先选择退款原因',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.orderback,
                data: {
                    order_id: that.order_id,
                    reason: that.reason,
                    price: that.price,
                    desc: that.desc,
                },
                isVerifyLogin: true,
                success(res) {
                    // console.log(res)
                    if (res && res.code == 1) {
                        uni.showModal({
                            title: '申请成功',
                            content: '请及时退货',
                            showCancel: false,
                            success: function () {
                                that.back()
                            }
                        })
                    } else {
                        uni.showModal({
                            title: '操作失败',
                            content: res.msg,
                            showCancel: false,
                            success: function () {
                                // that.back()
                            }
                        })
                    }

                }
            })
        }
    },
    onLoad(event) {
        console.log("applystore onLoad")
        let that = this
        console.log(event)
        that.order_id = event.order_id
        that.order_no = event.order_no
        that.price = event.price

    }
}
</script>

<style scoped>

</style>
