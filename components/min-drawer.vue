<template>
<view v-if="visibleSync" :class="{ 'uni-drawer--visible': showDrawer }" class="uni-drawer">
    <view class="uni-drawer__mask" :class="{ 'uni-drawer__mask--visible': showDrawer && mask }" @tap="close" />
    <view class="uni-drawer__content" :class="{
        'uni-drawer--right': rightMode,
        'uni-drawer--left': !rightMode,
        'uni-drawer__content--visible': showDrawer
      }">
        <view class="top_view_drawer">
            <view class="f30" style="font-weight:500;">全部门店</view>
            <view class="f24 iconfont" style="color:#000" @click="close">&#xe608;</view>
        </view>
        <view class="main_drawer">
            <view class="saddsdds">
                <view class="li" v-for="(item, idnex) in storeList" :key="idnex">
                    <min-cell-item :title="item.store_name" :border="idnex === storeList.length - 1 ? false : true" :title_right="nowStoreId === item.store_id ? '当前门店' : ''" :img="item.head_img" :label="isT ?  `可提现金额：￥${item.money}` : ''" @eventParent="tochange(item.id, item.store_name)">
                    </min-cell-item>
                </view>
            </view>
        </view>

        <slot />
    </view>
</view>
</template>

<script>
export default {
    name: 'UniDrawer',
    props: {
        /**
         * 显示状态
         */
        visible: {
            type: Boolean,
            default: false
        },
        isT: {
            type: Boolean,
            default: true
        },
        /**
         * 显示模式（左、右），只在初始化生效
         */
        mode: {
            type: String,
            default: ''
        },
        /**
         * 蒙层显示状态
         */
        mask: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            visibleSync: false,
            showDrawer: false,
            rightMode: false,
            watchTimer: null,
            storeList: [],
            nowStoreId: null
        }
    },
    watch: {
        visible(val) {
            if (val) {
                this.open()
            } else {
                this.close()
            }
        }
    },
    mounted() {
        // 当前门店ID
        // this.nowStoreId = this.$store.state.user.userInfo.store_id
        this.$minApi.getStoreList().then(res => {
            // 门店列表  暂时获取门店列表
            console.log('门店列表  暂时获取门店列表', res)
            this.storeList = res.list
        })
    },
    created() {
        this.visibleSync = this.visible
        setTimeout(() => {
            this.showDrawer = this.visible
        }, 100)
        this.rightMode = this.mode === 'right'
    },
    methods: {
        close() {
            this._change('showDrawer', 'visibleSync', false)
        },
        open() {
            this._change('visibleSync', 'showDrawer', true)
        },
        _change(param1, param2, status) {
            this[param1] = status
            if (this.watchTimer) {
                clearTimeout(this.watchTimer)
            }
            this.watchTimer = setTimeout(
                () => {
                    this[param2] = status
                    this.$emit(status ? 'open' : 'close')
                },
                status ? 50 : 300
            )
        },
        tochange(store_id, store_name) {
            //   this.nowStoreId = store_id
            this.$emit('changeStore', store_id, store_name)
        }
    }
}
</script>

<style lang="scss" scoped>
// 抽屉宽度
$drawer-width: 420rpx;

.uni-drawer {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 999;
}

.uni-drawer__content {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: absolute;
    top: 0;
    width: $drawer-width;
    bottom: 0;
    background-color: $uni-bg-color;
    transition: transform 0.3s ease;
}

.uni-drawer--left {
    left: 0;
    transform: translateX(-$drawer-width);
}

.uni-drawer--right {
    right: 0;
    transform: translateX($drawer-width);
}

.uni-drawer__content--visible {
    transform: translateX(0px);
}

.uni-drawer__mask {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $uni-bg-color-mask;
    transition: opacity 0.3s;
}

.uni-drawer__mask--visible {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    opacity: 1;
}

// 抽屉
.top_view_drawer {
    padding: 30rpx;
    background: #ffe001;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main_drawer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20rpx;
    padding-top: 0;
}

.saddsdds {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;

    padding-bottom: 100rpx;
}
</style>
