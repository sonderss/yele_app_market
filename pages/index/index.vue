<template>
<view class="index" @touchstart="start" @touchmove="move" @touchend="end">
    <scroll-view scroll-y :style="{transition: top === 0 ? 'transform 300ms':'',transform: 'translateY('+ top + 'rpx' +')'}">

        <view class="back-img-box">
            <view class="info min-flex min-flex-main-between m-lr-30">
                <view class="min-flex min-flex-main-start">
                    <min-avatar size="md" :url="userInfo.head_img"></min-avatar>
                    <view class="m-left-20">
                        <view class="f28">{{ userInfo.user_name }}</view>
                        <view class="f22 m-top-20">{{ userInfo.position_name }}</view>
                    </view>
                </view>
            </view>
            <view class="code_" @click="toMyCode('invitationCode')">
                <image src="/static/images/code_admin.png" />
                <text>邀请码</text>
            </view>
        </view>
        <min-notice-bar :text="msg" @more="view_more" @detail="toDetail($event,'storeAnnouncement')"></min-notice-bar>
        <yele-grid :list="item.grid" v-for="(item,index) in list" :key="index"></yele-grid>

    </scroll-view>
</view>
</template>

<script>
import MinAvatar from "@/components/min-avatar";
import YeleGrid from "@/components/page/yele-grid";

export default {
    navigate: ["navigateTo"],
    name: "index",
    components: {
        MinAvatar,
        YeleGrid
    },
    data() {
        return {
            list: [{
                    grid: [{
                            url: '../store/apin-store',
                            img: "/static/images/index/order_person.png",
                            text: "预约",
                            root: 'book'
                        },
                        {
                            url: "../store/order-store",
                            img: "/static/images/index/my_list.png",
                            text: "下单",
                            root: 'order'
                        },
                        {
                            name: "platform-admin",
                            img: "/static/images/index/my_order.png",
                            text: "我的桌台",
                            root: 'desk'
                        }
                    ]
                },
                {
                    grid: [{
                            name: "order-recode",
                            img: "/static/images/index/order_list.png",
                            text: "下单记录",
                            root: 'orderRecord'
                        },
                        {
                            name: 'appointment-record',
                            img: "/static/images/index/list_.png",
                            text: "预约记录",
                            root: 'bookRecord'
                        },
                        {
                            name: "invitation-record",
                            img: "/static/images/index/set_list.png",
                            text: "邀请记录",
                            root: 'invitationRecord'
                        }
                    ]
                },
                {
                    grid: [{
                            name: "personal-task",
                            img: "/static/images/index/person_.png",
                            text: "个人任务",
                            root: 'personalMission'
                        },
                        {
                            name: "team-task",
                            img: "/static/images/index/team_.png",
                            text: "团队任务",
                            root: 'teamMission'
                        },
                        {
                            name: 'regional-tasks',
                            img: "/static/images/index/area_.png",
                            text: "区域任务",
                            root: 'regionMission'
                        }
                    ]
                },
                {
                    grid: [{
                        name: "platform-activities",
                        img: "/static/images/index/start_order.png",
                        text: "平台活动",
                        root: 'platformActivity'
                    }]
                },
                {
                    grid: [{
                            name: "my-clue",
                            img: "/static/images/index/mo_line.png",
                            text: "我的线索",
                            root: 'myClue'
                        },
                        {
                            name: "clue-management",
                            img: "/static/images/index/line_.png",
                            text: "线索管理",
                            root: 'clueManage'
                        },
                        {
                            name: 'lead-users',
                            img: "/static/images/index/line_user.png",
                            text: "线索用户管理",
                            root: 'clueMember'
                        },
                        {
                            name: "my-downline",
                            img: "/static/images/index/my_downline.png",
                            text: "我的下线",
                            root: 'myOffline'
                        }
                    ]
                },
                {
                    grid: [{
                            img: "/static/images/index/my_money.png",
                            text: "我的收入",
                            root: 'finance',
                            name: 'my-income'
                        },
                        // {
                        //     img: "/static/images/index/data_.png",
                        //     text: "数据统计",
                        //     root: 'statistics'
                        // },
                        {
                            name: "mine-info",
                            img: "/static/images/index/person_user.png",
                            text: "个人资料",
                            root: 'userInfo'
                        }
                    ]
                }
            ],
            msg: [],
            top: '',
            lastY: ''
        };
    },
    computed: {
        userInfo() {
            // 用户信息
            return this.$store.state.user.userInfo;
        }
    },
    methods: {
        navigateTo() {
            this.$minRouter.push({
                name: "switch-stores",
                type: "navigateTo",
                path: "/pages/switch-stores/index"
            });
        },
        toMyCode(root) {
            let result = this.$getRoot(root)
            if (!result) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: "invite-rebate"
            });
        },
        toPlatform() {
            this.$minRouter.push({
                name: "platform-admin",
                type: "navigateTo",
                path: "/pages/platform-admin/index"
            });
        },
        // 获取门店公告列表
        getStoreList() {
            this.$minApi.storMentList({
                isLoading: true
            }).then(res => {
                this.msg = res.list
            })
        },
        // 查看更多
        view_more() {
            this.$minRouter.push('offer-announcement')
        },
        toDetail(e, root) {
            console.log(e)
            let result = this.$getRoot(root)
            if (!result) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: "announcement-detail",
                params: {
                    id: e
                }
            })
        },
        getPay() {
            this.$minApi.getPayMethods({
                isLoading: true
            }).then(res => {
                this.$store.dispatch('status/setPayMethods', res.list)
            })
        },
        async getUrl() {
            let res = await this.$minApi.getH5HTML({
                isLoading: true
            })
            let url = unescape(res.url)
            this.$store.dispatch('status/setUrl', url)
            console.log(url)
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY;
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY;
            if (this.top < currentY - this.lastY) {
                //   // 像下滚动
                //  this.top = currentY - this.lastY;
                //   this.flag = true
            } else {
                // 向上滚动
                //  this.top = 0
                this.top = currentY - this.lastY;
                this.flag = false
            }
        },
        end(e) {
            if (this.top >= 300) {
                this.$minRouter.push({
                    name: "seat",
                    params: {
                        url: 'index'
                    }
                });
            }
            return this.top = 0;
        },
    },
    onShow() {
        if (this.$store.state.status.isReloadUserInfo) {
            this.$minApi.userInfo({
                isLoading: true
            }).then(res => {
                res.apiAuth = this.$store.state.user.userInfo.apiAuth
                this.$store.dispatch('user/setUserInfo', res)
                this.$store.dispatch('status/setisReloadUserInfo', false)
            })
        }
    },
    onLoad() {
        this.getStoreList()
        this.getUrl()
        this.getPay()
        // this.$minApi.userInfo({
        //     isLoading: true
        // }).then(res => {
        //     //  let a = this.$store.state.user.userInfo.apiAuth
        //     this.$store.dispatch('user/setUserInfos', res)
        // })
        // console.log(this.$store.state.user.userInfos)
    }
};
</script>

