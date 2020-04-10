<template>
	<view class="modify-mobile p-lr-30 p-tb-20">
		
		 <min-desc-input textArr="left" desc='原手机号'></min-desc-input>
		 <min-desc-input textArr="left" desc='新手机号'></min-desc-input>
		 <view class="inp min-flex min-flex-main-between min-border-bottom">
		       <min-desc-input textArr="left" desc='验证码'></min-desc-input>
		        <view class="f26  btn" @click="countDown" v-if="code === 0">获取验证码</view>
		        <view v-else class="theme-text">{{code}} s</view>
		</view>
		 <min-btn class="m-top-30">确认修改</min-btn>
	</view>
</template>

<script>
	export default{
	  name: 'modify-mobile',
	  navigate: ['navigateTo'],
		data(){
			return{
				code:0
			}
		},
		methods:{
			 countDown () {
			  this.$minCommon.setCountDown((num) => {
				console.log(num)
				this.code = num
			  })
			}
		}
	}
</script>

<style lang="scss" scoped>
// uni-page-body {height: 100vh;background: #fff;width: 100vw;overflow: hidden;}
.modify-mobile{
height: 100vh;background: #fff;width: 100vw;overflow: hidden;
 .inp {
    font-size: 30rpx;
  }
  .icon {
    width: 40rpx;
    height: 40rpx;
  }
  .btn{
    width:174rpx;
    height:68rpx;
    border:1rpx solid rgba(204,204,204,1);
    border-radius:10rpx;
    text-align: center;
    line-height: 68rpx;
  }
  .theme-text{
        width:174rpx;
    height:68rpx;

    border-radius:10rpx;
    text-align: center;
    line-height: 68rpx;
  }
}
</style>
