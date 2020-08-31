<template>
<view class="reservation p-tb-20 p-lr-30" @touchstart="start" @touchmove="move" @touchend="end">
    <scroll-view scroll-y :style="{transition: top === 0 ? 'transform 300ms':'',transform: 'translateY('+ top + 'rpx' +')'}">
        <min-pcitem :list="$parseURL().store" @emitE="toEmint($parseURL().store)" :isBorder="false" />
        <min-cell :card="false" class="m-tb-20">
            <min-cell-item title="桌台分组" arrow :tail="$parseURL().group.group_name" @eventParent="backChinceGroup" :border="false"></min-cell-item>
        </min-cell>

        <min-cell :card="false" class="m-tb-20">
            <min-cell-item :border="false" title="当前桌号" arrow :tail="desk.desk_name" @eventParent="searchDesk"></min-cell-item>
        </min-cell>

        <min-cell class="mid-view" :card="false">
            <min-desc-input desc="客户姓名" v-model="name1" sign="*" placeholder="请输入姓名"></min-desc-input>
            <min-desc-input desc="联系电话" v-model="phone" :maxlength="11" sign="*" placeholder="请输入联系电话"></min-desc-input>

            <view @click="goChioce">
                <min-desc-input sign="*" desc="预约日期" :isRightRrrow="true" :value="dates" placeholder="请选择预约日期" :disabled="true"></min-desc-input>
            </view>
            <!-- <min-desc-input desc="预抵时间" sign="*"  :border="false" :value='shopDate' :isRightRrrow="true" placeholder="请选择到店日期" :disabled="true"></min-desc-input> -->
            <min-collapse :list="date" v-model="tsetvalue" @chioce="chioce" :nightArr="nightArr" :isKua="$parseURL().store.store_config.business_is_cross"></min-collapse>
            <view class="min-border-bottom"></view>
            <min-switch desc="是否当天生日" v-model="isShengri"></min-switch>
        </min-cell>
        <view class="m-tb-20"></view>
        <min-remarks v-model="value" @click="click" @blur="blur"></min-remarks>
        <view class="empty-view"></view>
    </scroll-view>

    <view class="btn">
        <min-btn :long="true" @click="submit" :opacity="false">提交</min-btn>
    </view>
</view>
</template>

