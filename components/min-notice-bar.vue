<template>
	<view>
		<view class="an-notice-box" :style="'background-color: '+bgColor+';'">
			<view class="an-notice-icon">
				<image src='../static/images/index/video.png'/>
			</view>
			<scroll-view class="an-notice-content" v-if="text.length !== 0">
				<swiper v-if="show" class="swiper" :autoplay="true" :interval="switchTime*1000" :duration="1500" :circular="true" :vertical="true">
					<swiper-item v-for="(item, index) in text" :key="index" :item-id="index+''" class="an-notice-content-item">
						<view class="swiper-item">
							<text class="an-notice-content-item-text" :style="'color: '+color+';'">
								<text v-if=" showSerial">{{index+1+'. '}}</text>
								{{item.create_time}}  {{item.notice_title}}
							</text>
						</view>
					</swiper-item>
				</swiper>
			</scroll-view>
			<view v-else class="f22" style='width:60%;'>暂无数据</view>
			<view class="an-notice-more" @click="more">
				<text class="f24">查看更多 >></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		props:{
			text: {
				type: Array,
				default: []
			}, 
			color: {
				type: String,
				default: '#333333'
			},
			bgColor: {
				type: String,
				default: ''
			},
			switchTime: {
				type: Number,
				default: 3
			},
			showSerial: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				number: 0,
				list: [],
				copyText: '',
				show: '',
			};
		},
		onLoad(){
			this.list = this.text;
			console.log(this.text)
			console.log(this.list.length)
		},
		mounted() {
			
			
			this.show = true;
			/* this.number = 0;
			this.startMove(); */
		},
		watch: {
			// text: function () {
			//  this.show = true;
			//  if(this.text != this.copyText){
			//    this.copyText = this.text;
			//    this.list = this.text;
			//    console.log(JSON.stringify(this.list))
			//    if(this.list.length > 1){
			//      this.showSerial = true;
			//    }
			//  }
			//  /* this.number = 0;
			//  this.startMove(); */
			// }
		},
		methods: {      
			/* startMove () {
			  // eslint-disable-next-line
			  let timer = setTimeout(() => {
				if (this.number === this.list.length-1) {
				  this.number = 0;
				} else {
				  this.number += 1;
				}
				this.startMove();
			  }, this.switchTime*1000);
			}, */
			more(){
				this.$emit('more')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		height: 60upx!important;
	}
	.an-notice-box{
		width: 100%; 
		height: 60upx; 
		overflow: hidden; 
		display: flex; 
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}
	.an-notice-icon{
		width: 24rpx; 
		height: 24rpx; 
		
		image {
			width: 100%; 
			height: 100%;
			display: block;
		}
	}
	.an-notice-content{
		width: calc(100% - 220upx); 
		position: relative; 
		font-size: 14px;
	}
	.an-notice-content-item{
		width: 100%; 
		height: 60upx; 
		text-align: left; 
		line-height: 60upx;
	}
	.an-notice-content-item-text{
		display: block; 
		white-space: nowrap; 
		text-overflow: ellipsis; 
		overflow: hidden;
	}
	.an-notice-more{
		// width: 130upx; 
		// height: 60upx; 
		// font-size: 12px; 
		// line-height: 60upx; 
		// text-align: right; 
		// color: #999;
	}
	
	@keyframes anotice {
		 0%  {transform: translateY(100%);}
	    30%  {transform: translateY(0);}
	    70%  {transform: translateY(0);}
	   100%  {transform: translateY(-100%);}
	}
</style>
