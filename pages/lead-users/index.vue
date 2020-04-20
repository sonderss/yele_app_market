<template>
<view class="lead-users p-lr-20 p-tb-20">
	<min-search class=" m-lr-30" @focus="focus" bgColor="#EEEEEE" placeholder="请输入营销姓名/手机号搜索" style="border-radius:5px;"></min-search>
	<view class="mid-view">
		<view class="left-view">
			<text class="txt">56</text>
			<text class="txt1">线索人员</text>
		</view>
		<view class="right-view">
			<text class="txt" >￥56756</text>
			<text class="txt1">提供线索</text>
		</view>
		<view class="right-view_qwe">
			<text class="txt" >￥56756</text>
			<text class="txt1">提供业绩</text>
		</view>
	</view>
	<view class="main">
		<view class="title-view">
		   <text class="t">姓名</text>
		   <text class="t">贡献</text>
		   <text class="t">分成比例</text>
		</view>
		<view class="main-content min-border-top" v-for="(item,index) in data" :key="index">
			<view class="creat-info t">
				<text>{{item.name}}</text>
				<text class="p-top-10">{{item.phone}}</text>
			</view>
			
			<view class="creat-info t">
				<text>{{item.num}}</text>
				<text class="p-top-10">￥{{item.money}}</text>
			</view>
			
			<view class="t">
				<text >{{item.code}}%</text>
				<image style="width: 34rpx;height: 34rpx;" class="m-left-20" src="../../static/images/set.png"/>
				<!-- <text class="iconfont icon-xiugai" style="font-size: 34rpx;">&#xe66f;</text> -->
			</view>
		</view>
	</view>
</view>
</template>

<script>
export default{
	onNavigationBarButtonTap() {
		this.$minRouter.push({
			name:'batch-editing'
		})
	},
	methods:{
		focus(){
			// 跳到搜索页
		}
	},
	data(){
		return{
			data:[
				{time:'1585016257518',name:"令狐冲",phone:'15811112222',money:312,num:'20',code:10},
				{time:'1585016257518',name:"任盈盈",phone:'15712348521',money:348,num:'20',code:10},
				{time:'1585016257518',name:"林平之",phone:'15811111457',money:500,num:'20',code:10}
			]
		}
	}
}
	
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';
  src: url('~@/static/font/iconfont.ttf');
}

.mid-view{
	height:104px;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 10px 0px rgba(3,3,19,0.1);
	border-radius:5rpx;
	margin: 20rpx 10rpx 15rpx 10rpx;
	display: flex;
	justify-content: space-between;
	.txt{
		font-size: 24px;
		font-weight: bold;
		color: #333333;
	}
	.txt1{
		margin-top: 10rpx;
		font-size: 15px;
		color: #666666;
	}
	.left-view{
		width: 50%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		&::after{
			content:"";
			height: 50%;
			width: 1px;
			background: #E7E7E7;
			position: absolute;
			right: 0;
			top: 25%;
		}
	}
	.right-view_qwe{
		width: 50%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		&::after{
			content:"";
			height: 50%;
			width: 1px;
			background: #E7E7E7;
			position: absolute;
			left: 0;
			top: 25%;
		}
	}
	.right-view{
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
}
.main{
	background:rgba(255,255,255,1);
	border-radius:5px;
	margin: 20rpx 10rpx 15rpx 10rpx;
	padding: 0 20rpx;
	.title-view{
		height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.t{
			width: 170rpx;
			text-align: center;
		}
	}
	.main-content{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.t{
			width: 170rpx;
			text-align: center;
			padding: 20rpx 0;
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

</style>
