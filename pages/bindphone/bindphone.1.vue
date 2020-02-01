<template>
    <div class="tt-form">
        <div class="tt-form__item">
            <div class="tt-form__item-l">手机号码</div>
            <div class="tt-form__item-r"><input type="number" v-model="phone" placeholder="11位手机号" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">验证码</div>
            <div class="tt-form__item-r"><input type="text" v-model="verification" placeholder="请输入验证码" /></div>
            <div class="tt-form__item-btn">获取验证码</div>
        </div>
        <a class="tt-form__btn" @click="save">绑定手机</a>
    </div>
</template>

<script>
import u from '@/common/util'

export default {
    components: {},
    data() {
        return {
            phone: '',
            verification: ''
        }
    },
    methods: {
        save() {
            let that = this
            if (!that.phone) {
                uni.showToast({
                    title: '请输入手机号码',
                    icon: 'none'
                })
                return false
            } else if (!that.verification) {
                uni.showToast({
                    title: '请输入验证码',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.bindphone,
                data: {
                    phone: that.phone,
                    verification: that.verification
                },
                isVerifyLogin: true,
                success(res) {
                    uni.showModal({
                        title: '提示',
                        content: '绑定成功',
                        showCancel: false,
                        success: function () {
                            that.back()
                        }
                    })
                }
            })
        }
    },
    onLoad(event) {
        console.log("bindphone onLoad")
        let that = this
        console.log(event)
        u.checkLogin()
    }
}
</script>