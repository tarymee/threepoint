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
                <div class="list-r">查看全部 <image src="/static/img/right-icon.png" mode="aspectFill"></image>
                </div>
            </a>



            <div class="status">
                <a class="status-item" href="/pages/order/main">
                    <image src="/static/img/user-icon1.png" mode="aspectFill"></image><text>待付款</text>
                </a>
                <a class="status-item" href="/pages/order/main">
                    <image src="/static/img/user-icon2.png" mode="aspectFill"></image><text>待发货</text>
                </a>
                <a class="status-item" href="/pages/order/main">
                    <image src="/static/img/user-icon3.png" mode="aspectFill"></image><text>待收款</text>
                </a>
                <a class="status-item" href="/pages/order/main">
                    <image src="/static/img/user-icon4.png" mode="aspectFill"></image><text>已完成</text>
                </a>
                <a class="status-item" href="/pages/order/main">
                    <image src="/static/img/user-icon5.png" mode="aspectFill"></image><text>退换/售后</text>
                </a>
            </div>

            <div style="background-color: #efefef; height: 15px"></div>


            <uni-list>
                <uni-list-item title="收获地址" @click="jump('/pages/address/address')"></uni-list-item>
                <uni-list-item title="绑定手机" @click="jump('/pages/bindphone/bindphone')" show-badge="true" badge-text="未绑定"
                    badge-type="default" badge-inverted="true"></uni-list-item>
                <uni-list-item title="联系客服" @click="jump('/pages/service/service')"></uni-list-item>
                <uni-list-item title="用户反馈" @click="jump('/pages/feedback/feedback')"></uni-list-item>
                <uni-list-item title="关于" @click="jump('/pages/about/about')"></uni-list-item>
            </uni-list>

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
                query: {},
                user: {
                    logo: 'http://fpoimg.com/100x100',
                    name: 'tarymee'
                },
                is: true
            }
        },
        methods: {
            test() {
                console.log('test')
            },
            jump(url) {
                if (url) {
                    uni.navigateTo({
                        url: url
                    })
                } else {
                    console.log('没有url')
                }
            }
        },
        onLoad(event) {
            console.log('user mounted')
            let that = this
//             // 目前在某些平台参数会被主动 decode，暂时这样处理。
//             try {
//                 that.query = JSON.parse(decodeURIComponent(event.detailDate))
//             } catch (error) {
//                 that.query = JSON.parse(event.detailDate)
//             }
            console.log(event)
            
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

        }
    }
</script>
