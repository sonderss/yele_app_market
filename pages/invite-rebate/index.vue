<template>
	<view class="invite-rebate">
		<view class="top">
			<view class="y r" @click="toBack"> </view>
			<view class="y c">邀请返利</view>
		</view>
		<view class="main_view">
			<view class="font_view">
				<text>邀</text>
				<text>请</text>
				<text>好</text>
				<text>友</text>
			</view>
			<view class="desc_view">好友下单 · 你获佣金 · 奖励无上限</view>
		</view>
		<view class="code_view">
			<view class="top_view">
				<text class="o1"></text>
				<text class="o"></text>
				<text class="t">我的二维码</text>
				<text class="o"></text>
				<text class="o1"></text>
			</view>
			<view class="code_">
				<image  src='../../static/images/my_code.png'/>
			</view>
			<view class="btn" @click="showPop">立即分享给好友</view>
		</view>
		<min-popup :show="isShow" heightSize="300" @close='closeSelectedSkuPop'>
			<view class="share_view">
				<view class="main">
					<view class="main_share">
						<image src='../../static/images/share_wx.png'/>
						<text>微信好友</text>
					</view>
					<view class="main_share" style="margin-left: 80rpx;">
						<image src='../../static/images/share_l.png'/>
						<text>复制链接</text>
					</view>
					
				</view>
				<view class="botm" @click="canceShare">取消</view>
			</view>
		</min-popup>
	</view>
</template>

<script>
	export default {
		name:"invite-rebate",
		navigate:['navigateTo'],
		data(){
			return{
				isShow:false
			}
		},
		methods:{
			canceShare(){
				this.isShow = false
			},
			showPop(){
				this.isShow = true
			},
			closeSelectedSkuPop(){
				this.isShow = false
			},
			toBack(){
				uni.navigateBack({
				    delta: 2
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

	.invite-rebate{
		width: 100%;
		height: 100vh;
		background-color: rgba(3, 3, 19, 1);
		position: relative;
		.top{
			position: absolute;
			left: 0;
			display: flex;
			width: 100%;
			height:40rpx;
			top: var(--status-bar-height);
			.y{
				color:rgba(255,255,255,1);
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:bold;
				background-size: cover;
			}
			.c{
				margin: 0 auto;
			}
			.r{
				background: url(../../static/images/back.png);
				background-size: cover;
				height: 36rpx;
				width: 22rpx;
				margin-left: 30rpx;
			}
		}
		.main_view{
			width: 100%;
			height: 750rpx;
			background-image: url('../../static/images/yaoqing.png');
			background-size: cover;
			background-repeat: no-repeat;
			background-position: left top;
			display: flex;
			flex-direction: column;
			align-items: center;
			.font_view{
				margin-top: 140rpx;
				font-size: 123rpx;
				text{
					font-size: 123rpx;
					background:  linear-gradient(to right,rgba(204,204,204,1), rgba(255,255,255,1), rgba(57,57,57,1));
					-webkit-background-clip: text;
					color: transparent;
					font-weight: 700;
					width: auto;
				}
			}
			.desc_view{
				width: 480rpx;
				height:48rpx;
				background:rgba(233,233,233,1);
				border-radius:24rpx;
				text-align: center;
				line-height: 48rpx;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(48,48,48,1);
				
			}
		}
		.code_view{
			width: 680rpx;
			height: 710rpx;
			background: #fff;
			position: absolute;
			left: 36rpx;
			/*  #ifdef  H5  */
			bottom: 160rpx;
			/*  #endif  */
			/*  #ifdef  APP-PLUS  */
			top: 480rpx;
			/*  #endif  */
			border-radius: 20rpx;
			.top_view{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 60rpx;
				.t{
					font-size:40rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(51,51,51,1);
					line-height:82rpx;
				}
				.o{
					display: block;
					width:30rpx;
					height:30rpx;
					background:linear-gradient(164deg,rgba(255,224,1,1) 0%,rgba(250,164,31,1) 100%);
					border-radius:50%;
					margin: 0 20rpx;
				}
				.o1{
					display: block;
					width:20rpx;
					height:20rpx;
					background:linear-gradient(164deg,rgba(255,224,1,1) 0%,rgba(250,164,31,1) 100%);
					border-radius:50%;
				}
			}
			.code_{
				width: 400rpx;
				height: 400rpx;
				margin:  0 auto;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.btn{
				width:590rpx;
				height:98rpx;
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:bold;
				background:rgba(255,224,1,1);
				box-shadow:0px 2rpx 8rpx 0px rgba(3,3,19,0.15);
				border-radius:49rpx;
				text-align: center;
				line-height: 98rpx;
				margin:  0 auto;
				margin-top: 20rpx;
			}
		}
	}
	.share_view{
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.main{
			width: 100%;
			height: 202rpx;
			background: #F7F7F7;
			display: flex;
			align-items: center;
			padding-left: 50rpx;
			.main_share{
				width: 90rpx;
				height: 90rpx;
				text{
					font-size:20rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(102,102,102,1);
				}
				image{
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
		.botm{
			width: 100%;
			height:98rpx;
			background:rgba(255,255,255,1);
			text-align: center;
			line-height: 98rpx;
		}
	}
</style>
