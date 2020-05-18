<template>
  <view class="min-status">
        <view class="card p-lr-20 m-bottom-20" v-for="(item,index) in list" :key="index">
            <view class="top p-tb-30 min-border-bottom">
                <view>预约信息</view>
                <view :class="status[item.status].color ? status[item.status].color+' status'  : 'status' ">{{status[item.status].desc}}</view>
            </view>
            <view class="main p-top-20">
                <view class="item">所属门店：{{item.store_name}}</view>
                <view class="item">客户姓名：{{item.client_name}}</view>
                <view class="item">联系电话：{{item.client_mobile}}</view>
                <view class="item">预抵时间：{{$minCommon.formatDate(new Date(item.arrival_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
                <view class="item"><text>{{status[item.status].timer}}</text>：{{$minCommon.formatDate(new Date(item.operated_time*1000),'yyyy-MM-dd hh:mm:ss')}}</view>

            </view>
            <view class="timer min-border-top m-top-20">
                <!--已预约-->
                <view class="btn f26 m-right-20"  v-if="item.status === 1" @click="cancelBooked(item.id)">取消预约</view>
                <view class="btn f26 m-right-20"  v-if="item.status === 3" @click="deskDetail(item.desk_id)">桌台详情</view>
                <!--默认-->
                <view class="btn f26"  @click="makePhone(item.client_mobile)">联系客户</view>
            </view>
        </view>
        
  </view>
</template>

<script>
const status = [
  {desc:'',color:'force',timer:''},
  {desc:'已预约',color:'force',timer:'预约时间'},
  {desc:'已过期',color:'confirmed',timer:'过期时间'},
  {desc:'已开台',color:'confirmed',timer:'开台时间'},
  {desc:'已取消',color:'expired',timer:'取消时间'}
]
export default {
    props:{
        list:Array
    },
    data(){
        return {
            status
        }
    },
    methods:{
        makePhone(phone){
            uni.makePhoneCall({
                  phoneNumber: phone
            })
        },
        // 取消预约
        cancelBooked(id){
          this.$emit('cancelBook',id)
          
        },
        // 桌台详情
        deskDetail(desk_id){
            // desk_id
        }
    }
}
</script>

<style  lang="scss" scoped>
.card{
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      .item{
        margin-top: 20rpx;
        font-size: 28rpx;
        &:first-child{
          margin: 0;
        }
      }
      .remake{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .name{
                height: 100%;
            }
            .content{
                flex: 1;
                overflow: auto;
                padding: 0 20rpx;
                width:inherit;
                display:block;
                white-space:normal;
                white-space:pre-wrap;
                word-wrap:break-word
            }
            
      }
    }
    .status{
      font-size: 26rpx;
      &.confirmed{
        color: #FF0101
      }
      &.end{
        color: #39BA01
      }
      &.force{
        color: #0090FF
      }
      &.expired{
        color: #666666
      }
    }
    .timer{
      width: 100%;
      height: 98rpx;
      font-size: 24rpx;
      color: #666666;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn{
            width:142rpx;
            height:58rpx;
            background:rgba(255,255,255,1);
            border:1rpx solid rgba(231,231,231,1);
            border-radius:10rpx;
            text-align: center;
            line-height: 58rpx;
      }
    }
  }
</style>