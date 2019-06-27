<template>
    <view class="auth">
        <view class="auth__th">
            <view class="auth__th-avt">
                <open-data class="" type="userAvatarUrl"></open-data>
            </view>
        </view>
        <view class="auth__title">十器良品 申请以下权限</view>
        <view class="auth__subtitle">绑定您的微信手机号</view>
        <button type="primary" open-type='getPhoneNumber' @getphonenumber="authorPhone">授权绑定</button>
    </view>
</template>

<script>
import u from "@/common/util"
export default {
    components: {},
    data() {
        return {

        }
    },
    methods: {
        authorPhone(e) {
            console.log(e)
            u.request({
                url: u.api.phonebind,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                    // 'content-type': 'application/json'
                },
                data: {
                    encryptedData: e.detail.encryptedData,
                    errMsg: e.detail.errMsg,
                    iv: e.detail.iv,
                    code: uni.getStorageSync('code')
                },
                isVerifyLogin: true,
                success(res) {
                    console.log(res)
                    if (res.code == 1) {
                        uni.showToast({
                            title: '授权绑定成功',
                            mask: true,
                            duration: 5000,
                            success: function () {
                                // 返回
                                uni.navigateBack()
                            }
                        })
                        // u.request({
                        //     url: u.api.phonebind,
                        //     method: 'POST',
                        //     header: {
                        //         'content-type': 'application/x-www-form-urlencoded'
                        //         // 'content-type': 'application/json'
                        //     },
                        //     data: {
                        //         phone: res.data.phone
                        //     },
                        //     isVerifyLogin: true,
                        //     success(res) {
                        //         console.log(res)
                        //         if (res.code == 1) {
                        //             uni.showToast({
                        //                 title: '授权绑定成功',
                        //                 mask: true,
                        //                 duration: 5000,
                        //                 success: function () {
                        //                     // 返回
                        //                     uni.navigateBack()
                        //                 }
                        //             })
                        //         }
                        //     },
                        //     fail(res) {
                        //         console.error(res)
                        //     }
                        // })
                    }
                },
                fail(res) {
                    console.error(res)
                }
            })
            // // return false
            // uni.login({
            //     success(result) {
            //         console.log(result)
                    
            //     }
            // })
            
        }
    },
    onLoad() {
        console.log('bingphone onLoad')
        var that = this
        // 确认是否登录
        u.checkLogin()
    },
    onShow(event) {
        console.log('bingphone onShow')
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
</style>