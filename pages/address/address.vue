<template>
    <div>
        <div class="address">
            <uni-swipe-action :options="swipeOption" v-for="(item, index) in addressArr" :key="index" @click="bindClick()" @opened="bindOpened(index)" @closed="bindClosed(index)">
                <div class="address__item" @click="select(item)">
                    <div class="address__item-info">{{item.name}} {{item.phone}} <span v-if="item.isDefault" class="address__item-default">默认</span></div>
                    <div class="address__item-detail">{{item.region[0]}} {{item.region[1]}} {{item.region[2]}} {{item.detail}}</div>
                </div>
            </uni-swipe-action>
        </div>
        <a class="address__tf" @click="add">新增地址</a>
    </div>
</template>

<script>
import u from '@/common/util'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
export default {
    components: {
        uniSwipeAction
    },
    data() {
        return {
            from: '',
            swipeOption: [
                {
                    text: '设为默认',
                    style: {
                        backgroundColor: '#f00'
                    }
                },
                {
                    text: '编辑',
                    style: {
                        backgroundColor: '#d1a178'
                    }
                },
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#f00'
                    }
                }
            ],
            swipeIndex: null,
            addressArr: []
        }
    },
    methods: {
        bindClick(value) {
            let that = this
            // console.log(value)
            let address_id = that.addressArr[that.swipeIndex].address_id
            console.log(address_id)
            if (value.text === '删除') {
                u.request({
                    url: u.api.addressdel,
                    data: {
                        address_id: address_id
                    },
                    isVerifyLogin: true,
                    success(res) {
                        console.log(res)
                        if (res && res.code == 1) {
                            that.load()
                        }
                    }
                })
            } else if (value.text === '编辑') {
                uni.navigateTo({
                    url: '/pages/addressdetail/addressdetail?address_id=' + address_id
                })
            } else if (value.text === '设为默认') {
                u.request({
                    url: u.api.addressdefault,
                    data: {
                        address_id: address_id
                    },
                    isVerifyLogin: true,
                    success(res) {
                        console.log(res)
                        if (res && res.code == 1) {
                            that.load()
                        }
                    }
                })
            }
        },
        bindOpened(index) {
            // console.log(index)
            this.swipeIndex = index
        },
        bindClosed(index) {
            // console.log(index)
            this.swipeIndex = null
        },
        // 订单确认页选择地址
        select(item) {
            let that = this
            console.log(item)
            if (that.from === 'confirm') {
                uni.setStorageSync('confirmAddress', item)
                that.back()
            }
        },
        // 请求地址
        load() {
            let that = this
            u.request({
                url: u.api.addresslist,
                data: {},
                isVerifyLogin: true,
                success(res) {
                    // res = [
                    //     {
                    //         address_id: '18887',
                    //         name: '林多多',
                    //         phone: '15845454545',
                    //         region: ['北京市', '北京市', '东城区'],
                    //         detail: '车陂文化大街1号',
                    //         isDefault: false
                    //     },
                    //     {
                    //         address_id: '1886547',
                    //         name: '李先生',
                    //         phone: '15845454545',
                    //         region: ['广东省', '广州市', '天河区'],
                    //         detail: '黄埔大道车陂文化大街1号15乡6号楼7层105室',
                    //         isDefault: true
                    //     }
                    // ]
                    // if (res && res.length) {
                    //     that.addressArr = res
                    // }

                    console.log(res)
                    if (res && res.code == 1 && res.data && res.data.length) {
                        that.addressArr = res.data
                    }
                }
            })
        },
        add() {
            uni.navigateTo({
                url: '/pages/addressdetail/addressdetail'
            })
        }
    },
    // 监听新增地址回调
    onShow() {
        console.log('address onShow')
        let that = this
        that.load()
    },
    onLoad(event) {
        console.log("address onLoad")
        let that = this
        console.log(event)
        that.from = event.from
    }
}
</script>
<style>
page {
    background-color: rgb(247,247,247);
}
</style>
<style scoped>
.address {
    overflow: hidden;
    margin-bottom: 60px;
}
.address__item {
    padding: 15px 20px;
    background-color: #fff;
    border-bottom: 1upx solid #eee;
}
.address__item-info {
    font-size: 16px;
    line-height: 25px;
    color: #333;
}
.address__item-default {
    display: inline-block;
    background-color: #d1a178;
    color: #ffffff;
    border-radius: 3px;
    padding: 0 5px;
    font-size: 12px;
    line-height: 18px;
    margin-top: 3px;
    margin-left: 10px;
    vertical-align: top;
}
.address__item-detail {
    font-size: 12px;
    line-height: 20px;
    color: #999;
}

.address__tf {
    display: block;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    background-color: #d1a178;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    position: fixed;
    bottom: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>