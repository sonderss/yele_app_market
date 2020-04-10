<template>
  <view class="platform-detail">
	  <view class="m-bottom-20">
		<min-cell-item  :border="false" img="../../static/images/headurl60.png" title="夜乐俱乐部" label="广州市天河区元岗元岗横路智汇parkB3333"></min-cell-item>
	  </view>
	<view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="reserved">已预约</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">{{data.baseInfo.desk_name}}</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{data.baseInfo.group_name}}</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：{{data.baseInfo.is_minim_charge === 1 ? '￥'+data.baseInfo.minim_charge : '否'}}</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(data.baseInfo.seats) }}</view>
        <view >开台条件： {{data.baseInfo.enable_minimum_consume === 0 ? '否' : data.baseInfo.minimum_consume_percent+'成低消'+ (data.baseInfo.finally_minimum_price)}}</view>
      </view>
    </view>
     <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-20">
        <view class="phone_c">
			<text>客户姓名：{{data.clientInfo.client_name}}</text>
			<text @click="callphone"><image style="width: 44rpx;height: 44rpx;" src='../../static/images/phone.png'/></text>
		</view>
        <view>联系电话：{{data.clientInfo.client_mobile}}</view>
        <view>当天生日：{{data.clientInfo.is_birthday  === 0 ? '否' : '是'}}</view>
        <view>预抵时间：{{$minCommon.formatDate(new Date(data.clientInfo.arrival_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
        <view style="display:flex;justify-content: space-between;" v-if="data.clientInfo.remark">
          <view style="width:130rpx">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注 :</view>
          <view style="margin-left:18rpx;flex:1">{{data.clientInfo.remark}}</view>
        </view>

      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20" v-for="(item,index) in data.operationList" :key="index">
        <view>营销人员：{{item.operator_name}}</view>
        <view>预约时间：{{$minCommon.formatDate(new Date(item.operated_time*1000),'yyyy-MM-dd hh:mm:ss')}}</view>
      </view>
    </view>
    <view class="btns">
      <view class="btn active"  @click="book">取消预约</view>
    </view>
     <min-modal ref='show'></min-modal>
  </view>
</template>
<script>
export default {
  props: {
    idNum: {
      type: Number
    },
    status: {
      type: Number
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      toast: false,
      index: Number
    }
  },
  mounted () {

  },
  methods: {
    // 推迟到店
    book () {
      this.$refs.show.handleShow({
        title: '是否取消当前预定',
        content: '',
        contentCenter: true,
        cancelText: '点错了',
        confirmText: '确认',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          if (e.id === 1) {
             // 取消预定接口
          }
        }
      })
    },
	// 打电话
   callphone () {
     this.$refs.show.handleShow({
       title: '',
       content: '是否普通电话拨打',
       contentCenter: true,
       cancelText: '否',
       confirmText: '是',
       confirmColor: 'red',
       cancelColor: '#0090ff',
       success: (e) => {
         if (e.id === 1) {
   		uni.makePhoneCall({
   			phoneNumber:'1235'
   		})
         }
       }
     })
	}
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
.a{
  flex-wrap: nowrap;
}
</style>
