<template>
<view class="commission-details p-lr-30 p-tb-30">
    <view class="top_view">
        <view class="top" @click="showPop">
            <text>{{startTime1}}</text>
            <text class="iconfont">&#xe6b2;</text>
            <text class="iconfont">&#xe68c;</text>
            <text>{{endTime1}}</text>
            <text class="iconfont">&#xe6b2;</text>
        </view>
        <view class="botm">
            <text class="f26">业绩￥{{total}}</text>
        </view>
    </view>
    <view class="m-top-20 bg" v-if="list.length > 0">
        <view v-for="(item,index) in list" :key="index" class="p-lr-20" @click="toDeatil(item.id)">
            <view class="cell-item min-flex min-flex-main-between  min-border-bottom " style="width:100%;height:130rpx">
                <view class="min-flex">
                    <view class="" style="width:400rpx">
                        <view class="f28 min-ellipsis">{{item.commission_name}}</view>
                        <view class="label m-top-10 f24 assist-text min-ellipsis">{{$minCommon.formatDate(new Date(item.create_time*1000),'yyyy/MM/dd hh:mm:ss') }}</view>
                    </view>
                </view>
                <view class="min-flex flex-end min-flex-dir-top">
                    <view :class=" item.commission *1 <= 0 ? 'ablack' : 'ared'"> {{item.commission * 1 > 0 ? '+' + item.commission :  item.commission}}</view>
                </view>
            </view>
        </view>
    </view>
    <min-404 v-else></min-404>
    <min-popup :show="show" @close="close">
        <view class="picer-top">
            <view :class="index === 0 ? 'left' : 'none_ac' " @click="start">
                <view class="main">
                    <text class="f24 m-bottom-30">开始日期</text>
                    <text style="font-size:32rpx;color:#000">{{startTime}}</text>
                </view>
            </view>
            <view style="width:2rpx;height:118rpx;background:#979797;opacity:0.24;"></view>
            <view :class="index === 1 ? 'right' : ' none_ac' " @click="end">
                <view class="main">
                    <text class="f24 m-bottom-30">结束日期</text>
                    <text style="font-size:32rpx;color:#000">{{endTime}}</text>
                </view>
            </view>
        </view>
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="height:400rpx;margin-bottom:50rpx">
            <picker-view-column>
                <view class="picker item" v-for="(item,index) in data" :key="index">{{item}}</view>
            </picker-view-column>
        </picker-view>
        <view class="btn_view">
            <text @click="cancel">取消</text>
            <view class="btn" @click="sure">确认</view>
        </view>
    </min-popup>
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
</view>
</template>

