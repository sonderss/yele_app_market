<template>
	<view>
		<button v-for="(item, index) in pages" :key="index" @click="link(item.path)">{{item.style.navigationBarTitleText || '未设标题'}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 0,
				pages: [

					{
						path: 'pages/platform-admin/index',
						style: {
							navigationBarTitleText: '桌台管理'
						}
					},
					{
						path: 'pages/platform-detail/index',
						style: {
							navigationBarTitleText: '台详情'
						}
					},
					{
						path: 'pages/pay-code/index',
						style: {
							navigationBarTitleText: '支付码'
						}
					},
					{
						path: 'pages/verify-name/index',
						style: {
							navigationBarTitleText: '实名认证'
						}
					},
					{
						path: 'pages/clue-management/index',
						style: {
							navigationBarTitleText: '线索管理'
						}
					},
					{
						path: 'pages/lead-users/index',
						style: {
							navigationBarTitleText: '线索用户'
						}
					},
					{
						path: 'pages/select-store/index',
						style: {
							navigationBarTitleText: '选择门店'
						}
					},
					{
						path: 'pages/invite-rebate/index',
						style: {
							navigationBarTitleText: '邀请返利'
						}
					},
					{
						path: 'pages/invitation-record/index',
						style: {
							navigationBarTitleText: '邀请记录'
						}
					},
					{
						path: 'pages/batch-editing/index',
						style: {
							navigationBarTitleText: '线索用户（批量编辑）'
						}
					},
					{
						path: 'pages/lead-search/index',
						style: {
							navigationBarTitleText: '线索用户（搜索）'
						}
					},
					{
						path: 'pages/my-clue/index',
						style: {
							navigationBarTitleText: '我的线索'
						}
					},
					{
						path: 'pages/platform-activities/index',
						style: {
							navigationBarTitleText: '平台活动'
						}
					},
					{
						path: 'pages/my-downline/index',
						style: {
							navigationBarTitleText: '我的下线'
						}
					},
					{
						path: 'pages/personal-task/index',
						style: {
							navigationBarTitleText: '个人任务'
						}
					},
					{
						path: 'pages/team-task/index',
						style: {
							navigationBarTitleText: '团队任务'
						}
					},
					{
						path: 'pages/regional-tasks/index',
						style: {
							navigationBarTitleText: '区域任务'
						}
					},
					{
						path: 'pages/submit-leads/index',
						style: {
							navigationBarTitleText: '提交线索'
						}
					},
					{
						path: 'pages/mine-info/index',
						style: {
							navigationBarTitleText: '个人资料'
						}
					},

					{
						path: 'pages/drawing-way/index',
						style: {
							navigationBarTitleText: '提现方式'
						}
					},
					{
						path: 'pages/verify-name/index',
						style: {
							navigationBarTitleText: '实名认证'
						},
					},
					{
						path: 'pages/modify-mobile/index',
						style: {
							navigationBarTitleText: '修改手机号码'
						}
					},
					{
						path: 'pages/index/index',
						style: {
							navigationBarTitleText: '首页',
							'app-plus': {
								titleNView: false
							}
						}
					},
					{
						path: 'pages/login/index',
						style: {
							navigationBarTitleText: '登陆',
							'app-plus': {
								titleNView: false
							}
						}
					}
				]
			}
		},
		mounted() {},
		methods: {
			link(path) {
				uni.navigateTo({
					url: '/' + path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
