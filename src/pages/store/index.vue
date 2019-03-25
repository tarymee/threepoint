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

    <a class="store" @click="jump(item.url)" v-for="(item, index) in storeArr" :key="index">
      <div class="store-tit">
        <div class="store-tit-l">{{item.name}}</div>
        <div class="store-tit-r">{{item.distance}}</div>
      </div>
      <div class="store-address">
        <div class="store-address-l">{{item.address}}</div>
        <div class="store-address-r">{{item.type}}</div>
      </div>
    </a>
    <div class="none" v-if="storeArr.length == 0">很抱歉 该地区暂未开通</div>

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
          type: '直营店',
          url: '/pages/logs/main'
        },
        {
          distance: '20km',
          name: '三分联盟专卖店（工厂直供）',
          address: '广东省广州市天河区kkk街道广东省广州市天河区kkk街道广东省广州市天河区kkk街道',
          type: '直营店',
          url: '/pages/logs/main'
        },
        {
          distance: '30km',
          name: '三分联盟专卖店（工厂直供）',
          address: '广东省广州市天河区kkk街道',
          type: '直营店',
          url: '/pages/logs/main'
        }
      ]
    }
  },
  methods: {
    jump (url) {
      mpvue.navigateTo({
        url: url
      })
    }
  },
  mounted () {
    console.log('store mounted')
  },
  created () {
    // console.log('store created')
  }
}
</script>

<style scoped>
.store-po {
  line-height: 45px;
  height: 45px;
  padding: 0 15px;
  overflow: hidden;
  vertical-align: top;
  font-size: 14px;
}
.store-po image {
  margin-top: 12px;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: top;
}


.store-img {
  position: relative;
  height: 200px;
  margin-bottom: 15px;
}
.store-img image {
  display: block;
  width: 375px;
  height: 170px;
}
.store-img-po {
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  width: 315px;
  margin: 0 15px;
  padding: 0 15px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 150px;
  font-size: 14px;
  box-shadow: 0px 5px 10px #eee;
}
.store-img-po-l {
  float: left;
}
.store-img-po-r {
  float: right;
  color: #999;
}

.store {
  margin: 0 15px;
  padding: 10px 0;
  border-bottom: 1rpx solid #f1f1f1;
}
.store-tit {
  color: #333;
  overflow: hidden;
  line-height: 25px;
}
.store-tit-l {
  float: left;
  width: 80%;
  font-size: 14px;
  font-weight: bold;
}
.store-tit-r {
  float: right;
  font-size: 12px;
  color: #999;
}
.store-address {
  color: #333;
  overflow: hidden;
  line-height: 25px;
}
.store-address-l {
  float: left;
  width: 80%;
  font-size: 12px;
  color: #999;
}
.store-address-r {
  line-height: 20px;
  height: 20px;
  float: right;
  background-color: #55a5ff;
  color: #ffffff;
  padding: 0 3px;
  border-radius: 2px;
  font-size: 10px;
}
</style>
