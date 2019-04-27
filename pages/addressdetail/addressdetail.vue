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
            <div class="tt-form__item-r"><input type="text" v-model="address.region" placeholder="地区信息" /></div>
        </div>
        <div class="tt-form__item">
            <div class="tt-form__item-l">详细地址</div>
            <div class="tt-form__item-r"><input type="text" v-model="address.street" placeholder="街道门牌信息" /></div>
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
            id: '',
            from: '',
            address: {}
        }
    },
    methods: {
        // 请求地址
        load() {
            let that = this
            u.request({
                url: u.api.addressdetail,
                method: 'POST',
                data: {
                    id: that.id
                },
                isVerifyLogin: true,
                success(res) {
                    console.log(res)
                    // 默认第一个地址
                    res = {
                        id: '18887',
                        name: '林多多',
                        phone: '15845454545',
                        region: '广东省广州市天河区',
                        street: '车陂文化大街1号',
                        detail: '广东省广州市天河区车陂文化大街1号',
                        isDefault: true
                    }
                    if (res) {
                        that.address = res
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
            } else if (!that.address.region) {
                uni.showToast({
                    title: '请先填写地区信息',
                    icon: 'none'
                })
                return false
            } else if (!that.address.street) {
                uni.showToast({
                    title: '请先填写详细地址',
                    icon: 'none'
                })
                return false
            }
            u.request({
                url: u.api.addresssave,
                method: 'POST',
                data: {
                    id: that.id,
                    name: that.address.name,
                    phone: that.address.phone,
                    region: that.address.region,
                    street: that.address.street,
                    detail: that.address.detail
                },
                isVerifyLogin: true,
                success(res) {
                    res = {
                        id: '9',
                        name: '林多多',
                        phone: '15845454545',
                        detail: '广东省广州市天河区车陂文化大街99号',
                        isDefault: false
                    }
                    uni.showModal({
                        title: '提示',
                        content: '保存成功',
                        showCancel: false,
                        success: function () {
                            if (that.from === 'confirm') {
                                uni.setStorageSync('confirmAddress', res)
                            }
                            uni.navigateBack()
                        }
                    })
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
        that.id = event.id
        let title = '新增地址'
        if (that.id) {
            title = '编辑地址'
            that.load()
        }
        uni.setNavigationBarTitle({
            title: title
        })
    }
}
</script>