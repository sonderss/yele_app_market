<template>
  <view class="modify-mobile p-lr-30 p-tb-20">
    <view class="min-view-item min-flex min-flex-main-between f28 min-border-bottom">
      <text class="desc-width">原手机号</text>
      <view class="right-view">
        <input
          class="oinput"
          type="number"
          placeholder="输入原手机号"
          maxlength="11"
          v-model="old_mobile"
        />
      </view>
    </view>
    <view class="min-view-item min-flex min-flex-main-between f28 min-border-bottom">
      <text class="desc-width">新手机号</text>
      <view class="right-view">
        <input
          class="oinput"
          type="number"
          placeholder="输入新手机号"
          maxlength="11"
          v-model="new_mobile"
        />
      </view>
    </view>
    <view class="inp min-flex min-flex-main-between min-border-bottom">
      <view class="min-view-item min-flex min-flex-main-between f28 min-border-bottom">
        <text class="desc-width">验证码</text>
        <view class="right-view">
          <input
            class="oinput"
            type="number"
            placeholder="验证码"
            maxlength="6"
            v-model="msg_code"
          />
        </view>
      </view>
      <view class="f26 btn" @click="countDown" v-if="code === 0">获取验证码</view>
      <view v-else class="theme-text">{{code}} s</view>
    </view>
    <min-btn class="m-top-30" @click="SetPhone">确认修改</min-btn>
  </view>
</template>

<script>
export default {
  name: "modify-mobile",
  navigate: ["navigateTo"],
  data() {
    return {
      code: 0,
      old_mobile: "",
      new_mobile: "",
      msg_code: ""
    };
  },
  mounted() {
    this.old_mobile = this.$parseURL().mobile;
  },
  methods: {
    countDown() {
       if (
        !this.$minCommon.checkMobile(this.old_mobile)
      )
         return this.$showToast("请输入正确的手机号");
      this.$minCommon.setCountDown(num => {});
      if (!this.$minCommon.checkMobile(this.old_mobile)) {
        this.$showToast("请输入正确的手机号码");
        return;
      }
      this.$minApi.getVerificationCode({ mobile: this.old_mobile })
	   this.$minCommon.setCountDown(num => {
          // 倒计时
          this.code = num;
        });
    },
    SetPhone() {
      // 判断手机号是否正确
      if (
        !this.$minCommon.checkMobile(this.new_mobile) ||
        !this.$minCommon.checkMobile(this.old_mobile)
      )
        return this.$showToast("请输入正确的手机号");
      if (this.msg_code.length !== 6 || isNaN(this.msg_code)) return this.$showToast("请输入验证码");
      // 确认修改
      this.$minApi
        .setPhone({
          old_mobile: this.old_mobile,
          new_mobile: this.new_mobile,
          msg_code: this.msg_code
        })
        .then(res => {
          console.log(res);
          this.$showToast("修改成功");
          setTimeout(() => {
            this.$minRouter.push("mine-info");
          }, 2000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// uni-page-body {height: 100vh;background: #fff;width: 100vw;overflow: hidden;}
.modify-mobile {
  height: 100vh;
  background: #fff;
  width: 100vw;
  overflow: hidden;
  .inp {
    font-size: 30rpx;
  }
  .icon {
    width: 40rpx;
    height: 40rpx;
  }
  .btn {
    width: 174rpx;
    height: 68rpx;
    border: 1rpx solid rgba(204, 204, 204, 1);
    border-radius: 10rpx;
    text-align: center;
    line-height: 68rpx;
  }
  .theme-text {
    width: 174rpx;
    height: 68rpx;

    border-radius: 10rpx;
    text-align: center;
    line-height: 68rpx;
  }
}
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
