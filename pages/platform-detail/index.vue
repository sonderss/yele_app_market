<template>
<view class="platform-detail p-top-20 p-lr-30">
    <!-- 空闲中 -->
    <min-idle :idNum="id" :date="date" v-if="status === 2" :list="list"></min-idle>
    <!-- 点单中 -->
    <min-order :idNum="id" :date="date" v-if="status === 4" :list="list"></min-order>
    <!-- 已预约 -->
    <min-booked :idNum="id" :date="date" v-if="status === 3" :list="list"></min-booked>
    <!-- 待确认 -->
    <min-confirmed :idNum="id" :date="date" v-if="status === 5" :list="list"></min-confirmed>
    <!-- 已停用 -->
    <min-terminated :idNum="id" :date="date" v-if=" status === 1" :list="list"></min-terminated>
    <!-- 已开台 -->
    <min-opened :idNum="id" :date="date" v-if=" status === 6" :list="list"></min-opened>
    <!-- 清台中 -->
    <min-taichung :idNum="id" :date="date" v-if=" status === 7" :list="list"></min-taichung>
</view>
</template>

<script>
export default {
    name: 'redplatform-detail',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            id: '',
            status: Number,
            date: '',
            list: {
                desk_info: {
                    desk_name: ''
                }
            }
        }
    },
    onLoad(option) {
        this.id = this.$parseURL().id
        this.date = this.$parseURL().date
        this.getData()
    },
    methods: {
        // 调用接口获取台详情数据数据
        getData() {
            // const date = this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd')
            this.$minApi.getOrderDetail({
                    desk_id: this.id
                })
                .then(res => {
                    this.list = res
                    console.log(this.list)
                    this.status = res.desk_info.status
                    uni.setNavigationBarTitle({
                        title: this.list.desk_info.desk_name + '详情'
                    });
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.platform-detail {
    position: relative;
    padding-bottom: 100rpx;

    .card {
        background: #fff;
        border-radius: 10rpx;

        .main {
            position: relative;

            &>view {
                margin-bottom: 10rpx;

                &:last-child {
                    margin: 0;
                }
            }

            .emp {
                display: inline-block;
                font-weight: bold;
                color: #FE0000;
            }

            .status {
                position: absolute;
                top: 20rpx;
                right: 0;
                color: #FE0000;
            }

            .card-btns {
                margin-top: 30rpx !important;
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    .btns {
        width: 100vw;
        display: flex;
        justify-content: space-between;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #f7f7f7;
        padding: 10rpx 30rpx;
    }
}
</style>
