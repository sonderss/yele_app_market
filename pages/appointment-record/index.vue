<template>
  <view class="appointment-record">
         <min-navTab ref="navTab" :tabTitle="list" @changeTab="changeTab"></min-navTab>

        <swiper  style="height:100vh;padding:20rpx;margin-top:80rpx"  :current="currentTab" @change="swiperTab">
            <swiper-item v-for="(listItem,listIndex) in data" :key="listIndex">
                <scroll-view
                    style="height: 100vh"
                    scroll-y="true"
                    scroll-with-animation
                    :scroll-into-view="toView"
                >
                 <min-status v-if="listItem.length !== 0" :list="listItem"></min-status>
                 <min-404 v-else></min-404>
                </scroll-view>
            </swiper-item>
        </swiper>
  </view>
</template>

<script>
//全部预约、已预约、已开台、已过期、已取消  预约状态（1：已预约，2：已过期，3：已开台，4：已取消）
export default {
        name:"appointment-record",
        navigate:['navigateTo'],
        data(){
            return {
                list:['全部预约','已预约','已过期','已开台','已取消'],
                data:[[],[],[], [],[]],
                currentTab:0,
                toView:''
            }
        },
        mounted(){
            this.$minApi.getBookList().then(res=>{
                console.log(res)
                // this.data = res.list
                this.data[0] = res.list
                res.list.map(item=>{
                    switch(item.status){
                        case 1:
                           this.data[1].push(item)
                           break;
                        case 2:
                           this.data[2].push(item)
                           break;
                        case 3:
                            this.data[3].push(item)
                            break;
                        case 4:
                            this.data[4].push(item)
                            break;
                        default:
                        return []
                    }
                })
            })
        },
        methods:{
            changeTab (e) {
                this.currentTab = e
            },
            // swiper 滑动
            swiperTab: function (e) {
                var index = e.detail.current // 获取索引
                this.$refs.navTab.longClick(index)
            },
        }
}
</script>

<style lang="scss" scoped>

</style>