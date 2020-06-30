<template>
    <view class="min-pcitem p-lr-20" style="  background: rgba(255, 255, 255, 1);">
        <view :class="isBorder ? 'main-item min-border-bottom':'main-item'" @click="toEmit">
            <view class="image_view">
              <image :src="imgerr ? '/static/images/headurl60.png' : list.head_img" @error="imgErro" />
            </view>
            <view class="main p-bottom-20">
              <view class="f30" v-if="desk">
                  {{list.store_name}}
              </view>
              <view class="f30" v-if="!desk">
                  {{list.store_name}} |
                  <text
                  class="f24 m-left-10"
                  style="color: #666666;"
                  > 
                  营业:{{list.store_config.business_start_time}}--{{list.store_config.business_end_time}}</text>
                  <text v-if="list.isPrv" class="f20 prv m-left-20">上次选择</text>
              </view>
              <view class="m-tb-10 f24" style="color: #666666;">{{list.address}}</view>
              <view v-if="showPrice" class="f24 " style="color:  #FF0000;font-weight:bold;">订台提成{{list.person_royalty_money}}%</view> 
              <view v-if="showAddarse" class="f24 ">{{list.distance}}km</view>
            </view>
            <!--<view class="right_view iconjinru" ></view>-->
            <view class="right_view" v-if="showArray">
                <image  style="width:24rpx;height:24rpx;" class="arrow" src="/static/images/arrow.png"></image>
            </view>
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
        },
        showAddarse:{
          type:Boolean,
          default:false
        },
        isPrv:{
          type:Boolean,
          default:false
        },
        desk:{
          type:Boolean,
          default:false
        },
        isBorder:{
          type:Boolean,
          default:true
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
    padding-top: 20rpx;
    .image_view {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .main {
      flex: 1;
      padding-left: 20rpx;
      .prv{
        width:86rpx;
        height:26tpx;
        background:rgba(255,241,0,1);
        border-radius:4rpx;
      }
    }
    .right_view {
      height: 100%;
      margin-top: 5%;
      // line-height: 150rpx;
    }
  }

</style>