<template>
<view class="platform-activities p-bottom-20" style="overflow:hidden">
    <view class="top-view m-bottom-20">
        <view :class="flag ? 'ac' : 'a'" @click="to(0)">全部活动</view>
        <view :class="flag ? 'a' : 'ac'" @click="to(1)">我的活动</view>
    </view>
    <view style="height:88rpx"></view>
    <view class="main  m-lr-30 p-lr-20 p-top-30 p-bottom-20 m-bottom-20" v-for="i in newData" :key="i.id">
        <view class="top">
            <view class="title">{{ i.activity_name }}</view>
            <view class="f28 m-top-10 ">{{ i.activity_desc }}</view>
            <view class="f28 m-bottom-30">{{ i.store_name }}</view>
        </view>
        <view class="btm min-border-top">
            <view class="c f26">活动进行中</view>
            <view class="f26">{{i.activity_type === 1 ? '拉新活动' : i.activity_type === 2 ? '促销活动': '订台活动' }}</view>
        </view>
        <view class="desc">
            <image style="width:100%" :src="i.is_join === 1  ? '/static/images/yicanyu.png' : '/static/images/weicanyu.png'" />
        </view>
    </view>
    <min-404 v-if="newData.length === 0"></min-404>
</view>
</template>

<script>
export default {
    name: 'platform-activities',
    navigate: ['navigateTo'],
    data() {
        return {
            list: [],
            dip: '',
            flag: true
        }
    },
    computed: {
        newData() {
            let data = []
            if (this.flag) {
                data = this.list
            } else {
                this.list.filter(item => {
                    if (item.is_join) {
                        data.push(item)
                    }
                })
            }
            return data
        }
    },
    methods: {
        to(n) {
            if (this.flag && n === 0) return (this.flag = true)
            if (!this.flag && n === 1) return (this.flag = false)
            this.flag = !this.flag
        }
    },
    mounted() {
        this.dip = uni.getSystemInfoSync().screenWidth
        this.$minApi.platformActivities().then(res => {
            this.list = res
            console.log(this.list)
        })
    }
}
</script>

<style lang="scss" scoped>
.top-view {
    width: 100%;
    height: 60rpx;
    background-color: #030313;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: var(--status-bar-height) + 44;
    left: 0;
    z-index: 9999;

    .a {
        width: 50%;
        height: 100%;
        color: #ffffff;
        font-size: 28rpx;
        text-align: center;
        line-height: 60rpx;
    }

    .ac {
        width: 50%;
        height: 100%;
        font-size: 30rpx;
        text-align: center;
        line-height: 60rpx;
        color: #eed102;
        position: relative;
    }

    .ac::after {
        content: '';
        background: #ffe001;
        width: 100rpx;
        height: 5rpx;
        position: absolute;
        bottom: 0;
        left: 37%;
    }
}

.main {
    width: 690rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 0;

    .desc {
        position: absolute;
        right: 0;
        top: 0;
        width: 100rpx;
        height: 100rpx;
    }

    .top {
        flex: 1;

        .title {
            font-size: 36rpx;
            font-weight: bold;
        }
    }

    .btm {
        width: 100%;
        height: 70rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .c {
            color: #ff0000;
        }
    }
}
</style>
