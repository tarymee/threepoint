<template>
    <div>

        <div class="avt">
            <div class="avt__bd">
                <image class="avt__bd-img" :src="user.logo" mode="aspectFill"></image>
                <div class="avt__bd-name">{{user.name}}</div>
            </div>
        </div>
        <div class="user">
            <div class="user__list-item--noborder">
                <uni-list-item title="我的订单" @click="jump('/pages/order/order?type=all&title=全部订单')" show-badge="true" badge-text="查看全部" badge-type="default" badge-inverted="true"></uni-list-item>
            </div>

            <div class="status">
                <a class="status__item" @click="jump('/pages/order/order?type=1&title=待付款')">
                    <image src="/static/img/user-icon1.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">待付款</text>
                </a>
                <a class="status__item" @click="jump('/pages/order/order?type=2&title=待发货')">
                    <image src="/static/img/user-icon2.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">待发货</text>
                </a>
                <a class="status__item" @click="jump('/pages/order/order?type=3&title=待收款')">
                    <image src="/static/img/user-icon3.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">待收款</text>
                </a>
                <a class="status__item" @click="jump('/pages/order/order?type=4&title=已完成')">
                    <image src="/static/img/user-icon4.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">已完成</text>
                </a>
                <a class="status__item" @click="jump('/pages/order/order?type=5&title=退换/售后')">
                    <image src="/static/img/user-icon5.png" mode="aspectFill" class="status__item-img"></image>
                    <text class="status__item-text">退换/售后</text>
                </a>
            </div>

            <div style="background-color: #efefef; height: 15px"></div>

            <uni-list>
                <uni-list-item title="收获地址" @click="jump('/pages/address/address')"></uni-list-item>
                <uni-list-item title="绑定手机" @click="jump('/pages/bindphone/bindphone')" show-badge="true" badge-text="未绑定" badge-type="default" badge-inverted="true"></uni-list-item>
                <uni-list-item title="联系客服" @click="jump('/pages/service/service')"></uni-list-item>
                <uni-list-item title="用户反馈" @click="jump('/pages/feedback/feedback')"></uni-list-item>
                <uni-list-item title="关于" @click="jump('/pages/about/about')"></uni-list-item>
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
                    logo: '/static/img/open-item1.jpg',
                    name: 'tarymee'
                },
                is: true
            }
        },
        methods: {
            test() {
                console.log('test')
            },
            jump(url, isSwitchTab) {
                u.jump(url, isSwitchTab)
            }
        },
        onShow(event) {
            console.log('user onLoad')
            let that = this

            u.checkLogin(function (token, userid, userInfo) {
                that.user.logo = userInfo.avatarUrl
                that.user.name = userInfo.nickName
                u.request({
                    url: u.api.user,
                    method: 'POST',
                    data: {},
                    isVerifyLogin: true,
                    success(res) {
                        console.log(res)

                    },
                    fail(res) {
                        console.error(res)
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
    .user {
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        margin-top: -5px;
        background-color: #fff;
    }
    .avt {
        background: #d1a178;
        background: #d1a178 url('~@/static/img/user-bg.jpg') center center no-repeat;
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
    .avt__bd-name {
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
    .status__item {
        width: 20%;
        padding: 5px 0;
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

</style>
