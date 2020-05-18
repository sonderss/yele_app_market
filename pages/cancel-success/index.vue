<template>
  <view class="cancel-success p-lr-30 p-tb-30">
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">取消成功</view>
    <view class="card f28 p-tb-30 p-lr-30">
      <view>台号：<text>{{$parseURL().res.desk_name}}</text></view>
      <view>客户姓名：{{$parseURL().res.client_name}}</view>
      <view>联系电话：{{$parseURL().res.client_mobile}}</view>
      <view>订单号：{{$parseURL().res.order_sn}}</view>
      <view>订单金额：{{$parseURL().res.order_total}}</view>
      <view>已付金额：{{$parseURL().res.pay_price}}</view>
      <view>应退金额：{{$parseURL().res.return_price}}</view>
      <view>取消时间：{{$minCommon.formatDate(new Date($parseURL().res.cancel_time*1000),'yyyy/MM/dd hh:mm:ss') }}</view>


    </view>
    <view class="btns">
      <min-btn @click="goOn">重新下单</min-btn>
      <min-btn type="white" @click="backIndex">返回首页</min-btn>
    </view>
  </view>
</template>

<script>
// （1：支付宝扫码，2：微信扫码，3：现金支付，4：刷卡支付，5：后付款）
const method = ['暂无','支付宝扫码','微信扫码','现金支付','刷卡支付','后付款']
export default {
  name: 'cancel-success',
  navigate: ['navigateTo'],
  data () {
    return {
      list: {},
      method
    }
  },
  onLoad (option) {
   console.log(option)
    console.log(this.$parseURL().res)
    this.$minApi.getOrderStatus({order_id:this.$parseURL().res.order_id}).then(res=>{
      this.list = res
      console.log(res)
    })
    // const date = new Date(JSON.parse(option.data).arrival_time * 1000)
    // const day = this.$minCommon.getDay(date.getDay())
    // let time = this.$minCommon.formatDate(date, 'yyyy/MM/dd hh:mm')
    // this.data = JSON.parse(option.data)
    // time = time + ' ' + day
    // this.data.arrival_time = time
  },
  methods: {
    goOn () {
      uni.navigateTo({
          url:'../store/order-store'
      })
    },
    backIndex () {
      this.$minRouter.push({
        name: 'index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cancel-success{
  .icon{
    display: block;
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
    margin-top: 117rpx;
  }
  .title{
    font-size:32rpx;
    font-weight:bold;
    color:#333333;
    text-align: center;
    margin-top: 38rpx;
  }
  .tips{
    font-size:28rpx;
    font-weight:400;
    color:#666666;
    text-align: center;
    margin-top: 40rpx;
  }
  .card{
    background: #FFF;
    border-radius: 10rpx;
    margin-top: 40rpx;
    text{
      color: #FF0000;
    }
    view{
      margin-bottom: 10rpx;
      &:last-child{
        margin: 0;
      }
    }
  }
  .btns{
    display: flex;
    justify-content: space-between;
    margin-top: 40rpx;
    .min-btn{
      width: 330rpx;
      margin: 0;
    }
  }
}

</style>
