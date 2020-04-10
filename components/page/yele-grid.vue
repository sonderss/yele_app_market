<template>
  <view class="yele-grid min-flex min-flex-main-start min-flex-wrap-nowrap m-top-20 m-lr-30">
    <view class="grid-item min-flex min-flex-dir-top"
      v-for="(item,index) in list" :key="item.name"
      @click="goTo(index)"
    >
      <image class="img" :src="item.img"></image>
      <view class="f24 txt">{{item.text}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'YeleGrid',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {
    goTo (n) {
      this.$minRouter.push({
        name: this.list[n].name,
        type: 'navigateTo',
        path: this.list[n].url
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.yele-grid {
  background: #FFFFFF;
  border-radius: 6px;
  justify-content: space-between;
  padding: 20rpx 50rpx;
  .grid-item {
    padding: 10rpx 0;
    width: auto;
  }
  .img {
    width: 80rpx;
    height: 80rpx;
  }
  .txt{
	  width: auto;
	  white-space: nowrap;
  }
}
</style>
