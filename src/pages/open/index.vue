<template>
  <div>
    <a class="store" @click="contact(item.phone)" v-for="(item, index) in storeArr" :key="index">
      <image :src="item.img" mode="aspectFill"></image>
      <div class="store-tit">{{item.name}}</div>
      <div class="store-price"><div class="store-price-price1">优选价: </div><div class="store-price-price2">￥</div><div class="store-price-price3">{{item.price}}</div></div>
      <div class="store-del">原价：￥{{item.delprice}}</div>
    </a>

    <div class="con">
      <image src="/static/img/open-art1.jpg" mode="aspectFill" style="height: 860rpx"></image>
      <image src="/static/img/open-art2.jpg" mode="aspectFill" style="height: 628rpx"></image>
      <image src="/static/img/open-art3.jpg" mode="aspectFill" style="height: 1031rpx"></image>
      <image src="/static/img/open-art4.jpg" mode="aspectFill" style="height: 882rpx"></image>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      storeArr: [
        {
          img: '/static/img/open-item1.jpg',
          name: '三分联盟专卖店（工厂直供）',
          price: '386',
          delprice: '19999',
          phone: '13666666666'
        },
        {
          img: '/static/img/open-item2.jpg',
          name: '三分联盟专卖店（工厂直供）',
          price: '386',
          delprice: '19999',
          phone: '13666666666'
        },
        {
          img: '/static/img/open-item3.jpg',
          name: '三分联盟专卖店（工厂直供）',
          price: '386',
          delprice: '19999',
          phone: '13666666666'
        }
      ]
    }
  },
  methods: {
    contact (number) {
      mpvue.showModal({
        title: '提示',
        content: '请与店主联系',
        success() {
          mpvue.makePhoneCall({
            phoneNumber: number
          })
        },
        showCancel: false
      })
    }
  },
  mounted () {
    console.log('open mounted')
  },
  created () {
    console.log('open created')
  }
}
</script>

<style scoped>
.store {
  margin: 30rpx;
}
.store image {
  display: block;
  width: 690rpx;
  height: 370rpx;
  border-radius: 10rpx;
  overflow: hidden;
}
.store-tit {
  color: #333;
  font-size: 30rpx;
  line-height: 60rpx;
}
.store-price {
  line-height: 40rpx;
  vertical-align: top;
}
.store-price-price1 {
  display: inline-block;
  font-size: 26rpx;
  color: #333;
  vertical-align: top;
}
.store-price-price2 {
  display: inline-block;
  font-size: 24rpx;
  color: #d1a178;
  vertical-align: top;
}
.store-price-price3 {
  display: inline-block;
  font-size: 40rpx;
  color: #d1a178;
  vertical-align: top;
}
.store-del {
  color: #999;
  font-size: 22rpx;
  text-decoration: line-through;
}


.con image {
  display: block;
  width: 750rpx;
}
</style>
