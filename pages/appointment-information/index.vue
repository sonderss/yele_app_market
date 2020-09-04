<template>
<view class="appointment-information p-lr-30 p-tb-20">
    <view style="height:100rpx"></view>
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">预约成功</view>
    <view class="card f28 p-tb-30 p-lr-10">
        <min-pcitem :list="$parseURL().store" @emitE="toEmint($parseURL().store)" :showArray="false" />
        <view class="p-lr-20 p-top-20">
            <view class="m-bottom-10 item-biew">
                <span>预定台号：</span>
                <text>{{$parseURL().data.desk_name}}</text>
            </view>
            <view class="m-bottom-10">
                <span>
                    分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style="padding-left:58rpx"></span>组
                    <span style="padding-left:4rpx">:</span>
                </span>
                <span style="padding-left:20rpx"></span>
                {{$parseURL().group_name?$parseURL().group_name:'暂无数据'}}
            </view>

            <view class="m-bottom-10">
                低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="padding-left:58rpx"></span>消
                <span style="padding-left:4rpx">:</span>
                <span style="padding-left:20rpx"></span>
                {{$parseURL().data.minim_charge? $parseURL().data.minim_charge:'暂无数据'}}
            </view>

            <view class="m-bottom-10">客户姓名：{{$parseURL().data.client_name? $parseURL().data.client_name:'暂无数据'}}</view>

            <view class="m-bottom-10 a">联系电话：{{$parseURL().data.client_mobile? $parseURL().data.client_mobile:'暂无数据'}}
                <span class="phone" @click="call"></span>
            </view>
            <view class="m-bottom-10">
                备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="padding-left:58rpx"></span>注
                <span style="padding-left:4rpx">:</span>
                <span style="padding-left:20rpx"></span>
                {{$parseURL().remaks? $parseURL().remaks:'暂无数据'}}
            </view>
            <view class="m-bottom-10">当天生日：{{$parseURL().isshengri ? '是' :'否'}}</view>
            <view class="m-bottom-10">预抵时间：{{$parseURL().data.arrival_time? $minCommon.formatDate(new Date($parseURL().data.arrival_time*1000),'yyyy-MM-dd hh:mm') :'暂无数据'}}
                <span class="f26 m-left-20">({{$minCommon.getDay(new Date($parseURL().data.arrival_time*1000).getDate()) }})</span>
            </view>
        </view>
    </view>
    <view class="btns">
        <min-btn @click="toDesk">继续预约</min-btn>
        <min-btn type="white" @click="goIndex">返回首页</min-btn>
    </view>
    <min-modal ref="show"></min-modal>
</view>
</template>

<script>
export default {
    name: 'appointment-information',
    navigate: ['navigateTo'],
    onLoad() {
        console.log(this.$parseURL())
    },
    methods: {
        toDesk() {
            uni.redirectTo({
                url: '../store/apin-store',
            })
        },
        goIndex() {
            uni.redirectTo({
                url: '../index/index',
            })
        },
        call() {
            this.$refs.show.handleShow({
                title: '使用普通电话拨打？',
                success: (res) => {
                    if (res.id === 1) {
                        uni.makePhoneCall({
                            phoneNumber: this.$parseURL().data.client_mobile
                        });
                    }
                }
            })

        }
    },
}
</script>

<style lang="scss" scoped>
.appointment-information {
    .icon {
        display: block;
        width: 200rpx;
        height: 200rpx;
        margin: 0 auto;
    }

    .title {
        font-size: 32rpx;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        margin-top: 38rpx;
    }

    .card {
        background: #fff;
        border-radius: 10rpx;
        margin-top: 50rpx;

        text {
            color: #ff0000;
        }

        .item-biew {
            width: 100%;
            display: flex;
            justify-content: flex-start;

            span {
                width: 150rpx;
                display: block;
            }

            .two {
                width: 150rpx;
                display: flex;
                justify-content: space-between;

                span {
                    width: auto;
                }
            }
        }

        &>view {
            margin-bottom: 10rpx;

            &:last-child {
                margin: 0;
            }
        }
    }

    .btns {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;

        .min-btn {
            width: 330rpx;
            margin: 0;
        }
    }

    .a {
        display: flex;
        justify-content: space-between;

        .phone {
            width: 40rpx;
            height: 40rpx;
            display: block;
            background-image: url('/static/images/phone.png');
            background-size: contain;
            background-repeat: no-repeat;
        }

    }

}
</style>
