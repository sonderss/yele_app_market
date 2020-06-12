
<template>
  <view class="clue-management p-tb-20 p-lr-30">
    <view class="top_view_clue">
      <view
        v-for="i in list"
        :key="i.value"
        :class="i.value === currten ? 'item_active f26' :'item f26' "
        @click="active(i.value)"
      >{{i.name}}</view>
    </view>
    <view v-for="item in main" :key="item.id">
      <view class="title_view">
        <view
          class="f26"
        >{{$minCommon.formatDate(new Date( item.create_time*1000),'yyyy/MM/dd hh:mm:ss') }}</view>
        <view class="status f30">{{staus[item.clue_status].name}}</view>
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
              <image src="/static/images/phone.png" />
            </view>
          </view>
          <view>预抵时间：{{item.business_date*1 ?  $minCommon.formatDate(new Date( item.business_date*1000),'yyyy/MM/dd hh:mm:ss') :'暂无数据' }}</view>
          <view v-if="item.clue_status === 3">取消类型：{{item.cancel_type === 1 ? '系统自动取消(超时未到店)  ':'员工自动取消'}}</view>
          <view style="display:flex;justify-content: space-between;">
            <view style="width:130rpx">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注&nbsp;:</view>
            <view style="margin-left:18rpx;flex:1">{{item.remark}}</view>
          </view>
        </view>
          <view :class="item.clue_status === 0 ? 'bottom_view_teshu  min-border-top':'bottom_view  min-border-top' ">
            <view class="f28" v-if="item.clue_status !== 0">{{staus[item.clue_status].desc}}: {{$minCommon.formatDate(new Date(item.operating_time*1000),'yyyy/MM/dd hh:mm:ss')}}</view>
            <view view class="btn  m-right-20" v-if="item.clue_status === 0" @click="ignore(item.id)">忽略</view>
            <view view class="btn a" style="border:none" v-if="item.clue_status === 1 || item.clue_status === 0" @click="book(item.id)">预约</view>
            <view view class="btn c" v-if="item.clue_status === 2" @click="desk(item.desk_id)">查看详情</view>
            <view view class="btn d" v-if="item.clue_status === 3" @click="reBook(item.id)">重新预约</view>
			    </view>
      </view>
    </view>

    <min-404 v-if="main.length === 0"></min-404>
  </view>
</template>

<script>
// 线索状态: 0 -待处理 1-已忽略 2-已预约 3-已取消
	const staus = [{name:'待处理',desc:''},{name:'已忽略',desc:'忽略时间'},{name:'已预约',desc:"预约时间"},{name:'已取消',desc:"取消时间"}]
export default {
  name: "clue-management",
  navigate: ["navigateTo"],
  data() {
    return {
      currten: 0,
      staus,
      list: [],
      main: []
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
        this.$minApi.getClueManagement().then(res => {
          this.list = res;
          console.log(this.list);
          this.main = this.list[0].list;
        });
    },
    active(n) {
      this.currten = n;
      this.main = this.list[n].list;
      console.log(this.list[n]);
    },
    makePhone(e) {
      uni.makePhoneCall({
        phoneNumber: e //仅为示例
      });
    },
    // 忽略
    ignore(clue_id){
        this.$minApi.getIgnore({
            clue_id
        }).then(res=>{
          console.log(res)
          this.$showToast('操作成功')
          setTimeout(() => {
            this.getData()
          },2000)
        })
    },
    // 预约
    book(clue_id){
        uni.navigateTo({
          url:'../store/apin-store?clue_id='+clue_id
        })
    },
    // 查看详情
    desk(id){
        this.$minRouter.push({
          name:"platform-detail",
          params:{id}
        })
    },
    // 重新预约
    reBook(clue_id){
         uni.navigateTo({
            url:'../store/apin-store?clue_id='+clue_id
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.top_view_clue {
  width: 100%;
  height: 48rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 40rpx;
  .item {
    width: 158rpx;
   padding: 12rpx 0;
    background: #fff;
    border-radius: 5rpx;
    text-align: center;
    line-height: 48rpx;
    margin-bottom: 20rpx;
  }
  .item_active {
    width: 158rpx;
    padding: 12rpx 0;
    background: rgba(255, 224, 1, 1);
    border-radius: 5rpx;
    text-align: center;
    line-height: 48rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
}
.title_view {
  width: 100%;
  height: 28rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
  .status {
    font-weight: bold;
  }
}
.card {
  background: #fff;
  border-radius: 10rpx;
  .main {
    position: relative;
    color: #333;
    & > view {
      margin-bottom: 10rpx;
      &:last-child {
        margin: 0;
      }
    }
    .phone {
      display: flex;
      justify-content: space-between;
      .image-view {
        width: 44rpx;
        height: 44rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.bottom_view{
	  height: 80rpx;line-height: 77rpx;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  .btn{
		  width:142rpx;
			height:58rpx;
			background:rgba(255,255,255,1);
			border:1rpx solid rgba(231,231,231,1);
			border-radius:10rpx;
			text-align: center;
			line-height: 58rpx;
			font-size: 26rpx;
	  }
    .a{
      width:142rpx;
			height:58rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			text-align: center;
			line-height: 58rpx;
			font-size: 26rpx;
      background: #FFE001;
    }
  }
  .bottom_view_teshu{
	  height: 80rpx;line-height: 77rpx;
	  display: flex;
	  justify-content: flex-end;
	  align-items: center;
	  .btn{
		    width:142rpx;
			height:58rpx;
			background:rgba(255,255,255,1);
			border:1rpx solid rgba(231,231,231,1);
			border-radius:10rpx;
			text-align: center;
			line-height: 58rpx;
			font-size: 26rpx;
	  }
    
  }
</style>