<script>
export default {
    name: 'commission-details',
    navigate: ['navigateTo'],
    data() {
        return {
            showdrawer: false,
            show: false,
            date: '2020-10-2',
            index: 0,
            value: [],
            indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}rpx;`,
            years: [],
            months: [],
            days: [],
            dayLength: Number,
            data: [],
            startTime: (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日' + ' ' + new Date().getFullYear(),
            endTime: (new Date().getMonth() + 1) + '月' + (new Date().getDate() + 1) + '日' + ' ' + new Date().getFullYear(),
            startTime1: '2020年1月2日',
            endTime1: '2020年1月2日',
            store_id: '',
            list: [],
            falg: false,
            num: 2,
            nums: 2,
            des: "加载中",
            load: true,
            total: ""
        }
    },
    onReachBottom() {
        console.log('到底')
        this.falg = true
        this.$minApi.getTCList({
            start_time: this.getDatetre(this.startTime1),
            end_time: this.getDatetre(this.endTime1),
            page: this.nums,
            isLoading: true
        }).then(res => {
            if (res.list.length === 0) {
                this.load = false
                this.des = '暂无更多数据'
                setTimeout(() => {
                    return this.falg = false
                }, 1000)
            }
            console.log(res);
            this.nums++
            this.list = this.list.concat([...res.list])
        })
    },
    onPullDownRefresh() {
        console.log('refresh');
        // this.getDatetre( this.startTime1), this.getDatetre(this.endTime1),
        this.$minApi.getTCList({
            start_time: this.getDatetre(this.startTime1),
            end_time: this.getDatetre(this.endTime1),
            page: 1,
            isLoading: true
        }).then(res => {
            console.log(res);
            this.nums = 2
            this.list = res.list
        })
        this.$minApi.getTCAll({
            start_time: this.getDatetre(this.startTime1),
            end_time: this.getDatetre(this.endTime1),
            isLoading: true
        }).then(res => {
            console.log(res);
            this.total = res.total
            uni.stopPullDownRefresh();
        })
    },
    mounted() {
        const time = new Date()
        const year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        // this.dayLength = this.getDaysInOneMonth(year, month)
        this.getDaysInOneMonth(year, month)
        this.getYears()
        this.getMonth()
        this.getDays()
        this.store_id = this.$store.state.user.userInfo.store_id
        for (const va of this.years) {
            for (const val1 of this.days) {
                this.data.push(val1 + ' ' + va)
            }
        }
        if (month <= 9) {
            month = '0' + month
        }
        if (day <= 9) {
            day = '0' + day
        }
        const a = month + '月' + (day) + '日' + ' ' + year
        this.data.map((item, index) => {
            if (item === a) {
                // 起始位置
                this.value.push(index)
            }
        })
        let now = new Date()
        let now_day = now.getDay()
        let now_time = now.getTime()
        let result = [0, 1]
        let cnmtime = result.map(i => `${new Date(
            now_time + 24 * 60 * 60 * 1000 * i - now_day
          ).getFullYear()}-${(new Date(
            now_time + 24 * 60 * 60 * 1000 * i - now_day
          ).getMonth() + 1)*1 >= 10 ? (new Date(
            now_time + 24 * 60 * 60 * 1000 * i - now_day
          ).getMonth() + 1)*1 : '0'+(new Date(
            now_time + 24 * 60 * 60 * 1000 * i - now_day
          ).getMonth() + 1)*1}-${(new Date(
            now_time + 24 * 60 * 60 * 1000 * i - now_day
          ).getDate())*1 >= 10 ? (new Date(
            now_time + 24 * 60 * 60 * 1000 * i - now_day
          ).getDate()) : '0'+(new Date(
            now_time + 24 * 60 * 60 * 1000 * i - now_day
          ).getDate())}`)
        console.log(this.$store.state.user.userInfo.store_id);
        this.startTime1 = year + '年' + month + '月' + day + '日'
        this.endTime1 = `${cnmtime[1].split("-")[0]}年${cnmtime[1].split("-")[1]}月${cnmtime[1].split("-")[2]}日`
        this.startTime = `${month}月${day}日 ${year}`
        this.endTime = `${cnmtime[1].split("-")[1]}月${cnmtime[1].split("-")[2] }日 ${cnmtime[1].split("-")[0]}`
        this.getData(this.getDatetre(this.startTime1), this.getDatetre(this.endTime1), 1)
        this.getTall(this.getDatetre(this.startTime1), this.getDatetre(this.endTime1))
    },
    methods: {
        // 获取数据
        getData(start_time, end_time, page, limit = 10) {
            this.$minApi.getTCList({
                start_time,
                end_time,
                page,
                limit
            }).then(res => {
                console.log(res);
                this.list = res.list
            })
        },
        // 获取提成合计
        getTall(start_time, end_time) {
            this.$minApi.getTCAll({
                start_time,
                end_time
            }).then(res => {
                console.log(res);
                this.total = res.total
            })
        },
        // 获得年份
        getYears() {
            const time = new Date()
            for (let i = 2020; i <= time.getFullYear(); i++) {
                this.years.push(i)
            }
        },
        // 获取月份
        getMonth() {
            for (let i = 1; i <= 12; i++) {
                if (i <= 9) {
                    i = '0' + i
                }
                this.months.push(i)
            }
        },
        getDays() {
            //  this.dayLength
            for (let q = 1; q <= 12; q++) {
                this.getDaysInOneMonth(2020, q)
                if (q <= 9) {
                    q = '0' + q
                }
                for (let i = 1; i <= this.dayLength; i++) {
                    if (i <= 9) {
                        i = '0' + i
                    }
                    this.days.push(q + '月' + i + '日')
                }
            }
        },
        // 获取某年某月多少天
        getDaysInOneMonth(year, month) {
            month = parseInt(month, 10)
            var d = new Date(year, month, 0)
            this.dayLength = d.getDate()
            // return 
        },
        bindChange: function (e) {
            this.num = e.detail.value[0]
            // this.getDaysInOneMonth(year, month)
            if (this.index === 0) {
                this.startTime = this.data[e.detail.value[0]]
            }
            if (this.index === 1) {
                this.endTime = this.data[e.detail.value[0]]
            }
        },
        showPop() {
            this.show = !this.show
        },
        close() {
            this.show = false
        },
        start() {
            this.index = 0
        },
        end() {
            this.index = 1
        },
        // 确认日期
        sure() {
            this.show = false
            const stTime = this.startTime.split(' ')
            const enTime = this.endTime.split(' ')
            let startime = ''
            let endtime = ''
            startime = stTime[1] + '年' + stTime[0]
            endtime = enTime[1] + '年' + enTime[0]
            if (startime === this.startTime1 && endtime === this.endTime1) return
            this.startTime1 = startime
            this.endTime1 = endtime
            this.value = []
            this.value.push(this.num)
            this.getData(this.getDatetre(this.startTime1), this.getDatetre(this.endTime1), 1)
            this.getTall(this.getDatetre(this.startTime1), this.getDatetre(this.endTime1))
        },
        // 取消
        cancel() {
            this.show = false
        },
        toDeatil(id) {
            this.$minRouter.push({
                name: 'commission-deils',
                params: {
                    id
                }
            })
        },
        // 日期过滤
        getDatetre(time) {
            time = time.replace('年', '-')
            time = time.replace('月', '-')
            time = time.replace('日', '')
            return time
        }
    }
}
</script>

<style lang="scss" scoped>
.top_view {
    width: 100%;
    // height: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top {
        width: 100%;
        height: 35rpx;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        text {
            margin: 0 5rpx;
            display: block;
        }
    }

    .botm {
        flex: 1;
        display: flex;
        padding-left: 5rpx;
        padding-top: 8rpx;

        text {
            color: rgba(102, 102, 102, 1);
        }
    }
}

.bg {
    background: #fff;
}

.cell-item {
    .label {
        width: 410rpx;
    }

    .ablack {
        color: #333;
        font-weight: bold;
    }

    .ared {
        color: #ff0000;
        font-weight: bold;
    }

    .bom {
        font-size: 24rpx;
        color: rgba(102, 102, 102, 1);
    }
}

.picer-top {
    width: 100%;
    height: 200rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;

    .left {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        .main {
            display: flex;
            flex-direction: column;
        }
    }

    .right {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        .main {
            display: flex;
            flex-direction: column;
        }
    }

    .none_ac {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        opacity: 0.36;
        position: relative;

        .main {
            display: flex;
            flex-direction: column;
        }
    }

    .sure {
        color: #007aff;
    }
}

.picker {
    text-align: center;
    line-height: 50rpx;
    width: auto;
}

.btn_view {
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;

    text {
        font-size: 36rpx;
        color: rgba(190, 190, 190, 1);
    }

    .btn {
        width: 394rpx;
        height: 100rpx;
        background: rgba(255, 224, 1, 1);
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        line-height: 100rpx;
        text-align: center;
        color: #333;
        font-size: 36rpx;
    }
}

// 抽屉
.top_view_drawer {
    padding: 30rpx;
    background: #ffe001;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main_drawer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20rpx;
    padding-top: 0;
}
</style>
