<template>
<view class="search-table p-tb-20 p-lr-30">
    <view class="input_search">
        <input type="text" v-model="value" placeholder="请输入桌台名称" confirm-type="search" @confirm="search" placeholder-style="font-size:24rpx;color:#999" style="background-color:#e7e7e7" />
        <text class="btn" v-if="isFocuc">取消</text>
    </view>
    <view class="desc">
        <view class="name f24">桌台分组：{{$parseURL().group_name}}</view>
        <view class="date f24">{{$parseURL().date}}</view>
    </view>
    <view class="list" v-if="list.length !== 0">
        <view class="item" :class="statusArr[2].class" v-for="(item, index) in list" :key="index" @click="chiceDesk(item)">
            <view class="name">{{item.desk_name}}</view>
            <view class="status">空闲中</view>
        </view>
    </view>
    <min-404 v-else></min-404>
</view>
</template>

<script>
const statusArr = [
    // 1 - 已停用, || 2 - 空闲,|| 3 - 已预约,|| 4 - 点单中,|| 6 - 已开台,  ||  5 - 待确认  7 - 清台中
    {
        name: 'null',
        class: ''
    },
    {
        name: '已停用',
        class: 'disabled'
    },
    {
        name: '空闲中',
        class: 'leisure'
    },
    {
        name: '已预约',
        class: 'reserved'
    },
    {
        name: '点单中',
        class: 'in-order'
    },
    {
        name: '待确认',
        class: 'be-confirm'
    },
    {
        name: '已开台',
        class: 'been-open'
    },
    {
        name: '清台中',
        class: 'leisure'
    },
]
export default {
    name: 'search-table',
    navigate: ['navigateTo'],
    data() {
        return {
            statusArr,
            value: '',
            list: [],
            isFocuc: false,
        }
    },
    watch: {
        value(a) {
            a ? (this.isFocuc = true) : (this.isFocuc = false)
        },
    },
    methods: {
        search() {
            this.$minApi
                .searchDesk({
                    group_id: this.$parseURL().group_id,
                    condition: this.value,
                })
                .then(res => {
                    this.list = res
                })
                .catch(() => {
                    this.list = []
                })
        },
        chiceDesk(item) {
            const pages = getCurrentPages() // 获取所有页面栈实例列表
            const prevPage = pages[pages.length - 2] // 上一页页面实例
            prevPage.$vm.desk = item // 修改上一页data里面的city参数值为123
            uni.navigateBack({
                // uni.navigateTo跳转的返回，默认1为返回上一级
                delta: 1,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.input_search {
    width: 100%;
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
        flex: 1;
        height: 54rpx;
        background: #e7e7e7;
        border-radius: 27rpx;
        padding-left: 50rpx;
        color: #333;
        background-image: url('/static/images/search.png');
        background-position: 20rpx center;
        background-repeat: no-repeat;
        background-size: 24rpx;
        padding-left: 60rpx;
    }

    .btn {
        width: 80rpx;
        display: block;
        padding-left: 20rpx;
        color: #666;
    }
}

.desc {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10rpx 0;
}

.list {
    margin-top: 20rpx;

    .item {
        display: inline-block;
        width: 140rpx;
        border-radius: 10rpx;
        padding: 20rpx 0;
        text-align: center;
        margin-left: 30rpx;

        .name {
            overflow: hidden;
        }

        .status {
            margin: 4rpx 0;
        }

        &.leisure {
            // 空闲中
            background: #eeeeee;

            &>view {
                color: #666;
            }
        }
    }
}
</style>
