<template>
  <div>
    <div class="pro">
      <a class="pro__item" v-for="(item, index) in pagedata" :key="index" :href="item.url">
        <image class="pro__item-img" :src="item.logo" lazy-load="true" mode="aspectFill"></image>
        <text class="pro__item-tit">{{item.title}}</text>
        <div class="pro__item-price"><text class="pro__item-symbol">￥</text>{{item.price}}</div>
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

    /* 商品 */
    .pro {
        overflow: hidden;
        margin: 0 10px 15px;
    }

    .pro__item {
        float: left;
        margin: 5px;
    }

    .pro__item-img {
        display: block;
        width: 167px;
        height: 167px;
        background-color: #eee;
    }

    .pro__item-tit {
        display: block;
        font-size: 13px;
        color: #333;
        line-height: 25px;
    }

    .pro__item-price {
        display: block;
        font-size: 16px;
        color: #d1a178;
        font-weight: bold;
        line-height: 20px;
    }

    .pro__item-symbol {
        font-size: 12px;
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