
<template>
  <view class="index">
    <view class="back-img-box" :style="{'background-image': `url(${back})`}">
		<view class="info min-flex min-flex-main-between m-lr-30">
			<view class="min-flex min-flex-main-start">
			  <min-avatar size="md" :url="userInfo.head_img"></min-avatar>
			  <view class="m-left-20">
				<view class="f28">{{ userInfo.username }}</view>
				<view class="f22 m-top-20">{{ userInfo.store_name }}  |  {{ userInfo.position_name }}</view>
			  </view>
			</view>
			<view class="min-flex min-flex-main-center change_o" @click="navigateTo">
			  <view class="f22">服务员</view>
			</view>
		</view>
		<view class="code_">
			<image src="../../static/images/code_admin.png" /> 
			<text>验证码</text>
		</view>
    </view>
    <yele-grid :list="item.grid" v-for="(item,index) in list" :key="index"></yele-grid>
  </view>
</template>

<script>
import back from '@/static/images/back_admin.png'
import MinAvatar from '@/components/min-avatar'
import YeleGrid from '@/components/page/yele-grid'
export default {
  navigate: ['navigateTo'],
  name: 'index',
  components: {
    MinAvatar,
    YeleGrid
  },
  data () {
    return {
      back: '',
	  list:[
			{
				grid: [{
				  img: '/static/images/index/order_person.png',
				  text: '预约'
				}, {
				  img: '/static/images/index/my_list.png',
				  text: '下单'
				}, {
				  name:"platform-admin",
				  img: '/static/images/index/my_order.png',
				  text: '我的桌台'
				},]
			},
			{
				grid: [{
				  img: '/static/images/index/order_list.png',
				  text: '下单记录'
				}, {
				  img: '/static/images/index/list_.png',
				  text: '预约记录'
				}, {
				  img: '/static/images/index/set_list.png',
				  text: '邀请记录'
				},]
			},
			{
				grid: [{
				  img: '/static/images/index/person_.png',
				  text: '个人任务'
				}, {
				  img: '/static/images/index/team_.png',
				  text: '团队任务'
				}, {
				  img: '/static/images/index/area_.png',
				  text: '区域任务'
				},]
			},
			{
				grid: [{
				  img: '/static/images/index/start_order.png',
				  text: '平台活动'
				}]
			},
			{
				grid: [{
				  img: '/static/images/index/mo_line.png',
				  text: '我的线索'
				}, {
				  img: '/static/images/index/line_.png',
				  text: '线索管理'
				}, {
				  img: '/static/images/index/line_user.png',
				  text: '线索用户管理'
				},{
					name:"my-downline",
				  img: '/static/images/index/my_downline.png',
				  text: '我的下线'
				}]
			},
			{
				grid: [{
				  img: '/static/images/index/my_money.png',
				  text: '我的钱包'
				}, {
				  img: '/static/images/index/data_.png',
				  text: '数据统计'
				}, {
					name:'mine-info',
				  img: '/static/images/index/person_user.png',
				  text: '个人资料'
				}]
			},
	  ]
      
    }
  },
  computed: {
    userInfo () { // 用户信息
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    navigateTo () {
      this.$minRouter.push({
        name: 'switch-stores',
        type: 'navigateTo',
        path: '/pages/switch-stores/index'
      })
    },
    toPlatform () {
      this.$minRouter.push({
        name: 'platform-admin',
        type: 'navigateTo',
        path: '/pages/platform-admin/index'
      })
    }
  },
  onLoad () {
    this.back = back
  }
}
</script>

<style lang="scss" scoped>
.back-img-box {
  width: 100%;
  height: 288rpx;
  background-size: cover;
  background-position: 0 0;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  .info {
	  margin-bottom: 30rpx;
	  align-items: flex-end;
    view, text {
      color: #FFFFFF;
    }
	.change_o{
		margin-bottom: 7rpx;
		margin-left: 15rpx;
	}
  }
  .code_{
	flex: 1;
	margin-bottom: 60rpx;
	display: flex;
	justify-content: flex-end;
	margin-right: 30rpx;
	text{
		color: #FFFFFF;
		font-size: 22rpx;
	}
	image{
		display: block;
		width: 28rpx;
		height: 28rpx;
		margin-right: 13rpx;
	}
  }
  .bar {
    padding: 28rpx 30rpx 36rpx 30rpx;
  }
}
.white-item {
  background: #FFFFFF;
  border-radius: 6px;
}
.img {
  width: 80rpx;
  height: 80rpx;
}
.activity-item {
  position: relative;
  width: 330rpx;
  height: 158rpx;
  .bimg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .word {
    position: relative;
    z-index: 2;
    font-size: 50rpx;
    color: #FFFFFF;
    font-weight: 700;
  }
}
.index {
  // background: #030313;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 20rpx;
}

</style>
