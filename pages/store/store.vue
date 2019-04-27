<template>
<div>
    <div class="store__po">
        <image src="/static/img/icon-address.png" mode="aspectFill"></image>广东省 广州市 天河区
    </div>
    <div class="store__img">
        <image src="/static/img/open-item1.jpg" mode="aspectFill"></image>
        <div class="store__po2">
            <div class="store__po2-l">广东省 广州市 天河区</div>
            <div class="store__po2-r">请选择 ></div>
        </div>
    </div>

    <a class="store" @click="jump(item.url)" v-for="(item, index) in storeArr" :key="index">
        <div class="store__tit">
            <div class="store__tit-l">{{item.name}}</div>
            <div class="store__tit-r">{{item.distance}}</div>
        </div>
        <div class="store__address">
            <div class="store__address-l">{{item.address}}</div>
            <div class="store__address-r">{{item.type}}</div>
        </div>
    </a>
    <tip text="很抱歉 该地区暂未开通" :none-icon="true"></tip>
</div>
</template>

<script>
import tip from '@/components/tip/tip.vue'
export default {
    components: {
        tip
    },
    data() {
        return {
            storeArr: [
                // {
                //     distance: '10km',
                //     name: '三分联盟专卖店三分联盟专卖店三分联盟专卖店（工厂直供）',
                //     address: '广东省广州市天河区kkk街道',
                //     type: '直营店',
                //     url: '/pages/logs/main'
                // },
                // {
                //     distance: '20km',
                //     name: '三分联盟专卖店（工厂直供）',
                //     address: '广东省广州市天河区kkk街道广东省广州市天河区kkk街道广东省广州市天河区kkk街道',
                //     type: '直营店',
                //     url: '/pages/logs/main'
                // },
                // {
                //     distance: '30km',
                //     name: '三分联盟专卖店（工厂直供）',
                //     address: '广东省广州市天河区kkk街道',
                //     type: '直营店',
                //     url: '/pages/logs/main'
                // }
            ]
        }
    },
    methods: {
        jump(url) {
            mpvue.navigateTo({
                url: url
            })
        }
    },
    onLoad() {
        console.log('store onLoad')
    }
}
</script>

<style scoped>
.store__po {
    line-height: 45px;
    height: 45px;
    padding: 0 15px;
    overflow: hidden;
    vertical-align: top;
    font-size: 14px;
}
.store__po image {
    margin-top: 12px;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    vertical-align: top;
}


.store__img {
    position: relative;
    height: 200px;
    margin-bottom: 15px;
}
.store__img image {
    display: block;
    width: 375px;
    height: 170px;
}
.store__po2 {
    overflow: hidden;
    height: 50px;
    line-height: 50px;
    width: 315px;
    margin: 0 15px;
    padding: 0 15px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 150px;
    font-size: 14px;
    box-shadow: 0px 5px 10px #eee;
}
.store__po2-l {
    float: left;
}
.store__po2-r {
    float: right;
    color: #999;
}

.store {
    margin: 0 15px;
    padding: 10px 0;
    border-bottom: 1upx solid #f1f1f1;
}
.store__tit {
    color: #333;
    overflow: hidden;
    line-height: 25px;
}
.store__tit-l {
    float: left;
    width: 80%;
    font-size: 14px;
    font-weight: bold;
}
.store__tit-r {
    float: right;
    font-size: 12px;
    color: #999;
}
.store__address {
    color: #333;
    overflow: hidden;
    line-height: 25px;
}
.store__address-l {
    float: left;
    width: 80%;
    font-size: 12px;
    color: #999;
}
.store__address-r {
    line-height: 20px;
    height: 20px;
    float: right;
    background-color: #55a5ff;
    color: #ffffff;
    padding: 0 3px;
    border-radius: 2px;
    font-size: 10px;
}
</style>
