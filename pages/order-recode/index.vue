<template>
<view class="min-order-list p-tb-20 p-lr-30">
    <view v-if="list.length !== 0">
        <view class="main" v-for="(item,index) in list" :key="index" @click="goDetail(index)">
            <view class="top-view min-flex">
                <view class="left-view min-flex min-flex-main-start">
                    <view class="m-left-20" style="width:60rpx;height:60rpx;border-radius:50%;overflow: hidden;">
                        <image lazy-load :src='item.head_img' @error="imageErro($event,index)" />
                    </view>
                    <text class="f30 ordern">{{item.store_name ?item.store_name:'暂无数据'}}</text>
                </view>
                <text class="right-txt f28" :class="$minCommon.getOrderStatus(item.order_status).color">{{$minCommon.getOrderStatus(item.order_status).desc}}</text>
            </view>
            <view>
                <view class="mid-view min-border-top">
                    <view class="left-view" v-if="item.order_product_list.length > 1">
                        <view class="left-photo m-right-20">
                            <image lazy-load :src="i.product_img" v-for="(i,a) in item.order_product_list" :key="a" />
                        </view>
                    </view>
                    <!-- 当图片不超过1张时 -->
                    <view class="mid-desc" v-if="item.order_product_list.length === 1">
                        <image :src="item.order_product_list[0].product_img.length>10?item.order_product_list[0].product_img :'/static/images/goods.png'" lazy-load />
                        <view style=" display: flex;flex-direction: column;" class="m-left-20">
                            <text class="f28 fcolor title">{{item.order_product_list[0].product_name}}</text>
                            <text class="tcolor f22 desc">{{item.order_product_list[0].sku}}</text>
                        </view>
                    </view>
                    <view class="right-price" v-if="item.order_product_list.length === 1">
                        <text class="fcolor f28 testF">￥ {{item.order_total}}</text>
                        <text class="tcolor f22 m-top-20">x {{item.order_product_list[0].quantity}}</text>
                    </view>
                    <view class="right-price" v-if="item.order_product_list.length > 1">
                        <text class="fcolor f28">￥ {{item.order_total}}</text>
                        <text class="allin f22 tcolor">查看全部 >></text>
                    </view>
                </view>
                <!-- <text class="f20 origin sign" >{{item.sign}}</text> -->
            </view>
            <view class="bottom-view min-border-top">
                <text class="f24 tcolor">订单号:{{item.order_sn}}</text>
                <text class="f24 tcolor">{{$minCommon.formatDate(new Date(item.create_time*1000) ,'yyyy/MM/dd hh:mm:ss') }}</text>
            </view>
        </view>
    </view>
    <min-404 v-else />
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
</view>
</template>

