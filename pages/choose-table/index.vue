<template>
  <view class="choose-table p-tb-20 p-lr-30">
      <min-pcitem  :list="$parseURL().item" @emitE="toEmint($parseURL().item)" />
      <view class="m-tb-20"></view>
      <min-cell :card="false">
        <min-cell-item :title="`时间: ${dates}`" arrow @eventParent="toChinceDate"></min-cell-item>
      </min-cell>
      <view class="tesk" :style="{background:`url(${getNum(n)})`,backgroundSize:'cover'}" v-for="(i,n) in deskGroup" :key="i.id" @click="chinceGrop(n)">
        <view :class="i.is_full === 0 ? 'title_active':'title'">{{i.group_name}}</view>
        <view class="desc">{{i.is_full === 0 ? '可订':'已满'}}</view>
      </view>
  </view>
</template>

<script>
const bgs = ['/static/images/desk/0.png','/static/images/desk/1.png','/static/images/desk/2.png','/static/images/desk/3.png']
export default {
    name:"choose-table",
    navigate:["navigateTo"],
    data(){
        return{
            deskGroup:[],
            bgs,
            current:0,
            dates:'',
            list:[]
        }
    },
    methods:{
        getNum(n){
            switch(n){
                case 0:
                return '/static/images/desk/0.png'
                case 1:
                return '/static/images/desk/1.png'
                 case 2:
                return '/static/images/desk/2.png'
                case 3:
                return '/static/images/desk/3.png'
                default:
                return '/static/images/desk/2.png'
            }
        },
        toEmint(){
            // 切换门店
            console.log('切换门店')
            uni.navigateTo({
                url:'../store/apin-store'
            })
        },
        chinceGrop(n){
            this.current = n
            if(this.deskGroup[n].is_full === 1) return this.$showToast('没有空闲台!!!')
            this.$minRouter.push({
                name:'reservation',
                params:{store:this.$parseURL().item,group:this.deskGroup[n],date:this.dates}
            })
        },
        toChinceDate(){
            this.$minRouter.push({
                name:'reservation-date',
                params:{store_id: this.$parseURL().item.id} 
            })
        }
    },
    onBackPress(e){
        uni.redirectTo({
            url: '../index/index'
        });
	// return true 表示禁止默认返回
	return true
    },
    onNavigationBarButtonTap(e){
        console.log(e)
    },
    watch:{
        dates(a){
            console.log(a)
           let t = a.slice(1,10)
           console.log(t)
            this.$minApi.getDeskGroup({
                store_id:this.$parseURL().item.id,
                date: t 
            }).then(res=>{
                console.log(res)
                this.deskGroup  =  res
            })
        }
    },
    onLoad(){
        console.log(this.$parseURL().item)
        let time = this.$minCommon.formatDate(new Date(Date.now()) ,'yyyy/MM/dd') 
        console.log(time)
        this.$minApi.getDeskGroup({
            store_id:this.$parseURL().item.id,
            date: time
        }).then(res=>{
            console.log(res)
            this.deskGroup  =  res
        })
          this.$minApi.chinceStoreDate({
            store_id:this.$parseURL().item.id
            }).then(res=>{
                console.log(res)
                this.list =res
                this.dates = this.list[0].date
            })
    }
}
</script>

<style lang="scss" scoped>
.tesk{
    width: 100%;
    height: 180rpx;
    margin: 20rpx 0;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 45rpx;
   .title{
        font-size:42rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:#FFFFFF
   }
   .title_active{
        font-size:42rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,224,1,1);
   }
   .desc{
       margin-bottom: 38rpx;
       margin-top:10rpx;
       color: #CCCCCC;
   }
}
</style>