<template>
  <view class="drawing-way m-lr-30 p-top-20">
    <view class="card p-lr-20" v-if="userInfo.bank_card_num" @click="jiebang">
      <view class="left">
        <image class="icon" src="/static/images/goods.png" />
        <p class="m-left-20 f30">{{userInfo.bank_card_name}}({{lastString}})</p>
      </view>
      <view style="color:#FF0000;font-size:25rpx">解绑</view>
    </view>
    <view class="nodata-wrap" style="padding-top:130rpx" v-else>
      <image class="nodata" src="/static/images/nodata.png" />
      <view class="text">尚未绑定银行卡</view>
      <view class="bn">
        <view class="btn" @click.stop="toBangding">绑定银行卡</view>
      </view>
    </view>
    <web-view :src="url" v-if="url"></web-view>
  </view>
</template>

<script>
export default {
  name: 'drawing-way',
  navigate: ['navigateTo'],
  data() {
    return {
      userInfo: {},
      lastString: '',
      url: '',
    }
  },
  onShow() {
    this.lastString = ''
    this.$minApi.userInfo({ isLoading: true }).then(res => {
      console.log(res)
      this.userInfo = res
      if (this.userInfo.bank_card_num) {
        this.getCardLast(this.userInfo.bank_card_num)
      }
    })
  },
  onBackPress(option) {
    console.log(option)
    const pages = getCurrentPages() //当前页
    const beforePage = pages[pages.length - 2] //上个页面
    const page = pages[pages.length - 1] //页面)
    console.log(
      '当前页',
      pages,
      '上个页面',
      beforePage.route,
      '页面',
      page.route
    )
    // uni.redirectTo({
    //   url: '../mine-info/index',
    // })
  },
  methods: {
    // 获取银行卡后四位
    getCardLast(bank_card_num) {
      if (this.lastString.length !== 4) {
        let card = [...bank_card_num]
        let a = [4, 3, 2, 1]
        a.map(item => {
          this.lastString += card[card.length - item]
        })
      }
    },
    toBangding() {
      if (!this.userInfo.is_cash_pwd) return this.$showToast('请先设置支付密码')
      if (this.userInfo.is_certify !== 1)
        return this.$showToast('请先进行实名认证')
      this.getVipInfo()
      // this.$minRouter.push({
      //   name: 'authentication',
      //   params:{isBind:true}
      // })
    },
    jiebang() {
      this.$minRouter.push({
        name: 'authentication',
      })
    },
    getVipInfo() {
      this.$minApi
        .getUserVip()
        .then(res => {
          console.log(res)
          if (res.url) {
            // this.$store.dispatch('status/setvipUrl',res.url)
            this.url = res.url
            // this.$minRouter.push({
            //   name:'webview'
            // })
          } else {
            this.$minRouter.push({
              name: 'authentication',
              params: { isBind: true },
            })
          }
        })
        .catch(err => {
          console.log(err)
          if (err.length === 0) {
            this.$minRouter.push({
              name: 'authentication',
              params: { isBind: true },
            })
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.drawing-way {
  .card {
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 102rpx;
    border-radius: 10rpx;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        width: 44rpx;
        height: 44rpx;
      }
    }
  }
}
.bn {
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    width: 330rpx;
    height: 88rpx;
    background: rgba(255, 224, 0, 1);
    border-radius: 10rpx;
    line-height: 88rpx;
    text-align: center;
    margin-top: 20rpx;
    align-self: center;
  }
}
</style>
