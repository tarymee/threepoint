<template>
    <view class="auth">
        <view class="auth__th">
            <view class="auth__th-avt">
                <open-data class="" type="userAvatarUrl"></open-data>
            </view>
        </view>
        <view class="auth__title">三分联盟 申请以下权限</view>
        <view class="auth__subtitle">获得你的公开信息（昵称、头像等）</view>
        <div class="auth__btnwrap">
            <button type="" @click="back" class="auth__btnwrap-btn1">暂不登录</button>
            <button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="authorLogin" class="auth__btnwrap-btn2">授权登录</button>
        </div>
    </view>
</template>
<script>
import u from "@/common/util"
export default {
    components: {},
    data() {
        return {
            test: ''
        }
    },
    methods: {
        back() {
            // console.log(111)
            u.back()
        },
        authorLogin(e) {
            let that = this
            if (e.detail.errMsg !== 'getUserInfo:ok') {
                return false
            }
            let userInfo = e.detail
            console.log(userInfo)

            // return false

            uni.showLoading({
                title: '正在授权登录...',
                mask: true
            })
            uni.login({
                success(result) {
                    console.log(result)
                    let postData = {
                        code: result.code,
                        user_info: userInfo.rawData,
                        encrypted_data: userInfo.encryptedData,
                        iv: userInfo.iv,
                        signature: userInfo.signature
                    }
                    let scene = uni.getStorageSync('scene')
                    if (scene) {
                        postData.scene = scene
                    }
                    u.request({
                        url: u.api.wxlogin,
                        data: postData,
                        isVerifyLogin: false,
                        isShowLoading: false,
                        success: function (res) {
                            uni.hideLoading()
                            if (res.code === 1) {
                                console.log(res)
                                uni.showToast({
                                    title: '授权登录成功',
                                    mask: true,
                                    duration: 5000,
                                    success: function () {
                                        // 保存用户信息
                                        uni.setStorageSync('code', result.code)
                                        uni.setStorageSync('token', res.data.token)
                                        uni.setStorageSync('userid', res.data.user_id)
                                        uni.setStorageSync('userInfo', userInfo.userInfo)
                                        // 返回
                                        that.back()
                                    }
                                })
                            } else {
                                uni.showToast({
                                    title: '登录不成功 请重新登录',
                                    mask: true,
                                    icon: 'none',
                                    duration: 5000
                                })
                            }
                        },
                        fail: function (res) {
                            console.error(res)
                            uni.hideLoading()
                        }
                    })
                }
            })
        }
    },
    onLoad() {
        console.log('login onLoad')
        var that = this
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
    margin-bottom: 40px;
}
.auth__btnwrap {
    overflow: hidden;
}
.auth__btnwrap-btn1 {
    width: 48%;
    float: left;
}
.auth__btnwrap-btn2 {
    width: 48%;
    float: right;
}
</style>