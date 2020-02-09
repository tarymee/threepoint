<template>
    <div>

        <div class="avt">
            <div class="avt__bd">
                <image class="avt__bd-img" :src="user.logo" mode="aspectFill"></image>
                <div class="avt__bd-con">
                    <div class="avt__bd-name">{{user.name}}</div>
                    <div class="avt__bd-level">{{user.level}}</div>
                </div>
                <div class="avt__bd-r">
                    <div class="avt__bd-money" @tap="jump('/pages/mymoney/mymoney')">我的余额：{{user.moneyYan}}元</div>
                    <div class="avt__bd-pmoney">我的收益：{{user.profitMoneyYan}}元</div>
                </div>
            </div>
        </div>
        <div class="user">
            <div class="user__list-item--noborder">
                <uni-list-item title="我的订单" @click="jump('/pages/order/order?type=')" show-badge="true" badge-text="查看全部" badge-type="default" badge-inverted="true"></uni-list-item>
            </div>

            <div class="status">
                <a class="status__item" @click="jump('/pages/order/order?type=payment')">
                    <image src="/static/img/user/icon1.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">待付款</text>
                </a>
                <a class="status__item" @click="jump('/pages/order/order?type=delivery')">
                    <image src="/static/img/user/icon2.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">待发货</text>
                </a>
                <a class="status__item" @click="jump('/pages/order/order?type=received')">
                    <image src="/static/img/user/icon3.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">待收货</text>
                </a>
                <a class="status__item" @click="jump('/pages/order/order?type=done')">
                    <image src="/static/img/user/icon4.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">已完成</text>
                </a>
                <a class="status__item" @click="jump('/pages/order/order?type=return')">
                    <image src="/static/img/user/icon5.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">退换/售后</text>
                </a>
            </div>

            <div style="background-color: #efefef; height: 15px"></div>

            <uni-list>
                <uni-list-item title="收货地址" @click="jump('/pages/address/address')"></uni-list-item>
                <uni-list-item title="绑定手机" @click="bindphone()" show-badge="true" :badge-text="user.isbindphone ? user.phone : '未绑定'" badge-type="default" badge-inverted="true"></uni-list-item>
                <uni-list-item title="我的客户" @click="jump('/pages/mycustomer/mycustomer')"></uni-list-item>
                <uni-list-item title="我的店铺" @click="jump('/pages/mystore/mystore')"></uni-list-item>
                <uni-list-item title="我的佣金" show-badge="true" :badge-text="user.profitMoneyYan" badge-type="default" badge-inverted="true" @click="jump('/pages/mycommission/mycommission')"></uni-list-item>
                <div class="service">
                    <uni-list-item title="联系客服"></uni-list-item>
                    <button open-type="contact">客服</button>
                </div>
                <uni-list-item title="操作指南" @click="jump('/pages/dolist/dolist')"></uni-list-item>
                <uni-list-item title="用户反馈" @click="jump('/pages/feedback/feedback')"></uni-list-item>
                <uni-list-item title="关于" @click="jump('/pages/about/about')"></uni-list-item>
                <uni-list-item title="退出登录" @click="loginout()"></uni-list-item>
            </uni-list>

            <div style="height: 50px"></div>
        </div>
    </div>
</template>

<script>
    import u from '@/common/util'
    import uniList from '@/components/uni-list/uni-list.vue'
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

    export default {
        components: {
            uniList,
            uniListItem
        },
        data() {
            return {
                user: {
                    logo: '/static/img/avatar.png',
                    name: '三分联盟',
                    phone: '',
                    level: '0',
                    profitMoneyYan: '0',
                    moneyYan: '0',
                    isbindphone: false
                }
            }
        },
        methods: {
            getPhoneNumber(e) {
                console.log(e)
            },
            test() {
                console.log('test')
            },
            loginout() {
                uni.removeStorageSync('code')
                uni.removeStorageSync('token')
                uni.removeStorageSync('userid')
                uni.removeStorageSync('userInfo')
                this.jump('/pages/index/index')
            },
            bindphone() {
                let that = this
                if (that.user.isbindphone) {
                    uni.showToast({
                        title: '您已绑定微信手机号',
                        mask: true,
                        icon: 'none'
                    })
                } else {
                    this.jump('/pages/bindphone/bindphone')
                }
            }
        },
        onShow(event) {
            console.log('user onLoad')
            let that = this

            u.checkLogin(function (token, userid, userInfo) {
                u.request({
                    url: u.api.user,
                    data: {},
                    isVerifyLogin: true,
                    isShowLoading: false,
                    isShowError: false,
                    success(res) {
                        console.log(res)
                        if (res.code == 1) {
                            res = res.data.userInfo
                            that.user.logo = res.avatarUrl
                            that.user.name = res.nickName
                            that.user.phone = res.phone
                            that.user.isbindphone = res.isbindphone
                            that.user.level = res.level
                            that.user.profitMoneyYan = res.profitMoneyYan
                            that.user.moneyYan = res.moneyYan
                            // that.user.isbindphone = true
                        } else {
                            that.user.logo = userInfo.avatarUrl
                            that.user.name = userInfo.nickName
                        }
                    }
                })

                
            })


        }
    }
</script>
<style>
    .user__list-item--noborder .uni-list-item__container:after {
        display: none;
    }
</style>

<style scoped>
    .clearstyle {
        margin: 10px;
        padding: 0px;
        border: none;
        line-height: inherit;
        border-radius: 0!important;
        background-color: transparent;
    }
    .user {
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        margin-top: -5px;
        background-color: #fff;
    }
    .avt {
        background: #d1a178;
        background: #d1a178 url('~@/static/img/user/bg.jpg') center center no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    .avt__bd {
        overflow: hidden;
        margin: 25px;
    }
    .avt__bd-img {
        float: left;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
    }
    .avt__bd-con {
        overflow: hidden;
        float: left;
        margin-right: 30px;
    }
    .avt__bd-name {
        line-height: 30px;
        color: #ffffff;
        font-size: 16px;
    }
    .avt__bd-level {
        line-height: 15px;
        color: #ffffff;
        font-size: 12px;
    }
    .avt__bd-r {
        overflow: hidden;
        float: left;
    }
    .avt__bd-money {
        line-height: 30px;
        color: #ffffff;
        font-size: 12px;
    }
    .avt__bd-pmoney {
        line-height: 15px;
        color: #ffffff;
        font-size: 12px;
    }

    /* 状态 */
    .status {
        margin: 10px 15px;
        overflow: hidden;
        text-align: center;
    }
    .status__item {
        width: 20%;
        padding: 5px 0;
        /* display: inline-block; */
        float: left;
    }
    .status__item-img {
        width: 25px;
        height: 25px;
        overflow: hidden;
        display: block;
        margin: 0px auto 5px;
    }
    .status__item-text {
        display: block;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #999;
    }


    /* 联系客服 */
    .service {
        position: relative;
    }
    .service button{
        opacity: 0;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>
