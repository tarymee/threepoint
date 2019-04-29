<template>
    <view class="container">
    <view class="wechatapp">
        <!-- <image class="header" src="/images/wechatapp.png"></image> -->
        <view class="header">
        <open-data class="" type="userAvatarUrl"></open-data>
        </view>
    </view>
    <view class="auth-title">申请获取以下权限</view>
    <view class="auth-subtitle">获得你的公开信息（昵称、头像等）</view>
    <button type="primary" open-type="getUserInfo" @getuserinfo="authorLogin">授权登录</button>
    <button type="primary" open-type='getPhoneNumber' @getphonenumber="getPhoneNumber">获取用户手机号</button>
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
        getPhoneNumber(e) {
            console.log(e)
        },
        authorLogin(e) {
            if (e.detail.errMsg !== 'getUserInfo:ok') {
                return false
            }
            let userInfo = e.detail
            console.log(userInfo)

            uni.showLoading({
                title: '正在授权登录...',
                mask: true
            })
            uni.login({
                success(result) {
                    console.log(result)
                    uni.request({
                        url: u.api.wxlogin,
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                        },
                        method: 'post',
                        data: {
                            code: result.code,
                            user_info: userInfo.rawData,
                            encrypted_data: userInfo.encryptedData,
                            iv: userInfo.iv,
                            signature: userInfo.signature
                        },
                        success: function (res) {
                            uni.hideLoading()
                            if (res.data.code === 1) {
                                console.log(res)
                                uni.showToast({
                                    title: '授权登录成功',
                                    mask: true,
                                    duration: 5000,
                                    success: function () {
                                        // 保存用户信息
                                        uni.setStorageSync('token', res.data.data.token)
                                        uni.setStorageSync('userid', res.data.data.user_id)
                                        uni.setStorageSync('userInfo', userInfo.userInfo)
                                        // 返回
                                        uni.navigateBack()
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
.container {
  padding: 0 60upx;
}

.wechatapp {
  padding: 80upx 0 48upx;
  border-bottom: 1upx solid #e3e3e3;
  margin-bottom: 72upx;
  text-align: center;
}

.wechatapp .header {
  width: 190upx;
  height: 190upx;
  border: 2px solid #fff;
  margin: 0upx auto 0;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 1px 0px 5px rgba(50, 50, 50, 0.3);
}

.auth-title {
  color: #585858;
  font-size: 40upx;
  margin-bottom: 40upx;
}

.auth-subtitle {
  color: #888;
  margin-bottom: 88upx;
}

.login-btn {
  border: none;
  height: 88upx;
  line-height: 88upx;
  background: #04be01;
  color: #fff;
  font-size: 11pt;
  border-radius: 999upx;
}

.login-btn::after {
  display: none;
}

.login-btn.button-hover {
  box-shadow: inset 0 5upx 30upx rgba(0, 0, 0, 0.15);
}

</style>