<script>
// 1 待支付 2 待补差价 6 出品中（#FF0000）  ||  3 待确认  4  待出品 （#39BA01）  ||  7 已完成  5  已出品 （#0090FF）
// 订单状态（0：待付款，1：待确认，2：待出品，3：出品中，4：已出品，5：已完成，-1：待补差价，-2：已取消，-3：已退单，-4：改价作废，-5：换货作废，-6：退货作废）
const status = [{
        desc: "待付款",
        class: "red"
    },
    {
        desc: "待确认",
        class: "green"
    },
    {
        desc: "待出品",
        class: "origin"
    },
    {
        desc: "出品中",
        class: "blue"
    },
    {
        desc: "已出品",
        class: "blue"
    },
    {
        desc: "已完成",
        class: "green"
    },
    {
        desc: "待补差价",
        class: "red"
    },
    {
        desc: "已取消",
        class: "tcolor"
    },
    {
        desc: "已退单",
        class: "red"
    },
    {
        desc: "改价作废",
        class: "fcolor"
    },
    {
        desc: "换货作废",
        class: "tcolor"
    },
    {
        desc: "退货作废",
        class: "fcolor"
    }
];
export default {
    name: "order-record",
    navigate: ["navigateTo"],
    data() {
        return {
            status,
            isSetMeal: false,
            list: [],
            falg: false,
            des: "加载中",
            page: 1,
            load: true
        };
    },
    onReachBottom() {
        console.log('到底')
        this.falg = true
        this.getData(this.page, 10, true).then(res => {
            if (res.list.length === 0) {
                this.load = false
                this.des = '暂无更多数据'
                setTimeout(() => {
                    return this.falg = false
                }, 1000)
            }
            this.page++
            this.list = this.list.concat([...res.list])
            this.list.map(item => {
                if (item.order_product_list.length > 4) {
                    item.order_product_list.splice(4)
                }
            })
        })
    },
    onPullDownRefresh() {
        console.log('refresh');
        this.getData(1, 10, true).then(res => {
            this.list = res.list
            this.page = 2
            uni.stopPullDownRefresh();
        })
    },
    mounted() {
        this.getData(1, 10).then(res => {
            this.list = res.list
            this.page++
            console.log(this.list)
            this.list.map(item => {
                if (item.order_product_list.length > 4) {
                    item.order_product_list.splice(4)
                    console.log(item.desk_name)
                }
            })
        })
    },
    // mounted() {
    //     this.$minApi.getOrderList().then(res => {
    //         this.list = res.list;
    //         console.log(this.list)
    //         this.list.map(item => {
    //             if (item.order_product_list.length > 4) {
    //                 item.order_product_list.splice(4);
    //             }
    //         });
    //     });
    // },
    methods: {
        async getData(page, limit, isLoading) {
            return await this.$minApi.getOrderList({
                page,
                limit,
                isLoading
            })
        },
        goDetail(index) {
            // 这里跳转订单详情
            this.$minRouter.push({
                name: "order-detail",
                params: {
                    ordr_id: this.list[index].id,
                    desk_id: this.list[index].desk_id,
                }
            });
        },
        imageErro(e, index) {
            if (e.type === "error") {
                this.list[index].head_img = '/static/images/headurl60.png'
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.main {
    background: #fff;
    // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    padding: 0 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20rpx;

    .top-view {
        width: 100%;
        height: 84rpx;

        .left-view {
            flex: 1;
            position: absolute;
            left: 30rpx;

            .ordern {
                font-weight: bold;
                margin-left: 20rpx;
                line-height: 84rpx;
            }

            .active-left-p {
                width: 80rpx;
                height: 40rpx;
                background: #030313;
                color: #ffe001;
                display: block;
                text-align: center;
                line-height: 40rpx;
            }

            .active-left-m {
                width: 80rpx;
                height: 40rpx;
                background: #ffe001;
                color: #030313;
                display: block;
                text-align: center;
                line-height: 40rpx;
            }
        }

        .right-txt {
            width: 120rpx;
            text-align: right;
            position: absolute;
            right: 50rpx;
        }
    }

    .mid-view {
        flex: 1;
        padding: 30rpx 0;
        display: flex;
        justify-content: space-between;
        height: 160rpx;

        .left-view {
            .left-photo {
                display: flex;

                image {
                    flex-shrink: 0;
                    width: 100rpx;
                    height: 100rpx;
                }
            }
        }

        .mid-desc {
            display: flex;
            justify-content: flex-start;

            image {
                display: block;
                width: 100rpx;
                height: 100rpx;
            }

            .title {
                width: 343rpx;
                // overflow: hidden;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .desc {
                margin-top: 5rpx;
                width: 300rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .right-price {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: right;
            align-content: space-between;
            // .testF{
            //   font-family: "SimSun"
            // }
        }
    }

    .allin {
        float: right;
        // margin-bottom: 20rpx;
    }

    .sign {
        width: 68rpx;
        height: 24rpx;
        background: rgba(254, 232, 230, 1);
        border-radius: 5rpx;
        padding: 0 5rpx;
    }

    .bottom-view {
        height: 76rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    //公共样式
    .radius-b {
        border-radius: 0px 20rpx 20rpx 0px;
    }

    .fcolor {
        color: #333333;
    }

    .tcolor {
        color: #666666;
    }

    .red {
        color: #ff0000;
    }

    .green {
        color: #39ba01;
    }

    .blue {
        color: #0090ff;
    }

    .origin {
        color: #f7601b;
    }
}
</style>
