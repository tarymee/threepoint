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
                <div class="tt-form__item-r"><input type="text" v-model="text" placeholder="退款说明" /></div>
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
            isapply: false,
            order_id: '',
            order_no: '',
            order: null,
            reasonindex: '',
            reason: '',
            price: '',
            text: '',
            returntypeArr: ['拍错/多拍/不想要', '协商一致退款', '其他'],
            returntypeObj: [
                {
                    key: '100',
                    text: '拍错/多拍/不想要'
                },
                {
                    key: '200',
                    text: '协商一致退款'
                },
                {
                    key: '300',
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
            console.log(that.apply)

            if (!that.reason) {
                uni.showToast({
                    title: '请先选择退款原因',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.apply,
                data: {
                    order_id: that.order_id,
                    reason: that.reason,
                    price: that.price,
                    text: that.text,
                },
                isVerifyLogin: true,
                success(res) {
                    console.log(res)
                    res = res.data
                    if (res && res.code == 1) {
                        uni.showModal({
                            title: '申请成功',
                            content: '请及时退货',
                            showCancel: false,
                            success: function () {
                                that.back()
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

        u.request({
            url: u.api.orderdetail,
            data: {
                order_id: that.order_id
            },
            isVerifyLogin: true,
            isShowLoading: true,
            isShowError: true,
            success(res) {
                console.log(res)
                if (res && res.code == 1 && res.data && res.data.order) {
                    res = res.data.order

                    let order = {
                        order_id: res.order_id,
                        order_no: res.order_no,
                        create_time: res.create_time,
                        pay_time: res.pay_time,
                        delivery_time: res.delivery_time,
                        receipt_time: res.receipt_time,
                        status: res.status,
                        order_total_price: res.total_price,
                        express_price: res.express_price,
                        order_pay_price: res.pay_price,
                        totalcount: res.goods.length,
                        pay_status: res.pay_status,
                        delivery_status: res.delivery_status,
                        receipt_status: res.receipt_status,
                        order_status: res.order_status,
                        detail: []
                    }
                    res.goods.forEach((item, i) => {
                        order.detail.push({
                            goods_id: item.goods_id,
                            img: item.image.file_path,
                            count: item.total_num,
                            price: item.goods_price,
                            specTip: item.goods_attr,
                            name: item.goods_name
                        })
                    })
                    that.order = order
                }
            }
        })


    }
}
</script>

<style scoped>

</style>
