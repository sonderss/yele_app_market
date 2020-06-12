<template>
  <view class="lead-users p-lr-20 p-tb-20">
    <min-search
      @focus="focus"
      placeholder="请输入营销姓名/手机号搜索"
      style="border-radius:5px;"
      heightSize="70rpx"
    ></min-search>
    <view class="mid-view">
      <view class="left-view">
        <text class="txt">{{list.clue_count}}</text>
        <text class="txt1">线索人员</text>
      </view>
      <view class="right-view">
        <text class="txt">{{list.provide_clue_count}}</text>
        <text class="txt1">提供线索</text>
      </view>
      <view class="right-view_qwe">
        <text class="txt">{{list.provide_performance}}</text>
        <text class="txt1">提供业绩</text>
      </view>
    </view>
    <view class="main">
      <view class="title-view">
        <text class="t">姓名</text>
        <text class="t">贡献</text>
        <text class="t">分成比例</text>
      </view>
      <view class="main-content min-border-top" v-for="(item,index) in list.clue_list" :key="index">
        <view class="creat-info t">
          <text>{{item.user_name}}</text>
          <text class="p-top-10 p-left-20">{{item.mobile}}</text>
        </view>

        <view class="creat-info t">
          <text>{{item.count}}</text>
          <text class="p-top-10">￥{{item.performance}}</text>
        </view>

        <view class="t">
          <text>{{item.share_ratio}}%</text>
          <image
            style="width: 34rpx;height: 34rpx;"
            class="m-left-20"
            src="../../static/images/set.png"
			@click="edit(index)"
          />
         
        </view>
      </view>
    </view>
	<min-modal ref="show">
		<view>线索用户：{{name}}</view>
		<view class="content_model m-top-20">
			<input type="number"   @input="getValue" maxlength="3" :placeholder="price" />
			<text>%</text>
		</view>
	</min-modal>
  </view>
</template>

<script>
export default {
  name: "lead-users",
  navigate: ["navigateTo"],
  onNavigationBarButtonTap() {
    this.$minRouter.push({
      name: "batch-editing",
	  params:{data:this.list}
    });
  },
  data() {
    return {
      list: {},
	  name:'',
	  price:'',
	  value:''
    };
  },
  methods: {
    focus() {
      // 跳到搜索页
	  this.$minRouter.push({
		  name:'lead-search',
		  params:{data:this.list}
	  })
    },
	getValue(e){
		this.value = e.target.value
	},
	edit(n){
		this.name = this.list.clue_list[n].user_name
		this.price = this.list.clue_list[n].share_ratio+''
		this.$refs.show.handleShow({
			title:"修改分成比例",
			success: (e) => {
				if (e.id === 1) {
					if(!this.value) return;
					// 确认修改
				this.$minApi.commissionProportion({
					ids:this.list.clue_list[n].id,
					proportion:this.value
				}).then(res=>{
					console.log(res)
					this.$showToast('修改成功')
					setTimeout(() =>{
							this.$minApi.getClueUser().then(res => {
								console.log(res);
								this.list = res;
							});
					},2000)
				})
				}
			}
		})
	}
  },
  mounted() {
    this.$minApi.getClueUser().then(res => {
      console.log(res);
      this.list = res;
    });
  }
};
</script>

<style lang="scss" scoped>

.mid-view {
  height: 104px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(3, 3, 19, 0.1);
  border-radius: 5rpx;
  margin: 20rpx 10rpx 15rpx 10rpx;
  display: flex;
  justify-content: space-between;
  .txt {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
  }
  .txt1 {
    margin-top: 10rpx;
    font-size: 15px;
    color: #666666;
  }
  .left-view {
    width: 50%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &::after {
      content: "";
      height: 50%;
      width: 1px;
      background: #e7e7e7;
      position: absolute;
      right: 0;
      top: 25%;
    }
  }
  .right-view_qwe {
    width: 50%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &::after {
      content: "";
      height: 50%;
      width: 1px;
      background: #e7e7e7;
      position: absolute;
      left: 0;
      top: 25%;
    }
  }
  .right-view {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
.main {
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  margin: 20rpx 10rpx 15rpx 10rpx;
  padding: 0 20rpx;
  .title-view {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .t {
      width: 170rpx;
      text-align: center;
    }
  }
  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .t {
      width: 170rpx;
      text-align: center;
      padding: 20rpx 0;
    }
    .creat-time {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .creat-info {
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