<script>
export default {
    name: 'reservation',
    navigate: ['navigateTo'],
    data() {
        return {
            desk: {},
            name1: '',
            phone: '',
            dates: '',
            date: [],
            nightArr: [],
            tsetvalue: '',
            current: Number,
            // nextCurrent: Number,
            isShengri: false,
            value: '',
            table: '',
            top: '',
            lastY: ''
        }
    },
    onBackPress(e) {
        uni.redirectTo({
            url: '../index/index'
        })
        // return true 表示禁止默认返回
        return true
    },
    methods: {
        toEmint() {
            // 切换门店
            console.log('切换门店')
            uni.navigateTo({
                url: '../store/apin-store'
            })
        },
        // 搜索桌台
        searchDesk() {
            console.log(this.$parseURL().group.id)
            this.$minRouter.push({
                name: 'search-table',
                params: {
                    group_id: this.$parseURL().group.id,
                    group_name: this.$parseURL().group.group_name,
                    date: this.$parseURL().date
                }
            })
        },
        backChinceGroup() {
            this.$minRouter.push({
                name: 'choose-table',
                params: {
                    item: this.$parseURL().store
                }
            })
        },
        // 获取时间
        getDate(start, end) {
            const ia = 30 * 60 * 1000
            if (this.$parseURL().store.store_config.business_is_cross !== 1) {
                // 没有跨天
                const startime1 = '2020/3/18' + ' ' + start
                const endTie1 = '2020/3/18' + ' ' + end
                const startimeDate1 = new Date(startime1).getTime()
                const endTiemeDate1 = new Date(endTie1).getTime()
                const arr1 = []

                for (let i = startimeDate1; i <= endTiemeDate1; i += ia) {
                    const eq = new Date(i)
                    const a = this.$minCommon.formatDate(eq, 'hh:mm')
                    arr1.push(a)
                }
                this.date = arr1
                return
            }
            var startime = '2020/3/18' + ' ' + start
            var endTie = '2020/3/19' + ' ' + end
            const endTiemeDate = new Date(endTie)
            const startimeDate = new Date(startime)
            var night = new Date('2020/3/18 24:00:00')
            var tom = new Date('2020/3/19 00:00:00')
            const nightLine = night.getTime()
            const tommorw = tom.getTime()
            // 开始的时间戳
            start = startimeDate.getTime()
            // 结束的时间戳
            end = endTiemeDate.getTime()
            const arr = []
            for (let i = start; i < nightLine; i += ia) {
                const eq = new Date(i)
                const a = this.$minCommon.formatDate(eq, 'hh:mm')
                arr.push(a)
            }
            const brr = []
            for (let i = tommorw; i <= end; i += ia) {
                const eq = new Date(i)
                const a = this.$minCommon.formatDate(eq, 'hh:mm')
                brr.push(a)
            }
            this.date = arr
            this.nightArr = brr
        },
        chioce(n) {
            this.isKua = n
            console.log(this.isKua)
        },
        // 提交
        submit() {
            /**
             * 桌子Id  客户姓名  客户手机号  预约日期（例 2020-01-01）  预抵时间 （例 20:00）  是否生日（1否，2：是）  备注  是否跨天
             */
            let dates = this.dates
            const datesNum = this.dates.indexOf(' ')
            dates = dates.slice(0, datesNum)
            const data = {
                store_id: this.$parseURL().store.id,
                clue_id: this.$parseURL().store.clue_id ?
                    this.$parseURL().store.clue_id : 0,
                desk_group_id: this.$parseURL().group.id,
                desk_id: this.desk.id,
                client_name: this.name1,
                client_mobile: this.phone,
                business_date: dates,
                arrival_time: this.tsetvalue,
                is_birthday: this.isShengri ? 1 : 0,
                remark: this.value,
                is_across: this.isKua
            }
            if (!data.client_name) {
                uni.showToast({
                    title: '请输入姓名',
                    icon: 'none'
                })
            } else if (!this.$minCommon.checkMobile(data.client_mobile)) {
                uni.showToast({
                    title: '请输入有效电话姓名',
                    icon: 'none'
                })
            } else if (!data.business_date) {
                uni.showToast({
                    title: '请选择预定日期',
                    icon: 'none'
                })
            } else if (!data.arrival_time) {
                uni.showToast({
                    title: '请选择预达时间',
                    icon: 'none'
                })
            } else {
                console.log(data)
                this.addData(data)
            }
        },
        // 提交
        addData(data) {
            this.$minApi.appMent(data).then(res => {
                console.log(res)
                this.$showToast('预约成功')
                setTimeout(() => {
                    this.$minRouter.push({
                        name: 'appointment-information',
                        params: {
                            data: res,
                            store: this.$parseURL().store,
                            group_name: this.$parseURL().group.group_name,
                            remaks: this.value
                        }
                    })
                }, 2000)
            })
        },
        click() {
            this.table = false
        },
        blur() {
            console.log(this.table)
            this.table = true
        },
        // 选择预约日期
        goChioce() {
            this.$minRouter.push({
                name: 'reservation-date',
                params: {
                    store_id: this.$parseURL().store.id
                }
            })
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                //   // 像下滚动
                this.top = currentY - this.lastY
            } else {
                // 向上滚动
                this.top = currentY - this.lastY
            }
        },
        end(e) {
            return (this.top = 0)
        }
    },
    onLoad() {
        console.log(this.$parseURL())
        this.$minApi
            .getIdelDesk({
                group_id: this.$parseURL().group.id,
                date: this.$parseURL().date.slice(0, 10)
            })
            .then(res => {
                console.log(res)
                this.desk = res
            })
        // 获取营业预约时间
        this.getDate(
            this.$parseURL().store.store_config.business_start_time,
            this.$parseURL().store.store_config.business_end_time
        )
    }
}
</script>

<style lang="scss" scoped>
.btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
}

.empty-view {
    height: 120rpx;
}
</style>
