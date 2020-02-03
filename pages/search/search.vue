<template>
    <div class="">
        <div class="search">
            <uni-search-bar ref="ttSearch" @confirm="search" @input="input" @focus="focus" @cancel="cancel" clearButton="always" />
        </div>
        <div class="" style="height: 45px;"></div>

        <div class="" v-if="!isSearching">
            <div class="guess">
                <div class="guess-th">
                    <div class="guess-th__tit">搜索历史</div>
                    <a class="guess-th__r" @tap="delHistory()">
                        <uni-icon color="#999" class="" size="18" type="trash" /> 清空</a>
                </div>
                <div class="guess-con">
                    <a class="guess-con__item" v-for="(item, index) in history" :key="index" @tap="searchStr(item)">{{item}}</a>
                </div>
            </div>
        </div>
        <div class="" v-if="isSearching">
            <productList :productArr="bottomLoad_data"></productList>
            <tip :text="bottomLoad_tip" :none-icon="noneIcon"></tip>
        </div>
    </div>
</template>
<script>
import u from '@/common/util'
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import bottomLoad from '@/mixins/bottom-load.js'
import tip from '@/components/tip/tip.vue'
import productList from '@/components/product-list/product-list.vue'
export default {
    name: '',
    components: {
        uniIcon,
        uniSearchBar,
        tip,
        productList
    },
    mixins: [bottomLoad],
    computed: {
        noneIcon () {
            let that = this
            // return false
            return that.bottomLoad_data.length ? false : true
        }
    },
    data() {
        return {
            bottomLoad_api: u.api.search,
            bottomLoad_params: {
                search: '',
            },
            isSearching: false,
            history: [],
            historyMax: 12,
        }
    },
    onLoad(event) {
        let that = this
        that.getHistory()

        that.$refs.ttSearch.searchClick()

        // console.log(event)
        // if (event.search) {
        //     that.toSearch(event.search)
        //     that.$refs.ttSearch.setSearchVal(event.search)
        // } else {
        //     that.$refs.ttSearch.searchClick()
        // }
    },
    methods: {
        setHistory(str) {
            let that = this
            if (!str) {
                return false
            }
            that.history = uni.getStorageSync('search') ? uni.getStorageSync('search') : []
            let isin = false
            let isinindex = null
            that.history.forEach((item, i) => {
                if (item === str) {
                    isin = true
                    isinindex = i
                }
            })
            if (isin) {
                that.history.splice(isinindex, 1)
            }
            that.history = [str, ...that.history]
            if (that.history.length > that.historyMax) {
                that.history.length = that.historyMax
            }
            uni.setStorageSync('search', that.history)
        },
        getHistory() {
            let that = this
            that.history = uni.getStorageSync('search') ? uni.getStorageSync('search') : []
        },
        delHistory() {
            let that = this
            uni.removeStorageSync('search')
            that.history = []
        },
        searchStr(str) {
            let that = this
            console.log('点击文字搜索', str)
            that.$refs.ttSearch.setSearchVal(str)
            that.toSearch(str)
        },
        toSearch(str) {
            let that = this
            console.log('搜索中...', str)
            setTimeout(() => {
                that.isSearching = true
            }, 500)
            that.bottomLoad_params.search = str
            that.bottomLoad_reload()
            // 记录搜索历史
            setTimeout(() => {
                that.setHistory(str)
            }, 500)
        },
        search(res) {
            let that = this
            console.log('点击搜索', res)
            that.toSearch(res.value)
            // if (!res.value) {
            //     that.bottomLoad_data = []
            //     that.bottomLoad_tip = '暂无数据'
            // } else {
            //     that.toSearch(res.value)
            // }
        },
        input(res) {
            let that = this
            console.log('输入', res)
            that.isSearching = false
            if (!res.value) {
                
            } else {
                // that.toSearch(res.value)
            }
        },
        focus(res) {
            let that = this
            console.log('聚焦')
            that.isSearching = false
        },
        cancel(res) {
            let that = this
            that.back()
        }
    }
}
</script>
<style scoped>
.search {
    width: 100%;
    height: 45px;
    position: fixed;
    left: 0px;
    top: 0px;
}

.result {
    margin-top: 45px;
}
.result__item {
    font-size: 14px;
    margin-left: 20upx;
    line-height: 45px;
    border-bottom: 1upx solid #eee;
}

.guess {
    padding: 10px 20upx;
}
.guess-th {
    overflow: hidden;
    line-height: 30px;
}
.guess-th__tit {
    float: left;
    color: #333;
    color: #10a2ff;
    font-size: 14px;
}
.guess-th__r {
    float: right;
    color: #999;
    font-size: 12px;
}
.guess-con {
    overflow: hidden;
    line-height: 25px;
}
.guess-con__item {
    background-color: #f3f5f9;
    padding: 0 10px;
    line-height: 25px;
    display: inline-block;
    border-radius: 3px;
    font-size: 12px;
    margin: 10px 10px 0 0;
}
</style>