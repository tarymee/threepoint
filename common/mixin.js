
import u from '@/common/util'
const mixin = {
  data() {
    return {
      pageindex: 1,
      pagesize: 10,
      pagecount: 1,
      pageapi: '',
      pagetip: '加载中...',
      pagedata: []
    }
  },
  created: function () {
    // console.log('mixin created')
  },
  onReachBottom: function (t) {
    console.log('触底执行')
    this.load()
  },
  mounted() {
    console.log('mixin mounted')
    var that = this
    that.load()
  },
  methods: {
    load() {
      var that = this
      console.log(that.pageapi)
      if (that.pageindex <= that.pagecount && that.pagetip === '加载中...') {
        u.request({
          url: that.pageapi,
          method: 'POST',
          data: {
            pagesize: that.pagesize,
            pageindex: that.pageindex
          },
          isVerifyLogin: false,
          success(res) {
            console.log(res)
            that.pagedata = that.pagedata.concat(res.newest)
            that.pagecount = 19
            that.pageindex ++
            if (that.pageindex > that.pagecount) {
              that.pagetip = '没有数据了'
            } else {
              that.pagetip = '加载中...'
            }
          },
          fail(res) {
            that.pagetip = '加载中...'
          }
        })
      }
    }
  }
}

module.exports = mixin