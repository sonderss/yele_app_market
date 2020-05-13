<template>
  <view class="chioce-table p-tb-20 p-lr-30">
        <min-pcitem desk :showArray="false" :list="list"/>

        <view  v-for="(item,index) in 2" :key="index">
            <view class="platform-wrap"  >
                <view class="title" >{{'分组'}}</view>
                <view class="list">
                    <view
                    class="item"
                    :class="statusArr[3].class"
                    v-for="(item2, index2) in 3"
                    :key="index2"
                    @click="toOrder(item2)"
                    >
                    <view class="name" >{{'name'}}</view>
                    <view class="status">{{statusArr[3].name}}</view>
                    <view class="count">{{$minCommon.getSeats(2)}}</view>
                    </view>
                </view>
            </view>
        </view>
  </view>
</template>

<script>
const statusArr = [
  // 1 - 已停用, || 2 - 空闲,|| 3 - 已预约,|| 4 - 点单中,|| 6 - 已开台,  ||  5 - 待确认  7 - 清台中
  { name: 'null', class: '' },
  { name: '已停用', class: 'disabled' },
  { name: '空闲中', class: 'leisure' },
  { name: '已预约', class: 'reserved' },
  { name: '点单中', class: 'in-order' },
  { name: '待确认', class: 'be-confirm' },
  { name: '已开台', class: 'been-open' },
  { name: '清台中', class: 'clearing' }
]
export default {
        name:"chioce-table",
        navigate:["navigateTo"],
        data(){
            return{
                list:{},
                getDataChange:[],
                statusArr
            }
        },
        methods:{
            toOrder(item){
                // 下单详情
                this.$minRouter.push({
                    name:"order-make",
                    params:{store:{store_name:this.list.store_name,address:this.list.address,head_img:this.list.head_img,id:this.list.id}}
                })
            }
        },
        mounted(){
            // 选择桌台
            this.$minApi.getChioceOrderDesk({
                store_id: this.list.id
            }).then(res=>{
                console.log(res)
            })
        },
        onLoad(){
            console.log(this.$parseURL())
            this.list = this.$parseURL()
        }
}
</script>

<style lang="scss" scoped>
.platform-wrap {
    background: #fff;
    padding: 30rpx 20rpx;
    margin-top: 20rpx;
    .title {
      font-size: 30rpx;
      padding-bottom: 30rpx;
    }
    .list {
      .item {
        display: inline-block;
        width: 140rpx;
        border-radius: 10rpx;
        padding: 20rpx 0;
        text-align: center;
        margin-left: 30rpx;
        &:nth-child(4n+1) {
          margin: 0;
          margin-top: 20rpx;
        }
        &:first-child {
          margin: 0;
        }
        & > view {
          font-size: 28rpx;
          color: #fff;
        }
        .status {
          margin: 4rpx 0;
        }
        &.reserved {
          // 已预约
          background: #0090ff;
          & > view {
            color: #fff;
          }
        }
        &.been-open {
          // 已开台
          background: #ff0000;
        }
        &.be-confirm {
          // 待确认
          background: #39ba01;
        }
        &.clearing{
          // 清台中
          background: #39ba01;
        }
        &.in-order {
          // 点单中
          background: #ff9c00;
        }
        &.leisure {
          // 空闲中
          background: #eeeeee;
          & > view {
            color: #666;
          }
        }
        &.disabled {
          // 已停用
          background: #eeeeee;
          & > view {
            color: #ccc;
          }
        }
      }
    }
  }

</style>