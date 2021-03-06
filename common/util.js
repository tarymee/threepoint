// 正式
const host = 'https://wxcms.net'
// const host = 'https://www.3ftc.com'
// const host = 'https://flshop.mjsoft.com.cn'
// 本地
// const host = 'http://localhost:8088'
// 站点id 三分联盟默认是8
const site = '8'
const api = {
    weapp: `${host}/api/weapp/home/${site}`,
    user: `${host}/api/user/index/${site}`,
    goods: `${host}/api/goods/view/`,
    search: `${host}/api/goods/search/${site}`,
    list: `${host}/api/goods/list/${site}`,
    index: `${host}/api/shop/index/${site}`,
    category: `${host}/api/category/list/${site}`,
    wxlogin: `${host}/api/user/login/${site}`,
    addressdetail: `${host}/api/address/detail/${site}`,
    addresslist: `${host}/api/address/list/${site}`,
    addresssave: `${host}/api/address/save/${site}`,
    addressdel: `${host}/api/address/del/${site}`,
    addressdefault: `${host}/api/address/default/${site}`,
    cartlist: `${host}/api/cart/list/${site}`,
    cartadd: `${host}/api/cart/add/${site}`,
    cartchangenum: `${host}/api/cart/changenum/${site}`,
    cartdel: `${host}/api/cart/del/${site}`,
    cartsave: `${host}/api/cart/save/${site}`,
    // 查询购物车的信息保存到订单表
    ordercart: `${host}/api/order/cart`,
    orderrepay: `${host}/api/order/repay`,
    orderbuynow: `${host}/api/order/buyNow`,
    orderdetail: `${host}/api/myorder//detail/${site}`,
    orderlist: `${host}/api/myorder/list/${site}`,
    ordercancel: `${host}/api/myorder/cancel/${site}`,
    orderback: `${host}/api/myorder/back/${site}`,
    orderreceipt: `${host}/api/myorder/receipt/${site}`,
    // 申请开店列表
    applylist: `${host}/api/applyinfo/list/${site}`,
    // 申请开店
    apply: `${host}/api/order/apply`,
    // 申请开店查询
    applyuser: `${host}/api/applyuser/detail`,
    // 门店列表
    sitelist: `${host}/api/site/list/${site}`,
    phonebind: `${host}/api/user/phone/${site}`,

    phoneget: `${host}/api/phone/get/${site}`,
    feedback: `${host}/api/feedback/save/${site}`,
    pay: `${host}/api/pay`,
    getAddress: `${host}/api/getAddress`,
    test: `${host}/api/test`,
    // index: `${host}/api/shop/index/1`,
    open: `${host}/api/applyinfo/list/1`,
    qrcode: `${host}/json/weappuser/qrcode/${site}`,
    mycustomer: `${host}/api/user/list/${site}`,
    profit: `${host}/api/user/profit/index`,
    profitlog: `${host}/api/user/profit/log`,
    profitincome: `${host}/api/user/profit/income`,
    profitsave: `${host}/api/user/profit/save`,
    moneyincome: `${host}/api/user/money/income`,
    moneysave: `${host}/api/user/money/save`,
    paytype: `${host}/api/order/payType`,
    dolist: `${host}/api/article/list/248`,
    dolistdetail: `${host}/api/article/view/`,
    team: `${host}/api/user/team/${site}`,
    teamorder: `${host}/api/user/teamorder/${site}`,
    msghistory: `${host}/api/weapp/msg/history/${site}`,
    host
}

// console.log(api)

