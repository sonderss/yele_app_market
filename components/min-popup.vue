<template>
  <view
    class="min-popup"
    v-if="show"
    :class="[isShow ? 'min-show' : 'min-hide']"
    @touchmove.stop.prevent="moveHandle"
  >
    <view class="min-overlay" @click="close"></view>
    <view :class="size ?  'min-content-'+size : 'min-content'" :style="{height:heightSize+'rpx'}">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
    },
    size: {
      type: String,
    },
    heightSize: {
      type: String,
    },
  },
  data() {
    return {
      isShow: Boolean,
    }
  },
  created() {
    this.isShow = this.show
  },
  watch: {
    show() {
      this.isShow = this.show
      if (!this.show) {
        this.close()
      }
    },
  },
  methods: {
    close() {
      this.isShow = false
      setTimeout(() => {
        this.$emit('close')
      }, 400)
    },
    moveHandle() {
      // To Do Something
    },
  },
}
</script>

<style lang="scss" scoped>
.min-popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  &.min-hide {
    .min-content {
      animation: hide 0.5s linear forwards;
    }
    .min-content-height {
      animation: hide 0.5s linear forwards;
    }
    .min-overlay {
      opacity: 0;
    }
  }
  &.min-show {
    .min-content {
      animation: show 0.5s linear forwards;
    }
    .min-content-height {
      animation: show 0.5s linear forwards;
    }
    .min-overlay {
      opacity: 1;
    }
  }
  .min-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 200;
    transition: 0.5s;
  }
  .min-content {
    width: 100%;
    height: 800rpx;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9999;
    overflow: hidden;
    border-radius: 20rpx 20rpx 0 0;
  }
  .min-content-height {
    width: 100%;
    height: 600rpx;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 300;
    overflow: hidden;
  }
  @keyframes hide {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
  @keyframes show {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>
