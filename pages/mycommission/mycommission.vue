<template>
    <div class="">
        <div class="commiss">
            <div class="commiss-big">
                <div class="commiss-tit">总计收益</div>
                <div class="commiss-amount" style="font-size: 25px;">{{total}}元</div>
            </div>
            <div class="commiss-con">
                <div class="commiss-item" style="margin-right: 5px">
                    <div class="commiss-tit">已提现收益</div>
                    <div class="commiss-amount" style="font-size: 20px;">{{hasmoney}}元</div>
                </div>
                <div class="commiss-item">
                    <div class="commiss-tit">可提现余额</div>
                    <div class="commiss-amount" style="font-size: 20px;">{{left}}元</div>
                </div>
            </div>
        </div>
        <uni-list>
            <uni-list-item title="提现" thumb="/static/img/icon-w1.jpg" @click="jump(`/pages/mywithdrawal/mywithdrawal`)"></uni-list-item>
            <uni-list-item title="提现明细" thumb="/static/img/icon-w2.jpg" @click="jump('/pages/mywithdrawallist/mywithdrawallist')"></uni-list-item>
        </uni-list>
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
            total: '0',
            hasmoney: '0',
            left: '0',
        }
    },
    methods: {
        jump(url) {
            u.jump(url)
        },
        load() {
            var that = this
            u.request({
                url: u.api.profit,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {},
                isVerifyLogin: true,
                success(res) {
                    console.log(res)
                    that.total = res.data.incomeMoneyYan
                    that.hasmoney = res.data.hasMoneyYan
                    that.left = res.data.profitMoneyYan
                }
            })
        }
    },
    onLoad() {
        this.load()
    }
}
</script>

<style scoped>
.commiss {
    padding: 15px;
}
.commiss-big {
    padding: 30px 0;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 5px;
    background-image: linear-gradient(to right, #ff5d5d, #ff8a05);
}
.commiss-con {
    overflow: hidden;
    display: flex;
}
.commiss-item {
    flex: 1;
    padding: 10px 0;
    background-image: linear-gradient(to right, #ff5d5d, #ff8a05);
    border-radius: 5px;
    text-align: center;
}
.commiss-tit {
    font-size: 12px;
    color: #ffdacc;
}
.commiss-amount {
    font-size: 25px;
    color: #ffffff;
}
</style>
