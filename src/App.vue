<script>
import u from '@/utils/index'

export default {
  created () {
    console.log('app created')
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform = == 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }

    let app = getApp()
    // console.log(app)

  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}





.pagetip {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 20px 0;
}


image[lazy-load] {
  background-color: #eee;
}
.none {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 20px 0;
}


/* 列表模块 */
.list {
  display: block;
  line-height: 25px;
  padding: 15px;
  border-bottom: 1rpx solid #eee;
  overflow: hidden;
}
.list-l {
  font-size: 15px;
  float: left;
}
.list-r {
  float: right;
  color: #999;
  font-size: 14px;
}
.list-r image {
  display: inline-block;
  width: 5px;
  height: 9px;
  vertical-align: top;
  margin-top: 8px;
}


/* 商品 */
.pro {
  overflow: hidden;
  margin: 0 10px 15px;
}
.pro-item {
  float: left;
  margin: 5px;
}
.pro-item image {
  display: block;
  width: 167px;
  height: 167px;
  background-color: #eee;
}
.pro-item-tit {
  display: block;
  font-size: 13px;
  color: #333;
  line-height: 25px;
}
.pro-item-price {
  display: block;
  font-size: 16px;
  color: #d1a178;
  font-weight: bold;
  line-height: 20px;
}
.pro-item-price text {
  font-size: 12px;
}
</style>
