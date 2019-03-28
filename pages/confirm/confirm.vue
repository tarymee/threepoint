<template>
  <div>
    <!-- <div class="pro__item-price" @click="reload">重新加载</div> -->
    <tt-bottom-load :api="api" :params="postData" pagesize="20" ref="ttBottomLoad">
      <div class="pro">
        <a class="pro__item" v-for="(item, index) in data" :key="index" :href="item.url">
          <image class="pro__item-img" :src="item.logo" lazy-load="true" mode="aspectFill"></image>
          <text class="pro__item-tit">{{item.title}}</text>
          <div class="pro__item-price"><text class="pro__item-symbol">￥</text>{{item.marketPrice}}</div>
        </a>
      </div>
    </tt-bottom-load>
  </div>
</template>
<style scoped>
    /* 商品 */
    .pro {
        overflow: hidden;
        margin: 15upx 15upx 0;
    }

    .pro__item {
        float: left;
        margin: 15upx;
    }

    .pro__item-img {
        display: block;
        width: 330upx;
        height: 330upx;
        background: url('~@/static/img/loading.gif') center center no-repeat;
    }
    .pro__item-tit {
        display: block;
        font-size: 28upx;
        color: #333;
        line-height: 50upx;
    }

    .pro__item-price {
        display: block;
        font-size: 32upx;
        color: #d1a178;
        font-weight: bold;
        line-height: 40upx;
    }

    .pro__item-symbol {
        font-size: 24upx;
    }
</style>
<script>
import u from '@/common/util'
import ttBottomLoad from '@/components/tt-bottom-load/tt-bottom-load.vue'

export default {
  components: {
    ttBottomLoad
  },
  data () {
    return {
      api: u.api.index,
      pagesize: 20,
      postData: {
        id: '123456'
      }
    }
  },
  methods: {
    reload () {
      console.log('reload')
      // this.api = 'oooo'
      this.$refs.ttBottomLoad.reload()
    },
    haha () {
      console.log('haha')
    }
  }
}
</script>