<template>
  <view class="tt-bottom-load">
    <slot></slot>
    <div class="tt-bottom-load__tip">
      <img src="http://fpoimg.com/400x400" class="tt-bottom-load__tip-img" v-if="tip === '暂无数据'" />
      <div class="tt-bottom-load__tip-text">{{tip}}</div>
    </div>
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
      pagetotal: 0,
      tip: '查看更多',
      data: [
        // {
        //   logo: 'http://fpoimg.com/400x400',
        //   title: '青花瓷功夫茶杯',
        //   price: '386',
        //   url: '/pages/order/order'
        // }
      ]
    }
  },
  props: {
    api: String,
    badgeType: {
      type: [Boolean, String],
      default: false
    },
    params: {
      type: Object,
      default() {
        return {
          type: "contact"
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
    let that = this
    that.load()
  },
  methods: {
    reload() {
      let that = this
      // that.$parent.haha()
      console.log(that.api)
      // 父组件可能会更改api和params
      // 滚动到顶部
      that.data = []
      that.pageindex = 1
      that.pagetotal = 0
      that.tip = '查看更多'
      that.load()
    },
    load() {
      let that = this
      console.log(that.api)
      if (that.tip === '查看更多') {
        that.tip = '加载中...'
        u.request({
          url: that.api,
          method: 'POST',
          data: {
            pagesize: that.pagesize,
            pageindex: that.pageindex
          },
          isVerifyLogin: false,
          success(res) {
            console.log(res)
            // res.newest = []
            if (res.newest && res.newest.length) {
                that.data = that.data.concat(res.newest)
            }
            that.pagetotal = 9
            that.pageindex ++

            if (that.pagetotal === 0) {
                that.tip = '暂无数据'
            } else if (that.pageindex > that.pagetotal) {
                that.tip = '没有数据了'
            } else {
              that.tip = '查看更多'
            }
          },
          fail(res) {
            that.tip = '加载失败 点击重新加载'
          }
        })
      }
    }
  }
}
</script>

<style scope>
@charset "UTF-8";
.tt-bottom-load__tip {
  text-align: center;
  font-size: 12px;
  line-height: 1.5;
  color: #999;
  padding: 20px 0;
}
.tt-bottom-load__tip {
  padding: 60px 0;
}
.tt-bottom-load__tip-img {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0px auto;
}
.tt-bottom-load__tip-text {
  text-align: center;
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}
</style>