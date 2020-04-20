<template>
	<view class="lead-search p-lr-20 p-tb-20">
		<min-search  @input="getSearch"  bgColor="#EEEEEE" placeholder="请输入营销姓名/手机号搜索" style="border-radius:5px;"></min-search>
		 <view class="main">
		 	<view class="title-view">
		 	   <text class="t">姓名</text>
		 	   <text class="t">贡献</text>
		 	   <text class="t">分成比例</text>
		 	</view>
		 	<view class="main-content min-border-top" v-for="(item,index) in newData" :key="index">
		 		<view class="creat-info t">
		 			<text v-html="item.name">{{}}</text>
		 			<text class="p-top-10">{{item.phone}}</text>
		 		</view>
		 		
		 		<view class="creat-info t">
		 			<text>{{item.num}}</text>
		 			<text class="p-top-10">￥{{item.money}}</text>
		 		</view>
		 		
		 		<view class="t">
		 			<text >{{item.code}}%</text>
		 			<image @click="edit(index)" style="width: 34rpx;height: 34rpx;" class="m-left-20" src="../../static/images/set.png"/>
		 			<!-- <text class="iconfont icon-xiugai" style="font-size: 34rpx;">&#xe66f;</text> -->
		 		</view>
		 	</view>
		 </view>
		 <min-modal ref="show">
			<view>线索用户：{{name}}</view>
			<view class="content_model">
				<input type="number" @input="getValue" placeholder="100"/>&nbsp; %
			</view>
		 </min-modal>
	</view>
</template>

<script>
	export default {
		computed:{
			getContent(){
				
				 
			}
		},
		mounted(){
			this.newData = this.data
		},
		watch:{
			keyword(a){
			 if(a.length === 0){
				 return this.newData = this.data
			 } 
			 let content = ''
			 if(this.data.length <= 0) return
			
			 if(this.keyword.length !== 0 ){
				this.data.filter((item,index) => {
					 if(item.name.indexOf(this.keyword) !== -1){
						 let clone_item = {}
						 Object.assign(clone_item,item)
						 clone_item.name = clone_item.name.replace(this.keyword,`<text style='color:red'>${this.keyword}</text>`)
						this.newData = []
						this.newData.push(clone_item)
					 }
					 
				})
				return content
			 }
			}
		},
		methods:{
			getSearch(e){
				this.keyword = e
				
			},
			getValue(e){
				this.value = e.target.value
			},
			edit(n){
				this.name = this.data[n].name
				this.$refs.show.handleShow({
					success: (e) => {
					  if (e.id === 1) {
						  if(!this.value) return;
					   	 this.data[n].code = this.value
					  }
					}
				})
			}
		},
		data(){
			return{
				newData:[],
				name:'',
				keyword:'',
				value:'',
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
	uni-page-body{background-color: #fff;width: 100%;height: 100%;}
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
	.content_model{
		width: 100%;
		display: flex;
		height: 70rpx;
		line-height: 70rpx;
		input{
			width: 400rpx;
			height: 70rpx;
			background:rgba(255,255,255,1);
			border:1rpx solid rgba(204,204,204,1);
			margin-right: 20rpx;
			padding: 0 20rpx;
		}
	}
</style>
