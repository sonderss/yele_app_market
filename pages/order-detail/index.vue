<template>
<view class="order-detail p-tb-20 p-lr-30">
    <min-pcitem :list="itema" :showArray="false" :isBorder="false"></min-pcitem>
    <view style="height:20rpx"></view>
    <view class="goods-wrap p-lr-20">
        <view class="p-tb-30 min-border-bottom">
            商品
            <view class="status" :class="$minCommon.getOrderStatus(list.order_status).color">{{ $minCommon.getOrderStatus(list.order_status).desc }}</view>
        </view>
        <view class="goods-list p-top-10">
            <view class="p-tb-20" v-for="item in list.order_product_list" :key="item.id">
                <!--已出品-->
                <min-goods-item :name="item.product_name" :price="item.order_price" :icon="item.product_img" :specification="item.sku" :value="item.quantity"></min-goods-item>
            </view>
        </view>
    </view>
    <!-- <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-20 min-border-bottom">
        <view class="title">原订单信息假</view>
        <view class="btn" @click="viewOldOrder">查看原订单</view>
      </view>
      <view class="main p-tb-30">
        <view class="item">原订单号：2019346746842</view>
        <view class="item">订单金额：￥159332.00</view>
        <view class="item">已付金额：￥159332.00</view>
      </view>
    </view>-->
    <view class="card p-lr-20 m-top-20">
        <view class="top p-tb-30 min-border-bottom">订单信息</view>
        <view class="main p-tb-30">
            <view class="item">订 单 号 ：{{ list.order_sn }}</view>
            <view class="item">订单类型：{{ list.pay_type === 0 ? '先付' : '后付' }}</view>
            <view class="item">下单人员：{{list.confirm_user_name ? list.confirm_user_name : '暂无'}}
                {{$minCommon.formatDate(new Date(list.create_time * 1000),'yyyy/MM/dd hh:mm:ss')}}
            </view>

            <view class="item">应付金额：￥{{list.actual_total}}</view>
            <view class="item">待付金额：￥{{list.unpay_price}}</view>

            <view class="item">订单金额：￥{{ list.order_total }}</view>
            <view class="item">已付金额：￥{{ list.pay_price }}</view>
            <view class="item" v-if="list.order_status !== 0 && list.order_status !== 1">确认时间：{{ list.confirm_user_name }} {{ list.confirm_time }}</view>
            <view class="item">
                支付状态：
                <text :class="list.pay_status ? 'fcolor':'red'">{{list.pay_status === 0 ? '未付清' : '已付清'}}</text>
            </view>
        </view>
    </view>
    <view class="card p-lr-20 m-top-20" v-if="list.is_signoff === 1">
        <view class="top p-tb-30 min-border-bottom">签折信息</view>
        <view class="main p-tb-30">
            <view class="item">签折方式：{{ type[list.order_status] }}</view>
            <view class="item" v-if="list.signoff_type !== 0 && list.signoff_type !== 1">
                <view class="method-view min-border-bottom">
                    <view class="left">优惠内容：</view>
                    <view class="right">
                        <view class="right_view" v-for="i in list.order_product_list" :key="i.id">
                            <text class="min-ellipsis" style="width:300rpx">{{i.product_name}}</text>
                            <text class="min-ellipsis" style>￥{{ i.signoff_price }}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="item">优惠金额：￥{{ list.discount_price }}</view>
            <view class="item">签折人员：{{ list.signoff_user_name }}</view>
        </view>
    </view>
    <view class="card p-lr-20 m-top-20">
        <view class="top p-tb-30 min-border-bottom">客户信息</view>
        <view class="main p-tb-30">
            <view class="item">客户姓名：{{ list.client_name ? list.client_name : '暂无' }}</view>
            <view class="item">联系电话：{{list.client_mobile ? list.client_mobile : '暂无'}}</view>
        </view>
    </view>
    <view class="card p-lr-20 m-tb-20">
        <view class="top p-tb-30 min-border-bottom">台位信息</view>
        <view class="main p-tb-30">
            <view class="item">台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{list.desk_name}}</view>
            <view class="item">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.desk_group}}</view>
            <view class="item">低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{list.desk_minimum_consume}}</view>
            <view class="item">座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{list.desk_seats}}</view>
        </view>
    </view>
    <view class style="height:200rpx"></view>
    <min-goods-submit @leftClick="leftClick" :leftText="leftText" leftTextColor="#666" @submit="submit" :totalAmount="totalAmount" :buttonText="buttonText" v-if="showSubmit" />
    <min-modal ref="show"></min-modal>
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
                    <view class="f28 m-top-20">订单金额：￥{{list.unpay_price}}</view>
                    <view class="f28 m-top-10">应付金额：￥{{list.actual_total}}</view>
                </view>
                <view class="f28 m-top-20 p-bottom-20" style="font-weight: bolder;">支付方式</view>
            </view>
            <min-pay :isTitle="false" :mTop="false" v-model="payType" :storeId="list.store_id" />
            <view class="btn_pay" @click="pay_money">支付</view>
        </view>

        <!-- <view class="p-lr-30">
            <view class="top_view min-border-bottom">
                <view class="f26">本次支付</view>
                <view class="money">￥{{ list.unpay_price }}</view>
            </view>
            <min-pay :isTitle="false" :mTop="false" v-model="payType" />
            <view class="btn_pay" @click="pay_money">支付</view>
        </view> -->
    </min-popup>
