<template>
  <view class="token-phone  p-lr-30 p-tb-20">
    <view class="min-view-item min-flex min-flex-main-between f28 min-border-bottom">
      <text class="desc-width">原手机号</text>
      <view class="right-view">
        <input
          class="oinput"
          type="number"
          placeholder="输入原手机号"
          v-model="phone"
          maxlength="11"
        />
      </view>
    </view>
    <min-btn class="m-top-30" @click="SetPhone">验证</min-btn>
  </view>
</template>

<script>
export default {
  name: "token-phone",
  navigate: ["navigateTo"],
  data(){
      return {
          phone:''
      }
  },
  methods: {
      SetPhone(){
            console.log(this.$parseURL().mobile);
            if(this.phone !== this.$parseURL().mobile) return this.$showToast('手机号错误')
          
            this.$minRouter.push({
                name: 'modify-mobile',
                params: { mobile: this.$parseURL().mobile }
            })
      }
  },
};
</script>

<style lang='scss' scoped>
.min-view-item {
    height: 98rpx;
    .ophone {
      padding-right: 34rpx;
    }
    .right-arrow {
      width: 24rpx;
      height: 24rpx;
      padding-top: 5rpx;
    }
    .desc-width {
      width: 140rpx;
    }
    .right-view{
      flex: 1;
      display: flex;
      align-items: center;
      .oinput {
        width: 100%;
        height: 98rpx;
        display: block;
      }
    }
  }
</style>