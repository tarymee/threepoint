<script>
    export default {
        onLaunch: function() {
            console.log('App Launch')
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
/* @import './common/uni.css'; */

/* 微信小程序中引用FontAwesome字体 https://blog.csdn.net/qq_28988969/article/details/76633921 */
@import './common/font-awesome.css';

/* 表单模块 */
.tt-form {
    overflow: hidden;
    margin: 10px 15px;
}
.tt-form__tit {
    line-height: 50px;
    font-size: 18px;
    border-bottom: 1upx solid #eee;
}
.tt-form__item {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1upx solid #eee;
}
.tt-form__item-l {
    width: 70px;
    font-size: 16px;
    margin-right: 10px;
}
.tt-form__item-r {
    flex: 1;
}
.tt-form__item-r input {
    font-size: 16px;
}
.tt-form__item-r-text {
    font-size: 16px;
}
.tt-form__item-r-text--placeholder {
    font-size: 16px;
    color: #999;
}
.tt-form__textarea {
    overflow: hidden;
    display: flex;
}
.tt-form__textarea textarea {
    font-size: 16px;
    flex: 1;
}

/* 验证码 */
.tt-form__item-btn {
    height: 25px;
    line-height: 25px;
    background-color: #d1a178;
    padding: 0 5px;
    color: #ffffff;
    font-size: 12px;
    border-radius: 3px;
}

.tt-form__btn {
    display: block;
    height: 40px;
    line-height: 40px;
    background-color: #d1a178;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    border-radius: 20px;
    margin: 20px 0;
}

.tt-form__tf {
    display: block;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    background-color: #d1a178;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    position: fixed;
    bottom: 0;
    left: 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}













/* 订单 */
.order {
    background-color: #eee;
    overflow: hidden;
}
.order__item {
    margin-bottom: 10px;
    background-color: #fff;
    padding: 0 15px;
    color: #333;
}
.order__th {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
}
.order__th-status {
    color: #999;
}
.order__th-status--1 {
    color: #d1a178;
}
.order__tb {
    display: flex;
    line-height: 20px;
    padding: 10px 0px;
}
.order__tb-l {
    width: 60px;
    height: 60px;
    flex: none;
    margin-right: 10px;
}
.order__tb-img {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 3px;
}
.order__tb-m {
    flex: 1;
}
.order__tb-m-name {
    font-size: 12px;
    overflow: hidden;
    max-height: 40px;
}
.order__tb-m-select {
    font-size: 12px;
    color: #999;
}
.order__tb-r {
    flex: none;
    text-align: right;
    margin-left: 10px;
}
.order__tb-price {
    font-weight: bold;
    font-size: 16px;
}
.order__tb-number {
    font-size: 14px;
}
.order__tf {
    line-height: 25px;
    font-size: 14px;
    text-align: right;
    padding-bottom: 10px;
}
.order__tf-price {
    font-size: 16px;
    font-weight: bold;
}
.order__status {
    border-top: 1px solid #eee;
    display: flex;
    padding: 10px 0;
    justify-content: flex-end;
    align-items: center;
}
.order__status-btn {
    border: 1px solid #999;
    color: #999;
    padding: 0 10px;
    border-radius: 15px;
    font-size: 14px;
    line-height: 25px;
    margin-left: 10px;
}
.order__status-btn--1 {
    color: #d1a178;
    border: 1px solid #d1a178;
}
</style>
