<template>
<view>
  <view class="submit-leads p-lr-30 p-tb-20" v-if="isData">
  
        <min-pcitem :list="list" :showArray="false"></min-pcitem>
    <view class="m-tb-20"></view>
    <min-cell class="mid-view" :card="false">
      <min-desc-input desc="客户姓名" v-model="name1" sign="*" placeholder="请输入姓名" ></min-desc-input>
      <min-desc-input desc="联系电话" v-model="phone" sign="*" placeholder="请输入联系电话"></min-desc-input>

        <view @click="goChioce"> <min-desc-input sign="*"  desc="预约时间" :isRightRrrow="true"  :value="dates"  placeholder="请选择预约日期" :disabled="true"></min-desc-input></view>
      <!-- <min-desc-input desc="预抵时间" sign="*"  :border="false" :value='shopDate' :isRightRrrow="true" placeholder="请选择到店日期" :disabled="true"></min-desc-input> -->
        <min-collapse :list="date"  v-model="tsetvalue" @chioce="chioce" :nightArr="nightArr" :isKua="1"></min-collapse>
      <view class="min-border-bottom"></view>
      <min-switch desc="是否当天生日" v-model="isShengri" ></min-switch>
    </min-cell>
    <view class="m-tb-20"></view>
    <min-remarks  v-model='value' @click="click" @blur="blur"></min-remarks>
    <view class="empty-view"></view>
    <view class="btn" v-if="table">
      <min-btn :long="true" @click="submit" :opacity='false' >提交</min-btn>
    </view>
    <!-- <min-modal ref="test"></min-modal> -->
  </view>
  <min-404 v-if="!isData"></min-404>
</view>
</template>

