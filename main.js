import Vue from 'vue'
import App from './App'
import u from '@/common/util'
Vue.config.productionTip = false

App.mpType = 'app'

Vue.mixin({
    methods: {
        jump(url) {
            u.jump(url)
        },
        back() {
            u.back()
        }
    }
})

const app = new Vue({
    ...App
})
app.$mount()