function checkLogin({
    success = null,
    fail = null,
    isAutoJumpToLogin = true,
} = {}) {
    // uni.setStorageSync('token', '11111')
    // uni.setStorageSync('token', '')
    let token = uni.getStorageSync('token')
    let userid = uni.getStorageSync('userid')
    let userInfo = uni.getStorageSync('userInfo')
    // console.log('token', token)
    // console.log('userid', userid)
    // console.log('userInfo', userInfo)

    let failFn = function () {
        fail && fail()
        if (isAutoJumpToLogin) {
            // console.error('请先登录后再操作')
            uni.showToast({
                title: '请先登录后再操作',
                icon: 'none',
                duration: 1500,
                success() {
                    jump('/pages/login/login')
                }
            })
        }
    }

    if (token) {
        // console.log(token)
        uni.checkSession({
            success() {
                // console.log('session_key 未过期，并且在本生命周期一直有效')
                // console.log('用户已授权登录')
                success && success(token, userid, userInfo)
            },
            fail() {
                console.error('session_key 已经失效，需要重新执行登录流程')
                failFn()
            }
        })
    } else {
        failFn()
        // // 获取用户数据
        // uni.getUserInfo({
        //     success: function (userInfo) {
        //         console.log('userInfo', userInfo)
        //     }
        // })
    }
}

