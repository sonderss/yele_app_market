<template>
<view class="with-draw p-tb-20 p-lr-30">
    <view class="main p-lr-20">
        <view class="top min-border-bottom">
            <view>提现到</view>
            <view class="methods">
                <text class="m-lr-10 f28" v-if="info.bank_card_name">
                    {{ `${info.bank_card_name}(${lastString})` }}
                </text>
                <text class="m-lr-10 f28" style="color:red" v-else>
                    尚未绑定银行卡
                </text>
            </view>
        </view>
        <view class="bottom">
            <view class="top f28">提现金额</view>
            <view class="money">
                <text class="icon">￥</text>
                <input type="number" :placeholder="placeholder" maxlength="10" v-model="money" placeholder-class="input-placeholder" />
                <text class="allin" @click="allIn">全部提现</text>
            </view>
        </view>
    </view>
    <text class="warn" v-if="money">本次提现手续费：￥{{ tixianInfo.fee ? tixianInfo.fee : '1' }}</text>
    <view class="submit" @click="submit">提现</view>
    <view class="btm_descsss" @click="toVipInfo">《通联用户协议》</view>
</view>
</template>

<script>
export default {
    name: 'redwidth-draw',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            info: {},
            lastString: '',
            money: '',
            placeholder: '输入提现金额',
            tixianInfo: {},
        }
    },
    onLoad() {
        console.log(this.$store.state.user.userInfos)
        this.info = this.$store.state.user.userInfos
        if (this.info.bank_card_num) {
            this.getCardLast(this.info.bank_card_num)
            this.$minApi.getTxian().then(res => {
                console.log(res)
                this.placeholder = `可提现金额${res.can_cash_withdraw}元`
                this.tixianInfo = res
            })
        }
    },
    methods: {
        toChioce() {
            this.$minRouter.push({
                name: 'drawing-way',
                params: {
                    card_name: this.info.bank_card_name,
                    card: this.lastString,
                },
            })
        },
        // 获取银行卡后四位
        getCardLast(bank_card_num) {
            let card = [...bank_card_num]
            let a = [4, 3, 2, 1]
            a.forEach(item => {
                this.lastString += card[card.length - item]
            })
        },
        // 提现
        submit() {
            if (!this.lastString) return this.$showToast('你尚未绑定银行卡')
            if (this.money * 1 < 0.5) return this.$showToast('不能低于手续费')
            if (this.money * 1 < 1) return this.$showToast('最少提现一块钱')
            this.$minApi
                .tixianshenqing({
                    amount: this.money,
                })
                .then(res => {
                    this.$minRouter.push({
                        name: 'redwithdrawal-success',
                        type: 'redirectTo',
                        params: {
                            res,
                            info: {
                                money: this.money,
                                fee: this.tixianInfo.fee,
                                bard: this.tixianInfo.bank_name + this.lastString,
                            },
                        },
                    })
                })
        },
        // 全部提现
        allIn() {
            if (!this.tixianInfo.can_cash_withdraw)
                return this.$showToast('你尚未绑定银行卡')
            this.money = this.tixianInfo.can_cash_withdraw
        },
        toVipInfo() {
            uni.navigateTo({
                url: '../bind-bank-card/userInfo',
            })
            // this.$minApi.getUserVip().then(res => {
            //     console.log(res)
            //     if (res.url) {
            //         // this.$store.dispatch('status/setvipUrl',res.url)
            //         this.url = res.url
            //         // this.$minRouter.push({
            //         //   name:'webview'
            //         // })
            //     } else {
            //         // this.$minRouter.push({
            //         //     name: 'authentication',
            //         //     params: {
            //         //         isBind: true
            //         //     }
            //         // })
            //     }
            // })
        },
    },
}
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 258rpx;
    background: #fff;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;

    .top {
        height: 90rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .methods {
            width: 85%;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            image {
                width: 44rpx;
                height: 44rpx;
            }
        }
    }

    .bottom {
        flex: 1;
        display: flex;
        flex-direction: column;

        .top {
            flex: 1;
            margin-top: 10rpx;
        }

        .money {
            height: 110rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            input {
                flex: 1;
                height: 100%;
                font-size: 52rpx;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }

            .icon {
                font-size: 57rpx;
                color: rgba(51, 51, 51, 1);
                line-height: 50rpx;
            }
        }
    }
}

.submit {
    width: 100%;
    height: 88rpx;
    background: rgba(255, 224, 1, 1);
    border-radius: 10rpx;
    margin: 70rpx auto;
    line-height: 88rpx;
    text-align: center;
}

.warn {
    width: 100%;
    height: 50rpx;
    display: block;
    color: #656565;
    font-size: 22rpx;
    line-height: 50rpx;
    text-align: right;
    padding: 0 20rpx;
    margin: 20rpx 0 40rpx 0;
}

.input-placeholder {
    font-size: 28rpx;
    font-weight: 400;
    color: #999999;
}

.btm_descsss {
    width: 100%;
    height: 50rpx;
    line-height: 50rpx;
    position: absolute;
    bottom: 50rpx;
    left: 0;
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(101, 101, 101, 1);
}
</style>
