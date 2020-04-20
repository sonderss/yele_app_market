<template>
	<view class="batch-editing p-lr-20 p-tb-20">
		<view class="main">
			<view class="title-view">
				 <text class=""></text>
			   <text class="t">姓名</text>
			   <text class="t">贡献</text>
			   <text class="t">分成比例</text>
			</view>
			<view class="main-content min-border-top" v-for="(item,index) in data" :key="index">
			
					<view class="creat-info t1">
						<min-checkbox v-model="item.boll" class="box"></min-checkbox>					</view>
			
				
				<view class="creat-info t">
					<!-- <min-checkbox v-model="item.boll" class="box"></min-checkbox> -->
					<view class="content">
						<text>{{item.name}}</text>
						<text class="p-top-10">{{item.phone}}</text>
					</view>
					
				</view>
				<view class="creat-info t">
					<text>{{item.num}}</text>
					<text class="p-top-10">￥{{item.money}}</text>
				</view>
				<view class="t">
					<text >{{item.code}}%</text>
				</view>
			</view>
		</view>
		
		
		<view class="btn-submit">
			<view class="left_view">
				<min-checkbox ></min-checkbox>
				<view>全选</view>
			</view>
			<view class="right_view">
				<view>
					<text>已选</text>
					<text class="m-left-20" style="color: #FF0000;font-weight: bold;">1</text>
				</view>
				<view class="btn m-left-20">批量修改</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		name:'batch-editing',
		navigate:["navigateTo"],
		data(){
			return{
				data:[
					{time:'1585016257518',name:"令狐冲",phone:'15811112222',money:312,num:'20',code:10,boll:false},
					{time:'1585016257518',name:"任盈盈",phone:'15712348521',money:348,num:'20',code:10,boll:false},
					{time:'1585016257518',name:"林平之",phone:'15811111457',money:500,num:'20',code:10,boll:false},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		background:rgba(255,255,255,1);
		border-radius:5px;
		margin: 20rpx 10rpx 15rpx 10rpx;
		padding: 0 20rpx;
		margin-bottom: 100rpx;
		.title-view{
			height: 44px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.t{
				width: 140rpx;
				text-align: center;
			}
		}
		.main-content{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.t{
				width:180rpx;
				text-align: center;
				padding: 20rpx 0;
			}
			.t1{
				width: 55rpx;
				text-align: center;
			}
			.creat-time{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.creat-info{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}
	}
.btn-submit{
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
	.left_view{
		width: 200rpx;
		height: 97.8rpx;
		display: flex;
		align-items: center;
	}
	.right_view{
		float: right;
		height: 97.8rpx;
		display: flex;
		align-items: center;
		.btn{
			width: 200rpx;
			height: 97.8rpx;
			background-color: #FFE001;
			color: #161825;
			font-size: 32rpx;
			text-align: center;
			line-height: 97.8rpx;
		}
	}
}
</style>
