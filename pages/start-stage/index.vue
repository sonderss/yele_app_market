<template>
  <view class="start-stage p-lr-30 p-tb-20">
    <radio-group @change="radioChange" style="margin-bottom:100rpx">
      <view class="top-view-start p-tb-30 bg-white radius-6 p-lr-20" @click="test('-1')">
        <radio value="-1" color="#FFE001" class="radio" :checked="a === -1 ? true : false" />
        <text class="text">自来客</text>
      </view>
      <min-cell :card="false" class="m-top-20">
        <view class="title p-tb-30">营销带客</view>
        <min-search v-model="value" placeholder="请输入营销姓名/手机号搜索" bgColor="#f7f7f7"></min-search>
        <view style="height:20rpx"></view>
        <min-cell-item
          v-for="(item,index) in getValue"
          :key="index"
          :img="item.head_img ? item.head_img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg' "
          :title="`${item.sales_name} | ${item.position_name}`"
          :label="item.mobile"
          @eventParent="test(index)"
        >
          <radio slot="icon" :value="`${index}`" color="#FFE001" :checked="a === index ? true : false" class="radio" />
        </min-cell-item>
      </min-cell>
    </radio-group>
     <view class="btn">
        <min-btn :opacity="false" :long="true" @click="toAddUserInfo">下一步</min-btn>
      </view>
    <min-404 v-if="isNone" pTop="100rpx"></min-404>
  </view>
</template>

<script>
export default {
  name: 'start-stage',
  navigate: ['navigateTo'],
  data () {
    return {
      value: '',
      list: [],
      isNone: false,
      msg: {},
      type: '',
      seil: {},
      isChecked: false,
      a: -2
    }
  },
  computed: {
    getValue () {
      let data = []
      if (this.value) {
        this.list.filter(item => {
          if (item.sales_name.includes(this.value) || item.mobile.includes(this.value)) {
            data.push(item)
          }
        })
      } else {
        data = this.list
      }
      return data
    }
  },
  watch: {
    getValue (a) {
      if (a.length === 0) {
        this.isNone = true
      }
    }
  },
  onLoad () {
    // 拿到桌台ID以及状态
    this.msg = this.$parseURL()
    // console.log(this.msg)
  },
  mounted () {
    this.getData()
  },
  methods: {
    test (n) {
      this.a = n * 1
     if (n * 1 >= 0) {
        // 营销带客
        this.type = 1
        this.seil = this.list[n]
      } else {
        // 自来客
        this.type = 0
      }
    },
    getData () {
      this.$minApi.getMarketingList()
        .then(res => {
          console.log(res)
          this.list = res.list
        })
    },
    toAddUserInfo () {
      if (this.type !== '') {
        this.$minRouter.push({
          name: 'redadd-userinfo',
          type:"redirectTo",
          params: { msg: this.msg, type: this.type, seil: this.seil }
        })
      }else{
        this.$showToast('请选择类型')
      }
    },
    radioChange (e) {
      console.log(e.detail.value * 1)
      if (e.detail.value * 1 >= 0) {
        // 营销带客
        this.type = 1
        this.seil = this.list[e.detail.value]
      } else {
        // 自来客
        this.type = 0
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.start-stage {
  .radio {
    transform: scale(0.834);
  }

  .top-view-start {
    background: #fff;
    margin-bottom: 20rpx;
    .radio,
    .text {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;

  }
}

</style>
