<template>
  <view class="appointment-information p-lr-30">
  
        <image class="icon" src="/static/images/success.png" alt="success" />
        <view class="title">预约成功</view>
        <view class="card f28 p-tb-30 p-lr-20">
            <min-pcitem :list="$parseURL().store" @emitE="toEmint($parseURL().store)"  :showArray="false"/>
            <view class="p-lr-20 p-top-20 min-border-top">
                    <view class="m-bottom-10">预定台号：<text>{{$parseURL().data.desk_name}}</text></view>
                    <view class="m-bottom-10">分组：{{$parseURL().group_name?$parseURL().group_name:'暂无数据'}}</view>
                   

                    <view class="m-bottom-10">低消：{{$parseURL().data.minim_charge? $parseURL().data.minim_charge:'暂无数据'}}</view>

                    <view class="m-bottom-10">客户姓名：{{$parseURL().data.client_name? $parseURL().data.client_name:'暂无数据'}}</view>

                    <view class="m-bottom-10">联系电话：{{$parseURL().data.client_mobile? $parseURL().data.client_mobile:'暂无数据'}}</view>
                    <view class="m-bottom-10">备注：{{$parseURL().remaks? $parseURL().remaks:'暂无数据'}}</view>
                    <view class="m-bottom-10">预抵时间：{{$parseURL().data.arrival_time? $minCommon.formatDate(new Date($parseURL().data.arrival_time*1000),'yyyy-MM-dd hh:mm:ss') :'暂无数据'}}</view>

            </view>
            
        </view>
        <view class="btns">
            <min-btn @click="toDesk">继续预约</min-btn>
            <min-btn type="white" @click="goIndex">返回首页</min-btn>
        </view>
        
  </view>
</template>

<script>
export default {
        name:'appointment-information',
        navigate:['navigateTo'],
        onLoad(){
            console.log(this.$parseURL())
        },
        methods:{
            toDesk(){
                uni.redirectTo({
                    url:'../store/apin-store'
                })
            },
            goIndex(){
                uni.redirectTo({
                    url:'../index/index'
                })
            }
        }
}
</script>
 
<style lang="scss" scoped>
.appointment-information{
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
      color:rgba(51,51,51,1);
      text-align: center;
      margin-top: 38rpx;
    }
  .card{
    background: #FFF;
    border-radius: 10rpx;
    margin-top: 105rpx;
    text{
      color: #FF0000;
    }
    &>view{
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