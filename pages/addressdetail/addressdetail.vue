<template>
    <div class="tt-form">
        <div class="tt-form__item">
            <div class="tt-form__item-l">收货人</div>
            <div class="tt-form__item-r"><input type="text" v-model="address.name" placeholder="姓名" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">手机号码</div>
            <div class="tt-form__item-r"><input type="number" v-model="address.phone" placeholder="11位手机号" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">选择地区</div>
            <div class="tt-form__item-r">
                <picker mode="region" @change="bindRegionChange" :value="address.region">
                    <view class="tt-form__item-r-text" v-if="address.region.length">{{address.region[0]}} {{address.region[1]}} {{address.region[2]}}</view>
                    <view class="tt-form__item-r-text--placeholder" v-else>选择省 市 区</view>
                </picker>
            </div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">详细地址</div>
            <div class="tt-form__item-r"><input type="text" v-model="address.detail" placeholder="街道门牌信息" /></div>
        </div>

        <a class="tt-form__tf" @click="save">保存</a>
    </div>

</template>

<script>
import u from '@/common/util'

export default {
    components: {},
    data() {
        return {
            from: '',
            address: {
                address_id: '',
                name: '',
                phone: '',
                region: [],
                detail: '',
                isDefault: false
            }
        }
    },
    methods: {
        bindRegionChange(e) {
            console.log(e)
            this.address.region = e.target.value
        },
        // 请求地址
        load() {
            let that = this
            u.request({
                url: u.api.addressdetail,
                data: {
                    address_id: that.address.address_id
                },
                isVerifyLogin: true,
                success(res) {
                    // res = {
                    //     address_id: '18887',
                    //     name: '林多多',
                    //     phone: '15845454545',
                    //     region: ['北京市', '北京市', '东城区'],
                    //     detail: '车陂文化大街1号',
                    //     isDefault: false
                    // }
                    // if (res) {
                    //     that.address = res
                    // }

                    console.log(res)
                    if (res && res.code == 1 && res.data) {
                        that.address = res.data
                    }
                },
                fail(res) {
                    console.error(res)
                }
            })
        },
        save() {
            let that = this
            console.log(that.address)
            if (!that.address.name) {
                uni.showToast({
                    title: '请先填写姓名',
                    icon: 'none'
                })
                return false
            } else if (!that.address.phone) {
                uni.showToast({
                    title: '请先填写手机号码',
                    icon: 'none'
                })
                return false
            } else if (!that.address.region || !that.address.region.length) {
                uni.showToast({
                    title: '请先选择地区信息',
                    icon: 'none'
                })
                return false
            } else if (!that.address.detail) {
                uni.showToast({
                    title: '请先填写详细地址',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.addresssave,
                data: {
                    address_id: that.address.address_id,
                    name: that.address.name,
                    phone: that.address.phone,
                    region: JSON.stringify(that.address.region),
                    detail: that.address.detail
                },
                isVerifyLogin: true,
                success(res) {
                    // res = {
                    //     address_id: '18887',
                    //     name: that.address.name,
                    //     phone: that.address.phone,
                    //     region: that.address.region,
                    //     detail: that.address.detail,
                    //     isDefault: false
                    // }
                    console.log(res)
                    if (res && res.code == 1) {
                        uni.showModal({
                            title: '提示',
                            content: '保存成功',
                            showCancel: false,
                            success: function () {
                                if (that.from === 'confirm') {
                                    uni.setStorageSync('confirmAddress', res.data)
                                }
                                that.back()
                            }
                        })
                    }

                },
                fail(res) {
                    console.error(res)
                }
            })
        }
    },
    onLoad(event) {
        console.log("address onLoad")
        let that = this
        console.log(event)
        that.from = event.from
        that.address.address_id = event.address_id
        let title = '新增地址'
        if (that.address.address_id) {
            title = '编辑地址'
            that.load()
        }
        uni.setNavigationBarTitle({
            title: title
        })
    }
}
</script>