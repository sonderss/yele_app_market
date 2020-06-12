<template>
	<view class="platform-activities p-tb-20 m-lr-30">
		<view class="main p-lr-20 p-top-30 p-bottom-20 m-bottom-20" v-for="i in list" :key="i.id">
			<view class="top">
				<view class="title">{{i.activity_name}}</view>
				<view class="f28 m-top-10 m-bottom-30">{{i.activity_desc}}</view>
			</view>
			<view class="btm min-border-top">
				<view class="c f26">活动进行中</view>
				<view class="f26">{{i.activity_type === 1 ? '拉新活动' :i.activity_type === 2 ? "促销活动"  : '订台活动'}}</view>
			</view>
			<view class="desc" >
				<image style="width:100%" :src="i.is_join ===  1 ? '/static/images/yicanyu.png' :'/static/images/weicanyu.png'" />
			</view>
		</view>
		<min-404 v-if="list.length === 0" ></min-404>
	</view>
</template>

<script>
	export default {
		name:"platform-activities",
		navigate:['navigateTo'],
		data(){
			return{
				list:[],
				dip:''
			}
		},
		mounted() {
			this.dip = uni.getSystemInfoSync().screenWidth
			this.$minApi.platformActivities().then(res=>{
				this.list = res
				console.log(this.list)
			})
		}
	}
</script>

<style lang="scss" scoped>
.main{
	width:690rpx;
	background:rgba(255,255,255,1);
	border-radius:10rpx;
	display: flex;
	flex-direction: column;
	position: relative;
	padding-bottom: 0;
	.desc{
		position: absolute;
		right: 0;
		top: 0;
		width: 100rpx;
		height: 100rpx;
		
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
		.c{
			color: #FF0000;
		}
	}
}
</style>
