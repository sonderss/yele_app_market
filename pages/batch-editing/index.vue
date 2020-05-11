<template>
  <view class="batch-editing p-lr-20 p-tb-20">
    <view class="main">
      <view class="title-view">
        <text class></text>
        <text class="t">姓名</text>
        <text class="t">贡献</text>
        <text class="t">分成比例</text>
      </view>
      <view class="main-content min-border-top" v-for="(item,index) in list" :key="index">
        <view class="creat-info t1">
          <min-checkbox v-model="item.boll" class="box"></min-checkbox>
        </view>

        <view class="creat-info t">
          <!-- <min-checkbox v-model="item.boll" class="box"></min-checkbox> -->
          <view class="content">
            <text class="a">{{item.user_name}}</text>
            <text class="p-top-10">{{item.mobile}}</text>
          </view>
        </view>
        <view class="creat-info t">
          <text>{{item.count}}</text>
          <text class="p-top-10">￥{{item.performance}}</text>
        </view>
        <view class="t">
          <text>{{item.commission_proportion}}%</text>
        </view>
      </view>
    </view>

    <view class="btn-submit">
      <view class="left_view">
        <min-checkbox v-model="all"></min-checkbox>
        <view>全选</view>
      </view>
      <view class="right_view">
        <view>
          <text>已选</text>
          <text class="m-left-20" style="color: #FF0000;font-weight: bold;">{{nums}}</text>
        </view>
        <view class="btn m-left-20"   @click="edit(0)" >批量修改</view>
      </view>
    </view>
   <min-modal ref="show">
		<view>批量修改</view>
		<view class="content_model  m-top-20">
			<input type="number"   @input="getValue" maxlength="3" placeholder="修改比例" />
			<text>%</text>
		</view>
	</min-modal>
  </view>
</template>

<script>
export default {
  name: "batch-editing",
  navigate: ["navigateTo"],
  data() {
    return {
      list: [],
      all:false,
      value:""
    };
  },
  onNavigationBarButtonTap(){
      uni.redirectTo({
          url: '../lead-users/index'
      });
  },
  methods:{
   getValue(e){
		this.value = e.target.value
	},
  getDaTaKey(item){
      return item.boll
  },
	edit(n){
    let data = this.list.filter(this.getDaTaKey)
    if(data.length === 0) return this.$showToast('请选择用户')
    let idsarr = []
    data.map(item=>{
      idsarr.push(item.id)
    })
    console.log(idsarr,this.value)
		this.$refs.show.handleShow({
      title:"修改分成比例",
		 success: (e) => {
		   if (e.id === 1) {
          if(!this.value) return this.$showToast('填写正确比例');
		     // 确认修改
		   this.$minApi.commissionProportion({
		     ids:idsarr,
		     proportion:this.value
		   }).then(res=>{
		     console.log(res)
		     this.$showToast('修改成功')
		     setTimeout(() =>{
		         this.$minRouter.push({
               name:'lead-users'
             })
		     },2000)
		   })
		   }
		 }
		})
	}
  },
  computed:{
      nums(){
        let num = 0
        this.list.map(item=>{
          if(item.boll){
             num += 1
          }
        })
        return num
      }
  },
  watch:{
    
    all(a){
      console.log(a)
      if(a){
          this.list.map(item => {
            this.$set(item,'boll',true)
          })
      }else{
        this.list.map(item => {
             this.$set(item,'boll',false)
        })
      }
    }
  },
  mounted(){
     this.list = this.$parseURL().data.clue_list
     this.list.map(item => {
             this.$set(item,'boll',false)
        })
     console.log(this.list)
  }
};
</script>

<style lang="scss" scoped>
.main {
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  margin: 20rpx 10rpx 15rpx 10rpx;
  padding: 0 20rpx;
  margin-bottom: 100rpx;
  .title-view {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .t {
      width: 140rpx;
      text-align: center;
    }
  }
  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .t {
      width: 180rpx;
      text-align: center;
      padding: 20rpx 0;
    }
    .t1 {
      width: 55rpx;
      text-align: center;
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
      .content{
        display: flex;
        flex-direction: column;
        .a{
          width:100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
      }
    }
  }
}
.btn-submit {
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
  .left_view {
    width: 200rpx;
    height: 97.8rpx;
    display: flex;
    align-items: center;
  }
  .right_view {
    float: right;
    height: 97.8rpx;
    display: flex;
    align-items: center;
    .btn {
      width: 200rpx;
      height: 97.8rpx;
      background-color: #ffe001;
      color: #161825;
      font-size: 32rpx;
      text-align: center;
      line-height: 97.8rpx;
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
