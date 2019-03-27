<template>
  <view class="tt-bottom-load">
    <slot></slot>
    <div class="pagetip">{{pagetip}}</div>
  </view>
</template>

<script>
import u from "@/common/util"
export default {
  name: "tt-bottom-load",
  components: {},
  data() {
    return {
      pageindex: 1,
      pagesize: 10,
      pagenum: 1,
      pagetip: '加载中...',
      data: [
        {
          logo: 'http://fpoimg.com/400x400',
          title: '青花瓷功夫茶杯',
          price: '386',
          url: '/pages/order/order'
        }
      ]
    }
  },
  props: {
    api: String,
    disabled: {
      //是否禁用
      type: [Boolean, String],
      default: false
    },
    badgeType: {
      //badge类型
      type: String,
      default: "success"
    },
    extraIcon: {
      type: Object,
      default() {
        return {
          type: "contact",
          color: "#000000",
          size: "20"
        }
      }
    }
  },
  onReachBottom: function (t) {
    // console.log('触底执行')
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
      console.log(that.api)
      if (that.pageindex <= that.pagenum && that.pagetip === "加载中...") {
        u.request({
          url: that.api,
          method: "POST",
          data: {
            pagesize: that.pagesize,
            pageindex: that.pageindex
          },
          isVerifyLogin: false,
          success(res) {
            console.log(res)
            that.data = that.data.concat(res.newest)
            that.pagenum = 3
            that.pageindex++
            if (that.pageindex > that.pagenum) {
              that.pagetip = "没有数据了"
            } else {
              that.pagetip = "加载中..."
            }
          },
          fail(res) {
            that.pagetip = "加载中..."
          }
        })
      }
    }
  }
}
</script>

<style>
@charset "UTF-8";
.pagetip {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 20px 0;
}
</style>