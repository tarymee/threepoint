import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.mixin({
    methods: {
        jump(url) {
            if (url) {
                console.log(url)
                if (url.indexOf('pages/index/index') != -1 || url.indexOf('pages/user/user') != -1 || url.indexOf('pages/open/open') != -1 || url.indexOf('pages/store/store') != -1 || url.indexOf('pages/cart/cart') != -1) {
                    uni.switchTab({
                        url: url
                    })
                } else {
                    uni.navigateTo({
                        url: url
                    })
                }
            } else {
                console.log('没有url')
            }
        },
        back() {
            let that = this
            let pages = getCurrentPages()
            // console.log('页面栈', pages)
            if (pages.length > 1) {
                uni.navigateBack()
            } else {
                that.jump('/pages/index/index')
            }
        }
    }
})

const app = new Vue({
    ...App
})
app.$mount()
