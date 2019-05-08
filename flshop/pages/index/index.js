let App = getApp();
Page({
  data: {
    // banner轮播组件属性
    indicatorDots: true, // 是否显示面板指示点	
    autoplay: true, // 是否自动切换
    interval: 3000, // 自动切换时间间隔
    duration: 800, // 滑动动画时长
    imgHeights: {}, // 图片的高度
    imgCurrent: {}, // 当前banne所在滑块指针

    // 页面元素
    items: {},
    newest: {},
    best: {},

    scrollTop: 0,
    wechat: '',
  },

  onLoad: function () {
    // 设置页面标题
    App.setTitle();
    // 设置navbar标题、颜色
    App.setNavigationBar();
    // 获取首页数据
    this.getIndexData();
  },

  /**
   * 获取首页数据
   */
  getIndexData: function () {
    let _this = this;
    App._get('weapp/index/1', {}, function (result) {
      console.info('11111' + result.data);
      _this.setData(result.data);
      _this.setData({
        wechat: result.wechat
      });
    });
  },

  /**
   * 计算图片高度
   */
  imagesHeight: function (e) {
    let imgId = e.target.dataset.id,
      itemKey = e.target.dataset.itemKey,
      ratio = e.detail.width / e.detail.height, // 宽高比
      viewHeight = 750 / ratio, // 计算的高度值
      imgHeights = this.data.imgHeights;

    // 把每一张图片的对应的高度记录到数组里
    if (typeof imgHeights[itemKey] === 'undefined') {
      imgHeights[itemKey] = {};
    }
    imgHeights[itemKey][imgId] = viewHeight;
    // 第一种方式
    let imgCurrent = this.data.imgCurrent;
    if (typeof imgCurrent[itemKey] === 'undefined') {
      imgCurrent[itemKey] = Object.keys(this.data.items[itemKey].data)[0];
    }
    this.setData({
      imgHeights,
      imgCurrent
    });
  },

  bindChange: function (e) {
    let itemKey = e.target.dataset.itemKey,
      imgCurrent = this.data.imgCurrent;
    // imgCurrent[itemKey] = e.detail.current;
    imgCurrent[itemKey] = e.detail.currentItemId;
    this.setData({
      imgCurrent
    });
  },

  goTop: function (t) {
    this.setData({
      scrollTop: 0
    });
  },
  goCate: function (t) {
    console.log(t)
    console.log(t.currentTarget.dataset.id)
    wx.setStorageSync('cateParam', {
      category_id: t.currentTarget.dataset.id
      // category_id: '28'
    })
    wx.switchTab({
      url: '/pages/category/index'
    })
  },

  contact: function (t) {
    wx.showModal({
      title: '请添加微信联系客服',
      content: '微信号：' + this.data.wechat,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  scroll: function (t) {
    console.log(t)
    this.setData({
      indexSearch: t.detail.scrollTop
    }), t.detail.scrollTop > 300 ? this.setData({
      floorstatus: !0
    }) : this.setData({
      floorstatus: !1
    });
  },

  scrolltolower: function () {
    wx.navigateTo({
      url: '../category/list?search=',
    })
  },

  // onReachBottom: function (t) {
  //   wx.navigateTo({
  //     url: '../category/list?search=',
  //   })
  // },

  onShareAppMessage: function () {
    return {
      title: "小程序首页",
      desc: "彩虹商城",
      path: "/pages/index/index"
    };
  }
});