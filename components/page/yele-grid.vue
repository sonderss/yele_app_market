<template>
  <view
    class="yele-grid min-flex min-flex-main-start min-flex-wrap-wrap m-lr-30 m-top-20 p-tb-20"
  >
    <view
      class="grid-item min-flex min-flex-dir-top"
      v-for="(item, index) in list"
      :key="item.name"
      @click="goTo(index)"
    >
      <image class="img" :src="item.img"></image>
      <view class="f24">{{ item.text }}</view>
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
  data() {
    return {}
  },
  methods: {
    goTo(n) {
      let result = this.$getRoot(this.list[n].root)
      if (!result) return this.$showToast('抱歉，暂无权限')
      if (this.list[n].url) {
        uni.navigateTo({
          url: this.list[n].url
        })
        return
      }
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
  background: #ffffff;
  border-radius: 6px;
  .grid-item {
    padding: 10rpx 0;
    width: 33.33333%;
  }
  .img {
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
