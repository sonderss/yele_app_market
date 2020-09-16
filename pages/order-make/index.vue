<template>
<view class="order-make p-tb-20 p-lr-30" style=" margin-bottom: 50rpx;">
    <view class="qwe">
        <min-pcitem desk :list="$parseURL().store" :isBorder="false" @emitE="toChioceStore" />
        <view class="goods-wrap m-top-20 p-lr-20">
            <view class="p-tb-30 min-border-bottom">
                商品
                <view class="status" v-if="products.length >= 1" @click="toOrder"></view>
            </view>
            <view class="content p-top-10" v-if="products.length === 0">
                <view class="product_btn" @click="toOrder">去选购商品 >></view>
            </view>
            <view class="goods-list p-top-10" v-if="products.length >= 1">
                <view class="m-tb-20" v-for="item in products" :key="item.id">
                    <min-goods-item :name="item.product_name" :price="item.order_price" :icon="item.product_img" :specification="item.sku" :value="item.quantity"></min-goods-item>
                </view>
            </view>
        </view>

        <view class="card p-lr-20 m-tb-20">
            <view class="p-tb-30 min-border-bottom desk_info_titel">
                <view>台位信息</view>
                <view class="bg_arrow" @click="toChioceDesk"></view>
            </view>
            <view class="main p-tb-20">
                <view>
                    台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
                    <text class="emp">{{$parseURL().desk.desk_name}}</text>
                </view>
                <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{$parseURL().desk.minimum_consume}}</view>
            </view>
        </view>

        <view class="card p-lr-20 m-tb-20">
            <view class="p-tb-30 min-border-bottom">客户信息</view>
            <view class="main p-tb-20">
                <view>
                    客户姓名：
                    <text class>{{$parseURL().desk.client_name?$parseURL().desk.client_name:"暂无"}}</text>
                </view>
                <view>联系电话：{{$parseURL().desk.client_mobile?$parseURL().desk.client_mobile:'暂无'}}</view>
            </view>
        </view>

        <min-goods-submit buttonText="去支付" :bgCor="products.length !== 0 ?  '' : '#CCC' " :totalAmount="totalAmountE" @submit="submit" />
        <!-- 支付弹窗 -->
        <min-popup :show="showPayPop" @close="closePayPop" heightSize="800">
            <view class="p-lr-30">
                <view class="top_view">
                    <text class="title">请选择支付方式</text>
                    <view class="close_pay" @click="closePayPop"></view>
                    <!-- <view class="f26">本次支付</view>
            <view class="money">￥{{totalAmountE}}</view>-->
                </view>
                <view class="min-border-bottom mid_view">
                    <view class="moey_desc min-border-bottom p-bottom-30">金额</view>
                    <view class="main_view">
                        <view class="f28 m-top-20">订单金额：￥{{actual_total}}</view>
                        <view class="f28 m-top-10">应付金额：￥{{totalAmountE}}</view>
                    </view>
                    <view class="f28 m-top-20 p-bottom-20" style="font-weight: bolder;">支付方式</view>
                </view>
                <min-pay :isTitle="false" :mTop="false" v-model="payType" :storeId="$parseURL().store.id" />
                <view class="btn_pay" @click="pay_money">支付</view>
            </view>
        </min-popup>
    </view>
</view>
</template>

