let App = getApp();

Page({
    data: {
        order_id: '',
        orderList: [],
        expressList: [],
        order: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.order_id = options.order_id || '';
        // console.log(options)
        // console.log(this.data.order_id)
        this.setData({ order_id: this.data.order_id });
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
            orderId: _this.data.order_id,
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

    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    }


});