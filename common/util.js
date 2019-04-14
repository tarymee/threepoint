

// 正式
const host = 'https://wxcms.net'
// 本地
// const host = 'http://localhost:8088'
const api = {
    pay: `${host}/api/pay`,
    getAddress: `${host}/api/getAddress`,
    test: `${host}/api/test`,
    index: `${host}/api/shop/index/1`,
    open: `${host}/api/applyinfo/list/1`,
    wxlogin: `${host}/api/wxLogin`,
    host
}
console.log(api)


function wxLogin(callback) {
    uni.setStorageSync('openid', '54654654654654654654654')

    let openid = uni.getStorageSync('openid') || '11111'
    console.log('openid = ' + openid)
    if (openid) {
        callback && callback()
    } else {
        uni.login({
            success(result) {
                console.log(result)
                // return false
                uni.showLoading({
                    mask: true
                })
                uni.request({
                    url: api.wxlogin,
                    method: 'post',
                    data: {
                        code: result.code
                    },
                    success: function (res) {
                        // console.log(res)
                        uni.hideLoading()

                        // uni.navigateTo({
                        //   // url: '/pages/store/store'
                        //   url: `/pages/salesup/salesup?storeid=31960`
                        //   // url: '/pages/login/login'
                        //   // url: '/pages/travel/travel'
                        //   // url: '/pages/attendance/attendance'
                        // })

                        if (res.data.code === 1) {
                            // 1 表示已经登录
                            // 保存用户信息
                            uni.setStorage({
                                key: 'openid',
                                data: res.data.openid,
                                complete: function () {
                                    callback && callback()
                                }
                            })
                        } else {
                            // !1表示还没登录
                            uni.setStorage({
                                key: 'openid',
                                data: res.data.openid,
                                complete: function () {
                                    uni.redirectTo({
                                        url: '/pages/register/register'
                                    })
                                }
                            })
                        }
                    },
                    fail: function (res) {
                        // alert('网络异常，请稍后重试')
                        console.error(res)
                        uni.hideLoading()
                    }
                })
            }
        })
    }
}

// 封装uni.request方法
// 添加 isShowLoading isVerifyLogin isShowError 字段
function request(config) {
    let {
        url,
        method,
        data,
        header,
        dataType,
        responseType,
        success,
        fail,
        complete,
        isShowLoading = true,
        isVerifyLogin = true,
        isShowError = true
    } = config
    if (isShowLoading) {
        uni.showLoading({
            mask: true
        })
    }

    function post() {
        uni.request({
            url: url,
            method: method || 'GET',
            header: header || {},
            dataType: dataType || 'json',
            responseType: responseType || 'text',
            data: data,
            success(res) {
                success && success(res.data)
            },
            fail(res) {
                if (isShowError) {
                    uni.showModal({
                        title: '提示',
                        content: '网络异常 请稍后重试',
                        showCancel: false
                    })
                }
                fail && fail(res)
            },
            complete(res) {
                if (isShowLoading) {
                    uni.hideLoading()
                }
                complete && complete(res)
            }
        })
    }

    if (isVerifyLogin) {
        console.log('校验登录后发起请求')
        wxLogin(function () {
            let openid = uni.getStorageSync('openid')
            data.openid = openid
            post()
        })
    } else {
        console.log('没校验登录发起请求')
        post()
    }
}

function phone(number) {
    uni.makePhoneCall({
        phoneNumber: number
    })
}

function jump(url) {
    if (url) {
        uni.navigateTo({
            url: url
        })
    } else {
        console.log('没有url')
    }

}

module.exports = {
    api,
    phone,
    jump,
    wxLogin,
    request
    // alert,
    // uploadImage,
    // compressImage: compressImage
}