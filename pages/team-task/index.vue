<template>
	<view class="team-task  p-tb-20 p-lr-30">
		<view class="top-view">
		  <view class="t-view">
			<view class="money">
			  <text class="tr">进行中</text>
			</view>
			<text class="price f22">第一小队任务</text>
			<view class="selcontent">
				<view class="selcontent-color" :style="{width:width_color}"></view>
			</view>
		  </view>
		  <view class="b-view">
			<view class="left-view">
			  <text class="f22">任务额度</text>
			  <text class="f28 c">￥1000</text>
			</view>
			<view class="right-view">
			  <text class="f22">已完成额度</text>
			  <text class="f28 c">￥1000</text>
			</view>
		  </view>
		</view>
		
		
		<view class="card p-lr-20 m-tb-20 p-bottom-20"  >
		  <view class="top p-top-30">
			<view :class="index === 0 ? 'top_view-active':'top_view_left' " @click="left(0)">任务介绍</view>
			<view :class="index === 1 ? 'top_view-active':' top_view_right' " @click="left(1)">成员业绩</view>
		  </view>
		  <view class="main p-top-20" v-if="index === 0">
			<view class="item">任务名称：50000业绩任务</view>
			<view class="item">任务额度：￥650055256.00</view>
			<view class="item">任务周期：2019-11-01  15:32:00</view>
			<view class="item">任务状态：进行中</view>
			<view class="item">首付比例：100%</view>
		  </view>
		  
		  <view class="main p-top-20" v-if="index === 1">
		  		<view class="item_table" v-for="(n,i) in 5" :key="i">
					<view :class="i === 0 ? 'num status confirmed':i===1? 'num status end' : i === 2 ? 'num status force': 'num' ">{{i+1}}</view>
					<view :class="i === 5?  'content' :'content min-border-bottom'   ">
						<view>12313</view>
						<view>12313</view>
						<view>12313</view>
					</view>
				</view>
				
		  </view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				width_color:"50%",
				index:0
			}
		},
		methods:{
			left(n){
				this.index = n
			}
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
		width:100%;
		height:12rpx;
		background:linear-gradient(-90deg,rgba(255,224,1,1) 0%,rgba(255,119,0,1) 100%);
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
	  .top_view_left{
		  width: 50%;
		  height: 87rpx;
		  text-align: center;
			line-height: 87rpx;
			font-size: 30rpx;
			border-bottom:1rpx solid #E7E7E7;
	  }
	  .top_view-active{
		  width: 50%;
		  height: 87rpx;
		  font-size: 32rpx;
		  font-weight: bold;
		  text-align: center;
		  line-height: 87rpx;
		  border-bottom: 2rpx solid #333333;
	  }
	  .top_view_right{
		  width: 50%;
		  height: 87rpx;
		  text-align: center;
		  line-height: 87rpx;
		  font-size: 30rpx;
		  border-bottom:1rpx solid #E7E7E7;
	  }
    }
    .main{
      .item{
        margin-top: 20rpx;
        font-size: 28rpx;
        &:first-child{
          margin: 0;
        }
      }
	  .item_table{
		  width: 100%;
		  height: 110rpx;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  .num{
			  width: 142rpx;
			  line-height: 110rpx;
			  text-align: center;
			  font-size: 30rpx;
		  }
		  .content{
			  flex: 1;
			  height:100%;
			  display: flex;
			  justify-content: space-between;
			  align-items: center;
			  padding: 0 20rpx;
		  }
	  }
    }
    .status{
      font-size: 26rpx;
      &.confirmed{
        color: #FF0000;
		font-weight:bold;
		font-style:italic;
		font-size: 42rpx;
      }
      &.end{
        color: #FF8400;
		font-weight:bold;
		font-style:italic;
		font-size: 42rpx;
      }
      &.force{
        color:#FDD600;
		font-weight:bold;
		font-style:italic;
		font-size: 42rpx;
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
