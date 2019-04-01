<template>
  <div>
    <swiper v-if="sliderArr.length > 0" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="(item, index) in sliderArr" :key="index">
            <image lazy-load :src="item.img" mode="aspectFill"></image>
        </swiper-item>
    </swiper>
    <div class="product__price"></div>
    <div class="product__title"></div>
    <div class="product__sel" @click="showSel">
        <div class="product__sel-tit">选择</div>
        <div class="product__sel-des">请选择 尺码 颜色</div>
    </div>

    <div class="product__selcon">
        <div class="product__selcon-close">X</div>
        <div class="product__selcon-tit" style="margin-top: 50px">尺码</div>
        <div class="product__selcon-list">
            <div class="product__selcon-item product__selcon-item--cur">S</div>
            <div class="product__selcon-item">M</div>
            <div class="product__selcon-item">L</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
        </div>

        <div class="product__selcon-tit">颜色</div>
        <div class="product__selcon-list">
            <div class="product__selcon-item product__selcon-item--cur">S</div>
            <div class="product__selcon-item">M</div>
            <div class="product__selcon-item">L</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
            <div class="product__selcon-item">XL</div>
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


    <uni-popup :show="isShowSel" position="bottom" @hidePopup="togglePopup()">
        <view class="bottom-title">分享到</view>
        <view class="bottom-content">
            <view class="bottom-content-box" v-for="(item, index) in bottomData" :key="index" @click="test">
                <view class="bottom-content-image" :class="item.name">
                    <text class="icon">{{ item.icon }}</text>
                </view>
                <view class="bottom-content-text">{{ item.text }}</view>
            </view>
        </view>
        <view class="bottom-btn" @click="togglePopup('')">取消分享</view>
    </uni-popup>

    <view class="product-con">
        <rich-text :nodes="htmlString"></rich-text>
    </view>

    <div class="product-tf">
        <div class="product-tf__item" @click="togglePopup()" data-position="bottom">
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


	.uni-helllo-text {
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.center-box {
		width: 500upx;
		height: 500upx;
	}

	.uni-list-item {
		text-align: left;
		line-height: 80upx;
		border-bottom: 1px #f5f5f5 solid;
	}

	.uni-list-item:last-child {
		border: none;
	}

	.center-box .image {
		width: 100%;
		height: 100%;
	}

	.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}

	.bottom-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 35upx;
	}

	.bottom-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 15upx;
		width: 25%;
		box-sizing: border-box;
	}

	.bottom-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90upx;
		height: 90upx;
		overflow: hidden;
		background: #007aff;
		border-radius: 10upx;
	}

	.bottom-content-text {
		font-size: 26upx;
		color: #333;
		margin-top: 10upx;
	}

	.bottom-btn {
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
	}

	.bottom-content-image.wx {
		background: #00ce47;
	}

	.bottom-content-image.qq {
		background: #00b6f6;
	}

	.bottom-content-image.sina {
		background: #ff766a;
	}

	.bottom-content-image.copy {
		background: #07ccd0;
	}

	@font-face {
		font-family: 'iconfont';
		/* project id 1028200 */
		src: url('https://at.alicdn.com/t/font_1028200_47ewtwy4t04.ttf') format('truetype');
	}

	.icon {
		font-family: 'iconfont';
		font-size: 40upx;
		color: #fff;
	}



















.product__selcon {
    background-color: #fff;
    padding: 15px;
    position: relative;
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
    line-height: 30px;
}
.product__selcon-list {
    overflow: hidden;
    margin-bottom: 15px;
}
.product__selcon-item {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    background-color: #ddd;
    border: 1upx solid #ddd;
    margin-right: 10px;
    margin-bottom: 5px;
    border-radius: 3px;
    padding: 0 10px;
    font-size: 12px;
}
.product__selcon-item--cur {
    color: #f60;
    border: 1upx solid #f60;
}
.product__selcon-num {
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
    border-top: 1upx solid #eee;
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
    font-size: 20upx;
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
        height: 750upx;
    }
    .swiper swiper-item {
        background: url('~@/static/img/loading.gif') center center no-repeat;
    }
    .swiper image {
        width: 100%;
        height: 750upx;
    }


	.product-con {
        line-height: 1.5;
		padding: 15px 15px 65px;
		overflow: hidden;
		font-size: 14px;
	}

</style>

<script>
import u from "@/common/util";
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
        sliderArr: [
            {
                img: 'http://fpoimg.com/1000x1000'
            }
        ],
        isShowSel: false,
        type: '',
        bottomData: [{
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
        ],
        title: 'list-triplex-row',
        htmlString: "",
        id: '5188314'
    }
  },
  methods: {
    // flag
    showSel(flag) {
        
    },
    togglePopup(type) {
        this.isShowSel = !this.isShowSel;
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
            console.log('fail');
        }
    })
  }
};
</script>