<template>
  <view class="platform-admin p-tb-20 p-lr-30">
    <view class="btns">
      <view :class="status === item.value ? 'btn active' : 'btn'" @click="chioceItem(item.value)" v-for="(item,index) in title" :key="index">{{item.name}}</view>
    </view>
	<view class="platform-wrap" v-for="i in getDataChange" :key="i.id">
	  <view class="title">
		  <min-cell-item :border="false" :img="i.head_img" :title="`${i.store_name}`" :label="i.address"></min-cell-item>
	  </view>
	  <view class="list">
	    <view class="item" :class="statusArr[item.desk_status].class" v-for="(item, index) in i.desk_lists" :key="index"  @click="goDetail(item.id,item.desk_status)">
	      <view class="name">{{item.desk_name}}</view>
	      <view class="status">{{statusArr[item.desk_status].name}}</view>
	      <view class="count">{{item.amount ? `$ ${item.amount}`:'未消费'}}</view>
	    </view>
	  </view>
	</view>
    <min-popup size="height" :show="show" @close='close'>
      <min-picker  @cancel="cancel" @sure="sure"></min-picker>
    </min-popup>
    <min-404 id="none" v-if="getDataChange.length === 0"></min-404>
  </view>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const statusArr = [
  // 1 - 已停用, || 2 - 空闲,|| 3 - 已预约,|| 4 - 点单中,|| 6 - 已开台,  ||  5 - 待确认  7 - 清台中
  { name: 'null', class: '' },
  { name: '已停用', class: 'disabled' },
  { name: '空闲中', class: 'leisure' },
  { name: '已预约', class: 'reserved' },
  { name: '点单中', class: 'in-order' },
  { name: '待确认', class: 'be-confirm' },
  { name: '已开台', class: 'been-open' },
  { name: '清台中', class: 'leisure' }
]
// 座位数量:0 - 未选,1 - 1座，2 - 2座，3 - 3座，4 - 4座，5 - 6座，6 - 8座，7 - 10座，8 - 12座，9 - 12座以上
export default {
  name: 'redplatform-admin',
  navigate: ['navigateTo', 'switchTab','redirectTo'],
  data () {
    return {
      statusArr,
      list: {desks:[]},
      mines: [],
      show: false,
      date: '',
      title: [],
      num: 0,
      status: 999,
      testArrabc: []
    }
  },
  onLoad () {
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    // const year = new Date().getFullYear()
    // this.date = year + '-' + month + '-' + day
    this.date = this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd')
    // #ifdef APP-PLUS
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    const currentWebview = page.$getAppWebview()
    const titleObj = currentWebview.getStyle().titleNView
    titleObj.buttons[0].text = `${month}月${day}日`
    currentWebview.setStyle({
      titleNView: titleObj
    })
    // #endif
  },
  mounted () {
    // this.getData(this.date)
    // this.getData('2020-3-18')
  },
  onShow(){
    this.getData(this.date)
  },
  onNavigationBarButtonTap () {
    this.show = !this.show
  },
  computed: {
    // 返回数组
    getDataChange () {
      
      return   this.filterData((this.list.desks)).length > 0 ?  this.filterData((this.list.desks)) : []
    }
  },
  methods: {
    newArr (arr) {
      let brr = {}
      const newArr = []
      arr.map(item => {
        if (brr.id !== item.id) {
          brr = item
          newArr.push(brr)
        }
      })
      return newArr
    },
    // 封装一个筛选函数
    filterData (array) {
      let arr = []
      // 定义一个分组，任何改变都根据这个分组来操作]
      let newListDesk = []
      if (this.status === 999) {
        // 全部桌台信息
        arr = array // this.list.desks
      } else {
        array.map((item, index) => {
          item.desk_lists.map((item2, index2) => {
            if (item2.desk_status === this.status) {
              newListDesk.push(array[index])
            }
          })
        })
        // 去除新组重复的项
        newListDesk = this.newArr(newListDesk)
        let arrData = []
        // 去除具体项不符合的条件 
        newListDesk.map((item, index) => {
          const obj = { desk_lists: [], id: item.id, store_name: item.store_name,address: item.address, head_img:item.head_img,hours:item.hours,id:item.id,}
          item.desk_lists.map(item2 => {
            if (item2.desk_status === this.status) {
              obj.desk_lists.push(item2)
              arrData.push(obj)
            }
          })
        })
        // 去重
        arrData = this.newArr(arrData)
        arr = arrData
      }
      return arr
    },
    // 导航选中事件
    chioceItem (status) {
      // 已预约 status 3
      this.status = status
      /**
       *  传进去标题所代表的的状态码
       *  根据状态码找到对应的数据对象
       *  根据数据对象的组id反拿到组的数据
       *  把新数据给到一个变量赋值给list
       */
    },
    // 获取数据
    getData (date) {
      this.$minApi.TableList({ date })
        .then(res => {
          this.list = res
          this.mines = res.desks
          // this.mines = res.mines
          this.title = res.title
          console.log(res)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.log('桌台列表获取失败')
        })
    },
    // 台详情
    goDetail (id, status) {
      this.$minRouter.push({
        name: 'platform-detail',
        params: { id: id,date: this.date }
      })
    },
    // 日期选择器关闭
    close () {
      this.show = false
    },
    // 日期选择器取消
    cancel () {
      this.close()
    },
    // 日期选择器确认
    sure (e) {
      this.date = e.b + '月' + e.c + '日'
        let a = e.a + '-'+e.b+'-'+e.c
      this.date = e.b + '月' + e.c + '日'
      console.log(this.date)
      // #ifdef APP-PLUS
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      const currentWebview = page.$getAppWebview()
      const titleObj = currentWebview.getStyle().titleNView
      titleObj.buttons[0].text = ''
      titleObj.buttons[0].text = this.date
      currentWebview.setStyle({
        titleNView: titleObj
      })
       this.getData(a)
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
@import  './index.scss';
</style>
