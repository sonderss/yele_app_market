<template>
  <view class="verify-name">
    <view class="tips" v-if="$parseURL().is_certify !== 1">实名认证后才能使用提现功能</view>
    <view class="p-lr-30 p-top-25">
      <view class="p-lr-30">手机号码</view>
      <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom" v-if="$parseURL().is_certify !== 1">
        <input placeholder="未绑定" maxlength="11"  v-model="mobile"/>
      </view>
      <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom"  v-if="$parseURL().is_certify === 1">{{this.$parseURL().phone}}</view>
    </view>
    <view class="p-lr-30 p-top-25">
      <view class="p-lr-30">身份证号码</view>
      <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom" v-if="$parseURL().is_certify !== 1">
         <input placeholder="未认证" maxlength="20"  v-model="id_card"/>
      </view>
      <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom" v-if="$parseURL().is_certify === 1">{{$parseURL().id_card}}</view>

    </view>
    <view class="btm_desc p-lr-30" v-if="$parseURL().is_certify !== 1">
      <input v-model="code" class="p-lr-30" type="number"  maxlength="6" placeholder="验证码"/>
          <view class="top_view">
               <text class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</text>
               <text  v-else >{{countDown}} s</text>
          </view>
        
    </view>
    <view class="btn-wrap m-lr-20"  v-if="$parseURL().is_certify !== 1">
      <min-btn @click="toFaceName">去认证</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'verify-name',
  navigate: ['navigateTo'],
  onLoad(){
    
  },
  mounted(){
    console.log(this.$parseURL())
    this.mobile = this.$parseURL().phone
  },
  data(){
    return{
      mobile:"",
      id_card:"",
      countDown:0,
      code:''
    }
  },
  methods:{
     getVerificationCode () { // 获取验证码
      if (!this.$minCommon.checkMobile(this.mobile)) {
        this.$showToast('请检查手机号码')
        return
      }
      this.$minApi.getVerificationCode({ mobile: this.mobile }).then(res => {
        this.$showToast('发送成功')
        this.$minCommon.setCountDown((num) => { // 倒计时
          this.countDown = num
        })
      })
    },
    toFaceName(){
       if(!this.$minCommon.checkMobile(this.mobile)) return this.$showToast('请输入正确的手机号')
       if(this.id_card.length < 19) return this.$showToast('银行卡格式不正确')
       this.$minApi.postFace({
          mobile:this.mobile,
          id_card:this.id_card,
          msg_code:this.code
       }).then(res=>{
         console.log(res)
         this.$showToast('认证成功')
         this.$store.dispatch('user/setUserInfoAuth',res.apiAuth)
         this.$store.dispatch('status/setisGetUser',true)
         setTimeout(() => {
            uni.navigateBack({
                delta: 1
            });
         },2000)
       })
    }
  }
}
</script>

<style lang="scss" scoped>
.verify-name{
  .tips{
    padding: 18rpx 32rpx;
    color: #FF0000;
    background: #F0D0D0;
    font-size: 24rpx;
  }
  .btn-wrap{
    margin-top: 80rpx;
  }
}
.btm_desc{
  margin: 20rpx 0;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input{flex: 1;height: 100%;}
  .top_view{width: 150rpx;}
}
</style>
