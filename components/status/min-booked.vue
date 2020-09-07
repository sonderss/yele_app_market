<template>
<view class="platform-detail">
    <min-pcitem :list="list.store_info" @emitE="toEmint(item)" :showArray="false" :isBorder="false" />
    <view class="card p-lr-20 m-tb-20">
        <view class="p-tb-30 min-border-bottom">基本信息</view>
        <view class="main p-tb-20">
            <view class="reserved">已预约</view>
            <view>
                台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
                <text class="emp">{{list.desk_info.desk_name}}</text>
            </view>
            <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.desk_info.group_name}}</view>
            <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{list.desk_info.minim_charge}}</view>
            <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(list.desk_info.seats) }}</view>
            <view>开台条件：{{list.desk_info.minimum_consume_percent+'成低消'+ `(${list.desk_info.desk_open_minimum})`}}</view>
        </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20" v-if="list.clue_info">
        <view class="p-tb-30 min-border-bottom">线索来源</view>
        <view class="main p-tb-20">
            <view>线索用户：{{list.clue_info? list.clue_info.clue_user_name : '暂无数据'}}</view>
            <view>联系电话：{{list.clue_info ? list.clue_info.mobile:'暂无数据'}}</view>
        </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">客户信息</view>
        <view class="main p-tb-20">
            <view>客户姓名：{{list.desk_info.client_name}}</view>
            <view class="min-flex  min-flex-main-between">联系电话：{{list.desk_info.client_mobile}}
                <text class="iconfont" style="font-size:50rpx" @click="callPhone(list.desk_info.client_mobile)">&#xe654;</text>
            </view>
            <view>当天生日：{{list.desk_info.is_birthday === 0 ? '否' : '是'}}</view>
            <view>预抵时间：{{$minCommon.formatDate(new Date(list.desk_info.arrival_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
            <view style="display:flex;justify-content: space-between;" v-if="list.desk_info.remark">
                <view style="width:130rpx">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注 :</view>
                <view style="margin-left:18rpx;flex:1">{{list.desk_info.remark}}</view>
            </view>

        </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">操作信息</view>
        <view class="main p-tb-20">
            <view>营销人员：{{list.desk_info.book_user_name}}</view>
            <view>预约时间：{{$minCommon.formatDate(new Date(list.desk_info.book_time*1000),'yyyy-MM-dd hh:mm:ss')}}</view>
        </view>
    </view>
    <view class="btns_book">
        <view class="btn" @click="book">取消预约</view>
    </view>
    <min-modal ref='show'></min-modal>
</view>
</template>

<script>
import mixin from './mixin'
export default {
    mixins: [mixin],
    props: {
        idNum: {
            type: Number
        },
        date: String,
        list: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            toast: false,
            index: Number
        }
    },
    mounted() {
        console.log(this.idNum, this.date, this.list)
    },
    methods: {
        // 历史
        // goGetHistory () {
        //   this.$minRouter.push({
        //     name: 'platform-history',
        //     params: { id: this.idNum }
        //   })
        // },
        // 预约
        book() {
            // cancelBooked
            this.$minApi.cancelBooked({
                booking_id: this.list.desk_info.booking_id
            }).then(res => {
                console.log(res)
                this.$showToast('取消成功')
                setTimeout(() => {
                    this.$minRouter.push({
                        name: 'redplatform-detail',
                        params: {
                            id: this.idNum
                        }
                    })
                }, 2000)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
