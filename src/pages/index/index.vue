<template>
  <div>
    <div class="people">
      <div class="people-l-img"><image src="http://fpoimg.com/100x100" mode="aspectFill"></image></div>
      <div class="people-l-store"><div class="people-l-name">彭于晏</div><div class="people-l-storename">三分联盟直营店</div></div>
      <div class="people-r" style="border-left: 1px solid #e9e9e9"><image src="/static/img/home-icon2.png" mode="aspectFill"></image><div class="people-r-des">客服</div></div>
      <div class="people-r" @click="phone()"><image src="/static/img/home-icon1.png" mode="aspectFill"></image><div class="people-r-des">电话</div></div>
    </div>

    <swiper v-if="sliderArr.length > 0" autoplay="true" interval="5000" duration="300" class="swiper">
      <block v-for="(item, index) in sliderArr" :key="index" >
        <swiper-item>
          <image lazy-load :src="item.img" mode="aspectFill" @click="jump(item.url)"></image>
        </swiper-item>
      </block>
    </swiper>

    <div class="cate">
      <a class="cate-item" href="/pages/counter/main"><image src="/static/img/home-cate1.png" mode="aspectFill"></image><text>竹木类</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="/static/img/home-cate2.png" mode="aspectFill"></image><text>陶瓷类</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="/static/img/home-cate3.png" mode="aspectFill"></image><text>玻璃类</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="/static/img/home-cate4.png" mode="aspectFill"></image><text>不锈钢</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="/static/img/home-cate5.png" mode="aspectFill"></image><text>装饰类</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="/static/img/home-cate6.png" mode="aspectFill"></image><text>布料</text></a>
    </div>

    <div class="title">新品推荐</div>
    <div class="pro1">
      <scroll-view scroll-x>
      <a class="pro1-item" v-for="(item, index) in newArr" :key="index" :href="item.url">
          <image :src="item.img" mode="aspectFill"></image>
          <text class="pro1-item-tit">{{item.name}}</text>
          <div class="pro1-item-price"><text>￥</text>{{item.price}}</div>
        </a>
      </scroll-view>
    </div>
    <div class="more">
      <a class="more-btn" href="/pages/counter/main">查看更多</a>
    </div>

    <div class="title">精选商品</div>
    <div class="pro">
      <a class="pro-item" v-for="(item, index) in choiceArr" :key="index" :href="item.url">
        <image :src="item.img" mode="aspectFill"></image>
        <text class="pro-item-tit">{{item.name}}</text>
        <div class="pro-item-price"><text>￥</text>{{item.price}}</div>
      </a>
    </div>

    <!-- <form class="form-container">
      <card :text="motto"></card>
      <input type="text" :value="motto" placeholder="v-model" />
      <input type="text" v-model="motto" placeholder="v-model" />
      <input type="text" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form> -->

  </div>
</template>


<script>
import card from '@/components/card'
import u from '@/utils/index'

