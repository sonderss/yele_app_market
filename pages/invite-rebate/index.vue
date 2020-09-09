<template>
<view class="invite-rebate">
    <view class="top m-top-20">
        <view class="y r" @click="toBack"></view>
        <view class="y c" style="line-height:40rpx">邀请返利</view>
    </view>
    <view class="main_view">
        <!-- <view class="font_view">
        <text>邀</text>
        <text>请</text>
        <text>好</text>
        <text>友</text>
        <view class="desc_view">好友下单 · 你获佣金 · 奖励无上限</view>
      </view> -->
        <scroll-view class="code_view" scroll-y :style="{
        transition: top === 0 ? 'transform 300ms' : '',
        transform: 'translateY(' + top + 'rpx' + ')'
      }">

            <view @touchstart="start" @touchmove="move" @touchend="end">
                <view class="top_view">
                    <text class="o1"></text>
                    <text class="o"></text>
                    <text class="t">规 &nbsp;&nbsp;&nbsp;则</text>
                    <text class="o"></text>
                    <text class="o1"></text>
                </view>
                <view class="desc_view_d m-tb-10">
                    <view class="f24">参与平台拉新活动</view>
                    <view class="f24 m-tb-10">邀请好友还可获得额外金额奖励</view>
                    <view class="f24">(具体奖励以平台的拉新活动规则为准)</view>
                </view>
                <view class="code_">
                    <min-qrcode cid="qrcode2307" :text="$store.state.status.url" :size="sizeCNM" makeOnLoad />
                </view>
                <view class="desc_hrlp m-tb-20 f20">长按识别二维码/扫一扫</view>
                <view class="btn" @click="showPop">立即分享给好友</view>
            </view>

        </scroll-view>
    </view>
    <view class="desc_yele m-tb-20">
        <text class="white">本活动最终解释权归夜乐科技所有</text>
    </view>
    <min-popup :show="isShow" heightSize="300" @close="closeSelectedSkuPop">
        <view class="share_view">
            <view class="main">
                <view class="main_share" @click="shareWX">
                    <image src="/static/images/share_wx.png" />
                    <text>微信好友</text>
                </view>
                <view class="main_share" style="margin-left: 80rpx;" @click="ctrlC">
                    <image src="/static/images/share_l.png" />
                    <text>复制链接</text>
                </view>
            </view>
            <view class="botm" @click="canceShare">取消</view>
        </view>
    </min-popup>
</view>
</template>

<script>
import Qrcode from '../../utils/uqrcode.js'
export default {
    name: 'invite-rebate',
    navigate: ['navigateTo'],
    data() {
        return {
            isShow: false,
            url: '',
            height_view: true,
            sizeCNM: 140,
            top: ""
        }
    },
    onLoad() {
        /***
         */
    },
    methods: {
        canceShare() {
            this.isShow = false
        },
        showPop() {
            this.isShow = true
        },
        closeSelectedSkuPop() {
            this.isShow = false
        },
        toBack() {
            uni.navigateBack({
                delta: 1
            })
        },
        shareWX() {
            uni.share({
                provider: 'weixin',
                scene: 'WXSceneSession',
                type: 0,
                href: `${this.$store.state.status.url}`,
                title: '夜乐科技',
                summary: '快来注册吧',
                imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
                success: function (res) {
                    console.log('success:' + JSON.stringify(res))
                },
                fail: function (err) {
                    console.log('fail:' + JSON.stringify(err))
                }
            })
        },
        ctrlC() {
            uni.setClipboardData({
                data: this.$store.state.status.url,
                success: () => {
                    this.$showToast('复制成功')
                }
            })
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                // 像下滚动
                this.top = currentY - this.lastY
            } else {
                // 向上滚动
                //  this.top = 0
                this.top = currentY - this.lastY
            }
        },
        end(e) {
            return (this.top = 0)
        },
    },
    mounted() {
        uni.getSystemInfo({
            success: res => {
                if (res.windowHeight <= 533) {
                    this.sizeCNM = 100
                    this.height_view = false
                    return
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
uni-page-body {
    background: #000;
}

.invite-rebate {
    width: 100%;
    height: 100vh;
    background-color: rgba(3, 3, 19, 1);
    position: relative;
    background-image: url('/static/images/yaoqing.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left top;
    overflow: hidden;

    .top {
        position: fixed;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40rpx;
        z-index: 9999;
        top: var(--status-bar-height);

        .y {
            color: rgba(255, 255, 255, 1);
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: bold;
            background-size: cover;
        }

        .c {
            width: 100%;
            text-align: center;
            padding-right: 60rpx;
            height: 40rpx;
        }

        .r {
            background: url('/static/images/back.png');
            background-size: cover;
            height: 36rpx;
            width: 36rpx;
            margin-left: 30rpx;
        }
    }

    .main_view {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;
        margin-top: 446rpx;

        .font_view {
            margin-top: 140rpx;
            font-size: 123rpx;

            text {
                font-size: 123rpx;
                background: linear-gradient(to right,
                        rgba(204, 204, 204, 1),
                        rgba(255, 255, 255, 1),
                        rgba(57, 57, 57, 1));
                -webkit-background-clip: text;
                color: transparent;
                font-weight: 700;
                width: auto;
            }
        }

        .desc_view {
            width: 480rpx;
            height: 48rpx;
            background: rgba(233, 233, 233, 1);
            border-radius: 24rpx;
            text-align: center;
            line-height: 48rpx;
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(48, 48, 48, 1);
        }
    }

    .code_view {
        width: 680rpx;
        height: auto;
        background: #fff;
        padding-bottom: 50rpx;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 30rpx 0;

        .top_view {
            display: flex;
            justify-content: center;
            align-items: center;

            .t {
                font-size: 40rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                line-height: 82rpx;
            }

            .o {
                display: block;
                width: 30rpx;
                height: 30rpx;
                background: linear-gradient(164deg,
                        rgba(255, 224, 1, 1) 0%,
                        rgba(250, 164, 31, 1) 100%);
                border-radius: 50%;
                margin: 0 20rpx;
            }

            .o1 {
                display: block;
                width: 20rpx;
                height: 20rpx;
                background: linear-gradient(164deg,
                        rgba(255, 224, 1, 1) 0%,
                        rgba(250, 164, 31, 1) 100%);
                border-radius: 50%;
            }
        }

        .desc_view_d {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 20rpx;
        }

        .code_ {
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .desc_hrlp {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .btn {
            width: 590rpx;
            height: 20%;
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: bold;
            background: rgba(255, 224, 1, 1);
            box-shadow: 0px 2rpx 8rpx 0px rgba(3, 3, 19, 0.15);
            border-radius: 49rpx;
            text-align: center;
            line-height: 98rpx;
            margin: 0 auto;
        }
    }
}

.desc_yele {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;

    text {
        color: #999999;
        font-size: 20rpx;
    }
}

.share_view {
    width: 100%;
    height: 300rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .main {
        width: 100%;
        height: 202rpx;
        background: #f7f7f7;
        display: flex;
        align-items: center;
        padding-left: 50rpx;

        .main_share {
            width: 90rpx;
            height: 90rpx;

            text {
                display: block;
                width: 200rpx;
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
            }

            image {
                width: 80rpx;
                height: 80rpx;
            }
        }
    }

    .botm {
        width: 100%;
        height: 98rpx;
        background: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 98rpx;
    }
}

#qrcode2307 {
    width: 100%;
}
</style>
