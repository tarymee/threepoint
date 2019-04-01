<template>
  <div>
    <swiper v-if="sliderArr.length > 0" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="(item, index) in sliderArr" :key="index" class="swiper__item">
            <image lazy-load :src="item.img" mode="aspectFill" class="swiper__img"></image>
        </swiper-item>
    </swiper>
    <div class="product__price"></div>
    <div class="product__title"></div>
    <div class="product__sel" @click="togglePopup('select')" data-position="bottom">
        <div class="product__sel-tit">选择</div>
        <div class="product__sel-des">请选择 尺码 颜色</div>
    </div>

<!-- <div class="product__selcon-item" :class="aaa" @click="selItem2(autoplay)">qqqqqqsssm.,m.,m.,</div> -->
<!-- <div class="product__selcon-item" :class="{
    'product__selcon-item--cur': autoplay
}" @click="selItem2">qqqqqqss</div> -->

            <div v-for="(item, index) in selectArr" :key="index">
                <div class="product__selcon-item" :class="{
                            'product__selcon-item--cur': item.select
                        }" @click="selItem(index, item)">{{ item.title }}</div>
            </div>


    <uni-popup :show="type === 'select'" position="bottom" @hidePopup="togglePopup('')">
        <div class="product__selcon">
            <div class="product__selcon-close" @click="togglePopup('')">X</div>

            <div v-for="(item, index) in selectArr" :key="index">
                <div class="product__selcon-tit">{{ item.title }}</div>
                <div class="product__selcon-list">
                    <div v-for="(item2, index2) in item.items" :key="index2">
                        <div class="product__selcon-item" :class="{
                            'product__selcon-item--cur': item2.select
                        }" @click="selItem(index, index2)">{{ item2.text }}</div>
                    </div>
                </div>
            </div>


            <div class="product__selcon-tit">购买数量</div>
            <div class="product__selcon-num">
                <uni-number-box :min="1" :max="1000" :value="1"></uni-number-box>
            </div>
            <div class="product__selcon-btns">
                <div class="product__selcon-btns-buy">立即购买</div>
                <div class="product__selcon-btns-add">加入购物车</div>
            </div>
            <div class="product__selcon-btns">
                <div class="product__selcon-btns-confirm">确定</div>
            </div>
        </div>
    </uni-popup>

    <uni-popup :show="type === 'share'" position="bottom" @hidePopup="togglePopup('')">
        <view class="share__tit">分享到</view>
        <view class="share__con">
            <view class="share__con-item" v-for="(item, index) in shareData" :key="index" @click="test">
                <view class="share__item-img" :class="item.name">
                    <text class="share__item-icon">{{ item.icon }}</text>
                </view>
                <view class="share__item-txt">{{ item.text }}</view>
            </view>
        </view>
        <view class="share__btn" @click="togglePopup('')">取消分享</view>
    </uni-popup>

    <view class="product-con">
        <rich-text :nodes="htmlString"></rich-text>
    </view>

    <div class="product-tf">
        <div class="product-tf__item" @click="togglePopup('share')" data-position="bottom">
            <div class="product-tf__item-icon"></div>
            <div class="product-tf__item-tit">分享</div>
        </div>
        <div class="product-tf__item">
            <div class="product-tf__item-icon"></div>
            <div class="product-tf__item-tit">客服</div>
        </div>
        <div class="product-tf__item" style="margin-right: 15px">
            <div class="product-tf__item-icon"></div>
            <div class="product-tf__item-tit">购物车</div>
        </div>
        <div class="product-tf__btns">
            <div class="product-tf__btns-buy">立即购买</div>
            <div class="product-tf__btns-add">加入购物车</div>
        </div>
    </div>
  </div>
</template>
<style scoped>
	.share__tit {
		line-height: 50px;
		font-size: 12px;
	}
	.share__con {
		display: flex;
		flex-wrap: wrap;
		padding: 0 15px;
	}
	.share__con-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		box-sizing: border-box;
        margin-bottom: 10px;
	}
	.share__item-img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45px;
		height: 45px;
		overflow: hidden;
		background: #007aff;
		border-radius: 5px;
	}
	.share__item-txt {
		font-size: 12px;
		color: #333;
        line-height: 20px;
	}
	.share__item-img.wx {
		background: #00ce47;
	}
	.share__item-img.qq {
		background: #00b6f6;
	}
	.share__item-img.sina {
		background: #ff766a;
	}
	.share__item-img.copy {
		background: #07ccd0;
	}
	.share__item-icon {
		font-family: 'iconfont';
		font-size: 20px;
		color: #fff;
	}
	.share__btn {
		height: 45px;
		line-height: 45px;
        font-size: 14px;
		border-top: 1px #eee solid;
	}


















