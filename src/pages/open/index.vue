<template>
  <div>
    <a class="store">
      <image src="/static/img/open-item1.jpg" mode="aspectFill"></image>
      <div class="store-tit">三分联盟专卖店（工厂直供）</div>
      <div class="store-price"><div class="store-price-price1">优选价: </div><div class="store-price-price2">￥</div><div class="store-price-price3">9999</div></div>
      <div class="store-del">原价：￥19999</div>
    </a>
    <a class="store">
      <image src="/static/img/open-item2.jpg" mode="aspectFill"></image>
      <div class="store-tit">三分联盟专卖店（工厂直供）</div>
      <div class="store-price"><div class="store-price-price1">优选价: </div><div class="store-price-price2">￥</div><div class="store-price-price3">9999</div></div>
      <div class="store-del">原价：￥19999</div>
    </a>
    <a class="store">
      <image src="/static/img/open-item3.jpg" mode="aspectFill"></image>
      <div class="store-tit">三分联盟专卖店（工厂直供）</div>
      <div class="store-price"><div class="store-price-price1">优选价: </div><div class="store-price-price2">￥</div><div class="store-price-price3">9999</div></div>
      <div class="store-del">原价：￥19999</div>
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

    }
  },
  created () {

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