export default {
  data () {
    return {
      // motto: 'Hello miniprograme',
      sliderArr: [
        {
          img: '/static/img/home-slider.jpg',
          url: '/pages/logs/main'
        }
      ],
      newArr: [
        {
          img: 'http://fpoimg.com/400x400',
          name: '青花瓷功夫茶杯',
          price: '386',
          url: '/pages/logs/main'
        },
        {
          img: 'http://fpoimg.com/400x400',
          name: '青花瓷功夫茶杯',
          price: '386',
          url: '/pages/logs/main'
        },
        {
          img: 'http://fpoimg.com/400x400',
          name: '青花瓷功夫茶杯',
          price: '386',
          url: '/pages/logs/main'
        },
        {
          img: 'http://fpoimg.com/400x400',
          name: '青花瓷功夫茶杯',
          price: '386',
          url: '/pages/logs/main'
        }
      ],
      choiceArr: [
        {
          img: 'http://fpoimg.com/400x400',
          name: '青花瓷功夫茶杯',
          price: '386',
          url: '/pages/logs/main'
        },
        {
          img: 'http://fpoimg.com/400x400',
          name: '青花瓷功夫茶杯',
          price: '386',
          url: '/pages/logs/main'
        }
      ]
    }
  },
  components: {
    card
  },
  methods: {
    bindViewTap () {
      const url = '/pages/logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    phone () {
      mpvue.makePhoneCall({
        phoneNumber: '1340000'
      })
    },
    jump (url) {
      // console.log(url)
      // console.log(mpvue)
      // console.log(mpvuePlatform)
      mpvue.navigateTo({
        url: url
      })
    }
  },
  created () {
    mpvue.switchTab({
      url: './pages/open/main'
    })
    // let app = getApp()
    // console.log(app)
    // console.log(this)
    // console.log(u)
    // u.wxLogin()
    // u.request({
    //   url: u.api.test,
    //   method: 'GET',
    //   data: {},
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  }
}
</script>
<style scoped>
.people {
  overflow: hidden;
  margin: 30rpx;
}
.people-l-img {
  float: left;

}
.people-l-img image {
  display: block;
  width: 100rpx;
  height: 100rpx;
  overflow: hidden;
  border-radius: 50%;
}
.people-l-store {
  margin-left: 20rpx;
  float: left;
}
.people-l-name {
  line-height: 50rpx;
  font-size: 32rpx;
  color: #333;
}
.people-l-storename {
  line-height: 40rpx;
  font-size: 24rpx;
  color: #999;
}
.people-r {
  float: right;
  padding-left: 30rpx;
  margin-top: 10rpx;
  margin-left: 30rpx;
}
.people-r image {
  display: block;
  width: 50rpx;
  height: 50rpx;
}
.people-r-des {
  font-size: 12px;
  line-height: 30rpx;
  color: #999;
  line-height: 12px;
}

.swiper {
  width: 690rpx;
  border-radius: 10rpx;
  overflow: hidden;
  margin: 0 30rpx 0 30rpx;
  height: 300rpx;
}
.swiper swiper-item {
  background: #eee;
}
.swiper image {
  width: 100%;
  height: 300rpx;
}


.cate {
  margin: 30rpx;
  overflow: hidden;
}
.cate-item {
  width: 230rpx;
  padding: 10rpx 0;
  float: left;
}
.cate-item image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  overflow: hidden;
  display: block;
  margin: 0px auto;
}
.cate-item text {
  display: block;
  font-size: 24rpx;
  line-height: 40rpx;
  text-align: center;
  color: #333;
}

.title {
  height: 100rpx;
  width: 100%;
  line-height: 100rpx;
  font-size: 38rpx;
  font-weight: bold;
  text-align: center;
  background-image: -webkit-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
  background-image: -o-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
  background-image: -moz-linear-gradient(top, #eee, #fff, #fff, #fff, #fff);
  background-image: linear-gradient(to bottom, #eee, #fff, #fff, #fff, #fff);
}

.pro1 {
  margin: 10rpx 0 30rpx 30rpx;
}
.pro1 scroll-view {
 white-space: nowrap;
}
.pro1-item {
  display: inline-block;
  margin-right: 20rpx;
}
.pro1-item image {
  display: block;
  width: 250rpx;
  height: 250rpx;
}
.pro1-item-tit {
  display: block;
  font-size: 26rpx;
  color: #333;
  line-height: 50rpx;
}
.pro1-item-price {
  display: block;
  font-size: 32rpx;
  color: #d1a178;
  font-weight: bold;
  line-height: 40rpx;
}
.pro1-item-price text {
  font-size: 12px;
}

.more {
  margin: 30rpx 0px;
  text-align: center;
}
.more-btn {
  display: inline-block;
  line-height: 60rpx;
  height: 60rpx;
  border: 1rpx solid #d1a178;
  border-radius: 30rpx;
  padding: 0 50rpx;
  font-size: 28rpx;
  text-align: center;
  color: #d1a178;
}

.pro {
  overflow: hidden;
  margin: 0 20rpx 30rpx;
}
.pro-item {
  float: left;
  margin: 10rpx;
}
.pro-item image {
  display: block;
  width: 335rpx;
  height: 335rpx;
}
.pro-item-tit {
  display: block;
  font-size: 26rpx;
  color: #333;
  line-height: 50rpx;
}
.pro-item-price {
  display: block;
  font-size: 32rpx;
  color: #d1a178;
  font-weight: bold;
  line-height: 40rpx;
}
.pro-item-price text {
  font-size: 12px;
}
</style>
