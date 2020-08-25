<template>
<view class="apin-store p-tb-20 p-lr-30" @touchstart="start" @touchmove="move" @touchend="end">
    <scroll-view scroll-y :style="{
        transition: top === 0 ? 'transform 300ms' : '',
        transform: 'translateY(' + top + 'rpx' + ')'
      }">
        <view class="card" v-for="(item, index) in list" :key="item.id">
            <min-pcitem showPrice :isBorder="index !== list.length - 1 ? true : false" :list="item" @emitE="toEmint(item)"></min-pcitem>
        </view>
    </scroll-view>
</view>
</template>

<script>
export default {
    name: 'apin-store',
    navigate: ['navigateTo'],
    data() {
        return {
            list: [],
            clue_id: '',
            top: 0,
            lastY: ''
        }
    },
    onLoad(option) {
        console.log(option)
        this.clue_id = option.clue_id
        if (option.clue_id) {
            // #ifdef APP-PLUS
            var webView = this.$mp.page.$getAppWebview()

            // 修改buttons
            // index: 按钮索引, style {WebviewTitleNViewButtonStyles }
            webView.setTitleNViewButtonStyle(0, {
                text: ''
            })
            // #endif
            document.getElementsByClassName('uni-btn-icon')[1].innerText = ''
        }
    },
    onNavigationBarButtonTap() {
        this.$minRouter.push({
            name: 'clue-management'
        })
    },
    methods: {
        toEmint(item) {
            item.clue_id = this.clue_id
            this.$minRouter.push({
                name: 'choose-table',
                params: {
                    item
                }
            })
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                //   // 像下滚动
                this.top = currentY - this.lastY
            } else {
                // 向上滚动
                this.top = currentY - this.lastY
            }
        },
        end(e) {
            if (this.top >= 300) {
                //  this.$minRouter.push({ name: "seat",params:{url:'index'}});
            }
            return (this.top = 0)
        }
    },
    mounted() {
        this.$minApi.apinStore().then(res => {
            this.list = res.list
            this.list.map((item, index) => {
                if (!item.store_config) {
                    item.store_config = {}
                }
            })
            console.log(res)
        })
    }
}
</script>

<style lang="scss" scoped></style>
