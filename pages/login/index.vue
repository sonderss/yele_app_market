<template>
<view class="login">
    <view class="logo">
        <image src="/static/images/login/ye_logo.png" class="bg-img"></image>
    </view>

    <view style="height: 50rpx;"></view>
    <view class="m-lr-30 p-lr-30">
        <view class="inp p-left-30 min-flex min-flex-main-start min-border-bottom">
            <image class="icon" src="/static/images/login/user.png"></image>
            <input type="number" v-model="mobile" placeholder="请输入手机号码" :focus="isFouce" @focus="cnmd" maxlength="11" @blur="gnm" :adjust-position="false" />
            <view :class="isFouce && mobile ? 'clear-icon-bg  clear-icon' : 'clear-icon'" @click="aa">
                <!-- <image src="/static/images/clear.png"></image> -->
            </view>
        </view>
        <view class="inp p-left-30 min-flex min-flex-main-between min-border-bottom">
            <view class="min-flex min-flex-main-start">
                <image class="icon" src="/static/images/login/lock.png"></image>
                <input type="number" maxlength="6" v-model="code" placeholder="请输入验证码" :adjust-position="false" />
            </view>
            <view class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</view>
            <view v-else>{{ countDown }} s</view>
        </view>
    </view>
    <view class="user_info m-lr-30 p-lr-30 p-top-20">
        <!-- <min-radio @change="ischange" v-model="a" :label="isCh" active="/static/images/active_sel.png" " /> -->
        <image :src="src_" @click="ischange" />
        <view style="color:#666666" class="f20">我已同意夜乐<text class="d" @click="toUser(1)">《用户协议》</text>和<text class="d" @click="toUser(2)">《隐私政策》</text></view>
    </view>
    <view style="height: 73rpx"></view>
    <view class="p-lr-30">
        <min-btn @click="login" shape="circle">登录</min-btn>
    </view>
    <min-message ref="message"></min-message>
</view>
</template>

<script>
import '../../static/js/quit'
export default {
    name: 'login',
    data() {
        return {
            countDown: 0,
            code: '',
            mobile: '',
            isFouce: false,
            isChangeSel: true
        }
    },
    computed: {
        src_() {
            return this.isChangeSel ? '/static/images/active_sel.png' : '/static/images/no_sel.png'
        }
    },
    onLoad() {
        uni.getStorage({
            key: 'userInfo',
            success: res => {
                console.log(JSON.parse(res.data))
                this.mobile = JSON.parse(res.data).phone
            }
        })
        // if(!this.$store.state.status.dev){
        //    this.code = ''
        //    this.mobile = ''
        // }
    },
    watch: {
        code(newValue) {
            newValue.length === 6 && uni.hideKeyboard()
        }
    },
    methods: {
        gnm() {
            this.isFouce = false

        },
        cnmd() {
            this.isFouce = true
        },
        aa() {
            this.isFouce = false
            this.mobile = ''
        },
        getVerificationCode() {
            // 获取验证码
            if (!this.$minCommon.checkMobile(this.mobile)) {
                this.$showToast('请输入正确的手机号码')
                return
            }
            this.$minApi.getVerificationCode({
                mobile: this.mobile
            })
            this.$minCommon.setCountDown(num => {
                // 倒计时
                this.countDown = num
            })
        },
        toUser(n) {
            this.$minRouter.push({
                name: 'user-agreement',
                params: {
                    n
                }
            })
        },
        login() {
            if (!this.$minCommon.checkMobile(this.mobile) || this.code.length !== 6) return this.$showToast('请正确填写信息')
            if (!this.isChangeSel) return this.$showToast('请先同意《用户协议》和《隐私政策》')
            if (this.flag) return
            this.flag = true
            this.$minApi.login({
                    mobile: this.mobile,
                    code: this.code
                }).then(res => {
                    this.$showToast('登录成功')
                    this.flag = false
                    uni.setStorage({
                        key: 'userInfo',
                        data: JSON.stringify({
                            phone: this.mobile
                        }),
                        success: function () {
                            console.log('success')
                        }
                    })
                    setTimeout(() => {
                        this.$store.dispatch('user/setUserInfo', res)
                        uni.redirectTo({
                            url: '../index/index'
                        })
                    }, 1000)
                })
                .catch(() => {
                    this.flag = false
                })
        },
        ischange() {
            this.isChangeSel = !this.isChangeSel
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    background: #fff;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;

    .logo {
        width: 100%;
        height: 140rpx;
        margin-top: 170rpx;
        margin-left: 84rpx;

        image {
            width: 332rpx;
            height: 104rpx;
        }
    }

    .bg-img {
        width: 100%;
        height: 466rpx;
    }

    .inp {
        margin-top: 50rpx;
        height: 66rpx;
        font-size: 30rpx;
        position: relative;

        input {
            padding-left: 56rpx;
            width: 400rpx;
            color: black;
        }

        .code {
            color: #333;
        }

        .clear-icon {
            width: 66rpx;
            height: 66rpx;
            padding: 20rpx;
            position: absolute;
            right: 0rpx;
            top: -4rpx;
            background-repeat: no-repeat;
            background-size: 50%;
            background-position: center;
        }

        .clear-icon-bg {
            background-image: url('/static/images/clear.png');
        }
    }

    .icon {
        width: 40rpx;
        height: 40rpx;
    }

    .user_info {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        image {
            width: 25rpx;
            height: 25rpx;
            display: inline-block;
            margin-right: 10rpx;
            margin-left: 37rpx;
        }

        .d {
            font-size: 20rpx;
        }
    }
}
</style>
