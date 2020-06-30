<template>
	<view class="personal-task p-tb-20 p-lr-30">
		<view class="top-view">
		  <view class="t-view">
			<view class="money">
			  <text :class="list.mission_status === 5 ? 'td':'tr'">{{status[list.status]}}</text>
			</view>
			<text class="price f22">{{list.mission_amount}}业绩任务</text>
			<view class="selcontent">
				<view :class="list.mission_status === 5 ? 'selcontent-color-grey':'selcontent-color'" :style="{width:width_color}"></view>
			</view>
		  </view>
		  <view class="b-view">
			<view class="left-view">
			  <text class="f22">任务额度</text>
			  <text class="f28 c">￥{{list.mission_amount}}</text>
			</view>
			<view class="right-view">
			  <text class="f22">已完成额度</text>
			  <text class="f28 c">￥{{list.mission_achievement}}</text>
			</view>
		  </view>
		</view>
		
		<view class="card p-lr-20 m-tb-20 p-bottom-20"  >
		  <view class="top p-tb-30 min-border-bottom">
			<view>任务介绍</view>
		  </view>
		  <view class="main p-top-20">
			<view class="item">任务名称：{{list.mission_name}}</view>
			<view class="item">任务额度：￥{{list.mission_amount}}</view>
			<view class="item">任务周期：{{$minCommon.formatDate(new Date(list.mission_start_time*1000),' yyyy/MM/dd hh:mm:ss') }} 至
			 {{ $minCommon.formatDate(new Date(list.mission_end_time*1000),' yyyy/MM/dd hh:mm:ss') }}</view>
			<view class="item">任务状态：{{status[list.status]}}</view>
			<view class="item">
				首付比例：{{flag ? list.mission_ratio + '%' :"****" }}
				<image style="width:30rpx;height:30rpx;margin-left:10rpx" @click="eye" :src="flag ? '/static/images/eyes_.png': '/static/images/eyes.png' " />
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
// ，1待开启，2执行中，3已完成，4已结束，5已到期
const status = ['','待开启','执行中','已完成','已结束','已到期']
	export default {
		name:"personal-task",
		navigate:["navigateTo"],
		data(){
			return{
				width_color:"",
				list:{},
				status,
				flag:false
			}
		},
		methods: {
			eye(){
				this.flag = !this.flag
			}
		},
		mounted(){
			this.$minApi.getPersonTask().then(res=>{
				console.log(res)
				this.list = res
				let a = Math.ceil((this.list.mission_achievement / this.list.mission_amount)*100)
				this.width_color = a+'%'
				 
			}).catch(err => {
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				},2000)
			})
		}
	}
	
</script>

<style lang="scss" scoped>
.top-view {
  width: 100%;
  height: 481rpx;
  background: #030313;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10rpx;
  overflow: hidden;
  .t-view {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.price {
	  width: auto;
	  height: 26rpx;
	  font-family: PingFang SC;
	  font-weight: 400;
	  color: #B3B3B3;
	  margin: 20rpx 0 30rpx 0;
	}
    .selcontent{
		width:590rpx;
		height:12rpx;
		background-color: #fff;
		border-radius:6rpx;
	}
	.selcontent-color{
		height:12rpx;
		background:linear-gradient(-90deg,rgba(255,224,1,1) 0%,rgba(255,119,0,1) 100%);
		border-radius:6rpx;
	}
	.selcontent-color-grey{
          height:12rpx;
          background:#CCCCCC;
          border-radius:6rpx;
     }
	.money {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  .tr {
		display: block;
		font-size: 58rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 224, 1, 1);
	  }
	  .td{
            display: block;
              font-size: 58rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #fff;
        }
	  .icon {
		display: block;
		font-size: 48rpx;
		color: rgba(255, 224, 1, 1);
	  }
	}
  }
  .b-view {
	height: 122rpx;
	background: rgba(55, 52, 69, 1);
	border-radius: 0px 0px 10rpx 10rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text {
	  color: #fff;
	  color: rgba(204, 204, 204, 1);
	}
	.c {
	  color: #ffe001;
	}
	.left-view {
	  width: 50%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  flex-direction: column;
	  position: relative;
	  border-right: 1rpx solid #CCCCCC;
	}
	
	.right-view {
	  width: 50%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  flex-direction: column;
	}
  }
}
.card{
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
      height: 76rpx;
      line-height: 76rpx;
      font-size: 24rpx;
      color: #666666
    }
}
</style>