// 封装uni.request方法
function request({
    url = '',
    method = 'POST',
    data = {},
    header = {
        'content-type': 'application/x-www-form-urlencoded'
        // 'content-type': 'application/json'
    },
    dataType = 'json',
    responseType = 'text',
    success = null,
    fail = null,
    complete = null,
    isShowLoading = true,
    isVerifyLogin = true,
    isShowError = true
} = {}) {

    if (isVerifyLogin) {
        // console.log('有校验登录 发起请求')
        checkLogin({
            success: function () {
                ajax()
            }
        })
    } else {
        // console.log('没校验登录 发起请求')
        ajax()
    }

    function ajax() {
        if (isShowLoading) {
            uni.showLoading({
                mask: true
            })
        }

        // 就算不需要校验登录 token也一起传过去 后台有可能有用 比如统计用户某个接口请求次数等
        let token = uni.getStorageSync('token')
        data.token = token ? token : ''

        uni.request({
            url: url,
            method: method,
            header: header,
            dataType: dataType,
            responseType: responseType,
            data: data,
            success(res) {
                console.log({
                    url: url,
                    request: data,
                    response: res.data,
                })
                success && success(res.data)
            },
            fail(res) {
                // console.error('接口请求失败')
                if (isShowError) {
                    uni.showModal({
                        title: '提示',
                        content: '网络异常 请稍后重试',
                        showCancel: false
                    })
                }
                console.error({
                    url: url,
                    request: data,
                    response: res,
                })
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
}

// 获取头部宽高信息
const getNavbarInfo = function () {
    let statusBarHeight = 20
    let windowWidth = 375
    let capsuleHeight = 32
    let capsuleWidth = 87
    let capsuleTop = 26
    let capsuleLeft = 10
    let titleWidth = 181
    let titleHeight = 44
    let navHeight = 64

    let systemInfo = uni.getSystemInfoSync()
    // console.log('设备信息', systemInfo)
    statusBarHeight = systemInfo.statusBarHeight
    windowWidth = systemInfo.windowWidth


    let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    // console.log('胶囊信息', menuButtonInfo)
    capsuleHeight = menuButtonInfo.height
    capsuleWidth = menuButtonInfo.width
    capsuleTop = menuButtonInfo.top
    capsuleLeft = windowWidth - menuButtonInfo.right
    titleWidth = windowWidth - (capsuleLeft * 2 + capsuleWidth * 2)
    // titleHeight = capsuleHeight + ((capsuleTop - statusBarHeight) * 2)
    navHeight = statusBarHeight + titleHeight
    return {
        statusBarHeight,
        windowWidth,
        capsuleHeight,
        capsuleWidth,
        capsuleTop,
        capsuleLeft,
        titleWidth,
        titleHeight,
        navHeight
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
                    data[x + '_backup'] = item[x]
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



function jump(url) {
    if (url) {
        console.log(url)
        if (url.indexOf('pages/index/index') != -1 || url.indexOf('pages/user/user') != -1 || url.indexOf('pages/open/open') != -1 || url.indexOf('pages/store/store') != -1 || url.indexOf('pages/cart/cart') != -1) {
            uni.switchTab({
                url: url
            })
        } else {
            uni.navigateTo({
                url: url
            })
        }
    } else {
        console.log('没有url')
    }
}



function back() {
    let that = this
    let pages = getCurrentPages()
    // console.log('页面栈', pages)
    if (pages.length > 1) {
        uni.navigateBack()
    } else {
        jump('/pages/index/index')
    }
}
/**
 * 处理js浮点数精度问题
 * console.log(math.add(0.1, 0.2))
 * console.log(math.multiadd(0.1, 0.2, 0.3, 0.4))
 * console.log(math.curryadd(0.1)(0.2)())
 */
const math = {
    /**
     * 加法函数，用来得到精确的加法结果
     * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
     * 调用：math.add(arg1, arg2)
     * 返回值：arg1加arg2的精确结果
     */
    add: function (arg1, arg2) {
        var r1, r2, m, c
        try {
            r1 = arg1.toString().split('.')[1].length
        }
        catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split('.')[1].length
        }
        catch (e) {
            r2 = 0
        }
        c = Math.abs(r1 - r2)
        m = Math.pow(10, Math.max(r1, r2))
        if (c > 0) {
            var cm = Math.pow(10, c)
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace('.', ''))
                arg2 = Number(arg2.toString().replace('.', '')) * cm
            } else {
                arg1 = Number(arg1.toString().replace('.', '')) * cm
                arg2 = Number(arg2.toString().replace('.', ''))
            }
        } else {
            arg1 = Number(arg1.toString().replace('.', ''))
            arg2 = Number(arg2.toString().replace('.', ''))
        }
        return (arg1 + arg2) / m
    },
    /**
     * 累加函数
     * 调用：math.multiadd(arg1, arg2, ...)
     * 返回值：arg1加arg2加arg3加...的精确结果
     */
    multiadd: function (...args) {
        // let args = Array.prototype.slice.call(arguments)
        let result = args[0]
        args.forEach((item, i) => {
            if (i < (args.length - 1)) {
                result = math.add(result, args[i + 1])
            }
        })
        return result
    },
    /**
     * 柯里化累加函数
     * 说明：运用柯里化调用math.add方法
     * 调用：math.curryadd(arg1)(arg2)(arg3)()
     * 返回值：arg1加arg2加arg3加...的精确结果
     */
    curryadd: function () {
        var _args = arguments
        // console.log(_args.length)
        return function () {
            // console.log(arguments)
            if (!arguments.length) {
                // console.log(_args.length)
                var result = 0
                for (var i = 0; i < _args.length; i++) {
                    result = math.add(result, _args[i])
                }
                return result
            } else {
                Array.prototype.push.apply(_args, arguments)
                return arguments.callee
            }
        }
    },
    /**
     * 减法函数，用来得到精确的减法结果
     * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
     * 调用：math.sub(arg1,arg2)
     * 返回值：arg1减arg2的精确结果
     */
    sub: function (arg1, arg2) {
        var r1, r2, m, n
        try {
            r1 = arg1.toString().split('.')[1].length
        }
        catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split('.')[1].length
        }
        catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka // 动态控制精度长度
        n = (r1 >= r2) ? r1 : r2
        return ((arg1 * m - arg2 * m) / m).toFixed(n)
    },
    /**
     * 累减函数
     * 调用：math.multisub(arg1, arg2, ...)
     * 返回值：arg1减arg2减arg3减...的精确结果
     */
    multisub: function (...args) {
        // let args = Array.prototype.slice.call(arguments)
        let result = args[0]
        args.forEach((item, i) => {
            if (i < (args.length - 1)) {
                result = math.sub(result, args[i + 1])
            }
        })
        return result
    },
    /**
     * 乘法函数，用来得到精确的乘法结果
     * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     * 调用：math.mul(arg1,arg2)
     * 返回值：arg1乘arg2的精确结果
     */
    mul: function (arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString()
        try {
            m += s1.split('.')[1].length
        }
        catch (e) {
        }
        try {
            m += s2.split('.')[1].length
        }
        catch (e) {
        }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    },
    /**
     * 累乘函数
     * 调用：math.multimul(arg1, arg2, ...)
     * 返回值：arg1乘arg2乘arg3乘...的精确结果
     */
    multimul: function (...args) {
        // let args = Array.prototype.slice.call(arguments)
        let result = args[0]
        args.forEach((item, i) => {
            if (i < (args.length - 1)) {
                result = math.mul(result, args[i + 1])
            }
        })
        return result
    },
    /**
     * 柯里化累乘函数
     * 说明：运用柯里化调用math.mul方法
     * 调用：math.currymul(arg1)(arg2)(arg3)()
     * 返回值：arg1乘arg2乘arg3乘...的精确结果
     */
    currymul: function () {
        var _args = arguments
        return function () {
            if (!arguments.length) {
                var result = 1
                for (var i = 0; i < _args.length; i++) {
                    result = math.mul(result, _args[i])
                }
                return result
            } else {
                Array.prototype.push.apply(_args, arguments)
                return arguments.callee
            }
        }
    },
    /**
     * 除法函数，用来得到精确的除法结果
     * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
     * 调用：math.div(arg1,arg2)
     * 返回值：arg1除arg2的精确结果
     */
    div: function (arg1, arg2) {
        var t1, t2, r1, r2
        try {
            t1 = arg1.toString().split('.')[1].length
        } catch (e) {
            t1 = 0
        }
        try {
            t2 = arg2.toString().split('.')[1].length
        } catch (e) {
            t2 = 0
        }
        r1 = Number(arg1.toString().replace('.', ''))
        r2 = Number(arg2.toString().replace('.', ''))
        return (r1 / r2) * Math.pow(10, t2 - t1)
    },
    /**
     * 累除函数
     * 调用：math.multidiv(arg1, arg2, ...)
     * 返回值：arg1除arg2除arg3除...的精确结果
     */
    multidiv: function (...args) {
        // let args = Array.prototype.slice.call(arguments)
        let result = args[0]
        args.forEach((item, i) => {
            if (i < (args.length - 1)) {
                result = math.div(result, args[i + 1])
            }
        })
        return result
    }
}

/**
 * 函数节流 表示频率控制 当达到了一定的时间就会执行一次 可以理解为是缩减执行频率 函数的执行次数为wait时间每次
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用 传入{leading: false}
 *                                如果想忽略结尾边界上的调用 传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
const throttle = function (func, wait, options) {
    let context, args, result
    let timeout = null
    // 上次执行时间点
    let previous = 0
    if (!options) options = {}
    // 延迟执行函数
    let later = function () {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false ? 0 : Number(new Date())
        timeout = null
        result = func.apply(context, args)
        if (!timeout) context = args = null
    }
    return function (..._args) {
        let now = Number(new Date())
        // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
        if (!previous && options.leading === false) previous = now
        // 延迟执行时间间隔
        let remaining = wait - (now - previous)
        context = this
        args = _args
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        // remaining <= 0 考虑到事件停止后重新触发或者
        // 正好相差wait的时候，这些情况下，会立即触发事件
        // remaining > wait 没有考虑到相应场景
        // 因为now-previous永远都是正值，且不为0，那么
        // remaining就会一直比wait小，没有大于wait的情况
        // 估计是保险起见吧，这种情况也是立即执行
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout)
            timeout = null
            previous = now
            result = func.apply(context, args)
            if (!timeout) context = args = null
            //如果延迟执行不存在，且没有设定结尾边界不执行选项
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
        return result
    }
}

/**
 * 函数防抖 把函数的连续调用合成一次 空闲时间必须大于或等于 wait 函数才会执行
 * https://blog.csdn.net/qq_35585701/article/details/81392174
 * 与函数节流区别 比如监听用户输入搜索 函数节流是在一定时间内都发出请求搜索 而函数防抖可以做到用户停止输入之后才搜索 所以应该用函数防抖
 * @param  {function} func        传入函数，最后一个参数是额外增加的this对象，.apply(this, args) 这种方式，this无法传递进函数
 * @param  {number}   wait        时间间隔
 * @param  {boolean}  immediate   默认为ture 调用触发于开始边界而不是结束边界
 * @return {function}             返回调用函数
 */
const debounce = function (func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        let last = Number(new Date()) - timestamp
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.call(context, ...args, context)
                if (!timeout) {
                    context = args = null
                }
            }
        }
    }

    return function (..._args) {
        context = this
        args = _args
        timestamp = Number(new Date())
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) {
            timeout = setTimeout(later, wait)
        }
        if (callNow) {
            result = func.call(context, ...args, context)
            context = args = null
        }

        return result
    }
}


