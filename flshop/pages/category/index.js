const App = getApp();

Page({
  data: {
    // 搜索框样式
    searchColor: "rgba(0,0,0,0.4)",
    searchSize: "15",
    searchName: "搜索商品",

    // 列表高度
    scrollHeight: 0,

    // 一级分类：指针
    curNav: true,
    curIndex: 0,

    // 分类列表
    list: [],

    // show
    notcont: false
  },

  onLoad: function (e) {
    console.log()
    console.log(e)
    let _this = this;
    // 设置分类列表高度
    _this.setListHeight();
    // 获取分类列表
    this.getCategoryList();
  },
  onShow: function () {
    console.log('show')
    let _this = this;
    _this.goCate()
  },

  goCate: function () {
    console.log('goCate')
    let _this = this;
    console.log(_this.data)
    var cateParam = wx.getStorageSync('cateParam')
    if (cateParam && _this.data && _this.data.list.length) {
      wx.removeStorageSync('cateParam')
      let index = 0

      _this.data.list.forEach((item, i) => {
        if (item.category_id == cateParam.category_id) {
          index = i
        }
      })
      _this.setData({
        curNav: _this.data.list.length > 0 ? cateParam.category_id : true,
        curIndex: index
      });
    } else {
      _this.setData({
        curNav: _this.data.list.length > 0 ? _this.data.list[0].category_id : true
      });
    }
  },

  /**
   * 设置分类列表高度
   */
  setListHeight: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          scrollHeight: res.windowHeight - 47,
        });
      }
    });
  },

  /**
   * 获取分类列表
   */
  getCategoryList: function () {
    let _this = this;
    App._get('category/list/1', {}, function (result) {
      let data = result.data;
      _this.setData({
        list: data.list,
        notcont: !data.list.length
      });
      _this.goCate()
    });
  },

  /**
   * 一级分类：选中分类
   */
  selectNav: function (t) {
    let curNav = t.target.dataset.id,
      curIndex = parseInt(t.target.dataset.index);
    this.setData({
      curNav,
      curIndex,
      scrollTop: 0
    });
  },

  /**
   * 设置分享内容
   */
  onShareAppMessage: function () {
    return {
      title: "全部分类",
      path: "/pages/category/index"
    };
  }

});