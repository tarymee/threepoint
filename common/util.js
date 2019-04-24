// 正式
// const host = 'https://wxcms.net'
const host = 'https://www.3ftc.com'
// 本地
// const host = 'http://localhost:8088'

// 站点id 三分联盟默认是8
const site = '8'
const api = {
    category: `${host}/api/category/list/${site}`,
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

/**
 * 数据转换 接受源数据和配对规则 进行数据转换
 * @param  {Array OR Object}   source      源数据
 * @param  {Object}            matchup     配对规则
 * @param  {Boolean}           isreverse   配对规则是否相反
 * @return {Array OR Object}               返回转换后的数据
 */
function dataTransform(source, matchup, isreverse) {
    let isArr = Array.isArray(source)
    let isObj = Object.prototype.toString.call(source) === '[object Object]'
    if (!isArr && !isObj) {
        console.error('只接受对象或数组')
        return
    }

    if (isreverse) {
        for (let x in matchup) {
            matchup[matchup[x]] = x
            delete matchup[x]
        }
    }

    if (isObj) {
        source = [source]
    }
    let transformArr = []
    source.forEach((item, i) => {
        let data = {}
        for (let x in item) {
            if (matchup[x]) {
                data[matchup[x]] = item[x]
            } else {
                if (typeof data[x] === 'undefined') {
                    data[x] = item[x]
                } else {
                    // 如果数据源中某个属性值与配对关系相同 则被覆盖 原属性加_backup后缀
                    // data[x + '_backup'] = item[x]
                }
            }
        }
        transformArr.push(data)
    })
    if (isObj) {
        return transformArr[0]
    } else {
        return transformArr
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
    request,
    dataTransform
    // alert,
    // uploadImage,
    // compressImage: compressImage
}