<template>
    <div class="tt-form">
        <div class="tt-form__tit">个人信息</div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">姓名</div>
            <div class="tt-form__item-r"><input type="text" v-model="address.name" placeholder="姓名" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">手机号码</div>
            <div class="tt-form__item-r"><input type="number" v-model="address.phone" placeholder="11位手机号" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">选择地区</div>
            <div class="tt-form__item-r"><input type="text" v-model="address.region" placeholder="地区信息" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">详细地址</div>
            <div class="tt-form__item-r"><input type="text" v-model="address.street" placeholder="街道门牌信息" /></div>
        </div>
        <div class="tt-form__tit">短信验证</div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">手机号码</div>
            <div class="tt-form__item-r"><input type="number" v-model="phone" placeholder="11位手机号" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">验证码</div>
            <div class="tt-form__item-r"><input type="text" v-model="verification" placeholder="请输入验证码" /></div>
            <div class="tt-form__item-btn">获取验证码</div>
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
            address: {},
            phone: '',
            verification: ''
        }
    },
    methods: {
        save() {
            let that = this
            console.log(that.address)
            if (!that.address.name) {
                uni.showToast({
                    title: '请先填写姓名',
                    icon: 'none'
                })
                return false
            } else if (!that.address.phone) {
                uni.showToast({
                    title: '请先填写手机号码',
                    icon: 'none'
                })
                return false
            } else if (!that.address.region) {
                uni.showToast({
                    title: '请先填写地区信息',
                    icon: 'none'
                })
                return false
            } else if (!that.address.street) {
                uni.showToast({
                    title: '请先填写详细地址',
                    icon: 'none'
                })
                return false
            } else if (!that.phone) {
                uni.showToast({
                    title: '请先填写手机号码',
                    icon: 'none'
                })
                return false
            } else if (!that.verification) {
                uni.showToast({
                    title: '请先填写验证码',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: `${u.api.host}/api/applystore`,
                method: 'POST',
                data: {
                    name: that.address.name,
                    phone: that.address.phone,
                    region: that.address.region,
                    street: that.address.street,
                    detail: that.address.detail,
                    verification: that.verification,
                },
                isVerifyLogin: true,
                isShowLoading: true,
                isShowError: true,
                success(res) {
                    uni.showModal({
                        title: '提示',
                        content: '申请成功',
                        showCancel: false,
                        success: function () {
                            uni.navigateBack()
                        }
                    })
                },
                fail(res) {
                    console.error(res)
                }
            })
        }
    },
    mounted() {
        let that = this
    },
    onLoad(event) {
        console.log("address onLoad")
        let that = this
        console.log(event)
    }
}
</script>