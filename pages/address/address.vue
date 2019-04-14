<template>
    <div>
        <div class="address">
            <uni-swipe-action :options="swipeOption" v-for="(item, index) in addressArr" :key="index" @click="bindClick()" @opened="bindOpened(index)" @closed="bindClosed(index)">
                <div class="address__item" @click="select(item)">
                    <div class="address__item-info">{{item.name}} {{item.phone}} <span v-if="item.isDefault" class="address__item-default">默认</span></div>
                    <div class="address__item-detail">{{item.detail}}</div>
                </div>
            </uni-swipe-action>
        </div>
        <a class="address__tf" @click="add">新增地址</a>
    </div>
</template>
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
            let id = that.addressArr[that.swipeIndex].id
            console.log(id)
            if (value.text === '删除') {
                u.request({
                    url: u.api.getAddress,
                    method: 'POST',
                    data: {
                        id: id
                    },
                    isVerifyLogin: true,
                    isShowLoading: true,
                    isShowError: true,
                    success(res) {
                        console.log(res)
                        that.load()
                    },
                    fail(res) {
                        console.error(res)
                    }
                })
            } else if (value.text === '编辑') {
                uni.navigateTo({
                    url: '/pages/addressdetail/addressdetail?id=' + id
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
                uni.navigateBack()
            }
        },
        // 请求地址
        load() {
            let that = this
            u.request({
                url: u.api.getAddress,
                method: 'POST',
                data: {},
                isVerifyLogin: true,
                isShowLoading: true,
                isShowError: true,
                success(res) {
                    console.log(res)
                    // 默认第一个地址
                    res = [
                        {
                            id: '18887',
                            name: '林多多',
                            phone: '15845454545',
                            detail: '广东省广州市天河区车陂文化大街1号',
                            isDefault: true
                        },
                        {
                            id: '9',
                            name: '林多多',
                            phone: '15845454545',
                            detail: '广东省广州市天河区车陂文化大街2号',
                            isDefault: false
                        }
                    ]
                    if (res && res.length) {
                        that.addressArr = res
                    }
                },
                fail(res) {
                    console.error(res)
                }
            })
        },
        add() {
            uni.navigateTo({
                url: '/pages/addressdetail/addressdetail'
            })
        }
    },
    mounted() {
        let that = this
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
        that.load()
    }
}
</script>