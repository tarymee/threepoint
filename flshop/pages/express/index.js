let App = getApp();

Page({
    data: {
        orderId: '',
        orderList: [],
        expressList: [],
        order: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.orderId = options.orderId || '';
        // console.log(options)
        // console.log(this.data.orderId)
        this.setData({ orderId: this.data.orderId });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getExpressData()
    },

    getExpressData: function () {
        let _this = this
        App._post_form('order/track', {
            orderId: _this.data.orderId,
            // orderId: '265',
            token: wx.getStorageSync('token')
        }, function (res) {
            console.log('success')
            console.log(res)
            if (res) {
                if (res.track && res.track.length) {
                    _this.setData({
                        expressList: res.track.reverse()
                    });
                }
                if (res.order && res.order.orderDetails && res.order.orderDetails.length) {
                    _this.setData({
                        orderList: res.order.orderDetails
                    });
                }
            }
        });

        // App._get('order/track', {
        //     orderId: _this.data.orderId,
        //     token: wx.getStorageSync('token')
        // }, function (result) {
        //     console.log(result)
        // });

    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    }


});