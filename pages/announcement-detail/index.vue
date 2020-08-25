<template>
  <view class="announcement-detail p-lr-20 p-tb-20">
    <view class="main">
      <view class="title">{{ content.discount_name }}</view>
      <view class="name">
        <text class="time">{{ content.create_time }}</text>
        <text class="desc m-left-20">{{ content.store_name }}</text>
      </view>
      <view
        class="content_desc m-top-10"
        v-html="content.discount_content"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'announcement-detail',
  navigate: ['navigateTo'],
  data() {
    return {
      content: {}
    }
  },
  mounted() {
    console.log(this.$parseURL())
    this.$minApi
      .storMentDetail({ notice_id: this.$parseURL().id })
      .then(res => {
        console.log(res)
        this.content = res
      })
  }
}
</script>

<style lang="scss" scoped>
.announcement-detail {
  .main {
    height: auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    padding: 40rpx 20rpx;
    padding-top: 20rpx;
    .title {
      height: 34rpx;
      font-size: 36rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .name {
      margin-top: 26rpx;
      .time {
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .desc {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
