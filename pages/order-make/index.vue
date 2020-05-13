<template>
  <view class="order-make p-tb-20 p-lr-30">
            <min-pcitem desk  :list="$parseURL().store" />
            <view class="goods-wrap m-top-20 p-lr-20">
                <view class="p-tb-30 min-border-bottom">
                    商品
                    <view
                    class="status"
                    :class="$minCommon.getOrderStatus(2).color"
                    ></view>
                </view>
                <view class="content p-top-10" v-if="products.length === 0">
                       <view class="product_btn">
                        去选购商品 >>
                       </view>
                </view>
                <view class="goods-list p-top-10" v-if="products.length >= 1">
                    <view class="m-tb-20" v-for="item in products" :key="item.id">
                        <min-goods-item
                            name='item.product_name'
                            price="item.total"
                            icon="item.product_img"
                            specification="item.sku"
                            value="item.quantity"
                        ></min-goods-item>
                    </view>
                </view>
            </view>

            <view class="card p-lr-20 m-tb-20">
                <view class="p-tb-30 min-border-bottom">台位信息</view>
                <view class="main p-tb-20">
                    <view>
                    台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
                    <text class="emp">{{123}}</text>
                    </view>
                    <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥123</view>
                </view>
            </view>

            <view class="card p-lr-20 m-tb-20">
                <view class="p-tb-30 min-border-bottom">客户信息</view>
                <view class="main p-tb-20">
                    <view>
                    客户姓名：
                    <text class="">{{123}}</text>
                    </view>
                    <view>联系电话：15812157877777</view>
                </view>
            </view>

        <min-goods-submit 
         buttonText="去支付"
         :bgCor="products.length !== 0 ?  '' : '#CCC' "
         @submit="submit"
        />
  </view>
</template>

<script>
export default {
        name:"order-make",
        navigate:["navigateTo"],
        data(){
            return{
                list:{},
                products:[]
            }
        },
        methods:{
            submit(){
                if(this.products.length === 0)return this.$showToast('没有选择商品')
            }
        },
        onLoad(){
            console.log(this.$parseURL().store)
        }
}
</script>

<style lang="scss" scoped>
.goods-wrap {
    background: #fff;
    padding-bottom: 20rpx;
    .status {
      float: right;
      &.cancel,
      &.return {
        color: #333333;
      }
      &.not-produce {
        color: #0090ff;
      }
    }
    .count {
      float: right;
    }
  }
.content{
    width:100%;
    height:288rpx;
    background:rgba(255,255,255,1);
    border-radius:10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .product_btn{
        width:248rpx;
        height:68rpx;
        background:rgba(255,224,1,1);
        border-radius:10rpx;
        font-size: 28rpx;
        line-height: 68rpx;
        text-align: center;
    }
}
.card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      position: relative;
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
      .emp{
        display: inline-block;
        font-weight: bold;
        color: #FE0000;
      }
    }
  }
</style>