</view>
</template>

<script>
// 签折类型（0：全单打折，1：全单优惠，2：单品打折，3：单品优惠）
const type = ['全单打折', '全单优惠', '单品打折', '单品优惠']
export default {
    name: 'redorder-detail',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            leftText: '',
            totalAmount: '',
            buttonText: '',
            list: {},
            type,
            showPayPop: false,
            payType: 1,
            showSubmit: false,
            itema: {
                store_config: {
                    business_start_time: ''
                }
            }
        }
    },
    onShow() {
        console.log(this.$parseURL())
        this.showSubmit = false
        this.$minApi
            .getOrderDetailDown({
                order_id: this.$parseURL().ordr_id
            })
            .then(res => {
                console.log(res)
                this.list = res
                this.itema.store_name = this.list.store_name
                this.itema.store_config.business_start_time = this.list.business_start_time
                this.itema.store_config.business_end_time = this.list.business_end_time
                this.itema.address = this.list.address
                this.itema.head_img = this.list.head_img
                if (this.list.order_status === 0) {
                    this.leftText = '取消订单'
                    this.buttonText = '去支付'
                    this.totalAmount = this.list.unpay_price
                    this.showSubmit = true
                } else if (this.list.order_status === -1) {
                    this.leftText = '应付'
                    this.buttonText = '补差价'
                    this.totalAmount = this.list.unpay_price
                    this.showSubmit = true
                }
            })
    },
    methods: {
        // 查看原订单
        viewOldOrder() {
            return this.$showToast('正在开发中')
            // if(!this.list.origin_order.id) return this.$showToast("该订单没有原订单")
            // console.log("原订单ID",this.list.origin_order.id)
            //  this.$minApi
            // .getOrderDetailDown({
            //   order_id: this.list.origin_order.id
            // })
            // .then(res => {
            //   console.log(res)
            //   this.list = res
            //   if (this.list.order_status === 0) {
            //     this.leftText = '取消订单'
            //     this.buttonText = '去支付'
            //     this.totalAmount = this.list.unpay_price
            //     this.showSubmit = true
            //   } else if (this.list.order_status === -1) {
            //     this.leftText = '应付'
            //     this.buttonText = '补差价'
            //     this.totalAmount = this.list.unpay_price
            //     this.showSubmit = true
            //   }
            // })
        },
        leftClick() {
            if (this.list.order_status !== 0) return false
            // 取消订单
            this.$refs.show.handleShow({
                title: '',
                content: '是否取消该订单?',
                contentCenter: true,
                cancelText: '否',
                confirmText: '是',
                confirmColor: 'red',
                cancelColor: '#0090ff',
                success: e => {
                    if (e.id === 1) {
                        this.$minApi
                            .cancelOrder({
                                order_id: this.list.id
                            })
                            .then(res => {
                                console.log(res)
                                this.$showToast('取消成功!')
                                setTimeout(() => {
                                    this.$minRouter.push({
                                        name: 'cancel-success',
                                        params: {
                                            res
                                        }
                                    })
                                }, 2000)
                            })
                    }
                }
            })
        },
        // 弹窗
        pay_money() {
            let obj = {
                payment_id: this.payType,
                target_id: this.list.id,
                target_type: 1
            }
            this.closePayPop()
            this.$minApi.postPay(obj).then(res => {
                console.log(res)
                if (res.paid === 1) {
                    this.$showToast('支付成功！')
                    setTimeout(() => {
                        this.$minRouter.push({
                            name: 'reservation-success',
                            params: {
                                order_id: this.$parseURL().ordr_id
                            }
                        })
                    }, 2000)
                } else {
                    // this.$showToast('第三方支付开发中')
                    this.$minRouter.push({
                        name: 'pay-code',
                        params: {
                            info: {
                                payment_id: this.payType,
                                money: this.list.unpay_price,
                                desk_name: this.list.desk_name
                            },
                            data: res.payParam,
                            id: res.id,
                            order_id: this.$parseURL().ordr_id
                        }
                    })
                }
            })
        },
        // 支付弹窗
        submit() {
            this.showPayPop = true
        },
        closePayPop() {
            this.showPayPop = false
        },
        goodsDeatil(index) {
            // 跳到商品详情页
            this.$minRouter.push({
                name: 'product-details'
            })
        },
        changeImage(e) {
            console.log(e)
        }
    }
}
</script>

<style lang="scss" scoped>
.order-detail {
    .goods-wrap {
        background: #fff;

        .status {
            float: right;

            &.cancel,
            &.return {
                color: #333333;
            }

            &.not-produce {
                color: #0090ff;
            }
        }

        .count {
            float: right;
        }
    }

    .card {
        background: #fff;
        border-radius: 10rpx;

        .top {
            display: flex;
            justify-content: space-between;

            .title {
                line-height: 60rpx;
            }

            .btn {
                background-color: #ffe000;
                padding: 10rpx 15rpx;
                border-radius: 10rpx;
            }
        }

        .main {
            .item {
                margin-top: 10rpx;

                &:first-child {
                    margin: 0;
                }

                .method-view {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    .left {
                        width: auto;
                    }

                    .right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .right_view {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }

                        text {
                            display: block;
                            margin-bottom: 20rpx;
                        }
                    }
                }
            }
        }
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
}
</style>