// 微信支付
const wechatPay = function ({
    success = null,
    fail = null,
    payment = null
} = {}) {
    wx.requestPayment({
        timeStamp: payment.timeStamp,
        nonceStr: payment.nonceStr,
        package: 'prepay_id=' + payment.prepay_id,
        signType: 'MD5',
        paySign: payment.paySign,
        success: function (paymentRes) {
            console.log(paymentRes)
            success && success(paymentRes)
        },
        fail: function (err) {
            console.error(err)
            fail && fail(err)
        }
    })
}

// 订单支付
const orderPay = function (payment, order_id, order_pay_price) {
    wechatPay({
        payment: payment,
        success: function (paymentRes) {
            // 跳转到成功下单页
            jump(`/pages/success/success?order_id=${order_id}&price=${order_pay_price}`)
        },
        fail: function () {
            uni.showToast({
                title: '订单未支付',
                icon: 'none',
                mask: true,
                duration: 3000,
                success: function () {
                    // 跳转到未付款订单
                    uni.redirectTo({
                        url: '/pages/order/order?type=payment',
                    })
                }
            })
        }
    })
}

// 重新支付订单
const orderRepay = function (order_id, order_pay_price) {
    request({
        url: api.orderrepay,
        data: {
            order_id: order_id
        },
        isVerifyLogin: true,
        isShowLoading: true,
        isShowError: true,
        success(res) {
            // console.log(res)
            if (res.data) {
                let payment = res.data.payment
                // 发起微信支付
                orderPay(res.data.payment, order_id, order_pay_price)
            }
        }
    })
}

