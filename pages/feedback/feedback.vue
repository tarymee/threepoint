<template>
    <div class="tt-form">
        <div class="tt-form__textarea">
            <textarea v-model="suggestion" maxlength="-1" placeholder="留下您宝贵的意见 让我们做得更好" />
        </div>
        <a class="tt-form__tf" @click="save">提交意见</a>
    </div>
</template>

<script>
import u from '@/common/util'

export default {
    components: {},
    data() {
        return {
            suggestion: ''
        }
    },
    methods: {
        save() {
            let that = this
            console.log(that.suggestion)
            if (!that.suggestion) {
                uni.showToast({
                    title: '请先填写意见',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.feedback,
                data: {
                    suggestion: that.suggestion
                },
                isVerifyLogin: true,
                success(res) {
                    uni.showModal({
                        title: '提示',
                        content: '提交成功',
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
        console.log("feedback onLoad")
        let that = this
        u.checkLogin()
    }
}
</script>