<style lang="scss" scoped>
.back-img-box {
    width: 100%;
    height: 288rpx;
    background-size: cover;
    background-position: 0 0;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-end;
    background-image: url('../../static/images/back_admin.png');
    background-repeat: no-repeat;
    background-size: cover;

    .info {
        margin-bottom: 30rpx;
        align-items: flex-end;

        view,
        text {
            color: #ffffff;
        }

        .change_o {
            margin-bottom: 7rpx;
            margin-left: 15rpx;
        }
    }

    .code_ {
        flex: 1;
        margin-bottom: 60rpx;
        display: flex;
        justify-content: flex-end;
        margin-right: 30rpx;

        text {
            color: #ffffff;
            font-size: 22rpx;
        }

        image {
            display: block;
            width: 28rpx;
            height: 28rpx;
            margin-right: 13rpx;
        }
    }

    .bar {
        padding: 28rpx 30rpx 36rpx 30rpx;
    }
}

.white-item {
    background: #ffffff;
    border-radius: 6px;
}

.img {
    width: 80rpx;
    height: 80rpx;
}

.activity-item {
    position: relative;
    width: 330rpx;
    height: 158rpx;

    .bimg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
    }

    .word {
        position: relative;
        z-index: 2;
        font-size: 50rpx;
        color: #ffffff;
        font-weight: 700;
    }
}

.index {
    // background: #030313;
    width: 100vw;
    min-height: 100vh;
    padding-bottom: 20rpx;
}
</style>