.product__selcon {
    background-color: #fff;
    padding: 15px;
    position: relative;
    text-align: left;
}
.product__selcon-close{
    width: 25px;
    height: 25px;
    border: 1px solid #999;
    border-radius: 15px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    position: absolute;
    right: 15px;
    top: 15px;
}
.product__selcon-tit {
    font-size: 15px;
    line-height: 40px;
}
.product__selcon-list {
    overflow: hidden;
    /* margin-bottom: 10px; */
    vertical-align: top;
}
.product__selcon-item {
    /* display: inline-block; */
    float: left;
    height: 25px;
    line-height: 25px;
    background-color: #ddd;
    border: 1px solid #ddd;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 3px;
    padding: 0 10px;
    font-size: 12px;
    vertical-align: top;
}
.product__selcon-item--cur {
    color: #f60;
    border: 1px solid #f60;
}
.product__selcon-num {
    overflow: hidden;
    /* margin-top: 5px; */
}
.product__selcon-btns {
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    border: 1px solid #f60;
    border-radius: 20px;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    margin: 15px 0;
}
.product__selcon-btns-buy {
    float: left;
    width: 50%;
    color: #f60;
}
.product__selcon-btns-add {
    background-color: #f60;
    color: #ffffff;
    float: left;
    width: 50%;
}
.product__selcon-btns-confirm {
    background-color: #f60;
    color: #ffffff;
    width: 100%;
}


.product-tf {
    background-color: #fff;
    border-top: 1px solid #eee;
    height: 50px;
    overflow: hidden;
    width: 100%;
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
    bottom: 0px;
    left: 0px;
}
.product-tf__item {
    float: left;
    width: 40px;
    height: 50px;
}
.product-tf__item-icon {
    width: 25px;
    height: 25px;
    margin: 5px auto 0;
    background-color: #05a;
}
.product-tf__item-tit {
    text-align: center;
    font-size: 10px;
    line-height: 15px;
    color: #999;
}
.product-tf__btns {
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    margin-top: 9px;
    border: 1px solid #f60;
    border-radius: 20px;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
}
.product-tf__btns-buy {
    float: left;
    width: 50%;
    color: #f60;
}
.product-tf__btns-add {
    background-color: #f60;
    color: #ffffff;
    float: left;
    width: 50%;
}


    /* 焦点图 */
    .swiper {
        overflow: hidden;
        height: 300px;
    }
    .swiper__item {
        background: url('~@/static/img/loading.gif') center center no-repeat;
    }
    .swiper__img {
        width: 100%;
        height: 300px;
    }


	.product-con {
        line-height: 1.5;
		padding: 15px 15px 65px;
		overflow: hidden;
		font-size: 14px;
	}

</style>

<script>
import u from "@/common/util"
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
    components: {
        uniNumberBox,
        uniPopup
    },
    data() {
        return {
            autoplay: true,
            indicatorDots: true,
            interval: 5000,
            duration: 300,
            id: '5188314',
            title: 'list-triplex-row',
            htmlString: "",
            sliderArr: [
                {
                    img: 'http://fpoimg.com/1000x1000'
                }
            ],
            selectArr: [
                {
                    title: '尺码',
                    id: '112233',
                    select: true,
                    items: [
                        {
                            id: '111111',
                            text: 'S',
                            select: true
                        },
                        {
                            id: '222222',
                            text: 'M'
                        },
                        {
                            id: '333333',
                            text: 'L'
                        }
                    ]
                },
                {
                    title: '颜色',
                    id: '445566',
                    items: [
                        {
                            id: '444444',
                            text: '黑色'
                        },
                        {
                            id: '555555',
                            text: '红色'
                        },
                        {
                            id: '666666',
                            text: '绿色'
                        }
                    ]
                }
            ],
            select: {
                count: 1,
                item: {
                    '112233': '333333',
                    '445566': '444444'
                }
            },
            type: '',
            shareData: [{
                    text: '微信',
                    icon: '\ue6a4',
                    name: 'wx'
                },
                {
                    text: '朋友圈',
                    icon: '\ue646',
                    name: 'wx'
                },
                {
                    text: 'QQ',
                    icon: '\ue66b',
                    name: 'qq'
                },
                {
                    text: '新浪',
                    icon: '\ue600',
                    name: 'sina'
                },
                {
                    text: '复制',
                    icon: '\ue632',
                    name: 'copy'
                },
                {
                    text: '更多',
                    icon: '\ue618',
                    name: 'more'
                }
            ]
        }
    },
    computed: {
        aaa () {
            return this.autoplay ? 'product__selcon-item--cur': ''
        }
    },
    onBackPress() {
        if (this.type !== '') {
            this.type = ''
            return true
        }
    },
    methods: {
        togglePopup(type) {
            this.type = type
        },
        selItem(index, item) {
            // this.selectArr[index].items[index2].select = true
            console.log(index, item)
            this.selectArr[index].select = !item.select
            console.log(this.selectArr[index])
            // console.log(this.selectArr)
        },
        selItem2(item) {
            // item = !item
            // console.log(this.autoplay)
            this.autoplay = !this.autoplay
            // console.log(this.autoplay)
            // console.log(this.selectArr)
        },
        buy() {
            console.log(888)
        },
        addcart() {
            console.log(888)
        },
        test() {
            console.log(888)
        }
    },
    onShareAppMessage() {
        return {
            title: this.title,
            path: `/pages/product/product/?id=${that.id}&title=${that.title}`
        }
    },
    onLoad(event) {
        console.log("product onLoad")
        let that = this
        console.log(event)
        that.title = event.title
        uni.setNavigationBarTitle({
            title: that.title
        })
        uni.request({
            url: `https://unidemo.dcloud.net.cn/api/news/36kr/${that.id}`,
            success: (data) => {
                if (data.statusCode == 200) {
                    this.htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"")
                    that.sliderArr[0].img = data.data.cover
                    uni.setNavigationBarTitle({
                        title: data.data.title
                    })
                }
            },
            fail: () => {
                console.log('fail')
            }
        })
    }
};
</script>