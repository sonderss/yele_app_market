<template>
	<view class="my-clue p-tb-20 p-lr-30">
		<view class="top_view_clue">
			<view :class="currten === 0 ? 'item_active f26' :'item f26' " @click="active(0)">
				待处理
			</view>
			<view :class="currten === 1 ? 'item_active f26' :'item f26' " @click="active(1)">
				已忽略
			</view>
			<view :class="currten === 2 ? 'item_active f26' :'item f26' " @click="active(2)">
				已预约
			</view>
		</view>
		
		<view class="title_view">
			<view class="f26">2019-12-30  15:33:40</view>
			<view class="status f30">待处理</view>
		</view>
		<view class="card p-lr-20 p-bottom-10 m-tb-20">
		  <view class="p-tb-30 min-border-bottom">线索信息</view>
		  <view class="main p-tb-20">
			<view>意向门店：SIMBA</view>
			<view>线索人员：李小小</view>
			<view>客户姓名：李小小</view>
			<view class="phone">
				<text>联系方式：13800013800</text>
				<view class="image-view">
				  <image src='../../static/images/phone.png'/>
				</view>
			</view>
			<view>预抵时间：2019年12月26日  18:00:00</view>
			<view style="display:flex;justify-content: space-between;">
			  <view style="width:130rpx">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注 :</view>
			  <view style="margin-left:18rpx;flex:1">备注信息备注信息备注信息备注信息备备注信息备注信息备注信</view>
			</view>
		  </view>
		</view>
		
		<view class="title_view">
			<view class="f26">2019-12-30  15:33:40</view>
			<view class="status f30">已忽略</view>
		</view>
		<view class="card p-lr-20 p-bottom-10 m-tb-20">
		  <view class="p-tb-30 min-border-bottom">线索信息</view>
		  <view class="main p-tb-20">
			<view>意向门店：SIMBA</view>
			<view>线索人员：李小小</view>
			<view>客户姓名：李小小</view>
			<view class="phone">
				<text>联系方式：13800013800</text>
				<view class="image-view">
				  <image src='../../static/images/phone.png'/>
				</view>
			</view>
			<view>预抵时间：2019年12月26日  18:00:00</view>
			<view style="display:flex;justify-content: space-between;">
			  <view style="width:130rpx">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注 :</view>
			  <view style="margin-left:18rpx;flex:1">备注信息备注信息备注信息备注信息备备注信息备注信息备注信</view>
			</view>
		  </view>
		</view>
		
		<view class="title_view">
			<view class="f26">2019-12-30  15:33:40</view>
			<view class="status f30">已预约</view>
		</view>
		<view class="card p-lr-20 p-bottom-10 m-tb-20">
		  <view class="p-tb-30 min-border-bottom">线索信息</view>
		  <view class="main p-tb-20">
			<view>意向门店：SIMBA</view>
			<view>线索人员：李小小</view>
			<view>客户姓名：李小小</view>
			<view class="phone">
				<text>联系方式：13800013800</text>
				<view class="image-view">
				  <image src='../../static/images/phone.png'/>
				</view>
			</view>
			<view>预抵时间：2019年12月26日  18:00:00</view>
			<view style="display:flex;justify-content: space-between;">
			  <view style="width:130rpx">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注 :</view>
			  <view style="margin-left:18rpx;flex:1">备注信息备注信息备注信息备注信息备备注信息备注信息备注信</view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			currten:0
		}
	},
	methods:{
		active(n){
			this.currten = n
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
	.item{
		width:216rpx;
		height:48rpx;
		background:#fff;
		border-radius:5rpx;
		text-align: center;
		line-height: 48rpx;
	}
	.item_active{
		width:216rpx;
		height:48rpx;
		background:rgba(255,224,1,1);
		border-radius:5rpx;
		text-align: center;
		line-height: 48rpx;
		font-weight:bold;
	}
	
}
.title_view{
	width: 100%;
	height: 28rpx;
	display: flex;
	justify-content: space-between;
	margin: 30rpx 0 ;
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
</style>
