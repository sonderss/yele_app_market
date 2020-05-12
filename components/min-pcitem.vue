<template>
    <view class="min-pcitem">
        <view class="main-item" @click="toEmit">
            <view class="image_view">
            <image :src="imgerr ? '/static/images/headurl60.png' : list.head_img" @error="imgErro" />
            </view>
            <view class="main">
            <view class="f30" style>
                {{list.store_name}} |
                <text
                class="f24 m-left-10"
                style="color: #666666;"
                >营业:{{list.store_config.business_end_time}}--{{list.store_config.business_start_time}}</text>
            </view>
            <view class="m-tb-20 f24" style="color: #666666;">{{list.address}}</view>
             <view v-if="showPrice" class="f24 p-bottom-20" style="color:  #FF0000;font-weight:bold;">订台提成{{list.person_royalty_money}}%</view> 
            </view>
            <!--<view class="right_view iconjinru" ></view>-->
            <image v-if="showArray" style="width:24rpx;height:24rpx;padding-right:20rpx" class="arrow" src="/static/images/arrow.png"></image>
        </view>
        </view>
</template>
<script>
export default {
    props:{
        list:Object,
        showArray:{
            type:Boolean,
            default:true
        },
        showPrice:{
          type:Boolean,
          default:false
        }
    },
    data(){
        return {
            imgerr:false
        }
    },
    methods: {
        toEmit(){
            this.$emit('emitE')
        },
        imgErro(e) {
            if (e.type === "error") {
                this.imgerr = true;
            }
        }
    }
}
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

</style>