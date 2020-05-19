<template>
  <view class="announcement-detail p-lr-20  p-tb-20">
    <view class="main">
        <view class="title">{{content.notice_title}}</view>
        <view class="name">
            <text class="time">{{content.create_time}}</text>
            <text class="desc  m-left-20">{{content.store_name}}</text> 
        </view>
        <view class="bg m-tb-20"></view>
        <view class="content_desc">
            {{content.notice_content}}
        </view>
    </view>
  </view>
</template>

<script>
export default {
        name:"announcement-detail",
        navigate:['navigateTo'],
        data(){
            return{
                content:{}
            }
        },
        onLoad(op){
            console.log(this)
        },
        mounted(op){
            console.log(this.$parseURL())
            this.$minApi.storMentDetail({notice_id:this.$parseURL().id}).then(res=>{
                console.log(res)
                this.content = res
            })
        }
}
</script>

<style lang="scss" scoped>
.announcement-detail{
    .main{
        min-height:1000rpx;
        height: auto;
        background:rgba(255,255,255,1);
        border-radius:10rpx;
        padding: 40rpx 20rpx;
        .title{
            height:34rpx;
            font-size:36rpx;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
        .name{
            margin-top: 26rpx;
            .time{
                font-size:22rpx;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(102,102,102,1);
            }
            .desc{
                font-size:24rpx;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
        }
        .bg{
            width: 100%;
            height: 300rpx;
            background-image: url('../../static/images/bg_amonent.png');
            background-size: cover;

        }
    }
}

</style>