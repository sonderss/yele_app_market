<template>
  <view></view>
</template>
<script>
export default {
  onLoad(){
      console.log(this.$store.state.user.userInfo.apiAuth);
     this.$store.state.user.userInfo.apiAuth ? uni.reLaunch({url: './index/index'}) : uni.reLaunch({url: './login/index'})
  }
}
</script>