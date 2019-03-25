<template>
  <div>

    <div class="avt-wrap">
      <div class="avt">
        <image :src="user.logo" mode="aspectFill"></image>
        <div class="avt-name">{{user.name}}</div>
      </div>
    </div>

    <div class="user">
      <a class="list" style="border: none" href="/pages/myorder/main">
        <div class="list-l">我的订单</div>
        <div class="list-r">查看全部 <image src="/static/img/right-icon.png" mode="aspectFill"></image></div>
      </a>

      <div class="status">
        <a class="status-item" href="/pages/order/main"><image src="/static/img/user-icon1.png" mode="aspectFill"></image><text>待付款</text></a>
        <a class="status-item" href="/pages/order/main"><image src="/static/img/user-icon2.png" mode="aspectFill"></image><text>待发货</text></a>
        <a class="status-item" href="/pages/order/main"><image src="/static/img/user-icon3.png" mode="aspectFill"></image><text>待收款</text></a>
        <a class="status-item" href="/pages/order/main"><image src="/static/img/user-icon4.png" mode="aspectFill"></image><text>已完成</text></a>
        <a class="status-item" href="/pages/order/main"><image src="/static/img/user-icon5.png" mode="aspectFill"></image><text>退换/售后</text></a>
      </div>

      <div style="background-color: #efefef; height: 15px"></div>

      <a class="list" href="/pages/address/main">
        <div class="list-l">收获地址</div>
        <div class="list-r"><image src="/static/img/right-icon.png" mode="aspectFill"></image></div>
      </a>
      <a class="list" href="/pages/bindphone/main">
        <div class="list-l">绑定手机</div>
        <div class="list-r">未绑定 <image src="/static/img/right-icon.png" mode="aspectFill"></image></div>
      </a>
      <a class="list" href="/pages/service/main">
        <div class="list-l">联系客服</div>
        <div class="list-r"><image src="/static/img/right-icon.png" mode="aspectFill"></image></div>
      </a>
      <a class="list" href="/pages/feedback/main">
        <div class="list-l">用户反馈</div>
        <div class="list-r"><image src="/static/img/right-icon.png" mode="aspectFill"></image></div>
      </a>
      <a class="list" href="/pages/about/main">
        <div class="list-l">关于</div>
        <div class="list-r"><image src="/static/img/right-icon.png" mode="aspectFill"></image></div>
      </a>

      <div style="height: 50px"></div>

    </div>
  </div>
</template>
<style scoped>
.avt-wrap {
  background: #d1a178;
  background-size: cover;
  overflow: hidden;
}
.avt {
  overflow: hidden;
  margin: 25px;
}
.avt image {
  float: left;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
}
.avt-name {
  overflow: hidden;
  line-height: 50px;
  color: #ffffff;
  font-size: 16px;
}

/* 状态 */
.status {
  margin: 10px 15px;
  overflow: hidden;
}
.status-item {
  width: 20%;
  padding: 5px 0;
  float: left;
}
.status-item image {
  width: 25px;
  height: 25px;
  overflow: hidden;
  display: block;
  margin: 0px auto 5px;
}
.status-item text {
  display: block;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #999;
}


.user {
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  margin-top: -5px;
  background-color: #fff;
}
</style>

<script>
import u from '@/utils/index'

export default {
  components: {},
  data () {
    return {
      user: {
        logo: 'http://fpoimg.com/100x100',
        name: 'tarymee'
      }
    }
  },
  methods: {
    test () {
      console.log('test')
    }
  },
  onPageScroll: function(t) {
    // console.log(t)
  },
  onReachBottom: function(t) {
    console.log('地步')
    this.foo()
  },
  mounted () {
    console.log('index mounted')
    var that = this
    // u.request({
    //   url: u.api.index,
    //   method: 'POST',
    //   isVerifyLogin: false,
    //   success(res) {
    //     console.log(res)
    //     that.site = res.site
    //     that.newArr = res.newest
    //     that.site = res.site
    //   }
    // })

  },
  created () {

  }
}
</script>