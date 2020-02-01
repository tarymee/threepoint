<template>
    <div class="qrcode">
        <div class="qrcode-con">
            <image class="qrcode-avt" :src="user.logo" mode="aspectFill"></image>
            <div class="qrcode-des">推荐一家我超喜欢的店铺给你</div>
            <div class="qrcode-des">一起来欢乐剁手啊~</div>
            <div class="qrcode-tit">{{user.name}}的店铺</div>
            <image class="qrcode-qrcode" :src="qrcode" mode="aspectFill"></image>
            <div class="qrcode-des">长按识别小程序码，即可买买买~</div>
        </div>
        <button class="qrcode-btn" type="warn" open-type="share">分享好友或群聊</button>
        <button class="qrcode-btn1" type="warn" @tap="saveImage">保存二维码到相册</button>
    </div>
</template>

<script>
import u from '@/common/util'
export default {
    components: {},
    data() {
        return {
            user: {
                logo: '/static/img/avatar.png',
                name: '三分联盟'
            },
            qrcode: ''
        }
    },
    onShareAppMessage() {
        let that = this
        let token = uni.getStorageSync('token')
        let obj = {
            title: that.user.name + '的店铺',
            imageUrl: that.qrcode,
            path: `/pages/index/index?scene=${token}`
        }
        // console.log('分享')
        // console.log(obj)
        return obj
    },
    methods: {
        saveImage() {
            console.log(9999)
            uni.showLoading({
                title: '保存中...',
                mask: true
            })
            uni.downloadFile({
                url: this.qrcode,
                success: function(res) {
                    if (res.statusCode === 200) {
                        let img = res.tempFilePath
                        wx.saveImageToPhotosAlbum({
                            filePath: img,
                            success(res) {
                                uni.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            },
                            fail(res) {
                                uni.showToast({
                                    title: '保存失败',
                                    icon: 'success',
                                    duration: 2000
                                })
                            }
                        })
                    }
                }
            })
        },
        load() {
            var that = this
            u.request({
                url: u.api.qrcode,
                data: {},
                isVerifyLogin: true,
                isShowLoading: false,
                isShowError: false,
                success(res) {
                    that.qrcode = res.result.path
                }
            })

            u.request({
                url: u.api.user,
                data: {},
                isVerifyLogin: true,
                isShowLoading: false,
                isShowError: false,
                success(res) {
                    if (res.code == 1) {
                        res = res.data.userInfo
                        that.user.logo = res.avatarUrl
                        that.user.name = res.nickName
                    }
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
.qrcode {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: #fafafa;
}
.qrcode-con {
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #e7e7e7;
    position: absolute;
    top: 15px;
    left: 30px;
    right: 30px;
    bottom: 135px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.qrcode-avt {
    display: block;
    width: 50px;
    height: 50px;
    margin: 0 auto 15px;
    border-radius: 25px;
}
.qrcode-des {
    font-size: 12px;
    color: #999;
}
.qrcode-tit {
    font-size: 14px;
    margin-top: 15px;
}
.qrcode-qrcode {
    display: block;
    width: 130px;
    height: 130px;
    margin: 15px auto;
}
.qrcode-btn {
    position: absolute;
    bottom: 70px;
    left: 15px;
    right: 15px;
}
.qrcode-btn1 {
    position: absolute;
    bottom: 15px;
    left: 15px;
    right: 15px;
}
</style>
