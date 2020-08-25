<template>
  <view class="offer-announcement p-lr-20 p-tb-20">
    <view class="card">
      <view
        :class="index !== list.length - 1 ? 'item min-border-bottom' : 'item'"
        v-for="(item, index) in list"
        :key="item.id"
        @click="toDetail(item.id)"
      >
        <view class="left_view">
          <view class="store f28">{{ item.store_name }}</view>
          <view class="right_view f26" style="color:#666666">{{
            item.create_time
          }}</view>
        </view>
        <view class="name m-top-20">{{ item.discount_name }}</view>
      </view>
    </view>
    <min-404 v-if="list.length === 0"></min-404>
    <min-drawer
      :visible="showdrawer"
      mode="right"
      @close="closedrawer"
      @changeStore="changeStoreId"
    ></min-drawer>
  </view>
</template>

<script>
export default {
  name: 'offer-announcement',
  navigate: ['navigateTo'],
  data() {
    return {
      list: [],
      showdrawer: false
    }
  },
  onNavigationBarButtonTap(e) {
    console.log(e)
    this.showdrawer = true
  },
  methods: {
    getData(store_id) {
      this.$minApi.storMentList({ store_id }).then(res => {
        console.log(res.list)
        this.list = res.list
      })
    },
    toDetail(id) {
      // 公告详情
      this.$minRouter.push({
        name: 'announcement-detail',
        params: { id }
      })
      // uni.navigateTo({
      //     url:'../announcement-detail/index?id=1'
      // })
    },
    closedrawer() {
      this.showdrawer = false
    },
    changeStoreId(store_id, store_name) {
      this.getData(store_id)
      this.closedrawer()
      uni.setNavigationBarTitle({
        title: store_name
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10rpx;
  padding: 0 20rpx;
  .item {
    height: 149rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .left_view {
      display: flex;
      justify-content: space-between;
    }

    .name {
      font-weight: bold;
      font-size: 36rpx;
      color: #333;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
