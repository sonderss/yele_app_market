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
						path: 'pages/verify-name/index',
						style: {
							navigationBarTitleText: '实名认证'
						}
					},
					{
						path: 'pages/my-downline/index',
						style: {
							navigationBarTitleText: '我的下线'
						}
					},
					{
						path: 'pages/select-customers/index',
						style: {
							navigationBarTitleText: '客户选择'
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
