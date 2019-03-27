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
  </div>
</template>
<style scoped>
    .pagetip {
        text-align: center;
        font-size: 12px;
        color: #999;
        padding: 20px 0;
    }
</style>

<script>
import u from '@/common/util'
import mixin from '@/common/mixin.js'

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