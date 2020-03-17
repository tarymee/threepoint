<template>
    <div class="">
        <view class="auth" v-if="isapply">
            <view class="auth__th">
                <view class="auth__th-avt">
                    <open-data class="" type="userAvatarUrl"></open-data>
                </view>
            </view>
            <view class="auth__title">尊敬的{{apply.name}} 您已成功申请开店</view>
            <view class="auth__subtitle">申请店铺 {{apply.title}}</view>
            <view class="auth__subtitle">支付金额 {{apply.price}}</view>
            <view class="auth__subtitle">申请地址 {{apply.region[0]}} {{apply.region[1]}} {{apply.region[2]}} {{apply.detail}}</view>
            <view class="auth__title" style="margin: 10px 0 20px;">我们将会联系您 一同筹划开店事宜</view>
            <button type="primary" @click="back">确认返回</button>
        </view>
        <div class="tt-form" v-if="!isapply">
            <div class="tt-form__tit">个人信息</div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">姓名</div>
                <div class="tt-form__item-r"><input type="text" v-model="apply.name" placeholder="姓名" /></div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">身份证号</div>
                <div class="tt-form__item-r"><input type="text" v-model="apply.idcard" placeholder="身份证号" /></div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">手机号码</div>
                <div class="tt-form__item-r"><input type="number" v-model="apply.phone" placeholder="11位手机号" /></div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">选择地区</div>
                <div class="tt-form__item-r">
                    <picker mode="region" @change="bindRegionChange" :value="apply.region">
                        <view class="tt-form__item-r-text" v-if="apply.region.length">{{apply.region[0]}} {{apply.region[1]}} {{apply.region[2]}}</view>
                        <view class="tt-form__item-r-text--placeholder" v-else>选择省 市 区</view>
                    </picker>
                </div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">详细地址</div>
                <div class="tt-form__item-r"><input type="text" v-model="apply.detail" placeholder="街道门牌信息" /></div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">申请店铺</div>
                <div class="tt-form__item-r"><input type="text" v-model="apply.title" placeholder="支付金额" disabled /></div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">支付金额</div>
                <div class="tt-form__item-r"><input type="text" v-model="apply.price" placeholder="支付金额" disabled /></div>
            </div>
            <div class="tt-form__item">
                <div class="tt-form__item-l">支付方式</div>
                <div class="tt-form__item-r">
                    <picker @change="bindPickerChange" v-model="apply.payType" :range="pattypeArr">
                        <view class="tt-form__item-r-text">{{pattypeArr[apply.payType]}}</view>
                    </picker>
                </div>
            </div>
            <a class="tt-form__tf" @click="save">提交申请</a>
        </div>
    </div>
</template>


<script>
import u from '@/common/util'

export default {
    components: {},
    data() {
        return {
            isapply: false,
            pattypeArr: ['微信支付', '其他方式'],
            apply: {
                name: '',
                phone: '',
                idcard: '',
                region: [],
                detail: '',
                price: '',
                applyInfoId: '',
                title: '',
                payType: '0',
            }
        }
    },
    methods: {
        bindRegionChange(e) {
            console.log(e)
            this.apply.region = e.target.value
        },
        bindPickerChange(e) {
            console.log(e)
            this.apply.payType = e.target.value
        },
        save() {
            let that = this
            console.log(that.apply)

            if (!that.apply.name) {
                uni.showToast({
                    title: '请先填写姓名',
                    icon: 'none'
                })
                return false
            } else if (!that.apply.idcard) {
                uni.showToast({
                    title: '请先填写身份证号',
                    icon: 'none'
                })
                return false
            } else if (!that.apply.phone) {
                uni.showToast({
                    title: '请先填写手机号码',
                    icon: 'none'
                })
                return false
            } else if (!that.apply.region || !that.apply.region.length) {
                uni.showToast({
                    title: '请先选择地区信息',
                    icon: 'none'
                })
                return false
            } else if (!that.apply.detail) {
                uni.showToast({
                    title: '请先填写详细地址',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.apply,
                data: {
                    name: that.apply.name,
                    phone: that.apply.phone,
                    idcard: that.apply.idcard,
                    region: JSON.stringify(that.apply.region),
                    detail: that.apply.detail,
                    applyInfoId: that.apply.applyInfoId,
                    price: that.apply.price,
                    payType: that.apply.payType,
                },
                isVerifyLogin: true,
                success(res) {
                    console.log(res)
                    res = res.data
                    if (res && res.code == 1) {
                        if (that.apply.payType == '0') {
                            let payment = res.payment
                            wx.requestPayment({
                                timeStamp: payment.timeStamp,
                                nonceStr: payment.nonceStr,
                                package: 'prepay_id=' + payment.prepay_id,
                                signType: 'MD5',
                                paySign: payment.paySign,
                                success: function (paymentRes) {
                                    console.log(paymentRes)
                                    uni.showModal({
                                        title: '支付成功',
                                        content: '我们将会联系您 一同筹划开店事宜',
                                        showCancel: false,
                                        success: function () {
                                            that.back()
                                        }
                                    })
                                },
                                fail: function () {
                                    uni.showToast({
                                        title: '未支付',
                                        mask: true,
                                        duration: 3000,
                                        success: function () {

                                        }
                                    })
                                }
                            })
                        } else {
                            uni.showModal({
                                title: '申请成功',
                                content: '我们将会联系您 一同筹划开店事宜',
                                showCancel: false,
                                success: function () {
                                    that.back()
                                }
                            })
                        }
                    }

                }
            })
        }
    },
    onLoad(event) {
        console.log("applystore onLoad")
        let that = this
        console.log(event)
        that.apply.price = event.price
        that.apply.applyInfoId = event.storeid
        that.apply.title = event.title

        u.request({
            url: u.api.applyuser,
            data: {
                applyInfoId: that.apply.applyInfoId
            },
            isVerifyLogin: true,
            success(res) {
                console.log(res)
                if (res.code == 1) {
                    that.isapply = true
                    that.apply.name = res.applyUser.name
                    that.apply.idcard = res.applyUser.idcard
                    that.apply.phone = res.applyUser.phone
                    that.apply.price = res.applyUser.price
                    that.apply.region = JSON.parse(res.applyUser.region)
                    that.apply.detail = res.applyUser.address
                    that.apply.payType = res.applyUser.payType
                    that.apply.applyInfoId = res.applyUser.applyInfoId
                    that.apply.title = res.applyInfo.title
                } else {
                    that.isapply = false
                }
            }
        })


    }
}
</script>

<style scoped>
.auth {
    padding: 30px 20px 0;
}
.auth__th {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1upx solid #e3e3e3;
    text-align: center;
}
.auth__th-avt {
    width: 90px;
    height: 90px;
    border: 2px solid #fff;
    margin: 0 auto 0;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 0px 5px rgba(50, 50, 50, 0.3);
}
.auth__title {
    color: #585858;
    font-size: 18px;
    margin-bottom: 10px;
}
.auth__subtitle {
    font-size: 16px;
    color: #888;
    /* margin-bottom: 40px; */
}
</style>
