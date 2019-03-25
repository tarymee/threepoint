<template>
  <div>
    <div class="pro">
      <a class="pro-item" v-for="(item, index) in pagedata" :key="index" :href="item.url">
        <image :src="item.logo" lazy-load="true" mode="aspectFill"></image>
        <text class="pro-item-tit">{{item.title}}</text>
        <div class="pro-item-price"><text>￥</text>{{item.price}}</div>
      </a>
    </div>
    <div class="pagetip">{{pagetip}}</div>
    <!-- <div class="more" v-if="pageindex <= pagecount">
      <a class="more-btn">{{pagetip}}</a>
    </div>
    <div class="none" v-if="pageindex > pagecount">没有数据了</div> -->


  </div>
</template>
<style scoped>
/* 更多 */
/* .more {
  margin: 15px;
  text-align: center;
}
.more-btn {
  display: block;
  line-height: 30px;
  height: 30px;
  border: 1rpx solid #d1a178;
  border-radius: 15px;
  font-size: 14px;
  text-align: center;
  color: #d1a178;
} */
</style>

<script>
import u from '@/utils/index'
import mixin from '@/mixin/mixin.js'

export default {
  components: {},
  mixins: [mixin],
  data () {
    return {
      pageapi: u.api.index,
      pagedata: [
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
    }
  },
  mounted () {
    console.log('cate mounted')
    var that = this
  },
  created () {

  }
}
</script>