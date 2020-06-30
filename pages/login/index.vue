<template>
  <view class="login">
	<view class="logo">
			<image src="/static/images/login/ye_logo.png" class="bg-img"></image>
	</view>
    
    <view style="height: 50rpx;"></view>
    <view class="m-lr-30 p-lr-30">
      <view class="inp p-left-30 min-flex min-flex-main-start min-border-bottom">
        <image class="icon" src="/static/images/login/user.png"></image>
        <input type="number" v-model="mobile" placeholder="请输入手机号码" maxlength="11">
        <view class="clear-icon" v-show="mobile" @click="mobile = ''">
          <image src="/static/images/clear.png"></image>
        </view>
      </view>
      <view class="inp p-left-30 min-flex min-flex-main-between min-border-bottom">
        <view class="min-flex min-flex-main-start">
          <image class="icon" src="/static/images/login/lock.png"></image>
          <input type="number" maxlength="6" v-model="code" placeholder="请输入验证码">
        </view>
        <view class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</view>
        <view v-else>{{countDown}} s</view>
      </view>
    </view>
    <view style="height: 114rpx"></view>
    <view class="p-lr-30">
      <min-btn @click="login" shape="circle">登录</min-btn>
    </view>
    <min-message ref='message'></min-message>
  </view>
</template>

<script>
import '../../static/js/quit'
export default {
  name: 'login',
  data () {
    return {
      countDown: 0,
      code: '521125',
      mobile: '13112233445'
    }
  },
  onLoad(){
    if(!this.$store.state.status.dev){
       this.code = ''
       this.mobile = ''
    }
  },
  methods: {
    getVerificationCode () { // 获取验证码
      if (!this.$minCommon.checkMobile(this.mobile)) {
        this.$showToast('请输入正确的手机号码')
        return
      }
      this.$minApi.getVerificationCode({ mobile: this.mobile })
      this.$minCommon.setCountDown((num) => { // 倒计时
        this.countDown = num
      })
    },
    login () {
      if (!this.$minCommon.checkMobile(this.mobile) || this.code.length !== 6) return this.$showToast('请正确填写信息')
      this.$minApi.login({ mobile: this.mobile, code: this.code }).then(res => {
        this.$showToast('登录成功')
        setTimeout(() => {
          this.$store.dispatch('user/setUserInfo', res)
          uni.redirectTo({
            url: '../index/index'
          })
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: #fff;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  .logo{
	  width: 100%;
	  height: 140rpx;
	  margin-top: 170rpx;
	  margin-left: 84rpx;
	  image{
		 width: 332rpx;
		 height: 104rpx;
	  }
  }
  .bg-img {
    width: 100%;
    height: 466rpx;
  }
  .inp {
    margin-top: 50rpx;
    height: 66rpx;
    font-size: 30rpx;
    position: relative;
    input {
      padding-left: 56rpx;
      width: 400rpx;
      color: black;
    }
    .code {
      color: #333;
    }
    .clear-icon{
      width: 66rpx;
      height: 66rpx;
      padding: 20rpx;
      position: absolute;
      right: 0rpx;
      top: -4rpx;
    }
  }
  .icon {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
