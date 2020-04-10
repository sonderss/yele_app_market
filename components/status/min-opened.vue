<template>
  <view class="platform-detail">
	  <view class="m-bottom-20">
	  		<min-cell-item  :border="false" img="../../static/images/headurl60.png" title="夜乐俱乐部" label="广州市天河区元岗元岗横路智汇parkB3333"></min-cell-item>
	  </view>
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status been-open">已开台</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">K112</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：卡座</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥500</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：4座</view>
        <view>开台条件：6成低消（￥600）</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-20">
        <view class="phone_c">
        	<text>客户姓名：刘青</text>
        	<text @click="callphone"><image style="width: 44rpx;height: 44rpx;" src='../../static/images/phone.png'/></text>
        </view>
        <view>联系电话：13563250000</view>
        <view>当天生日：是</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>订单信息</view>
      </view>
      <view class="main p-top-20">
        <view class="item">客户姓名：刘小青</view>
        <view class="item">联系电话：135 5352 0135</view>
        <view class="item">存酒数量：12356</view>
      </view>
      <view class="min-top-border"></view>
      <view class="timer min-top-border m-tb-10">待付合计：1000</view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-tb-20" style="margin-bottom:200rpx">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>

    <view class="btns">
      <view class="btn active_ m-lr-30"  >查看订单</view>
      <view class="btn active_  m-right-30"  >查看账单</view>
    </view>
    <min-modal ref="show"></min-modal>
  </view>
</template>
<script>
export default {
  props: {
    idNum: Number
  },
  data () {
    return {
      show: false,
      index: Number,
      toast: false
    }
  },
  methods: {
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
</style>
