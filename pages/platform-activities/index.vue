<template>
	<view class="platform-activities p-tb-20 m-lr-30">
		<view class="main p-lr-20 p-top-30 p-bottom-20 m-bottom-20" v-for="i in 10" :key="i">
			<view class="top">
				<view class="title">跨年夜倒计时活动</view>
				<view class="f28 m-top-10 m-bottom-30">每邀请一个成员奖励1000元</view>
			</view>
			<view class="btm min-border-top">
				<view class="c f26">活动进行中</view>
				<view class="f26">拉新活动</view>
			</view>
			<view class="desc f20">
				<span>已参与</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
.main{
	width:690rpx;
	height:205rpx;
	background:rgba(255,255,255,1);
	border-radius:10rpx;
	display: flex;
	flex-direction: column;
	padding-bottom: 20rpx;
	position: relative;
	.desc{
		position: absolute;
		right: 0;
		top: 0;
		width: 100rpx;
		height: 100rpx;
		border-width: 50rpx 50rpx 50rpx 50rpx;
		border-style: solid;
		border-color: #FFE001 #FFE001 transparent  transparent;
		span{
			width: 66rpx;
			position: absolute;
			right: -50rpx;
			top: -30rpx;
			transform:rotate(47deg);
		}
	}
	.top{
		flex:1;
		.title{
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	.btm{
		width: 100%;
		height: 65rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 60rpx;
		.c{
			color: #FF0000;
		}
	}
}
</style>
