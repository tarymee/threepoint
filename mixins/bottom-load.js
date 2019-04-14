
import u from '@/common/util'
let bottomLoad_pageindex = 1
let bottomLoad_pagetotal = 1
let bottomLoad_isload = true

const bottomLoad = {
    data() {
        return {
            bottomLoad_api: '',
            bottomLoad_pagesize: 20,
            bottomLoad_params: {},
            bottomLoad_tip: '加载中...',
            bottomLoad_data: []
        }
    },
    onReachBottom: function (t) {
        console.log('触底执行')
        let that = this
        that.bottomLoad_load()
    },
    mounted() {
        console.log('mixins tt-bottom-load mounted')
        let that = this
        that.bottomLoad_reload()
    },
    methods: {
        bottomLoad_reload() {
            let that = this
            // that.$parent.haha()
            // console.log(that.bottomLoad_api)
            // 父组件可能会更改api和params
            // 滚动到顶部
            that.bottomLoad_data = []
            bottomLoad_pageindex = 1
            bottomLoad_pagetotal = 1
            bottomLoad_isload = true
            that.bottomLoad_tip = '加载中...'
            that.bottomLoad_load()
        },
        bottomLoad_load() {
            let that = this
            if (bottomLoad_pageindex <= bottomLoad_pagetotal && bottomLoad_isload) {
                bottomLoad_isload = false
                let postData = {
                    pagesize: Number(that.bottomLoad_pagesize),
                    pageindex: bottomLoad_pageindex,
                    ...that.bottomLoad_params
                }
                u.request({
                    url: that.bottomLoad_api,
                    method: 'POST',
                    data: postData,
                    isVerifyLogin: false,
                    success(res) {
                        console.log(res)
                        res.newest = [
                            {
                                logo: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                                title: '青花瓷功夫茶杯',
                                marketPrice: '386',
                                url: '/pages/product/product?id=5188314&title=青花瓷89CM&price=16&cover=https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading'
                            },
                            {
                                logo: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                                title: '青花瓷功夫茶杯',
                                marketPrice: '386',
                                url: '/pages/product/product?id=5188314&title=青花瓷89CM&price=16&cover=https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading'
                            },
                            {
                                logo: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                                title: '青花瓷功夫茶杯',
                                marketPrice: '386',
                                url: '/pages/product/product?id=5188314&title=青花瓷89CM&price=16&cover=https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading'
                            },
                            {
                                logo: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                                title: '青花瓷功夫茶杯',
                                marketPrice: '386',
                                url: '/pages/product/product?id=5188314&title=青花瓷89CM&price=16&cover=https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading'
                            },
                            {
                                logo: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                                title: '青花瓷功夫茶杯',
                                marketPrice: '386',
                                url: '/pages/product/product?id=5188314&title=青花瓷89CM&price=16&cover=https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading'
                            },
                            {
                                logo: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                                title: '青花瓷功夫茶杯',
                                marketPrice: '386',
                                url: '/pages/product/product?id=5188314&title=青花瓷89CM&price=16&cover=https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading'
                            },
                            {
                                logo: 'https://cbu01.alicdn.com/img/ibank/2018/466/073/9464370664_1899654620.220x220.jpg',
                                title: '青花瓷功夫茶杯',
                                marketPrice: '386',
                                url: '/pages/product/product?id=5188314&title=青花瓷89CM&price=16&cover=https://pic.36krcnd.com/201903/25021423/n0x2x3v809xijacy!heading'
                            }
                        ]
                        if (Array.isArray(res.newest) && res.newest.length) {
                            that.bottomLoad_data = that.bottomLoad_data.concat(res.newest)
                            // that.bottomLoad_data = [that.bottomLoad_data, ...res.newest]
                        }
                        console.log(that.bottomLoad_data)
                        bottomLoad_pagetotal = 3
                        bottomLoad_pageindex++

                        if (bottomLoad_pagetotal === 0) {
                            that.bottomLoad_tip = '暂无数据'
                            bottomLoad_isload = false
                        } else if (bottomLoad_pageindex > bottomLoad_pagetotal) {
                            that.bottomLoad_tip = '没有数据了'
                            bottomLoad_isload = false
                        } else {
                            bottomLoad_isload = true
                        }
                    },
                    fail(res) {
                        that.bottomLoad_tip = '加载失败 点击重新加载'
                        bottomLoad_isload = true
                    }
                })
            }
        }
    }
}

module.exports = bottomLoad