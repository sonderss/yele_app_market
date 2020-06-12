<template>
  <view class="invitation-record p-lr-20 p-tb-20">
    <min-search placeholder="请输入线索姓名/手机号搜索" @input="onChange"></min-search>
    <view class="main">
      <view class="title-view">
        <text style="width:180rpx;text-align: center;">注册时间</text>
        <text style="width:180rpx;text-align: center;">姓名</text>
        <text style="width:180rpx;text-align: center;">手机号</text>
      </view>
      <view class="main-content min-border-top" v-for="(item,index) in data" :key="index">
        <view class="creat-info t">
          <view class="content">
            <text>{{item.create_time}}</text>
          </view>
        </view>
        <view class="creat-info t">
          <text>{{item.be_invited_name}}</text>
        </view>
        <view class="t">
          <text>{{item.be_invited_phone}}</text>
        </view>
      </view>
    </view>
	<min-404  v-if="data.length === 0" pTop="40rpx"/>
  </view>
</template>

<script>
export default {
  name: "invitation-record",
  navigate: ["navigateTo"],
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.$minApi.invitationRecord().then(res => {
      console.log(res);
      this.data = res;
    });
  },
  methods: {
    getSearchData(e) {
      this.$minApi
        .invitationRecord({
          condition: e
        })
        .then(res => {
          console.log(res);
          this.data = res;
        });
    },
    onChange(e) {
      this.$minCommon.debounce(this.getSearchData(e), 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.invitation-record{
	.main {
	background: rgba(255, 255, 255, 1);
	border-radius: 5px;
	margin: 20rpx 10rpx 15rpx 10rpx;
	padding: 0 20rpx;
	margin-bottom: 100rpx;
	.title-view {
		height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}
	.main-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.t {
		width: 180rpx;
		text-align: center;
		padding: 20rpx 0;
		}
		// .t1{
		//  width: 55rpx;
		//  text-align: center;
		// }
		.creat-time {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		}
		.creat-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		}
	}
	}
	.btn-submit {
	width: 100%;
	height: 97.8rpx;
	background: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 0 20rpx;
	display: flex;
	justify-content: space-between;
	padding-right: 0;
	.left_view {
		width: 200rpx;
		height: 97.8rpx;
		display: flex;
		align-items: center;
	}
	.right_view {
		float: right;
		height: 97.8rpx;
		display: flex;
		align-items: center;
		.btn {
		width: 200rpx;
		height: 97.8rpx;
		background-color: #ffe001;
		color: #161825;
		font-size: 32rpx;
		text-align: center;
		line-height: 97.8rpx;
		}
	}
	}
}

</style>
