<template>
  <div>
    <div class="pro">
      <a class="pro-item" v-for="(item, index) in proArr" :key="index" :href="item.url">
        <image :src="item.logo" lazy-load="true" mode="aspectFill"></image>
        <text class="pro-item-tit">{{item.title}}</text>
        <div class="pro-item-price"><text>￥</text>{{item.price}}</div>
      </a>
    </div>
    <div class="more" v-if="pageindex <= pagecount">
      <a class="more-btn" @click="load()">{{showtext}}</a>
    </div>
    <div class="none" v-if="pageindex > pagecount">没有数据了</div>


  </div>
</template>
<style scoped>
/* 更多 */
.more {
  margin: 15px;
  text-align: center;
}
.more-btn {
  display: block;
  line-height: 30px;
  height: 30px;
  border: 1rpx solid #d1a178;
  border-radius: 15px;
  /* padding: 0 25px; */
  font-size: 14px;
  text-align: center;
  color: #d1a178;
}
</style>

<script>
import u from '@/utils/index'

export default {
  components: {},
  data () {
    return {
      pageindex: 1,
      pagesize: 10,
      pagecount: 1,
      showtext: '查看更多',
      proArr: [
        {
          logo: 'http://fpoimg.com/400x400',
          title: '青花瓷功夫茶杯',
          price: '386',
          url: '/pages/logs/main'
        }
      ]
    }
  },
  methods: {
    test () {
      console.log('test')
    },
    load () {
      var that = this
      console.log(this.pageindex)
      if (that.pageindex <= that.pagecount && that.showtext !== '加载中...') {
        that.showtext = '加载中...'
        u.request({
          url: u.api.index,
          method: 'POST',
          data: {
            pagesize: that.pagesize,
            pageindex: that.pageindex
          },
          isVerifyLogin: false,
          success(res) {
            console.log(res)
            that.proArr = that.proArr.concat(res.newest)
            that.pagecount = 3
            that.pageindex ++
            that.showtext = '查看更多'
          },
          fail(res) {
            that.showtext = '查看更多'
          }
        })
      } else {
          
      }
    }
  },
  mounted () {
    console.log('index mounted')
    var that = this
    that.load()

  },
  created () {

  }
}
</script>