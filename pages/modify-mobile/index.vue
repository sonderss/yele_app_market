<template>
	<view class="modify-mobile p-lr-30 p-tb-20">
		
		 <min-desc-input textArr="left" v-model="old_mobile" desc='原手机号'></min-desc-input>
		 <min-desc-input textArr="left" v-model="new_mobile" desc='新手机号'></min-desc-input>
		 <view class="inp min-flex min-flex-main-between min-border-bottom">
		       <min-desc-input textArr="left" desc='验证码' v-model="msg_code"></min-desc-input>
		        <view class="f26  btn" @click="countDown" v-if="code === 0">获取验证码</view>
		        <view v-else class="theme-text">{{code}} s</view>
		</view>
		 <min-btn class="m-top-30" @click="SetPhone">确认修改</min-btn>
	</view>
</template>

<script>
	export default {
	  name: 'modify-mobile',
	  navigate: ['navigateTo'],
		data(){
			return{
				code:0,
				old_mobile:"",
				new_mobile:"",
				msg_code:"1235"
			}
		},
		mounted(){
			this.old_mobile = this.$parseURL().mobile
		},
		methods:{
			 countDown () {
			  this.$minCommon.setCountDown((num) => {
				this.code = num
			  })
			},
			SetPhone(){
				// 判断手机号是否正确
				if(!this.$minCommon.checkMobile(this.new_mobile) || !this.$minCommon.checkMobile(this.old_mobile)) return this.$showToast('请输入正确的手机号')
				if(this.msg_code.length === 0)return this.$showToast('请输入验证码')
				// 确认修改
				this.$minApi.setPhone({
				 old_mobile:this.old_mobile,
				 new_mobile:this.new_mobile,
				 msg_code:this.msg_code
				}).then(res=>{
				 console.log(res)
					this.$showToast('修改成功')
					setTimeout(()=>{
						this.$minRouter.push('mine-info')
					},2000)
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