<script>
export default {
    name: 'order-make',
    navigate: ['navigateTo'],
    data() {
        return {
            list: {},
            products: [],
            totalAmountE: '',
            payType: 1,
            showPayPop: false,
            actual_total: '',
        }
    },
    onShow() {
        console.log(this.$parseURL())
        if (this.$parseURL().orderId) {
            this.$minApi
                .previewOrder({
                    order_id: this.$parseURL().orderId,
                    desk_id: this.$parseURL().desk.id,
                    isLoading: true,
                })
                .then(res => {
                    this.products = res.order_product_list
                    this.totalAmountE = res.order_info.order_total
                    this.actual_total = res.order_info.actual_total
                })
        }
    },
    methods: {
        // 支付弹窗
        submit() {
            if (this.products.length === 0) return this.$showToast('请选择商品')
            this.payType = 1
            this.showPayPop = true
        },
        closePayPop() {
            this.showPayPop = false
        },
        toOrder() {
            this.$minRouter.push({
                name: 'placean-order',
                params: {
                    data: this.$parseURL()
                },
            })
        },
        // 弹窗
        pay_money() {
            console.log(this.payType)
            this.closePayPop()
            // if(this.payType === 1 || this.payType === 2){
            //     this.$minRouter.push({
            //       name:"pay-code"
            //     })
            // }else{
            this.$minApi
                .confirmOrder({
                    order_id: this.$parseURL().orderId,
                    desk_id: this.$parseURL().desk.id,
                    payment_id: this.payType,
                })
                .then(res => {
                    console.log(res)
                    if (!res.paid) {
                        // this.$showToast('第三方支付开发中')
                        this.closePayPop()
                        this.$minRouter.push({
                            name: 'pay-code',
                            params: {
                                info: {
                                    payment_id: this.payType,
                                    money: this.totalAmountE,
                                    desk_name: this.$parseURL().desk.desk_name,
                                },
                                data: res.payParam,
                                id: res.id,
                                order_id: this.$parseURL().order_id,
                            },
                        })
                    } else {
                        this.closePayPop()
                        // this.$showToast('支付成功')
                        this.$minRouter.push({
                            name: 'redreservation-success',
                            type: 'redirectTo',
                            params: {
                                order_id: this.$parseURL().orderId
                            },
                        })
                    }
                })
        },
        toChioceDesk() {
            // 台位
            this.$minRouter.push({
                name: 'chioce-table',
                params: {
                    store_name: this.$parseURL().store.store_name,
                    address: this.$parseURL().store.address,
                    head_img: this.$parseURL().store.head_img,
                    id: this.$parseURL().store.id,
                },
            })
            this.$store.dispatch('status/setId', this.$parseURL().store.id)
            // uni.navigateBack({
            //   delta: 1,
            // })
        },
        toChioceStore() {
            // this.$minRouter.push({
            //     name: "order-store"
            // })
            uni.redirectTo({
                url: '../store/order-store'
            });
            // uni.navigateBack({
            //   delta: 2,
            // })
        },
    },
    onLoad() {
        console.log(this.$parseURL())
    },
}
</script>

<style lang="scss" scoped>
.qwe {
    width: 100%;
    height: 100%;
    overflow: auto;
    margin-bottom: 50rpx;
}

.goods-wrap {
    background: #fff;
    padding-bottom: 20rpx;

    .status {
        float: right;
        width: 40rpx;
        height: 40rpx;
        background-image: url('/static/images/yellow-add.png');
        background-size: cover;
        background-position: center;
    }

    .count {
        float: right;
    }
}

.content {
    width: 100%;
    height: 288rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .product_btn {
        width: 248rpx;
        height: 68rpx;
        background: rgba(255, 224, 1, 1);
        border-radius: 10rpx;
        font-size: 28rpx;
        line-height: 68rpx;
        text-align: center;
    }
}

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
            color: #fe0000;
        }
    }
}

.top_view {
    height: 83rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .close_pay {
        position: absolute;
        right: 0;
        width: 34rpx;
        height: 34rpx;
        background-image: url('/static/images/wine-close.png');
        background-size: contain;
    }

    .title {
        color: #343434;
        font-weight: 700;
        font-size: 32rpx;
    }

    .money {
        font-weight: bold;
        font-size: 30rpx;
        color: #ff0000;
    }
}

.mid_view {
    margin-top: 30rpx;
    color: #343434;
    padding: 0 20rpx;
    box-sizing: border-box;

    .moey_desc {
        font-size: 30rpx;
        font-weight: bolder;
    }

    .main_view {
        height: 110rpx;
    }
}

.pays {
    display: flex;
    flex-wrap: column;
    flex-wrap: wrap;
    align-content: space-between;

    .pay {
        width: 50%;
    }
}

.btn_pay {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 98rpx;
    background: rgba(255, 224, 1, 1);
    line-height: 98rpx;
    text-align: center;
}

.desk_info_titel {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .bg_arrow {
        width: 24rpx;
        height: 24rpx;
        background-image: url('/static/images/arrow.png');
        background-size: cover;
    }
}
</style>
