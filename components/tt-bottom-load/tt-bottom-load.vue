<template>
  <view class="tt-bottom-load">
    <slot></slot>
    <div class="tt-bottom-load__tip">
      <img src="/static/img/none.png" class="tt-bottom-load__tip-img" v-if="tip === '暂无数据'" />
      <div class="tt-bottom-load__tip-text" @click="load">{{tip}}</div>
    </div>
  </view>
</template>

<script>
import u from "@/common/util"
let pageindex = 1
let pagetotal = 1
let isload = true

export default {
  name: "tt-bottom-load",
  components: {},
  data() {
    return {
      tip: '加载中...',
      data: [
        // {
        //   logo: 'http://fpoimg.com/400x400',
        //   title: '青花瓷功夫茶杯',
        //   marketPrice: '386',
        //   url: '/pages/order/order'
        // }
      ]
    }
  },
  props: {
    api: {
      type: String,
      default: ''
    },
    pagesize: {
      type: [Number, String],
      default: 10
    },
    params: {
      type: Object,
      default() {
        return {}
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
      // console.log(that.api)
      // 父组件可能会更改api和params
      // 滚动到顶部
      that.data = []
      pageindex = 1
      pagetotal = 1
      isload = true
      that.tip = '加载中...'
      that.load()
    },
    load() {
      let that = this
      if (pageindex <= pagetotal && isload) {
        isload = false
        let postData = {
          pagesize: Number(that.pagesize),
          pageindex: pageindex,
          ...that.params
        }
        u.request({
          url: that.api,
          method: 'POST',
          data: postData,
          isVerifyLogin: false,
          success(res) {
            console.log(res)
            // res.newest = []
            if (Array.isArray(res.newest) && res.newest.length) {
                that.data = that.data.concat(res.newest)
                // that.data = [that.data, ...res.newest]
            }
            pagetotal = 2
            pageindex ++

            if (pagetotal === 0) {
              that.tip = '暂无数据'
              isload = false
            } else if (pageindex > pagetotal) {
              that.tip = '没有数据了'
              isload = false
            } else {
              isload = true
            }
          },
          fail(res) {
            that.tip = '加载失败 点击重新加载'
            isload = true
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
  padding: 15px 0;
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