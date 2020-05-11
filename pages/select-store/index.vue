<template>
  <view class="select-store p-tb-20 p-lr-30">
    <view class="card" v-for="item in  list" :key="item.id">
      <view class="main-item">
        <view class="image_view">
          <image :src="imgerr ? '/static/images/headurl60.png' : item.head_img" @error="imgErro" />
        </view>
        <view class="main">
          <view class="f30" style>
            {{item.store_name}} |
            <text
              class="f24 m-left-10"
              style="color: #666666;"
            >营业:{{item.store_config.business_end_time}}--{{item.store_config.business_start_time}}</text>
          </view>
          <view class="m-tb-20 f24" style="color: #666666;">{{item.address}}</view>
          <!-- <view class="f24" style="color:  #FF0000;font-weight:bold;">订台提成{{item.person_royalty_money}}%</view> -->
        </view>
        <view class="right_view iconjinru"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "select-store",
  navigate: ["navigateTo"],
  data() {
    return {
      list: [],
      imgerr: false
    };
  },
  methods: {
    imgErro(e) {
      console.log(e);
      if (e.type === "error") {
        this.imgerr = true;
      }
    }
  },
  mounted() {
    this.$minApi.getSeletStore().then(res => {
      console.log(res);
      this.list = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
font-face {
  font-family: "iconfont";
  src: url("~@/static/font/iconfont.css");
}
uni-page-body {
  width: 100%;
  height: 100%;
}
.card {
  border-radius: 10rpx;
  .main-item {
    height: auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    display: flex;
    justify-content: space-between;
    padding-left: 20rpx;
    padding-top: 20rpx;
    .image_view {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .main {
      flex: 1;
      padding-left: 20rpx;
    }
    .right_view {
      font-family: iconfont;
      font-size: 50rpx;
      // line-height: 150rpx;
    }
  }
}
</style>
