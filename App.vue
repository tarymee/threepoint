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

    image[lazy-load] {
        background-color: #eee;
    }

    .none {
        text-align: center;
        font-size: 12px;
        color: #999;
        padding: 20px 0;
    }


    /* 列表模块 */
    .list {
        display: block;
        line-height: 25px;
        padding: 15px;
        border-bottom: 1upx solid #eee;
        overflow: hidden;
    }

    .list-l {
        font-size: 15px;
        float: left;
    }

    .list-r {
        float: right;
        color: #999;
        font-size: 14px;
    }

    .list-r image {
        display: inline-block;
        width: 5px;
        height: 9px;
        vertical-align: top;
        margin-top: 8px;
    }



</style>
