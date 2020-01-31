
import u from '@/common/util'
let bottomLoad_pageindex = 1
let bottomLoad_pagetotal = 1
let bottomLoad_isload = true

const bottomLoad = {
    data() {
        return {
            bottomLoad_api: '',
            bottomLoad_pagesize: 10,
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
        // that.bottomLoad_reload()
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
                    limit: Number(that.bottomLoad_pagesize),
                    page: bottomLoad_pageindex,
                    ...that.bottomLoad_params
                }
                let isVerifyLogin = false
                if (that.bottomLoad_type === 'order') {
                    isVerifyLogin = true
                }
                u.request({
                    url: that.bottomLoad_api,
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                        // 'content-type': 'application/json'
                    },
                    data: postData,
                    isVerifyLogin: isVerifyLogin,
                    success(res) {
                        console.log(res)
                        if (that.bottomLoad_type === 'order') {
                            if (res && res.code == 1 && res.data && res.data.list && res.data.list.length) {
                                let list = res.data.list
                                let list2 = []
                                list.forEach((item, i) => {
                                    let order = {
                                        order_id: item.order_id,
                                        order_no: item.order_no,
                                        create_time: item.create_time,
                                        pay_time: item.pay_time,
                                        delivery_time: item.delivery_time,
                                        receipt_time: item.receipt_time,
                                        status: item.status,
                                        order_total_price: item.total_price,
                                        express_price: item.express_price,
                                        order_pay_price: item.pay_price,
                                        totalcount: item.goods.length,
                                        pay_status: item.pay_status,
                                        delivery_status: item.delivery_status,
                                        receipt_status: item.receipt_status,
                                        order_status: item.order_status,
                                        detail: []
                                    }
                                    item.goods.forEach((item2, i) => {
                                        order.detail.push({
                                            goods_id: item2.goods_id,
                                            img: item2.image.file_path,
                                            count: item2.total_num,
                                            price: item2.goods_price,
                                            specTip: item2.goods_attr,
                                            name: item2.goods_name
                                        })
                                    })
                                    list2.push(order)
                                })
                                that.bottomLoad_data = that.bottomLoad_data.concat(list2)
                            }
                            console.log(that.bottomLoad_data)
                            bottomLoad_pagetotal = Number(res.pagetotal)

                            // res = {
                            //     data: [
                            //         {
                            //             order_id: '1234567890',
                            //             status: '1', // 订单状态 已完成 未付款什么的 状态你定
                            //             totalcount: '1',
                            //             order_total_price: '100.00',
                            //             express_price: '10.00',
                            //             order_pay_price: '110.00',
                            //             detail: [
                            //                 {
                            //                     goods_id: '1',
                            //                     img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            //                     count: '1',
                            //                     price: '100',
                            //                     specTip: '规格: 天蓝色 S码',
                            //                     name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                            //                 }
                            //             ]
                            //         },
                            //         {
                            //             order_id: '1234567890',
                            //             status: '2',
                            //             totalcount: '1',
                            //             order_total_price: '100.00',
                            //             express_price: '10.00',
                            //             order_pay_price: '110.00',
                            //             detail: [
                            //                 {
                            //                     goods_id: '1',
                            //                     img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            //                     count: '1',
                            //                     price: '100',
                            //                     specTip: '规格: 天蓝色 S码',
                            //                     name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                            //                 },
                            //                 {
                            //                     goods_id: '1',
                            //                     img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            //                     count: '1',
                            //                     price: '100',
                            //                     specTip: '规格: 天蓝色 S码',
                            //                     name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                            //                 }
                            //             ]
                            //         },
                            //         {
                            //             order_id: '12345679590',
                            //             status: '3',
                            //             totalcount: '1',
                            //             order_total_price: '100.00',
                            //             express_price: '10.00',
                            //             order_pay_price: '110.00',
                            //             detail: [
                            //                 {
                            //                     goods_id: '1',
                            //                     img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            //                     count: '1',
                            //                     price: '100',
                            //                     specTip: '规格: 天蓝色 S码',
                            //                     name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                            //                 }
                            //             ]
                            //         },
                            //         {
                            //             order_id: '12345678790',
                            //             status: '4',
                            //             totalcount: '1',
                            //             order_total_price: '100.00',
                            //             express_price: '10.00',
                            //             order_pay_price: '110.00',
                            //             detail: [
                            //                 {
                            //                     goods_id: '1',
                            //                     img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            //                     count: '1',
                            //                     price: '100',
                            //                     specTip: '规格: 天蓝色 S码',
                            //                     name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                            //                 }
                            //             ]
                            //         },
                            //         {
                            //             order_id: '12345678790',
                            //             status: '5',
                            //             totalcount: '1',
                            //             order_total_price: '100.00',
                            //             express_price: '10.00',
                            //             order_pay_price: '110.00',
                            //             detail: [
                            //                 {
                            //                     goods_id: '1',
                            //                     img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            //                     count: '1',
                            //                     price: '100',
                            //                     specTip: '规格: 天蓝色 S码',
                            //                     name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                            //                 }
                            //             ]
                            //         },
                            //         {
                            //             order_id: '12345678790',
                            //             status: '6',
                            //             totalcount: '1',
                            //             order_total_price: '100.00',
                            //             express_price: '10.00',
                            //             order_pay_price: '110.00',
                            //             detail: [
                            //                 {
                            //                     goods_id: '1',
                            //                     img: 'https://cbu01.alicdn.com/img/ibank/2018/122/260/9488062221_1899654620.400x400.jpg',
                            //                     count: '1',
                            //                     price: '100',
                            //                     specTip: '规格: 天蓝色 S码',
                            //                     name: '日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤日系复古短袖T恤'
                            //                 }
                            //             ]
                            //         }
                            //     ]
                            // }
                            // if (Array.isArray(res.data) && res.data.length) {
                            //     that.bottomLoad_data = that.bottomLoad_data.concat(res.data)
                            // }
                            // console.log(that.bottomLoad_data)
                            // // bottomLoad_pagetotal = Number(res.pagetotal)
                            // bottomLoad_pagetotal = 3
                        } else {
                            if (Array.isArray(res.data) && res.data.length) {
                                that.bottomLoad_data = that.bottomLoad_data.concat(res.data)
                            }
                            console.log(that.bottomLoad_data)
                            bottomLoad_pagetotal = Number(res.pagetotal)
                            // bottomLoad_pagetotal = 3
                        }

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