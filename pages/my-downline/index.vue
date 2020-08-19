<template>
  <view class="my-downline p-lr-20 p-tb-20">
    <min-search
      class="m-lr-30"
      v-model="value"
      placeholder="请输入营销姓名/手机号搜索"
      style="border-radius:5px;"
    ></min-search>
    <view class="mid-view">
      <view class="left-view">
        <text class="txt">{{list.offline_count}}</text>
        <text class="txt1">下线人数</text>
      </view>
      <view class="right-view">
        <text class="txt" style="color:#FE0000">￥{{list.total_rebate}}</text>
        <text class="txt1">累计返佣</text>
      </view>
    </view>
    <view class="main">
      <view class="title-view">
        <text class="t">注册时间</text>
        <text class="t">人员信息</text>
        <text class="t">累计返佣</text>
      </view>
      <template v-for="item in newData">
        <view class="main-content min-border-top" :key="item.id">
          <view class="creat-time t">
            <text>{{item.create_time}}</text>
          </view>
          <view class="creat-info t">
            <text>{{item.user_name}}</text>
            <text class="p-top-10">{{item.mobile}}</text>
          </view>
          <view class="creat-money t">
            <view>
              <text style="color: #FF0000;width:auto">￥{{item.commission*1+20}}</text>
            </view>
          </view>
        </view>
      </template>
    </view>
    <min-404 v-if="newData.length === 0" pTop="100rpx" />
  </view>
</template>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-downline',
  navigate: ['navigateTo'],
  data() {
    return {
      list: {},
      clue_list: [],
      value: '',
    }
  },
  computed: {
    newData() {
      let data = []
      if (this.value) {
        this.clue_list.filter(item => {
          if (
            item.mobile.includes(this.value) ||
            item.user_name.includes(this.value)
          ) {
            data.push(item)
          }
        })
      } else {
        data = this.clue_list
      }
      return data
    },
  },
  watch: {
    value(a) {
      console.log(a)
    },
  },
  onLoad() {
    this.$minApi.myDownLine().then(res => {
      console.log(res)
      this.list = res
    })
    this.$minApi.getMyDownLineList({}).then(res => {
      this.clue_list = res.list
      console.log(this.clue_list)
    })
  },
}
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
      content: '';
      height: 50%;
      width: 1px;
      background: #e7e7e7;
      position: absolute;
      right: 0;
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
</style>
