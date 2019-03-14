<template>
  <div>
    <swiper v-if="imgUrls.length > 0" indidator-dots="imgUrls.length > 1" indicator-color="rgba(255,255,255,.3)" indicator-active-color="white" circular="true" autoplay="true" interval="5000" duration="300" class="swiper">
      <block v-for="(item, index) in imgUrls" :key="index" >
        <swiper-item>
          <image lazy-load :src="item.src" mode="aspectFill" @click="jump(item.url)"></image>
        </swiper-item>
      </block>
    </swiper>

    <div class="cate">
      <a class="cate-item" href="/pages/counter/main"><image src="http://fpoimg.com/100x100" mode="aspectFill"></image><text>kkk</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="http://fpoimg.com/100x100" mode="aspectFill"></image><text>kkk</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="http://fpoimg.com/100x100" mode="aspectFill"></image><text>kkk</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="http://fpoimg.com/100x100" mode="aspectFill"></image><text>kkk</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="http://fpoimg.com/100x100" mode="aspectFill"></image><text>kkk</text></a>
      <a class="cate-item" href="/pages/counter/main"><image src="http://fpoimg.com/100x100" mode="aspectFill"></image><text>kkk</text></a>
    </div>

    <div class=""></div>

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
      motto: 'Hello miniprograme',
      imgUrls: [
        {
          src: 'http://fpoimg.com/700x300',
          url: '../logs/main'
        },
        {
          src: 'http://fpoimg.com/300x300',
          url: '../logs/main'
        },
        {
          src: 'http://fpoimg.com/300x700',
          url: '../logs/main'
        }
      ],
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    jump (url) {
      // console.log(url)
      // console.log(mpvue)
      // console.log(mpvuePlatform)
      mpvue.navigateTo({
        url: url
      })
    },
    test (ev) {
      mpvue.showLoading({
        mask: true
      })
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },
  created () {
    let app = getApp()
    console.log(app)
    console.log(this)
    console.log(u)
    u.wxLogin()
  }
}
</script>

<style scoped>
.swiper {
  border-radius: 10rpx;
  overflow: hidden;
  margin: 0 30rpx;
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
  width: 33.33%;
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
  font-size: 28rpx;
  line-height: 50rpx;
  margin-bottom: 10rpx;
  text-align: center;
  color: #333;
}



</style>