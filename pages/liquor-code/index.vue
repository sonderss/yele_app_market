<template>
  <view class="liquor-code  p-tb-20 p-lr-30">
      <!-- <min-cell>
          <view class="f30 p-tb-25">取酒客户信息</view>
          <view class="min-border-bottom" style="height:1rpx"></view>
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28">
            <text class="m-bottom-10 m-top-20">客户姓名：刘晓庆</text>
            <text class="m-bottom-10">联系电话：13563250000</text>
            <text class="m-bottom-10">当前台号：K1112</text>
          </view>
      </min-cell> -->
      <min-show-order :list="list"></min-show-order>
      <view class="m-tb-20"></view>
      <min-cell :card="false">
          <view class="f30 p-tb-25">存酒客户信息</view>
          <view class="min-border-bottom" style="height:1rpx"></view>
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-20">
            <text class="m-bottom-10 m-top-20">客户姓名：{{$parseURL().client_name}}</text>
            <text class="m-bottom-10">联系电话：{{$parseURL().client_mobile}}</text>
          </view>
      </min-cell>
      <text class="desc f24 p-tb-20">我们将向存酒客户发送一条取酒码</text>
      <view class="code min-flex">
         <input type="number" maxlength="6" class="p-left-20" v-model="fetch_code" placeholder="输入验证码"/>
         <text class="f28 p-right-20" :class="flag ? 'timertxt' : 'codeing' " @click="sendCode">{{flag ? timerTxt : `${timerTxt} S` }}</text>
      </view>
      <view class="btn">
        <min-btn :long="true" @click="submit">提 交</min-btn>
      </view>
      <!-- <min-message ref='test'></min-message> -->
  </view>
</template>

<script>
export default {
  name: 'liquor-code',
  navigate: ['navigateTo'],
  data () {
    return {
      timerTxt: '发送取酒码',
      num: 60,
      fetch_code: '',
      flag: true,
      list: { title: '取酒客户信息', content: [{ name: '客户姓名', value: '刘晓庆' }, { name: '联系电话', value: '13563250000' }] }
    }
  },
  onLoad () {
    console.log(this.$parseURL())
    // 这里是开台时的客户信息
    this.list.content = [{ name: '客户姓名', value: this.$parseURL().info.name }, { name: '联系电话', value: this.$parseURL().info.phone }]
  },
  methods: {
    sendCode () {
      if (!this.$minCommon.checkMobile(this.$parseURL().client_mobile)) return this.$showToast('手机号不正确')
      if (this.flag) {
        this.num = 60
      }
      this.$minApi.getVerificationCode({
        mobile: this.$parseURL().client_mobile
      }).then(res => {
        this.$showToast('发送成功')
        this.$minCommon.setCountDown(() => {
          this.num--
          this.timerTxt = this.num
          this.flag = false
          if (this.num <= 0) {
            this.timerTxt = '发送取酒码'
            this.flag = true
          }
        }, this.num)
      })
    },
    submit () {
      // 取酒提交
      this.$minApi.getWinePost({ id: this.$parseURL().id, opening_id: this.$parseURL().opening_id, fetch_code: this.fetch_code })
    }
  }
}
</script>

<style lang="scss" scoped>
.liquor-code{
  .desc{
    // background: #f00;
    display: block
  }
  .code{
    height: 98rpx;
    background: #ffffff;
    input{
      display: block;
      flex: 1;
      height: 100%;
      line-height: 98rpx;
    }
    .timertxt{
      color: #FF0000;
      display: block;
      height: 100%;
      line-height: 98rpx;
    }
    .codeing{
      color: #666666;
      display: block;
      height: 100%;
      line-height: 98rpx;
    }
  }
  .btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}

</style>
