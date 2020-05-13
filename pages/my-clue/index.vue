<template>
	<view class="my-clue p-tb-20 p-lr-30">
		<view class="top_view_clue" >
			<view  v-for="i in list" :key="i.value" :class="i.value === currten ? 'item_active f26' :'item f26' " @click="active(i.value)">
			 {{i.name}}
			</view>
		</view>
		<view v-for="item in main" :key="item.id" >
			
			<view class="title_view">
				<view class="f26">{{$minCommon.formatDate(new Date( item.create_time*1000),'yyyy/MM/dd hh:mm:ss') }}</view>
				<view class="status f30">{{staus[item.clue_status]}}</view>
			</view>
			<view class="card p-lr-20 p-bottom-10 m-bottom-20">
			  <view class="p-tb-30 min-border-bottom">线索信息</view>
			  <view class="main p-tb-20">
				<view>意向门店：{{item.store_info.store_name}}</view>
				<view>线索人员：{{item.clue_basics_info.user_name}}</view>
				<view>客户姓名：{{item.client_name}}</view>
				<view class="phone">
					<text>联系方式：{{item.client_mobile}}</text>
					<view class="image-view" @click="makePhone(item.client_mobile)">
					  <image src='../../static/images/phone.png'/>
					</view>
				</view>
				<view>预抵时间：{{$minCommon.formatDate(new Date( item.arrival_time*1000),'yyyy/MM/dd hh:mm:ss') }}</view>
				<view style="display:flex;justify-content: space-between;">
				  <view style="width:130rpx">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注 :</view>
				  <view style="margin-left:18rpx;flex:1">{{item.remark}}</view>
				</view>
			  </view>
			  <view class="bottom_view min-border-top" v-if="item.clue_status !== 0">
				  {{item.operating_time}}
			  </view>
			</view>
			
		</view>
		
		
		<min-404  v-if="main.length === 0" ></min-404>
	</view>
</template>

<script>
	// 线索状态: 0 -待处理 1-已忽略 2-已预约 3-已取消
	const staus = ['待处理','已忽略','已预约','已取消']
export default {
	name:'my-clue',
	navigate:['navigateTo'],
	data(){
		return{
			currten:0,
			staus,
			list:[],
			main:[]
		}
	},
	mounted(){
		this.$minApi.getMyClue().then(res=>{
			this.list = res
			console.log(this.list)
			this.main = this.list[0].list
		})
	},
	onNavigationBarButtonTap() {
		this.$minRouter.push({
			name:'select-store'
		})
	},
	methods:{
		active(n){
			this.currten = n
			this.main = this.list[n].list
			console.log(this.list[n])
		},
		makePhone(e){
			uni.makePhoneCall({
			    phoneNumber: e //仅为示例
			});
		}
	}
}

</script>

<style lang="scss" scoped>
.top_view_clue{
	width: 100%;
	height: 48rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-bottom: 100rpx;
	.item{
		width:216rpx;
		height:48rpx;
		background:#fff;
		border-radius:5rpx;
		text-align: center;
		line-height: 48rpx;
		margin-bottom: 20rpx;
	}
	.item_active{
		width:216rpx;
		height:48rpx;
		background:rgba(255,224,1,1);
		border-radius:5rpx;
		text-align: center;
		line-height: 48rpx;
		font-weight:bold;
		margin-bottom: 20rpx;
	}
	
}
.title_view{
	width: 100%;
	height: 28rpx;
	display: flex;
	justify-content: space-between;
	margin-bottom: 30rpx;
	.status{
		font-weight: bold;
	}
}
.card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      position: relative;
	  color: #333;
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
	  .phone{
	      display: flex;
	      justify-content: space-between;
	      .image-view{
	        width: 44rpx;
	        height: 44rpx;
	        image{
	          width: 100%;
	          height: 100%;
	        }
	      }
	    }
    }
  }
  .bottom_view{
	  height: 77rpx;line-height: 77rpx;
  }
</style>
