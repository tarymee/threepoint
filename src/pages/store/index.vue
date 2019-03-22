<template>
  <div>
    <div class="store-po"><image src="/static/img/icon-address.png" mode="aspectFill"></image>广东省 广州市 天河区</div>
    <div class="store-img">
      <image src="http://fpoimg.com/750x400" mode="aspectFill"></image>
      <div class="store-img-po">
        <div class="store-img-po-l">广东省 广州市 天河区</div>
        <div class="store-img-po-r">请选择 ></div>
      </div>
    </div>

    <a class="store" @click="link(item.phone)" v-for="(item, index) in storeArr" :key="index">
      <div class="store-tit">
        <div class="store-tit-l">{{item.name}}</div>
        <div class="store-tit-r">{{item.distance}}</div>
      </div>
      <div class="store-address">
        <div class="store-address-l">{{item.address}}</div>
        <div class="store-address-r">{{item.type}}</div>
      </div>
    </a>

  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      storeArr: [
        {
          distance: '10km',
          name: '三分联盟专卖店三分联盟专卖店三分联盟专卖店（工厂直供）',
          address: '广东省广州市天河区kkk街道',
          type: '直营店'
        },
        {
          distance: '20km',
          name: '三分联盟专卖店（工厂直供）',
          address: '广东省广州市天河区kkk街道广东省广州市天河区kkk街道广东省广州市天河区kkk街道',
          type: '直营店'
        },
        {
          distance: '30km',
          name: '三分联盟专卖店（工厂直供）',
          address: '广东省广州市天河区kkk街道',
          type: '直营店'
        }
      ]
    }
  },
  methods: {
    link (number) {
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
.store-po {
  line-height: 90rpx;
  height: 90rpx;
  padding: 0 30rpx;
  overflow: hidden;
  vertical-align: top;
  font-size: 28rpx;
}
.store-po image {
  margin-top: 24rpx;
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
  vertical-align: top;
}


.store-img {
  position: relative;
  height: 200px;
  margin-bottom: 30rpx;
}
.store-img image {
  display: block;
  width: 750rpx;
  height: 340rpx;
}
.store-img-po {
  overflow: hidden;
  height: 100rpx;
  line-height: 100rpx;
  width: 630rpx;
  margin: 0 30rpx;
  padding: 0 30rpx;
  background-color: #fff;
  border-radius: 10rpx;
  position: absolute;
  top: 300rpx;
  font-size: 28rpx;
  box-shadow: 0px 10rpx 20rpx #eee;
}
.store-img-po-l {
  float: left;
}
.store-img-po-r {
  float: right;
  color: #999;
}

.store {
  margin: 0 30rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f1f1f1;
}
.store-tit {
  color: #333;
  overflow: hidden;
  line-height: 50rpx;
}
.store-tit-l {
  float: left;
  width: 80%;
  font-size: 28rpx;
  font-weight: bold;
}
.store-tit-r {
  float: right;
  font-size: 24rpx;
  color: #999;
}
.store-address {
  color: #333;
  overflow: hidden;
  font-size: 24rpx;
  line-height: 50rpx;
}
.store-address-l {
  float: left;
  width: 80%;
  color: #999;
}
.store-address-r {
  line-height: 40rpx;
  height: 40rpx;
  float: right;
  background-color: #55a5ff;
  color: #ffffff;
  padding: 0 6rpx;
  border-radius: 4rpx;
}



</style>
