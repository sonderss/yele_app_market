<template>
  <view class="order-make p-tb-20 p-lr-30">
            <min-pcitem desk  :list="$parseURL().store" />
            <view class="goods-wrap m-top-20 p-lr-20">
                <view class="p-tb-30 min-border-bottom">
                    商品
                    <view
                    class="status"
                    :class="$minCommon.getOrderStatus(2).color"
                    ></view>
                </view>
                <view class="content p-top-10" v-if="products.length === 0">
                       <view class="product_btn" @click="toOrder">
                        去选购商品 >>
                       </view>
                </view>
                <view class="goods-list p-top-10" v-if="products.length >= 1">
                    <view class="m-tb-20" v-for="item in products" :key="item.id">
                        <min-goods-item
                            :name='item.product_name'
                            :price="item.order_price"
                            :icon="item.product_img"
                            :specification="item.sku"
                            :value="item.quantity"
                        ></min-goods-item>
                    </view>
                </view>
            </view>

            <view class="card p-lr-20 m-tb-20">
                <view class="p-tb-30 min-border-bottom">台位信息</view>
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
                    <text class="">{{$parseURL().desk.client_name?$parseURL().desk.client_name:"暂无"}}</text>
                    </view>
                    <view>联系电话：{{$parseURL().desk.client_mobile?$parseURL().desk.client_mobile:'暂无'}}</view>
                </view>
            </view>

        <min-goods-submit 
         buttonText="去支付"
         :bgCor="products.length !== 0 ?  '' : '#CCC' "
          :totalAmount='totalAmountE'
         @submit="submit"
        />
       <!-- 支付弹窗 -->
    <min-popup :show="showPayPop" @close="closePayPop" heightSize="500">
      <view class="p-lr-30">
        <view class="top_view min-border-bottom">
          <view class="f26">本次支付</view>
          <view class="money">￥{{totalAmountE}}</view>
        </view>
        <view class="pays m-top-30">
          <view class="pay">
            <min-radio
              title="支付宝"
              icon="/static/images/alipay-pay.png"
              label="0"
              v-model="payType"
            />
          </view>
          <view class="pay">
            <min-radio title="现金" icon="/static/images/cash-pay.png" label="3" v-model="payType" />
          </view>
          <view class="pay">
            <min-radio title="微信" icon="/static/images/wx-pay.png" label="1" v-model="payType" />
          </view>
          <view class="pay">
            <min-radio title="刷卡" icon="/static/images/card-pay.png" label="2" v-model="payType" />
          </view>
          <view class="pay">
            <min-radio title="后付款" icon="/static/images/later-pay.png" label="4" v-model="payType" />
          </view>
        </view>
        <view class="btn_pay" @click="pay_money">支付</view>
      </view>
    </min-popup>
  </view>
</template>

<script>
export default {
        name:"order-make",
        navigate:["navigateTo"],
        data(){
            return{
                list:{},
                products:[],
                totalAmountE:"",
                payType:0,
                showPayPop:false
            }
        },
        mounted(){
          // this.products = this.$store.state.goods.orderSelArr
        },
        onShow(){
          if(this.$parseURL().orderId){
              this.$minApi.previewOrder({
                order_id:this.$parseURL().orderId,
                desk_id:this.$parseURL().desk.id
              }).then(res=>{
                console.log(res)
                this.products = res.order_product_list
                this.totalAmountE = res.order_info.order_total
              })
          }
        },
        methods:{
            // 支付弹窗
            submit () {
              this.showPayPop = true
            },
            closePayPop () {
              this.showPayPop = false
            },
            toOrder(){
              this.$minRouter.push({
                name:"placean-order",
                params:{data:this.$parseURL()}
              })
            },
            // 弹窗
            pay_money () {
              this.$minApi
                .confirmOrder({
                  order_id:this.$parseURL().orderId,
                  desk_id: this.$parseURL().desk.id,
                  pay_type: this.$minCommon.getPayMethod(this.payType)
                })
                .then(res => {
                  console.log(res)
                    this.$showToast('支付成功')
                    setTimeout(() => {
                         this.$minRouter.push({
                           name:'reservation-success',
                           params:{order_id:this.$parseURL().orderId}
                         })
                    },2000)
                })
            },
        },
        onLoad(){
            console.log(this.$parseURL())
        }
}
</script>

<style lang="scss" scoped>
.goods-wrap {
    background: #fff;
    padding-bottom: 20rpx;
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
.content{
    width:100%;
    height:288rpx;
    background:rgba(255,255,255,1);
    border-radius:10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .product_btn{
        width:248rpx;
        height:68rpx;
        background:rgba(255,224,1,1);
        border-radius:10rpx;
        font-size: 28rpx;
        line-height: 68rpx;
        text-align: center;
    }
}
.card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      position: relative;
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
      .emp{
        display: inline-block;
        font-weight: bold;
        color: #FE0000;
      }
    }
  }
  .top_view {
    height: 83rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .money {
      font-weight: bold;
      font-size: 30rpx;
      color: #ff0000;
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
</style>