<script>
// 座位数量:0 - 未选,1 - 1座，2 - 2座，3 - 3座，4 - 4座，5 - 6座，6 - 8座，7 - 10座，8 - 12座，9 - 12座以上
const nums = [
  { txt: '未选' },
  { txt: '1座' },
  { txt: '2座' },
  { txt: ' 3座' },
  { txt: '4座' },
  { txt: '6座' },
  { txt: '8座' },
  { txt: '10座' },
  { txt: '12座' },
  { txt: '12座以上' }
]
export default {
  name: 'submit-leads',
  navigate: ['navigateTo'],
  data () {
    return {
      list:{},
      date: [],
      nightArr: [],
      current: Number,
      // nextCurrent: Number,
      isShengri: false,
      name1: '',
      phone: '',
      value: '',
      shopDate: '',
      tsetvalue: '',
      windowHeight: '',
      table: true,
      url: 'wss://api.store.dev.yeleonline.com:20021',
      socketOpen: false,
      socketMsgQueue: [],
      id: '',
      deskInfo: { desk_name: 'null', seats: 0, group_name: 'null', minim_charge: 'null' },
      storeInfo: { head_img: '../../static/images/headurl60.png', store_name: 'null' },
      bookingDate: {},
      storeSetting: {},
      nums,
      dates: '',
      isKua: Number,
      isData: 123
    }
  },
  computed: {
    txt () {
      const value = this.nums[this.deskInfo.seats].txt
      return value
    }
  },
  onLoad () {
    // this.id = this.$parseURL().id
    console.log(this.$parseURL().item)
    this.list = this.$parseURL().item
  },
  mounted () {
    // this.getData(this.id)
    //   .then(res => {
    //     console.log(res)
    //     this.deskInfo = res.deskInfo
    //     this.storeInfo = res.storeInfo
    //     this.bookingDate = res.bookingDate
    //     this.storeSetting = res.storeSetting
         //this.getDate(this.storeSetting.store_business_time.start, this.storeSetting.store_business_time.end)
    //   })business_start_time
    this.getDate(this.list.store_config.business_start_time,this.list.store_config.business_end_time)
  },
  methods: {
    // 获取时间
    getDate (start, end) {
      const ia = 30 * 60 * 1000
      if (this.list.store_config.business_is_cross !== 1) {
        // 没有跨天
        const startime1 = '2020/3/18' + ' ' + start
        const endTie1 = '2020/3/18' + ' ' + end
        const startimeDate1 = new Date(startime1).getTime()
        const endTiemeDate1 = new Date(endTie1).getTime()
        const arr1 = []

        for (let i = startimeDate1; i <= endTiemeDate1; i += ia) {
          const eq = new Date(i)
          const a = this.$minCommon.formatDate(eq, 'hh:mm')
          arr1.push(a)
        }
        this.date = arr1
        return
      }
      var startime = '2020/3/18' + ' ' + start
      var endTie = '2020/3/19' + ' ' + end
      const endTiemeDate = new Date(endTie)
      const startimeDate = new Date(startime)
      var night = new Date('2020/3/18 24:00:00')
      var tom = new Date('2020/3/19 00:00:00')
      const nightLine = night.getTime()
      const tommorw = tom.getTime()
      // 开始的时间戳
      start = startimeDate.getTime()
      // 结束的时间戳
      end = endTiemeDate.getTime()
      const arr = []
      for (let i = start; i < nightLine; i += ia) {
        const eq = new Date(i)
        const a = this.$minCommon.formatDate(eq, 'hh:mm')
        arr.push(a)
      }
      const brr = []
      for (let i = tommorw; i <= end; i += ia) {
        const eq = new Date(i)
        const a = this.$minCommon.formatDate(eq, 'hh:mm')
        brr.push(a)
      }
      this.date = arr
      this.nightArr = brr
    },
    chioce (n) {
      this.isKua = n
      console.log(  this.isKua)
    },
    // 提交
    submit () {
      /**
         * 桌子Id  客户姓名  客户手机号  预约日期（例 2020-01-01）  预抵时间 （例 20:00）  是否生日（1否，2：是）  备注  是否跨天
         */
      let dates = this.dates
      const datesNum = this.dates.indexOf(' ')
      dates = dates.slice(0, datesNum)
      const data = {
        store_id:  this.list.id,
        client_name: this.name1,
        client_mobile: this.phone,
        business_date: dates,
        arrival_time: this.tsetvalue,
        is_birthday: this.isShengri ? 1 : 0,
        remark: this.value,
        is_across: this.isKua 
      }
      if (!data.client_name) {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
      } else if (!this.$minCommon.checkMobile(data.client_mobile)) {
        uni.showToast({
          title: '请输入有效电话姓名',
          icon: 'none'
        })
      } else if (!data.business_date) {
        uni.showToast({
          title: '请选择预定日期',
          icon: 'none'
        })
      } else if (!data.arrival_time) {
        uni.showToast({
          title: '请选择预达时间',
          icon: 'none'
        })
      } else {
          console.log(data)
        this.addData(data)
        // .then(res => {
        //   uni.navigateTo({
        //     url: '../reservation-success/index?data=' + JSON.stringify(res)
        //   })
        // console.log(res)
        // })
      }
    },
    // 提交
    addData (data) {
        this.$minApi.postClue(data).then(res => {
              console.log(res)
              if(res.length === 0){
                  this.$showToast('提交成功')
                  setTimeout(()=>{
                     uni.redirectTo({
                          url: '../my-clue/index'
                      });
                  },2000)
              }
          })
      
    },
    click () {
      this.table = false
    },
    blur () {
      console.log(this.table)
      this.table = true
    },
    // 选择预约日期
    goChioce () {
      this.$minRouter.push({
        name: 'reservation-date',
        params: { store_id:  this.list.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-make {
 
  .mid-view {
    width: 690rpx;
    height: auto;
  }
  .oinput {
    text-align: right;
    line-height: 98rpx;
  }
  .ophone {
    padding-right: 34rpx;
  }
  .right-arrow {
    width: 24rpx;
    height: 24rpx;
    padding-top: 5rpx;
  }
  .desc-width {
    width: 200rpx;
  }
  .chioce-date {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .chioce-date-item {
      width: 112rpx;
      height: 58rpx;
      border: 1rpx solid #e7e7e7;
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
    }
    .chioce-date-item-active {
      width: 112rpx;
      height: 58rpx;
      background: rgba(255, 224, 1, 1);
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
    }
    .chioce-date-item:nth-child(5n) {
      margin: 0;
    }
    .chioce-date-item-active:nth-child(5n) {
      margin: 0;
    }
  }
  position: relative;
}
.btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.empty-view {
  height: 240rpx;
}
</style>