// 确认收货
const receipt = function(order_id) {
    console.log('receipt', order_id)
    let that = this

    request({
        url: api.orderreceipt,
        data: {
            order_id: order_id
        },
        isVerifyLogin: true,
        isShowLoading: true,
        isShowError: true,
        success(res) {
            console.log(res)
            if (res && res.code == 1) {
                uni.redirectTo({
                    url: '/pages/order/order?type=',
                })
            } else {
            }
        }
    })
}

// 取消订单
const cancel = function(order_id) {
    console.log('cancel', order_id)
    request({
        url: api.ordercancel,
        data: {
            order_id: order_id
        },
        isVerifyLogin: true,
        isShowLoading: true,
        isShowError: true,
        success(res) {
            console.log(res)
            if (res && res.code == 1) {
                uni.redirectTo({
                    url: '/pages/order/order?type=',
                })
            } else {
            }
        }
    })

}



/**
 * 格式化日期
 * @param  {Data}    date   日期构造函数
 * @param  {string}  fmt    格式字符串
 * @return {string}         返回指定格式的日期
 * dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS 星期w 第q季度')
 * ==>
 * 2018-04-19 18:43:24.829 星期四 第2季度
 */
const dateFormat = function (date, fmt) {
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
    if (!date) {
        console.error('date未定义')
        return false
    }
    var o = {
        'y': date.getFullYear(), // 年份，注意必须用getFullYear
        'M': date.getMonth() + 1, // 月份，注意是从0-11
        'd': date.getDate(), // 日期
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'w': ['日', '一', '二', '三', '四', '五', '六'][date.getDay()], // 星期，注意是0-6
        'H': date.getHours(), // 24小时制
        'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
        'm': date.getMinutes(), // 分钟
        's': date.getSeconds(), // 秒
        'S': date.getMilliseconds() // 毫秒
    }
    for (var i in o) {
        fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
            var val = o[i] + ''
            if (i === 'w') return val
            // 补0
            for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
            // 截取
            return m.length === 1 ? val : val.substring(val.length - m.length)
        })
    }
    return fmt
}





module.exports = {
    api,
    checkLogin,
    request,
    jump,
    back,
    getNavbarInfo,
    dataTransform,
    wechatPay,
    orderPay,
    orderRepay,
    receipt,
    math,
    cancel,
    throttle,
    debounce,
    dateFormat
}
