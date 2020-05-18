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
         <input placeholder="未认证"  v-model="id_card"/>
      </view>
      <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom" v-if="$parseURL().is_certify === 1">{{$parseURL().id_card}}</view>

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
      id_card:""
    }
  },
  methods:{
    toFaceName(){
       if(!this.$minCommon.checkMobile(this.mobile)) return this.$showToast('请输入正确的手机号')
       this.$minApi.postFace({
          mobile:this.mobile,
          id_card:this.id_card
       }).then(res=>{
         console.log(res)
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
</style>
